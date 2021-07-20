const { Router } = require('express');
const router = Router();
const { renderNoteFrom, creatNewNote, renderNote, renderEditForm, updateNote, deleteNote, } = require('../controllers/notes.controller');
const { isAuthenticated } = require('../helpers/auth');
//add
router.get('/notes/add', isAuthenticated, renderNoteFrom);
router.post('/notes/new-note', isAuthenticated, creatNewNote);
// all note
router.get('/notes/all-note', isAuthenticated, renderNote);
// Edit Notes
router.get("/notes/edit/:id", isAuthenticated, renderEditForm);
router.put("/notes/edit-note/:id", isAuthenticated, updateNote);

// Delete Notes
router.delete("/notes/delete/:id", isAuthenticated, deleteNote);

module.exports = router;