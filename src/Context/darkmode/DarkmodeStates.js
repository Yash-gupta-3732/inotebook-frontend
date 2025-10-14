import { useState } from "react";
import DarkmodeContext from "./darkmodeContext";

const DarkmodeStates = (props) => {

    const [mode, setmode] = useState('light');
    const toggleMode = () => {
        if (mode === 'light') {
            setmode('dark');
            document.body.style.backgroundColor = 'black';
        }
        else {
            setmode('light')
            document.body.style.backgroundColor = 'white';
        }
    }
    return (
        <DarkmodeContext.Provider value={{ mode, setmode, toggleMode }}>
            {props.children}
        </DarkmodeContext.Provider>

    )
}

export default DarkmodeStates
