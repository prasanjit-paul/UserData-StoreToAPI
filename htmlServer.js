const express = require('express');
const path = require('path');

const app = express();
app.use(express.static(path.join(__dirname)));

app.listen(8081, () => { // Updated port
  console.log('HTML page available at http://localhost:8081');
});
