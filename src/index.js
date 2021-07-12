const express = require('express');
const morgan = require('morgan');
const path = require('path');
const { mongoose } = require('./database');
const app = express();

// Settings
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api/tasks' , require('./routes/task.routes'));

// Static Files
app.use(express.static(path.join(__dirname, 'public')));


// Starting Server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
})