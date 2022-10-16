import { useState } from "react";
import styles from "./styles.module.css";

type InputSearchPros = {
    mainColor: string;
    onButtonClick: (value: string) => void;
}

const SearchInput = ({ mainColor, onButtonClick }:InputSearchPros)=>{
    const [ focused, setFocused ] = useState(false);
    const [ valueInput, setValueInput ] = useState("");

    const handleKeyUp = (e: React.KeyboardEvent <HTMLInputElement>) => {
        if(e.code === "Enter"){
            onButtonClick(valueInput);
        }
    }

    return(
        <div 
            style={{ borderColor: focused ? mainColor : "#FFFFFF" }}
            className={styles.container}
        >
            <span 
                className={styles.button}
                onClick={()=> onButtonClick(valueInput)}
            >

            </span>
            <input 
                type="text" 
                className={styles.input}
                placeholder="Digite o nome do produto"
                value={valueInput}
                onChange={e => setValueInput(e.target.value)}
                onFocus={()=>setFocused(true)}
                onBlur={()=>setFocused(false)}
                onKeyUp={handleKeyUp}
            />
        </div>
    );
}

export default SearchInput;