import Priority from '../priority'
import styles from './page.module.css'
import { FiTrash } from 'react-icons/fi'

interface TaskProps {
    title: string
    description?: string
    priority?: 'low' | 'medium' | 'high' | 'finished'
    deadline?: Date
    onDelete?: () => void

}
export default function Task({ title, description, priority, deadline, onDelete }: TaskProps) {


    {
        return (
            <div className={styles.taskContainer}>
                <header>
                    <h3> {title}</h3>
                    <div className={styles.options}>
                        <input type="checkbox" name="" id="" />
                        <button>
                            <FiTrash /> </button>
                    </div>
                </header>
                <div className={styles.taskInfo}>
                    {priority && <Priority type={priority} />}
                    {deadline && <p>{deadline?.toLocaleDateString()}</p>}
                </div>
                {description && <p>{description}</p>}

            </div>
        )
    }
}
