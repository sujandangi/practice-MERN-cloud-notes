import { useState} from "react";
import NoteContext from "./noteContext";

export default NoteState = (props) => {

    const [notes, setNotes] = useState([])

    return(
        <NoteContext.Provider value={notes} >
            {props.children}
        </NoteContext.Provider>
    )
}