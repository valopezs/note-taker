// require dependencies
const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
// create random ID
const uuid = require("uuid");
// DB class object
const DB = require("../db/DB");

// route to get notes
router.get("/api/notes", async function (req, res) {
    const notes = await DB.readNotes();
    return res.json(notes);
});

// route to add a new note and add it to the json file
router.post("/api/notes", async function (req, res) {
    const currentNotes = await DB.readNotes();
    let newNote = {
        id: uuidv4(),
        title: req.body.title,
        text: req.body.text,
    };

    await DB.addNote([...currentNotes, newNote]);

    return res.send(newNote);
});

// route to delete notes
router.delete("/api/notes/:id", async function (req, res) {
    // identifies the note to delete based on ID
    const noteToDelete = req.params.id;
    // notes currently in json file
    const currentNotes = await DB.readNotes();
    // sort through notes files and create a new array minus the note to be deleted
    const newNoteData = currentNotes.filter((note) => note.id !== noteToDelete);

    // send new array to the DB class
    await DB.deleteNote(newNoteData);

    return res.send(newNoteData);
});

module.exports = router;