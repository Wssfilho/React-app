'use client'
import Button from "@/app/components/Button";
import styles from './page.module.css'
import React, { FormEvent, useState } from "react";
import Task from "@/app/components/task";
import Priority from "@/app/components/priority";

interface Task {
    id: number;
    title: string;
    description?: string;
    priority?: 'low' | 'medium' | 'high' | 'finished' | null;
    deadline?: Date | null;
}

type PriorityType = 'low' | 'medium' | 'high' | 'finished' | null;



export default function Tasks() {

    const [idCounter, setIdCounter] = useState(0);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [tasks, setTasks] = useState([] as Task[]);
    const [newTask, setNewTask] = useState({
        title: '',
        description: '',
        priority: null,
        deadline: null
    } as Task);
    function handleAddNewEvent(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        setTasks([...tasks, { ...newTask, id: idCounter }]);
        setIdCounter(idCounter + 1);
        setNewTask({
            id: idCounter,
            title: '',
            description: '',
            priority: null,
            deadline: null


        })
        setTasks([...tasks, newTask]);
        setModalIsOpen(false);
    }
    function handleDeleteTask(id: number) {
        setTasks(tasks.filter((task) => task.id !== id));
    }

    return (
        <>
            {modalIsOpen && (

                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <header>
                            <h2>
                                Adicionar Tarefa
                            </h2>
                            <Button
                                size='sm'
                                variant='primary'
                                onClick={() => setModalIsOpen(false)}
                            >
                                X
                            </Button>
                        </header>

                        <form
                            onSubmit={(e) =>handleAddNewEvent(e)}
                            className={styles.form}

                        >
                            <input type="text"
                                placeholder="Título da Tarefa"
                                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                            />
                            <div>
                                <select
                                    value={newTask.priority || 'no'}
                                    onChange={(e) => setNewTask({ ...newTask, priority: (e.target.value === 'no' ? null : e.target.value) as PriorityType })}
                                >
                                    <option value="no">Sem Prioridade</option>
                                    <option value="low">
                                        <Priority type="low" />
                                    </option>
                                    <option value="medium">
                                        <Priority type="medium" />
                                    </option>
                                    <option value="high">
                                        <Priority type="high" />
                                    </option>
                                </select>
                                <input type="date"

                                    onChange={(e) => setNewTask({ ...newTask, deadline: e.target.value ? new Date(e.target.value) : null })}
                                />
                            </div>
                            <textarea
                                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                                placeholder="Descrição da Tarefa" />
                            <Button
                                size='lg'
                                variant='primary'
                            >
                                Adicionar
                            </Button>
                        </form>
                    </div>
                </div>

            )}
            <div className={styles.container}>
                <p>Bem Vindo</p>

                <header className={styles.header}>
                    <h1>
                        Tarefas
                    </h1>
                    <Button
                        onClick={() => setModalIsOpen(true)}
                        size='md'
                        variant='secondary'
                        type='button'>
                        Adicionar Tarefa
                    </Button>
                </header>
                <main className={styles.main}>
                    {tasks.map((task) => {
                        return (
                            <Task
                                key={task.id}
                                title={task.title}
                                description={task.description}
                                {...task.priority && { priority: task.priority }}
                                {...task.deadline && { deadline: task.deadline }}
                                onDelete={() => handleDeleteTask(task.id)}
                            />
                        );
                    })}
                </main>
            </div>
        </>

    )
}
