const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.static('./dist/thesisfev2'));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname,'/dist/thesisfev2/index.html'));
});

app.listen(PORT, () => console.log(`Server running on PORT: ${PORT}`));