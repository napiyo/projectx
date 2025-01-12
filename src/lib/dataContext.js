'use client'
import { createContext, useReducer } from 'react';

const initialState = {
  userData: null
};

const userReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return { ...state, userData: action.payload, isLoading: false };
    case 'LOGOUT':
      return { ...state, userData: null };
    default:
      return state;
  }
};

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };