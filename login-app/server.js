const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const users = require('./users.json'); // Load the usernames and passwords from the JSON file

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/login.html');
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        res.redirect('/success');
    } else {
        res.redirect('/error');
    }
});

app.get('/success', (req, res) => {
    res.send('Login successful!');
});

app.get('/error', (req, res) => {
    res.send('Login failed. Incorrect username or password.');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
