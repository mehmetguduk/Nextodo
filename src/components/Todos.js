import React from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { TiTrash, TiEdit, TiTickOutline } from "react-icons/ti";
import { MdOutlineSettingsBackupRestore, MdDragHandle } from "react-icons/md";



export default function Todos(props) {


    function handleEDIT(event) {
        let targetID = event.target.closest("li.todo").id
        let item = props.todoLIST.filter((item) => item.id === targetID)[0]
        props.setINPUTvalue(item.text)
        handleDELETE(event)
    }

    function handleDELETE(event) {
        let list = props.todoLIST.filter((item) => item.id !== event.target.closest("li.todo").id)
        props.setTODOlist([...list]);
    }

    function handleCOMPLETE(event) {
        let targetID = event.target.closest("li.todo").id;
        let list = [];
        props.todoLIST.forEach((todo) => {
            if (todo.id === targetID) {
                list.push({
                    id: todo.id,
                    text: todo.text,
                    status: !(todo.status),
                    addedDATE: todo.addedDATE,
                    completedDATE: !(todo.status) ? props.getDATE() : ""
                })
            }
            else {
                list.push(todo)
            }
        })

        list.sort(function (a, b) {
            return (a.status - b.status)
        })
        props.setTODOlist([...list]);
    }

    function handleONdragEND(result) {
        if (!result.destination) return;
        const items = Array.from(props.todoLIST);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        props.setTODOlist([...items]);
    }

    function handleTODOclick(event) {
        event.target.closest("li.todo").classList.toggle("detailed")
    }

    return (
        <DragDropContext onDragEnd={handleONdragEND}>
            <Droppable droppableId="todos">
                {(provided) => {
                    props.setLISTEDtodoCOUNT(0)
                    return (
                        <ul className="todos" {...provided.droppableProps} ref={provided.innerRef}>
                            {props.todoLIST.map(({ id, text, status, addedDATE, completedDATE }, index) => {

                                let element = <Draggable key={id} draggableId={id} index={index}>
                                    {(provided) => (
                                        <li
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            className={status ? 'todo completed' : 'todo notcompleted'}
                                            id={id}
                                            onClick={handleTODOclick}
                                        >
                                            <div className='todo-content'>
                                                <div className='todo-drag-icon'><MdDragHandle /></div>
                                                <p className='todo-text'>{text}</p>
                                                <div className='todo-button-container'>
                                                    <button className='button complete' onClick={handleCOMPLETE}>
                                                        {status ? <MdOutlineSettingsBackupRestore /> : <TiTickOutline />}
                                                    </button>
                                                    <button className='button edit' onClick={handleEDIT}>
                                                        <TiEdit />
                                                    </button>
                                                    <button className='button delete' onClick={handleDELETE}>
                                                        <TiTrash />
                                                    </button>
                                                </div>
                                            </div>
                                            <p className='todo-date'>
                                                {addedDATE} ✍🏼
                                                <br />
                                                {completedDATE && `${completedDATE} 👍🏼`}
                                            </p>
                                        </li>
                                    )}
                                </Draggable>

                                if (props.filter === "All") {
                                    props.setLISTEDtodoCOUNT(prevCOUNT => { return (prevCOUNT + 1) })
                                    return (element)
                                }
                                else if (props.filter === "Completed" && status) {
                                    props.setLISTEDtodoCOUNT(prevCOUNT => { return (prevCOUNT + 1) })
                                    return (element)
                                }
                                else if (props.filter === "Not Completed" && !(status)) {
                                    props.setLISTEDtodoCOUNT(prevCOUNT => { return (prevCOUNT + 1) })
                                    return (element)
                                }
                                else { return (null) }
                            })}
                            {provided.placeholder}
                        </ul>)
                }}
            </Droppable>
        </DragDropContext>
    )
}