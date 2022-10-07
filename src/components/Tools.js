import React from "react";
import { MdOutlineDeleteSweep, MdOutlineClose } from "react-icons/md";


export default function Tools(props) {
    const [clearALLtoggle, setCLEARallTOGGLE] = React.useState(false)

    function handleYES(event) {
        setCLEARallTOGGLE(false)
        props.setTODOlist([])
        event.preventDefault();
    }

    function handleCANCEL(event) {
        setCLEARallTOGGLE(false)
        event.preventDefault();
    }

    function handleCLEARall(event) {
        if (props.todoLIST.length > 0) {
            setCLEARallTOGGLE(true)
        }
        event.preventDefault();
    }

    function clearALL() {
        if (props.todoLIST.length > 0 & !(clearALLtoggle)) {
            return (<button className="button clear-all" onClick={handleCLEARall}>
                Clear All<span className="clear-icon"><MdOutlineDeleteSweep /></span></button>)
        }
    }

    return (
        <div className="tools-container">
            <div className="clear-all-container">
                {clearALLtoggle &&
                    <div className="clear-all-certain">
                        <p className="clear-all-question">Do you really want to clear all todos? <span role='img' aria-label="trashcan">🗑️</span></p>
                        <div className="certain-buttons">
                            <button className="button yes" onClick={handleYES}><MdOutlineDeleteSweep /></button>
                            <button className="button cancel" onClick={handleCANCEL}><MdOutlineClose /></button>
                        </div>
                    </div>
                }
                {clearALL()}
            </div >
            {(props.todoLIST.length > 0) &&
                <div className="todo-counter-container">
                    <p className="counter">{props.listedTODOcount} todo{props.listedTODOcount > 1 && "s"} {props.filter !== "All" && props.filter.toLowerCase()}{props.filter === "All" && "listed"}
                    </p>
                </div>
            }
        </div >
    )
}
