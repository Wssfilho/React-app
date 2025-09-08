'use client'
import Button from "@/app/components/Button";
import styles from './page.module.css'
import React, { FormEvent, useEffect, useState } from "react";
import Task from "@/app/components/task";
import Priority from "@/app/components/priority";
import PrivateRoute from "@/app/components/PrivateRoute";
import axios from "axios";
import { api } from "@/app/(public)/global";
import { useRouter } from "next/navigation";
// import removido: token não é usado aqui

interface Task {
    id: number;
    titulo: string;
    desc?: string;
    prioridade?: 'low' | 'medium' | 'high' | 'finished' | null;
    data_vencimento?: Date | null;
}

type PriorityType = 'low' | 'medium' | 'high' | 'finished' | null;



export default function Tasks() {

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [tasks, setTasks] = useState([] as Task[]);
    const [tasksInfo, setTasksInfo] = useState<Task[]>([]);
    const [newTask, setNewTask] = useState({
        titulo: '',
        desc: '',
        prioridade: null,
        data_vencimento: null
    } as Task);
    const router = useRouter();

    const mapPriorityToInt = (p: PriorityType): number => {
        switch (p) {
            case 'low':
                return 1;
            case 'medium':
                return 2;
            case 'high':
                return 3;
            default:
                return 0;
        }
    };
    type TaskPropPriority = 'low' | 'medium' | 'high' | 'finished' | undefined;
    const mapIntToPriority = (i: number): TaskPropPriority => {
        switch (i) {
            case 1:
                return 'low';
            case 2:
                return 'medium';
            case 3:
                return 'high';
            default:
                return undefined;
        }
    }

    useEffect(() => {
        const buscarTasks = async () => {
            try {
                const resposta = await axios.get(api + "tarefa/", {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                });
                console.log("dados da categorias: " + resposta.data.Tarefa);
                setTasksInfo(resposta.data.Tarefa);
            } catch (erro) {
                console.error("Erro ao buscar categorias:", erro);
            } finally {

            }
        }
        buscarTasks();

    }, []);




    const formatDate = (d: Date | null | undefined) => {
        return d ? d.toISOString().slice(0, 10) : null; // YYYY-MM-DD
    };

    async function handleAddNewEvent(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        // Validação simples
        try {
            const payload = {
                titulo: newTask.titulo,
                descricao: newTask.desc || '',
                data_vencimento: formatDate(newTask.data_vencimento), // YYYY-MM-DD
                prioridade: mapPriorityToInt(newTask.prioridade ?? null), // inteiro (0-3)
                status: 1,
            };

            await axios.post(
                `${api}tarefa/`,
                payload,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            );

            router.push('/tasks');
            setModalIsOpen(false);
            alert('Tarefa adicionada com sucesso!');
        } catch (error) {
            console.error(error);
            alert('Erro ao enviar a tarefa.');
        }
    }
    function handleDeleteTask(id: number) {
        setTasks(tasks.filter((task) => task.id !== id));
    }

    return (
        <PrivateRoute>
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
                            onSubmit={(e) => handleAddNewEvent(e)}
                            className={styles.form}

                        >
                            <input type="text"
                                placeholder="Título da Tarefa"
                                onChange={(e) => setNewTask({ ...newTask, titulo: e.target.value })}
                            />
                            <div>
                                <select
                                    value={newTask.prioridade || 'no'}
                                    onChange={(e) => setNewTask({ ...newTask, prioridade: (e.target.value === 'no' ? null : e.target.value) as PriorityType })}
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

                                    onChange={(e) => setNewTask({ ...newTask, data_vencimento: e.target.value ? new Date(e.target.value) : null })}
                                />
                            </div>
                            <textarea
                                onChange={(e) => setNewTask({ ...newTask, desc: e.target.value })}
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
                    {tasksInfo && tasksInfo.length > 0 ? (
                        tasksInfo.map((task) => {
                            return (
                                <Task
                                    key={task.id}
                                    title={task.titulo}
                                    priority={mapIntToPriority(Number(task.prioridade ?? 0))}
                                    {...(task.data_vencimento && { deadline: task.data_vencimento })}
                                    description={task.desc ?? undefined}
                                    onDelete={() => handleDeleteTask(task.id)}
                                />
                            );
                        })
                    ) : (
                        <p>Não há tarefas para exibir</p>
                    )}
                </main>
            </div>
        </PrivateRoute>

    )
}
