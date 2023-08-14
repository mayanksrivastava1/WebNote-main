import React, { useState } from 'react'
import NoteContext from './NoteContext'
import { toast } from 'react-toastify'

const NoteState = (props) => {
    const host = 'http://localhost:5000'
    const [notes, setNotes] = useState([])

    // Fetch Notes

    async function fetchallnotes() {
        const response = await fetch(`${host}/api/auth/fetchallnotes`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
        });
        const json = await response.json();
        if (json.success) {
            setNotes(json.notes);
        } else {
            toast.error('Error fetching notes');
        }
    }


    async function addnote(title, description, tag) {
        const response = await fetch(`${host}/api/auth/addnote`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag }),
        });
        const json = await response.json();
        return json
    }



    async function deletenote(id) {
        const response = await fetch(`${host}/api/auth/deleteNote/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
        });
        const json = response.json();
        return json
    }

    async function editnote(title, description, tag, id) {
        const response = await fetch(`${host}/api/auth/updateNote/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag }),
        });
        const json = await response.json();
        if (json.success) 
        {
        let newNotes = JSON.parse(JSON.stringify(notes))
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
        }
        setNotes(newNotes);
        toast.success('Note Updated Successfully')
    }else{
        toast.error(json.errors)
    }
    }
    return (
        <NoteContext.Provider value={{ notes, setNotes, fetchallnotes, addnote, deletenote, editnote }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState
