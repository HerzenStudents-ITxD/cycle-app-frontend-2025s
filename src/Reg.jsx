import React from "react";
import './App.css'
import {Link} from "react-router-dom";

function Reg() {


    return (
        <>
            <p className="read-the-docs">
                Registration page <br/>

                <Link to={`/`}> Main </Link>
            </p>
        </>
    )
}

export default Reg
