const Note = require('../models/Note');
const { validationResult } = require('express-validator');

exports.fetchAllNotes = async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user._id });
        res.json({success: true,notes})
    } catch (error) {
        res.status(500).json({success: false,errors: 'Internal Server Error'});
    }
}

exports.addNotes = async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array()[0].msg });
        }
    
        const note = new Note({
            title, description, tag, user: req.user._id
        })
        const savedNote = await note.save()
        res.json({success: true, savedNote})
    } catch (error) {
        console.error(error.message);
        res.status(500).json({success: false, errors: 'Internal Server Error'});
    }
}

exports.updateNote = async (req, res) => {
    const { title, description, tag } = req.body;
    try {
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).json({success: false, errors: 'Not Found'})
        }

        if (note.user.toString() !== req.user._id) {
            return res.status(401).json({success: false, errors: 'Not Allowed'})
        }
        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({success: true, note });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({success: false,errors: 'Internal Server Error'});
    }
}

exports.deleteNote = async (req, res) => {
    try {
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).json({success: false, errors: 'Not Found'})
    }
        if (note.user.toString() !== req.user._id) {
            return res.status(401).json({success: false, errors: 'Not Allowed'})
        }

        note = await Note.findByIdAndDelete(req.params.id)
        res.json({ success: true,note });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({success: false,errors: 'Internal Server Error'});
    }
}