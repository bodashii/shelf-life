const express = require('express');
const routes = require('./controllers');

const path = require('path');
const session = require('express-session');
const exphbs = require('express-handlebars');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

const sequelize = require('./config/connection');
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

const helpers = require('./utils/helpers.js');

const hbs = exphbs.create({ helpers});

//handlebars
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');


//login
app.use(session(sess));
app.use(routes);

// turn on connection to db and server
// when 'true', DROP TABLE IF EXISTS happens, false will not 
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});