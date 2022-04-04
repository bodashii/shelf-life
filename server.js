const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// lets us use public folder for css and js files
app.use(express.static(path.join(__dirname, 'public')));

// need to npm i express-session
// npm i connect-session-sequelize
// Express session and connects to Sequelize database
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sess = {
    secret: 'Super secret secret',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

// handlebars
const exphbs = require('express-handlebars');
const hbs = exphbs.create({});

//handlebars
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(routes);
//login
app.use(session(sess));


// turn on connection to db and server
// when 'true', DROP TABLE IF EXISTS happens, false will not 
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});