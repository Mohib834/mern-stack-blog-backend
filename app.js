const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const port = process.env.PORT || 3000;

// DB
require('./mongoose/db.js');

// Routes
const blogRoutes = require('./routes/blog.js');
const userRoutes = require('./routes/users.js');

const cors = require('cors')
const app = express();

app.use(cors({
    origin: 'https://mohib-blog.herokuapp.com',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS']
}))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/blog', blogRoutes);
app.use('/', userRoutes);

app.listen(port, () => console.log('Server Started'))
