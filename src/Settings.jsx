import React from "react";
import './App.css'
import {Link} from "react-router-dom";

function Settings() {


    return (
        <>
            <p className="read-the-docs">
                Это страничка с настройками <br/>

                <Link to={`/`}> Main </Link>
            </p>
        </>
    )
}

export default Settings;
