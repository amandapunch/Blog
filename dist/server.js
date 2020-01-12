/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/server/server.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/server/server.js":
/*!******************************!*\
  !*** ./src/server/server.js ***!
  \******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_1__);\n\n\n\n__webpack_require__(/*! dotenv */ \"dotenv\").config();\n\nvar cors = __webpack_require__(/*! cors */ \"cors\");\n\nvar bodyParser = __webpack_require__(/*! body-parser */ \"body-parser\");\n\nvar session = __webpack_require__(/*! express-session */ \"express-session\");\n\nvar _require = __webpack_require__(/*! @okta/oidc-middleware */ \"@okta/oidc-middleware\"),\n    ExpressOIDC = _require.ExpressOIDC;\n\nvar Sequelize = __webpack_require__(/*! sequelize */ \"sequelize\");\n\nvar epilogue = __webpack_require__(/*! epilogue */ \"epilogue\"),\n    ForbiddenError = epilogue.Errors.ForbiddenError;\n\nvar port = process.env.PORT || 3000;\nvar app = express__WEBPACK_IMPORTED_MODULE_1___default()(),\n    DIST_DIR = __dirname,\n    HTML_FILE = path__WEBPACK_IMPORTED_MODULE_0___default.a.join(DIST_DIR, '/src/index.html');\napp.use(express__WEBPACK_IMPORTED_MODULE_1___default.a[\"static\"](DIST_DIR));\napp.get('/', function (req, res) {\n  res.sendFile(HTML_FILE);\n}); // session support is required to use ExpressOIDC\n\napp.use(session({\n  secret: process.env.RANDOM_SECRET_WORD,\n  resave: true,\n  saveUninitialized: false\n}));\nvar oidc = new ExpressOIDC({\n  issuer: \"\".concat(process.env.OKTA_ORG_URL, \"/oauth2/default\"),\n  client_id: process.env.OKTA_CLIENT_ID,\n  client_secret: process.env.OKTA_CLIENT_SECRET,\n  redirect_uri: process.env.REDIRECT_URL,\n  scope: 'openid profile',\n  routes: {\n    callback: {\n      path: '/authorization-code/callback',\n      defaultRedirect: '/admin'\n    }\n  }\n}); // ExpressOIDC will attach handlers for the /login and /authorization-code/callback routes\n\napp.use(oidc.router);\napp.use(cors());\napp.use(bodyParser.json());\napp.use(express__WEBPACK_IMPORTED_MODULE_1___default.a[\"static\"](path__WEBPACK_IMPORTED_MODULE_0___default.a.join(__dirname, 'src')));\napp.get('/', function (req, res) {\n  res.sendFile(path__WEBPACK_IMPORTED_MODULE_0___default.a.join(__dirname, './src/index.html'));\n});\napp.get('/admin', oidc.ensureAuthenticated(), function (req, res) {\n  res.sendFile(path__WEBPACK_IMPORTED_MODULE_0___default.a.join(__dirname, './src/index.html'));\n});\napp.get('/about', function (req, res) {\n  res.sendFile(path__WEBPACK_IMPORTED_MODULE_0___default.a.join(__dirname, './src/index.html'));\n});\napp.get('/posts', function (req, res) {\n  res.sendFile(path__WEBPACK_IMPORTED_MODULE_0___default.a.join(__dirname, './src/index.html'));\n});\napp.get('/logout', function (req, res) {\n  req.logout();\n  res.redirect('/home');\n});\nconsole.log(\"redirect\");\napp.get('/', function (req, res) {\n  res.redirect('/home');\n});\napp.get('/about', function (req, res) {\n  res.redirect('/about');\n}); // //for each blog post\n\napp.get('/lifestyle/:title', function (req, res) {\n  res.send('Blogpost template here!');\n});\nvar database = new Sequelize({\n  dialect: 'sqlite',\n  storage: './db.sqlite',\n  operatorsAliases: false\n});\nvar blogPost = database.define('blogposts', {\n  title: Sequelize.STRING,\n  content: Sequelize.TEXT,\n  published: {\n    type: Sequelize.BOOLEAN,\n    allowNull: false,\n    defaultValue: false\n  }\n});\nvar Image = database.define('image', {\n  type: Sequelize.STRING,\n  name: Sequelize.STRING,\n  data: {\n    type: Sequelize.BLOB('long')\n  }\n});\nepilogue.initialize({\n  app: app,\n  sequelize: database\n});\nvar blogPostResource = epilogue.resource({\n  model: blogPost,\n  endpoints: ['/blogposts', '/blogposts/:id']\n});\ndatabase.sync().then(function () {\n  oidc.on('ready', function () {\n    app.listen(port, function () {\n      return console.log(\"My Blog App listening on port \".concat(port, \"!\"));\n    });\n  });\n});\noidc.on('error', function (err) {\n  // An error occurred while setting up OIDC\n  console.log(\"oidc error: \", err);\n});\n\n//# sourceURL=webpack:///./src/server/server.js?");

/***/ }),

/***/ "@okta/oidc-middleware":
/*!****************************************!*\
  !*** external "@okta/oidc-middleware" ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"@okta/oidc-middleware\");\n\n//# sourceURL=webpack:///external_%22@okta/oidc-middleware%22?");

/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"body-parser\");\n\n//# sourceURL=webpack:///external_%22body-parser%22?");

/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"cors\");\n\n//# sourceURL=webpack:///external_%22cors%22?");

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"dotenv\");\n\n//# sourceURL=webpack:///external_%22dotenv%22?");

/***/ }),

/***/ "epilogue":
/*!***************************!*\
  !*** external "epilogue" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"epilogue\");\n\n//# sourceURL=webpack:///external_%22epilogue%22?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");\n\n//# sourceURL=webpack:///external_%22express%22?");

/***/ }),

/***/ "express-session":
/*!**********************************!*\
  !*** external "express-session" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express-session\");\n\n//# sourceURL=webpack:///external_%22express-session%22?");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"path\");\n\n//# sourceURL=webpack:///external_%22path%22?");

/***/ }),

/***/ "sequelize":
/*!****************************!*\
  !*** external "sequelize" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"sequelize\");\n\n//# sourceURL=webpack:///external_%22sequelize%22?");

/***/ })

/******/ });