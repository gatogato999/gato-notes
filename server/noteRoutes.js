/*
 * TODO: define '/api/notes/ ', endpoints
 */
const router = require("express").Router();
const db = require("./db");

// TODO:   create note
router.post("/notes", (req, res) => {
  const { title, content } = req.body;
  const createNote = db.prepare(`
    INSERT INTO notes (title, content) VALUES (? , ?);
    `);
  const info = createNote.run(title, content);
  res.status(201).send({
    id: info.lastInsertRowid,
    title,
    content,
  });
});

//  TODO: read all  notes
router.get("/notes", (req, res) => {
  const getAllNotes = db.prepare(`
    SELECT * FROM notes; 
    `);
  const allNotes = getAllNotes.all();
  res.status(200).send(allNotes);
});

//  TODO: get a note
router.get("/notes/:id", (req, res) => {
  const getANote = db.prepare(`
    SELECT * FROM notes WHERE id = ? ; 
    `);
  const note = getANote.get(req.params.id);
  if (note) {
    res.status(200).send(note);
  } else {
    res.status(404).send({ error: "no note found" });
  }
});

//  TODO: update a note
router.put("/notes/:id", (req, res) => {
  const { title, content } = req.body;
  const updateNote = db.prepare(`
    UPDATE notes SET title = ? , content = ? WHERE id = ?;
    `);
  const info = updateNote.run(title, content, req.params.id);
  if (info.changes === 1) {
    res.status(200).send({ message: "note updated" });
  } else {
    res.status(404).send({ error: "note not updated" });
  }
});

//  TODO: delete a note
router.delete("/notes/:id", (req, res) => {
  const deleteNote = db.prepare(`
    DELETE FROM notes WHERE id = ?
    `);
  const info = deleteNote.run(req.params.id);
  if (info.changes === 1) {
    res.status(200).send({ message: "note deleted" });
  } else {
    res.status(404).send({ error: "not deleted" });
  }
});

module.exports = router;
