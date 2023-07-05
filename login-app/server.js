const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const crypto = require('crypto');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const users = require('./users.json');

app.use(express.static(__dirname));

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        const token = crypto.randomBytes(64).toString('hex');
        res.cookie('authToken', token, { httpOnly: true });
        res.redirect('/success.html');
    } else {
        res.redirect('/?error=true');
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
