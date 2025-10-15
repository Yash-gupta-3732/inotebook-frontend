import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
    const initialnotes = []
    const [notes, setNotes] = useState(initialnotes)
    const host = 'https://inotebook-backend-eta.vercel.app';

    //GET all notes
    const getNote = async () => {
        // API CALLS
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },

        });
        const json = await response.json();
        setNotes(json);

    }

    // Add a note
    const addNote = async (title, description, tag) => {
        // API CALLS
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token")
            },
            body: JSON.stringify({ title, description, tag }),

        });

        //logic TO ADD IN CLIENT
        const note = await response.json();
        setNotes(notes.concat(note));

    }

    // Delete a note    
    const deleteNote = async (id) => {
        //to do api call// API CALLS
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token")
            },

        });
        // eslint-disable-next-line
        const json = await response.json();

        //logic TO DELETE IN CLIENT

        const newNotes = notes.filter((note) => { return note._id !== id });
        setNotes(newNotes);
    }

    // Edit a note
    const editNote = async (id, title, description, tag) => {
        // API CALLS
        // eslint-disable-next-line
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token")
            },
            body: JSON.stringify({ title, description, tag }),

        });


        //logic TO EDIT IN CLIENT
        setNotes(notes.map(note =>
            note._id === id
                ? { ...note, title, description, tag }
                : note
        ));

    }
    const handleShare = async (noteId) => {
        const email = prompt("Enter the email of the user to share with:");
        if (!email) return;

        const response = await fetch(`${host}/api/notes/share/${noteId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token"),
            },
            body: JSON.stringify({ email }),
        });
        if (!response.ok) {
            const text = await response.text();
            console.error("Error response:", text);
            alert("Failed to share note.");
            return;
        }

        const json = await response.json();
        alert(json.message);
    };

    return (
        <NoteContext.Provider value={{ notes, setNotes, addNote, deleteNote, editNote, getNote, handleShare }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;
