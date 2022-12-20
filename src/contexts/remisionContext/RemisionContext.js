import React, { createContext, useContext, useReducer } from "react";
import { remisionReducer } from "./remisionReducer";
import { CommonContext } from "../commonContext/CommonContext";
import api from '../../api/api';

const initialState = {
  status: "loading",
  selectedRow: null,
  desde: 1,
  hasta: 1,
  por_pagina: 1,
  pagina_actual: 1,
  ultima_pagina: 1,
  total: 1,
  datos: []
}

export const RemisionContext = createContext();

export const RemisionProvider = ({children}) => {
  const [state, dispatch] = useReducer(remisionReducer, initialState);
  const {addError, addMessage} = useContext(CommonContext);

  const onGetRemisiones = async ({usuario, reload}) => {
    if(reload){
      dispatch({ type: 'resetStatus' })
    }
    try {
      const resp = await api.get('/remisiones', {
        params: {
          ligera: true,
          usuario: usuario??''
        }
      });
      if(resp.status===200){
        dispatch({ 
          type: 'getDatos', 
          payload: resp.data
        })
      }
    } catch (e) {
      console.log(e.response.data);
      addError(e.response.data);
    }
  }

  const onRead = async ({data}) => {
    try {
      const resp = await api.get('/remisiones-detalle/leer', {
        params: {
          ...data
        }
      });
      if(resp.status === 200){
        dispatch({
          type: 'read',
          payload: resp.data
        })
      }
    } catch (error) {
      console.log(error.response)
      addError(error.response.data.mensajes[0]);
    }
  }

  const onAccept = async ({data, reinitialize}) => {
    try {
      const resp = await api.post('/remisiones/'+data.id, data);
      if(resp.status === 200){
        dispatch({
          type: 'read',
          payload: resp.data
        });
        addMessage(resp.data.mensajes[0])
        reinitialize();
      }
    } catch (error) {
      console.log(error.response)
      addError(error.response.data.mensajes[0]);
    }
  }

  return (
    <RemisionContext.Provider value={{
      ...state,
      onGetRemisiones,
      onRead,
      onAccept
    }}>
      {children}
    </RemisionContext.Provider>
  );
}