const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

const storage = multer.memoryStorage();
const upload = multer({ storage });

app.post('/bfhl', upload.single('file'), (req, res) => {
    const { data, file_b64 } = req.body;
    const user_id = "john_doe_17091999"; 
    const email = "john@xyz.com"; 
    const roll_number = "ABCD123"; 

    let numbers = [];
    let alphabets = [];
    let highest_lowercase_alphabet = [];
    let file_valid = false;
    let file_mime_type = null;
    let file_size_kb = null;

    data.forEach(item => {
        if (!isNaN(item)) {
            numbers.push(item);
        } else if (/^[a-zA-Z]$/.test(item)) {
            alphabets.push(item);
        }
    });

    const lowercaseAlphabets = alphabets.filter(char => char === char.toLowerCase());
    if (lowercaseAlphabets.length > 0) {
        const highest = lowercaseAlphabets.reduce((a, b) => a > b ? a : b);
        highest_lowercase_alphabet.push(highest);
    }

    if (file_b64) {
        const buffer = Buffer.from(file_b64, 'base64');
        file_size_kb = buffer.length / 1024;
        file_valid = true;
        file_mime_type = 'image/png';
    }

    res.json({
        is_success: true,
        user_id,
        email,
        roll_number,
        numbers,
        alphabets,
        highest_lowercase_alphabet,
        file_valid,
        file_mime_type,
        file_size_kb
    });
});

// GET Endpoint
app.get('/bfhl', (req, res) => {
    res.json({ operation_code: 1 });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
