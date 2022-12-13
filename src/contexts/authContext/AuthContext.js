import React, { createContext, useEffect, useReducer } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authReducer } from "./authReducer";
import api from '../../api/api';

const authInitialState = {
  status: "checking",
  messages: '',
  access_token: null,
  user: null,
  token_type: null,
  expires_in: null,
  refresh_token: null,
  data: null,
  access_status: 'PDTE'
}

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [state, dispatch] = useReducer(authReducer, authInitialState);

  useEffect(() => {
    getToken();
  },[])

  const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem('@secSellApiToken');
      if(!token) return dispatch({type: "notAuthenticated"});
      dispatch({
        type: "setToken", 
        payload: {
          access_token: 'Bearer '+token,
        }
      });
      getSession(token);
    } catch(e) {
      console.log(e);
    }
  }

  const signIn = async ({username, password}) => {
    try {
      const resp = await api.post('/users/token', {
        username,
        password,
        movil: true
      });
      dispatch({
        type: "signIn", 
        payload: {
          access_token: resp.data.access_token,
          refresh_token: resp.data.refresh_token,
          expires_in: resp.data.expires_in,
          data: resp.data.data,
          messages: resp.data.messages,
          token_type: resp.data.token_type
        }
      });
      await AsyncStorage.setItem('@secSellApiToken', resp.data.access_token)
      getSession(resp.data.access_token);
    } catch (error) {
      dispatch({type: "addError", payload: error.response.data.messages})
    }
  };

  const logout = () => {
    dispatch({type: "logout"});
    removeToken();
  };

  const removeError = () => {
    dispatch({type: "removeError"})
  };

  const getSession = async (token) => {
    try {
      const resp = await api.get('/users/current/session', {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          authorization: 'Bearer '+token
        }
      });
      dispatch({type: "getSession", payload: {
        user: resp.data.usuario
      }})
    } catch (error) {
      console.log(error.response.data);
    }
  }

  const removeToken = async () => {
    try {
      await AsyncStorage.removeItem('@secSellApiToken');
    } catch(e) {
      console.log(e)
    }
  }

  const getStatus = async (usuario) => {
    try {
      const resp = await api.get('/solicitudes-acceso-consulta/'+usuario);
      dispatch({type: "setStatus", payload: resp.data});
    } catch (error) {
      console.log(error.response.data);
    }
  }

  return (
    <AuthContext.Provider value={{
      ...state,
      signIn,
      logout,
      removeError,
      getStatus
    }}>
      {children}
    </AuthContext.Provider>
  );
}