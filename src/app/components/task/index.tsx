
import styles from './page.module.css'
import { FiTrash } from 'react-icons/fi'
export default function Task() {
    return (
        <div className={styles.taskContainer}>
            <header>
                <h1> Titulo</h1>
                <div className={styles.options}>
                    <input type="checkbox" name="" id="" />
                    <button>
                        <FiTrash /> </button>
                </div>
            </header>
            <div><p>Prioridade</p></div>
            <p>Prazo /00/00/00</p>
            <p>Descrição</p>

        </div>
    )
}
