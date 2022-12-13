import React, { createContext, useReducer } from 'react';
import { commonReducer } from './commonReducer';

export const commonInitialState = {
  message: '',
  error: ''
}

export const CommonContext = createContext();

export const CommonProvider = ({children}) => {
  const [state, dispatch] = useReducer(commonReducer, commonInitialState);

  const addMessage = (message) => {
    dispatch({type: 'addMessage', payload: message})
  }

  const addError = (error) => {
    dispatch({type: 'addError', payload: error})
  }

  const resetState = () => {
    dispatch({type: 'resetState'})
  }

  return (
    <CommonContext.Provider value={{
      ...state,
      addMessage,
      addError,
      resetState
    }}>
      {children}
    </CommonContext.Provider>
  );
}