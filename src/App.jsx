import React, {useState} from "react";
import './App.css'
import {Link} from "react-router-dom";

function App() {
    const [count, setCount] = useState(0)

    return (
        <>

            <p className="read-the-docs">
                это главная страничка
                <br/>
                <Link to="/registration">зарегистрироваться</Link>
                <br/>
                <Link to="/settings">настройки</Link>
            </p>
        </>
    )
}

export default App
