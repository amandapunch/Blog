import path from 'path'
import express from 'express'

require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const { ExpressOIDC } = require('@okta/oidc-middleware');
const Sequelize = require('sequelize');
const epilogue = require('epilogue'), ForbiddenError = epilogue.Errors.ForbiddenError;
const port = process.env.PORT || 3000

const app = express(),
            DIST_DIR = __dirname,
            HTML_FILE = path.join(DIST_DIR, '/src/index.html')
app.use(express.static(DIST_DIR))
app.get('/', (req, res) => {
    res.sendFile(HTML_FILE)
})
// session support is required to use ExpressOIDC
app.use(session({
    secret: process.env.RANDOM_SECRET_WORD,
    resave: true,
    saveUninitialized: false
}));

const oidc = new ExpressOIDC({
    issuer: `${process.env.OKTA_ORG_URL}/oauth2/default`,
    client_id: process.env.OKTA_CLIENT_ID,
    client_secret: process.env.OKTA_CLIENT_SECRET,
    redirect_uri: process.env.REDIRECT_URL,
    scope: 'openid profile',
    routes: {
        callback: {
            path: '/authorization-code/callback',
            defaultRedirect: '/admin'
        }
    }
});

app.use(oidc.router);

app.use(cors());
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'src')));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './src/index.html'));
 });
 
 app.get('/admin', oidc.ensureAuthenticated(), (req, res) => {
    res.sendFile(path.join(__dirname, './src/index.html'));
 });

 app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, './src/index.html'));
 });

 app.get('/posts', (req, res) => {
    res.sendFile(path.join(__dirname, './src/index.html'));
 });

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/home');
});
app.get('/', (req, res) => {
  res.redirect('/home');
});

app.get('/posts', (req, res) => {
    res.redirect('/posts');
  });

app.get('/about', (req, res) => {
    res.redirect('/about');
  });

const database = new Sequelize({
    dialect: 'sqlite',
    storage: './db.sqlite',
    operatorsAliases: false,
});

const blogPost = database.define('blogposts', {
    title: Sequelize.STRING,
    content: Sequelize.TEXT,
    published: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
});

epilogue.initialize({ app, sequelize: database });

const blogPostResource = epilogue.resource({
    model: blogPost,
    endpoints: ['/blogposts', '/blogposts/:id'],
});

database.sync().then(() => {
    oidc.on('ready', () => {
        app.listen(port, () => console.log(`My Blog App listening on port ${port}!`))
    });
});

oidc.on('error', err => {
    // An error occurred while setting up OIDC
    console.log("oidc error: ", err);
});

