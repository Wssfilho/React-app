import Button from '../components/Button'
import styles from './page.module.css'
export default function Login() {


    return (
        <div className={styles.container}>
            <div className={styles.loginContainer}>
                <header className={styles.header}>
                    <h1>
                        Gestor de tarefas
                    </h1>
                    <p>Insira as informações de login:</p>
                </header>
                <form className={styles.form}>
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