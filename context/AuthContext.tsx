import { useRouter } from 'next/router';
import React, { createContext, useContext, useState, useEffect } from 'react'
import { useQueryClient } from 'react-query';

interface AuthContextInterface {
  name?: string;
  author?: string;
  url?: string;
}

type Props = {
  children: React.ReactNode
}

const AuthContext = createContext<AuthContextInterface | null>(null);

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const auth: AuthContextInterface = useAuthProvider();

  return (
    <AuthContext.Provider value={ auth }>{ children }</AuthContext.Provider>
  )
}

const useAuthProvider = () => {
  const [ user, setUser ] = useState();
  const [ hasTokenCookie, setHasTokenCookie ] = useState( false );
  const router = useRouter()

  const { } = useQueryClient()

  return {

  }
}

export default AuthContext