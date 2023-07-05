const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

const users = require('./users.json');

app.use(express.static(__dirname));

const SECRET_KEY = process.env.JWT_SECRET || 'your_secret_key'; // Use an environment variable or fallback to a default

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        // Generate a JWT token
        const token = jwt.sign({ username: user.username }, SECRET_KEY, { expiresIn: '5m' });

        // Set the token as a cookie
        res.cookie('authToken', token, { httpOnly: true });
        res.redirect('/success.html');
    } else {
        res.redirect('/?error=true');
    }
});

app.get('/verify', (req, res) => {
    const token = req.cookies.authToken;

    // Verify the token
    if (token) {
        jwt.verify(token, SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.json({ success: false, message: 'Token is not valid' });
            } else {
                return res.json({ success: true, message: 'Token is valid', data: decoded });
            }
        });
    } else {
        return res.json({ success: false, message: 'Auth token is not supplied' });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
