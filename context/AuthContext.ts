import { createContext } from "react";

interface SignInCredentials {
    email: string;
    password: string;
}

interface AuthContextData {
    signIn(credentials: SignInCredentials): Promise<void>;
    isAuthenticated: boolean;
};

const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children }) {

    const isAuthenticated = false;

    async function signIn({ email, password }: SignInCredentials) {
        console.log(email, password)
    }

    return (
        <AuthContext.Provider value= {{ signIn, isAuthenticated }
}>
    { children }
    < /AuthContext.Provider>
    )
}