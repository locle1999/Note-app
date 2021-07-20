const notesCtrl = {};
const Note = require('../models/Note')
const User = require('../models/User')
notesCtrl.renderNoteFrom = (req, res) => {
    res.render('notes/new-note');
}
notesCtrl.creatNewNote = async(req, res) => {
    const { title, description } = req.body;
    const errors = [];
    if (!title) {
        errors.push({ text: "Please Write a Title." });
    }
    if (!description) {
        errors.push({ text: "Please Write a Description" });
    }
    if (errors.length > 0) {
        res.render("notes/new-note", {
            errors,
            title,
            description,
        });
    } else {
        const newNote = new Note({ title, description });
        newNote.user = req.user.id;
        await newNote.save();
        console.log(req.body);
        req.flash("success_msg", "Note Added Successfully");
        res.redirect("/notes/all-note");
    }
};
notesCtrl.renderNote = async(req, res) => {
    const notes = await Note.find({ user: req.user.id }).sort({ date: "desc" }).lean();

    res.render("notes/all-notes", { notes });
}
notesCtrl.renderEditForm = async(req, res) => {
    const note = await Note.findById(req.params.id).lean();
    if (note.user != req.user.id) {
        req.flash("error_msg", "Not Authorized");
        return res.redirect("/notes");
    }
    res.render("notes/edit-note", { note });
}
notesCtrl.updateNote = async(req, res) => {
    const { title, description } = req.body;
    await Note.findByIdAndUpdate(req.params.id, { title, description });
    req.flash("success_msg", "Note Updated Successfully");
    res.redirect("/notes/all-note");
}
notesCtrl.deleteNote = async(req, res) => {
    await Note.findByIdAndDelete(req.params.id);
    req.flash("success_msg", "Note Deleted Successfully");
    res.redirect("/notes/all-note");
}
module.exports = notesCtrl;