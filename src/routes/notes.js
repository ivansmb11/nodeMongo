const express = require('express');
const router = express.Router();

const Note = require('../models/Notes');

router.get('/notes/add',(req, res) => {
    res.render('notes/new-note');
});

router.post('/notes/new-note',async (req, res) => {
    const { title, description } = req.body;
    const errors = [];
    if(!title) {
        errors.push({text: 'title is required'});
    }
    if(!description) {
        errors.push({text: 'description is required'});
    }
    if(errors.length > 0) {
        res.render('notes/new-note', {
            errors,
            title,
            description
        });
    } else {
        const newNote = new Note({ title, description });
        await newNote.save();
        res.redirect('/notes');
    }
});

router.get('/notes', async (req, res) => {
    
    const notes = await Note.find().sort({date: 'desc'}).lean();
    res.render('notes/all-notes', { notes });

});

router.get('/notes/edit/:id', async (req, res) => {
    const note = await Note.findById(req.params.id).lean();
    res.render('/notes/edit-note.hbs', { note });
}); //TODO: no crea la vista edit

module.exports = router;