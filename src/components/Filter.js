/*
    THIS FILE WAS DEVELOPED BY MEHMET GUDUK
    © 2022 COPYRIGHT, LICENSED WITH GPL-3.0 LICENSE, AUTHOR IS MEHMET GUDUK
    https://github.com/mehmetguduk
*/

import React from 'react'
import { RiArrowDropDownLine } from "react-icons/ri";
import { FiFilter } from "react-icons/fi";

export default function Filter(props) {

    const [dropdownDISPLAY, setDROPDOWNdisplay] = React.useState("none")
    const [dropdownITEMS, setDROPDOWNitems] = React.useState(["Not Completed", "Completed"])

    function handleFILTERclick() {
        if (dropdownDISPLAY === "none") {
            setDROPDOWNdisplay("block")
        }
        else { setDROPDOWNdisplay("none") }
    }

    function handleFILTERselect(event) {
        let newFILTER = event.target.textContent
        setDROPDOWNitems(prevLIST => {
            prevLIST.push(props.filter)
            prevLIST.splice(prevLIST.indexOf(newFILTER), 1)
            prevLIST.sort()
            return prevLIST
        })
        props.setFILTER(newFILTER)
        setDROPDOWNdisplay("none")
    }

    return (
        <div className="filter-container">
            {
                (props.todoLIST.length > 0) &&
                <div>
                    <button className="filter-selected" onClick={handleFILTERclick}><span className="filter-icon"><FiFilter /></span>{props.filter}<span className="dropdown-icon"><RiArrowDropDownLine /></span></button>
                    <ul className="filter-list" style={{ display: dropdownDISPLAY }}>
                        {
                            dropdownITEMS.map((item) => {
                                if (item !== props.filter) {
                                    return (
                                        <li
                                            className="filter-item"
                                            key={item}
                                            onClick={handleFILTERselect}
                                        >
                                            {item}
                                        </li>
                                    )
                                }
                                return (null)
                            }
                            )
                        }
                    </ul>
                </div>
            }
        </div>
    )
}