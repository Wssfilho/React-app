import Button from "@/app/components/Button";
import styles from './page.module.css'
export default function Tasks() {
    return (
        <div className={styles.container}>
            <p>Bem Vindo</p>
        
        <header className={styles.header}>
            <h1>
               Tarefas
            </h1>
            <Button
                size='md'
                variant='secondary'
                type='button'>
                Adicionar Tarefa
            </Button>
        </header>
        <main>
            
        </main>
    </div>
    )
}
