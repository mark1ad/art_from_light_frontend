// SERVER.JS //

/* Dependencies */
const express = require('express');
const app = express();
const port = process.env.PORT || 3001;

/* Middleware */
app.use(express.static('public'));

/* Init */
app.listen(port, function() {
  console.log(`Server listening on port ${port}...`);
});
