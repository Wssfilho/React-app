import { useRouter } from "next/router";
import {  ReactNode, useEffect, useState } from "react";


export default function PrivateRoute( {children}: {children: ReactNode})
{
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            router.push('/'); // Redireciona para a página de login se não estiver autenticado
        }
        else {
            setIsAuthenticated(true);
        }
    }, []);
    return isAuthenticated ? children :  null
}