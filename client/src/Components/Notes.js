import React, { useContext, useEffect, useRef, useState } from 'react'
import NoteContext from '../Context/Note/NoteContext'
import { toast } from 'react-toastify';
import {Link} from 'react-router-dom';

const Notes = () => {
    const ref = useRef(null)
    const closeRef = useRef(null)
    const context = useContext(NoteContext);
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [tag, setTag] = useState('')
    const [id, setID] = useState('')
    const { notes, setNotes, fetchallnotes, deletenote, editnote } = context;

    async function handleDelete(id) {
        const json = await deletenote(id)
        if (json.success) {
            const newNotes = notes.filter((note) => { return note._id !== id })
            setNotes(newNotes)
            toast.success('Note Deleted Successfully')
        } else {
            toast.error(json.errors);
        }
    }
    const handleEditClick = (note) => {
        setTitle(note.title)
        setDescription(note.description)
        setTag(note.tag)
        setID(note._id)
        ref.current.click()
    }
    useEffect(() => {
        fetchallnotes()
    }, []);
    return (
        <>
            <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal"></button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="container" >
                                <form className='my-4 mx-4'>
                                    <div className="mb-1">
                                        <label htmlFor="input1" className="form-label">Title</label>
                                        <input type="text" value={title} onChange={(e) => { setTitle(e.target.value) }} className="form-control" id="input1" name='title' />
                                    </div>
                                    <div className="mb-1">
                                        <label htmlFor="input2" className="form-label">Description</label>
                                        <input type="text" value={description} onChange={(e) => { setDescription(e.target.value) }} className="form-control" name='description' id="input2" />
                                    </div>
                                    <div className="mb-1">
                                        <label htmlFor="input2" className="form-label">Tag</label>
                                        <input type="text" value={tag} onChange={(e) => { setTag(e.target.value) }} className="form-control" id="input2" name='tag' />
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button ref={closeRef} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={() => { editnote(title, description, tag, id); closeRef.current.click() }}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container mt-4 justify-content-center">
                {Array.isArray(notes) && notes.length > 0 ? (
                    notes.map((note) => (
                        <div className="card mb-3" key={note._id}>
                            <div className="card-header">
                                {note.title}
                                <span className="float-end">
                                    <i className="fas fa-edit me-2 text-secondary" data-toggle="tooltip" data-placement="top" title="Edit Note" onClick={() => { handleEditClick(note) }}></i>
                                    <i className="fas fa-trash text-secondary" data-toggle="tooltip" data-placement="top" title="Delete Note" onClick={() => { handleDelete(note._id) }}></i>
                                </span>
                            </div>
                            <div className="card-body">
                                <p className="card-text">{note.description}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center">
                        <p>No notes found. Add a new note:</p>
                        <Link to='/addNote' className="btn btn-primary" role='button'>Add Note</Link>
                    </div>
                )}
            </div>
        </>
    )
}

export default Notes
