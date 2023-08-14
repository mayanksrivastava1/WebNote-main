const express = require('express');
const router = express.Router();
const userFetch = require('../middlewares/userFetch');
const notesController = require('../controllers/notesController'); 
const { check } = require('express-validator');

router.get('/fetchallnotes', userFetch,notesController.fetchAllNotes)

router.post('/addnote', userFetch, [
    check('title', 'Enter a valid title').isLength({ min: 3 }),
    check('description', 'Description must be atleast 5 characters').isLength({ min: 5 }),], 
    notesController.addNotes
    )

router.put('/updatenote/:id', userFetch, notesController.updateNote)

router.delete('/deletenote/:id', userFetch, notesController.deleteNote)
    

module.exports = router