import React, { useContext, useState } from 'react'
import NoteContext from '../Context/Note/NoteContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Home = () => {
    const navigate = useNavigate()
    const [title,setTitle] = useState('')
    const [description,setDescription] = useState('')
    const [tag,setTag] = useState('')
    const {addnote,notes,setNotes} = useContext(NoteContext)
    async function handleSubmit (e){
        e.preventDefault();
        const json = await addnote(title,description,tag)
        if (json.success) {
            setNotes(notes.concat(json.savedNote))
            navigate('/')
            toast.success('Successfully Added Note')
        } else{
            toast.warn(json.errors)
        }
    }
    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center'}}>
                <div className="container mt-4 my-3 mx-3 border border-4 rounded-4" style={{ width: '400px' }}>
                    <h3 className='text-center mt-3 fw-bold'>Add Note</h3>
                    <form className='my-4 mx-4' onSubmit={handleSubmit}>
                        <div className="mb-1">
                            <label htmlFor="input1" className="form-label">Title</label>
                            <input type="text" value={title} onChange={(e)=>{setTitle(e.target.value)}} className="form-control" id="input1" name='title' />
                        </div>
                        <div className="mb-1">
                            <label htmlFor="input2" className="form-label">Description</label>
                            <input type="text" value={description} onChange={(e)=>{setDescription(e.target.value)}}  className="form-control" name='description' id="input2" />
                        </div>
                        <div className="mb-1">
                            <label htmlFor="input2" className="form-label">Tag</label>
                            <input type="text" value={tag} onChange={(e)=>{setTag(e.target.value)}}  className="form-control" id="input2" name='tag' />
                        </div>
                        <button type="submit" className="btn btn-primary mt-3" >Submit</button>
                    </form>
                </div>
                </div>
        </>
    )
}

export default Home
