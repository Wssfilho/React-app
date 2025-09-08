'use client'
import { useRouter } from 'next/navigation'
import Button from '../components/Button'
import styles from './page.module.css'
import axios from 'axios'
import { api } from "./global";
import { FormEvent, useEffect, useState } from 'react';

export default function Login() {
    const router = useRouter();
    const [mounted, setMounted] = useState(false);
    const [credenciais, setCredenciais] = useState({ email: '', password: '' });

    useEffect(() => {
        setMounted(true); // Evita SSR do formulário e previne mismatch por autofill/extensões
    }, []);

    async function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        try {
            const { data } = await axios.post(api + 'api/token/', credenciais);
            const token = data?.access ?? data?.acess; // cobre ambos os campos
            if (token) localStorage.setItem('token', token);
            console.log(token);
            router.push('/tasks');
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            alert('Falha no login. Verifique suas credenciais e tente novamente.');
        }
    }

    if (!mounted) return null;

    return (
        <div className={styles.container}>
            <div className={styles.loginContainer}>
                <header className={styles.header}>
                    <h1>Gestor de tarefas</h1>
                    <p>Insira as informações de login:</p>
                </header>

                <form className={styles.form} onSubmit={handleFormSubmit} autoComplete="on">
                    <input
                        type="text"
                        name="username"
                        className={styles.input}
                        placeholder="Usuário"
                        value={credenciais.email}
                        autoComplete="username"
                        onChange={(e) => setCredenciais({ ...credenciais, email: e.target.value })}
                    />

                    <input
                        type="password"
                        name="password"
                        className={styles.input}
                        placeholder="Senha"
                        value={credenciais.password}
                        autoComplete="current-password"
                        onChange={(e) => setCredenciais({ ...credenciais, password: e.target.value })}
                    />

                    <Button size="lg" variant="primary" type="submit">
                        LOGIN
                    </Button>
                </form>
            </div>
        </div>
    )
}