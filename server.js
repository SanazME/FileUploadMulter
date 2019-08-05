/* =================================================== */
/* ===== Section 1: Require all the dependencies ===== */
/* =================================================== */

const express = require('express');
const hbs = require('hbs');
const multer = require('multer');
const upload = multer({ dest: './uploads/' });
const logger = require('morgan'); // an http request logger middleware

// Define port for app to listen on
const port = process.env.PORT || 3000;


/* ==================================================== */
/* ===== Section 2: Configure express middlewares ===== */
/* ==================================================== */

const app = express();
app.set('view engine', 'hbs'); //setting hbs as a view engine
app.use(express.static('__dirname' + '/public')); // making public as a statuc directory
app.set('views', __dirname + '/views'); //making ./views as the views directory
app.use(logger('dev')); // creating a logger using morgan
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


/* ==================================== */
/* ===== Section 3: Making Routes ===== */
/* ==================================== */

// GET / route for serving index.html file
app.get('/', (req, res) => {
    res.render('index.hbs');
})

// POST / upload for a single file upload
app.post('/upload', upload.single('myFile'), (req, res) => {
    if (req.file) {
        console.log('File uploading ...');
        var filename = req.file.filename;
        var uploadedStatus = 'File uploaded successfully';
        var fieldname = req.file.fieldname;
        var originalname = req.file.originalname;
        var path = req.file.path;

    } else {
        console.log('No file uploaded!');
        var filename = 'FILE NOT UPLOADED';
        var uploadedStatus = 'File UPload failed';
    }

    /* ===== Add the function to save filename to database ===== */
    res.render('index.hbs', {
        status: uploadedStatus,
        filename: filename,
        fieldname: fieldname,
        path: path,
        originalname: originalname
    });
})




// To make server alive
app.listen(port, () => {
    console.log(`App is live on port ${port}`);
})