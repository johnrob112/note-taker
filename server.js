const express = require('express');

const app = express();

const fs = require("fs");
const path = require("path");

const { notes } = require('./db/db');
const PORT = process.env.port || 3001;


// Middleware for json, string/array, and static files 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// function to add new notes to db.json
function createNote(body, noteArray) {
    console.log(body);
    const note = body;
    notesArray.push(note);
    fs.writeFileSync(
      path.join(__dirname, "./db/db.json"),
      JSON.stringify({ notes: noteArray }, null, 2)
    );
  
    return note;
  }


// request to put new notes into the server
app.post("/api/notes", (req, res) => {
    console.log(req.body);
    req.body.id = notes.length.toString();
    const note = createNote(req.body, note);
    res.json(req.body);
  })


// request to delete a note
app.delete('/api/notes/:NoteId', (req, res) =>{
const noteId = req.params.NoteId;

const  dbNotes = fs.readFileSync("./db/db.json");
const { notes: notesInDb } = JSON.parse(dbNotes)
notesInDb.splice(noteId,1);

//stringify and re-write notes in db.json file
fs.writeFileSync("./db/db.json", JSON.stringify({ notes: notesInDb }));
})





app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
  });
  app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
  });

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
  });