/*
    THIS FILE WAS DEVELOPED BY MEHMET GUDUK
    © 2022 COPYRIGHT, LICENSED WITH GPL-3.0 LICENSE, AUTHOR IS MEHMET GUDUK
    https://github.com/mehmetguduk
*/

import './styles/style.scss';
import './styles/form.scss';
import './styles/tools.scss';
import './styles/filter.scss';
import './styles/todos.scss';
import NewTodo from './components/NewTodo';
import Todos from './components/Todos';
import Tools from './components/Tools';
import Filter from './components/Filter';
import React from 'react';
import logo from './images/nextodo.png'
import { RiTodoLine } from "react-icons/ri";


function App() {
    const [todoLIST, setTODOlist] = React.useState(getLIST())
    const [inputVALUE, setINPUTvalue] = React.useState("")
    const [filter, setFILTER] = React.useState("All")
    const [listedTODOcount, setLISTEDtodoCOUNT] = React.useState(todoLIST.length)

    React.useEffect(() => {
        setLIST(todoLIST)
    }, [todoLIST])

    function getDATE() {
        let now = new Date()
        let hours;
        let minutes;
        let day;
        let month;
        let year = now.getFullYear()
        if (now.getHours() < 10) { hours = `0${now.getHours()}` } else { hours = `${now.getHours()}` }
        if (now.getMinutes() < 10) { minutes = `0${now.getMinutes()}` } else { minutes = `${now.getMinutes()}` }
        if (now.getDate() < 10) { day = `0${now.getDate()}` } else { day = `${now.getDate()}` }
        if ((now.getMonth() + 1) < 10) { month = `0${now.getMonth() + 1}` } else { month = `${now.getMonth() + 1}` }
        return `${hours}:${minutes} ${day}/${month}/${year}`
    }

    function getLIST() {
        if ("TODOLIST" in localStorage) {
            return JSON.parse(localStorage.getItem("TODOLIST"))
        }
        else {
            return []
        }
    }

    function setLIST(newLIST) {
        localStorage.setItem("TODOLIST", JSON.stringify(newLIST))
    }

    return (
        <div className={todoLIST.length > 0 ? "App" : "App intro"}>

            <div className='logo-container'>
                <img className='logo' src={logo} alt="Nextodo Logo" />
                <RiTodoLine className='task-icon' />
            </div>

            <NewTodo
                todoLIST={todoLIST}
                setTODOlist={setTODOlist}
                inputVALUE={inputVALUE}
                setINPUTvalue={setINPUTvalue}
                getDATE={getDATE}
            />
            <Tools
                todoLIST={todoLIST}
                setTODOlist={setTODOlist}
                filter={filter}
                setFILTER={setFILTER}
                listedTODOcount={listedTODOcount}

            />
            <Filter
                filter={filter}
                setFILTER={setFILTER}
                todoLIST={todoLIST}
            />
            <Todos
                todoLIST={todoLIST}
                setTODOlist={setTODOlist}
                inputVALUE={inputVALUE}
                setINPUTvalue={setINPUTvalue}
                filter={filter}
                setFILTER={setFILTER}
                listedTODOcount={listedTODOcount}
                setLISTEDtodoCOUNT={setLISTEDtodoCOUNT}
                getDATE={getDATE}
            />

            <footer className="copyright">
                <p className="copyright-text">
                    © 2022 Copyright <a className="copyright-link" href="https://github.com/mehmetguduk" target="_blank" rel="noopener noreferrer">Mehmet Güdük</a> All Rights Reserved
                </p>
            </footer>
        </div>
    );
}

export default App;
