var debug = require('debug')('app');
debug("started");

//const hostname = '127.0.0.1';
const port = process.env.PORT || 3000;


/**
 * Initialise EJS template engine. 
 * Note EJS is an Express compliant template engine.
 */
var ejs = require("ejs");
var express = require("express");
const app = express();

app.set("views", "./views") // where the template files are located
app.set("view engine", "ejs"); // tells Express that EJS is being used
// status assets
app.use(express.static("public")); // specify static assets
app.use(express.json());
app.use('/salesforce-ux', express.static('node_modules/@salesforce-ux/design-system/assets/'));
app.use('/jquery', express.static('node_modules/jquery/dist/'));

// route handlers
const routes = require("./routes.js")(app);

var server = require('http').createServer(app);
server.listen(port, () => {
    debug("server listening at port " + port + "!");
});