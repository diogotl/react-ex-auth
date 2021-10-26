import { createContext, ReactNode, useEffect, useState } from "react";
import Router from "next/router";
import { api } from "../services/api";
import { setCookie, parseCookies } from 'nookies'

type User = {
    email: string;
    permissions: string[],
    roles: string[],
}

type AuthContextData = {
    signIn(credentials: SignInCredentials): Promise<void>;
    user: User;
    isAuthenticated: boolean;
};

type AuthProviderProps = {
    children: ReactNode;
}

type SignInCredentials = {
    email: string;
    password: string;
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {

    const [user, setUser] = useState<User>();
    const isAuthenticated = !!user;

    useEffect(()=> {
        const {'ex-auth.token': token } = parseCookies()

        if (token) {
            api.get('/me').then(response => {
                console.log(response)
            })
        }

    }, [])

    async function signIn({ email, password }: SignInCredentials) {
        try {
          const response = await api.post('sessions', { email, password });
    
          const { token, refreshToken, permissions, roles } = response.data;
    

            setCookie(undefined, 'ex-auth.token', token, {
                maxAge: 60 * 60 * 24 * 30,
                path: '/',

            })
            setCookie(undefined, 'ex-auth.token', refreshToken, {
                maxAge: 60 * 60 * 24 * 30,
                path: '/',

            })

            setUser({
                email,
                permissions,
                roles,
            })

            Router.push('/dashboard')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <AuthContext.Provider value={{ signIn, isAuthenticated, user }}>
            {children}
        </AuthContext.Provider>
    )

}
