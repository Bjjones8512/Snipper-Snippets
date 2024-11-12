const express = require('express');
const app = express();
app.use(express.json());

// Data store for snippets
let snippets = [];
let nextId = 1;

// Functional Requirement 1: Add a new snippet with POST
app.post('/snippet', (req, res) => {
  const { content, lang } = req.body;
  const newSnippet = { id: nextId++, content, lang };
  snippets.push(newSnippet);
  res.status(201).send(newSnippet);
});

// Functional Requirement 2: GET all snippets
app.get('/snippet', (req, res) => {
  if (req.query.lang) {
    // Bonus requirement: Filter by language
    const filteredSnippets = snippets.filter(snippet => snippet.lang === req.query.lang);
    res.send(filteredSnippets);
  } else {
    res.send(snippets);
  }
});

// Functional Requirement 3: GET a snippet by ID
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