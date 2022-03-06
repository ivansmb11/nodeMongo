const express = require('express');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const expressSessions = require('express-session');
const path = require('path');

// initializations
const app = express();
require('./database.js'); // TODO: No se conecta a la DB.

// settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs.engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

// middleware
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(expressSessions({
    secret: 'McLovin',
    resave: true,
    saveUninitialized: true
}))


// global variables

// routes
app.use(require('./routes/index'));
app.use(require('./routes/notes'));
app.use(require('./routes/users'));

// static files
app.use(express.static(path.join(__dirname, 'public')));


// server is listening
app.listen(app.get('port'), () => {
    console.log('listening on port', app.get('port'));
});