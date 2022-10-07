import React from "react";
import { nanoid } from 'nanoid'
import { TiTickOutline } from "react-icons/ti";

export default function NewTodo(props) {

    function handleCHANGE(event) {
        props.setINPUTvalue(event.target.value)
    }

    function handleSUBMIT(event) {
        event.preventDefault()

        let list = props.todoLIST
        let newVALUE = event.target.text.value

        if (!newVALUE || /^\s*$/.test(newVALUE)) {
            props.setINPUTvalue('')
            return
        }
        else {
            list.splice(0, 0, {
                id: nanoid(),
                text: newVALUE,
                status: false,
                addedDATE: props.getDATE(),
                completedDATE: ""
            })

            props.setTODOlist([...list]);
            props.setINPUTvalue('')
            return
        }
    }

    return (
        <form
            className="new-todo"
            onSubmit={handleSUBMIT}
        >
            <input
                className="new-todo-text"
                type="text"
                placeholder="✒️ Add a new to do"
                value={props.inputVALUE}
                name="text"
                onChange={handleCHANGE}
                autoComplete="off"

            />
            <button
                className="button new"
                type="submit"
            >
                <TiTickOutline />
            </button>
        </form>
    )
}