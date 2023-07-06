const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

const users = require('./users.json');

const SECRET_KEY = process.env.JWT_SECRET || 'your_secret_key';

app.use(express.static(__dirname + '/public'));

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        const token = jwt.sign({ username: user.username }, SECRET_KEY, { expiresIn: '1m' });
        res.cookie('authToken', token, { httpOnly: true });
        res.redirect('/success');
    } else {
        res.redirect('/?error=true');
    }
});

function verifyToken(req, res, next) {
    const token = req.cookies.authToken;

    if (!token) {
        return res.redirect('/');
    }

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.redirect('/');
        }
        req.decoded = decoded;
        next();
    });
}

app.get('/success', verifyToken, (req, res) => {
    res.sendFile(__dirname + '/private/success.html');
});

app.get('/another-protected-route', verifyToken, (req, res) => {
    res.send('Access granted to another protected route');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
