'use client'
import Button from "@/app/components/Button";
import styles from './page.module.css'
import React, { useState } from "react";
import Task from "@/app/components/task";
export default function Tasks() {

    const [modalIsOpen, setModalIsOpen] = useState(false);
    


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

                        <form className={styles.form}>
                            <input type="text" placeholder="Título da Tarefa" />
                            <div>
                                <select name="priority" id="priority">
                                    <option value="">Sem Prioridade</option>
                                    <option value="baixa">Baixa Prioridade</option>
                                    <option value="media">Média Prioridade</option>
                                    <option value="alta">Alta Prioridade</option>
                                </select>
                                <input type="date" name="" id="" />
                            </div>
                            <textarea name="" id="" cols={30} rows={10} placeholder="Descrição da Tarefa"></textarea>
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
                    <Task title="Tarefa 1" description="Descrição da Tarefa 1" priority="high" deadline={new Date()} />
                    <Task title="Tarefa 2" description="Descrição da Tarefa 2" priority="medium" deadline={new Date()} />
                </main>
            </div>
        </>

    )
}
