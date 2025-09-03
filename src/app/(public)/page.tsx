'use client'
import { useRouter } from 'next/navigation';
import Button from '../components/Button'
import styles from './page.module.css'
import { FormEvent } from 'react';
export default function Login() {
    const router = useRouter();

    function handleFormSubmit(event : FormEvent<HTMLFormElement>) {
        event.preventDefault(); // Evita o comportamento padrão de envio do formulário
        router.push('/tasks');
    }

    return (
        <div className={styles.container}>
            <div className={styles.loginContainer}>
                <header className={styles.header}>
                    <h1>
                        Gestor de tarefas
                    </h1>
                    <p>Insira as informações de login:</p>
                </header>
                <form className={styles.form}
                    onSubmit={(e) => handleFormSubmit(e)}>
                    <input type="text" className={styles.input} placeholder='Usuário' />
                    <input type="text" className={styles.input} placeholder='Senha' />
                    <Button size='lg' variant='primary' type='submit'>
                        LOGIN
                    </Button>
                </form>
            </div>
        </div>
    )


}