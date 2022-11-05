import { useState } from "react";

import styles from "./styles.module.css";

import { useAppContext } from "../../contexts/app";

import SearchIcon from "./searchIcon.svg";

type InputSearchPros = {
    onButtonClick: (value: string) => void;
}

const SearchInput = ({ onButtonClick }:InputSearchPros)=>{
    const [ focused, setFocused ] = useState(false);
    const [ valueInput, setValueInput ] = useState("");
    const { tenant } = useAppContext();

    const handleKeyUp = (e: React.KeyboardEvent <HTMLInputElement>) => {
        if(e.code === "Enter"){
            onButtonClick(valueInput);
        }
    }

    return(
        <div 
            style={{ borderColor: focused ? tenant?.mainColor : "#FFFFFF" }}
            className={styles.container}
        >
            <span 
                className={styles.button}
                onClick={()=> onButtonClick(valueInput)}
            >
                <SearchIcon color={tenant?.mainColor}/>
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