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
app.get('*', (req, res) => {
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

// ExpressOIDC will attach handlers for the /login and /authorization-code/callback routes
app.use(oidc.router);

app.use(cors());
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'src')));
app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, './home.html'));
 });
 
 app.get('/admin', oidc.ensureAuthenticated(), (req, res) => {
    res.sendFile(path.join(__dirname, './admin.html'));
 });

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/home');
});
console.log("redirect");
app.get('/', (req, res) => {
  res.redirect('/home');
});

// //for each blog post
app.get('/lifestyle/:title', function (req, res) {
    res.send('Blogpost template here!')
  })

const database = new Sequelize({
    dialect: 'sqlite',
    storage: './db.sqlite',
    operatorsAliases: false,
});

const Post = database.define('posts', {
    title: Sequelize.STRING,
    content: Sequelize.TEXT,
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

const test = database.define('test', {
    title: Sequelize.STRING,
    content: Sequelize.TEXT,
});

epilogue.initialize({ app, sequelize: database });

const PostResource = epilogue.resource({
    model: Post,
    endpoints: ['/posts', '/posts/:id'],
});

const blogPostResource = epilogue.resource({
    model: blogPost,
    endpoints: ['/blogposts', '/blogposts/:id'],
});


PostResource.all.auth(function (req, res, context) {
    return new Promise(function (resolve, reject) {
        // if (!req.isAuthenticated()) {
        //     res.status(401).send({ message: "Unauthorized" });
        //     resolve(context.stop);
        // } else {
            resolve(context.continue);
        // }
    })
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

