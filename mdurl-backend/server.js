const express = require('express');
const multer = require('multer');
const cors = require('cors');

const app = express();
app.use(cors()); // Enables CORS for your frontend

// Port number
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '.md');
  }
});

const upload = multer({ 
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'text/markdown' || file.mimetype === 'text/plain') {
      cb(null, true);
    } else {
      cb(new Error('Only .md files are allowed!'), false);
    }
  },
  limits: {
    fileSize: 5242880,
  }
});

app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  // Generate a unique identifier for the file (e.g., the filename)
  const fileId = req.file.filename;

  // Respond with the unique identifier
  res.json({ url: fileId });
}, (error, req, res, next) => {
  if (error) {
    res.status(400).send(error.message);
  }
});

app.get('/markdown/:fileId', (req, res) => {
  const fileId = req.params.fileId;
  res.sendFile(__dirname + '/uploads/' + fileId);
});


