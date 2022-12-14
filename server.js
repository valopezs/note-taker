// dependencies required
const express = require('express');

// create express app
const app = express();

// create PORT
const PORT = process.env.PORT || 8080;

// set up express to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

const apiRoutes = require("./routes/apiRoutes");
app.use(apiRoutes);
const htmlRoutes = require("./routes/htmlRoutes");
app.use(htmlRoutes);

// create server listener
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));