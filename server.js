const express = require('express');
 const app = express();
 app.use(express.json());

 let snippets = [];
 let nextId = 1;

 // Add a new snippet
 app.post('/snippet', (req, res) => {
   const { content, lang } = req.body;
   const newSnippet = { id: nextId++, content, lang };
   snippets.push(newSnippet);
   res.status(201).send(newSnippet);
 });

 // Get all snippets or filter by language
 app.get('/snippet', (req, res) => {
   if (req.query.lang) {
     const filteredSnippets = snippets.filter(snippet => snippet.lang === req.query.lang);
     res.send(filteredSnippets);
   } else {
     res.send(snippets);
   }
 });

 // Get a snippet by ID
 app.get('/snippet/:id', (req, res) => {
   const id = parseInt(req.params.id, 10);
   const snippet = snippets.find(s => s.id === id);
   if (snippet) {
     res.send(snippet);
   } else {
     res.status(404).send({ error: "Snippet not found" });
   }
 });

 app.listen(3000, () => {
   console.log('Server running on port 3000');
 });