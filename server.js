const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 8080;

// const forceSSL = function () {
//   return function (req, res, next) {
//     if (req.headers['x-forwarded-proto'] !== 'https') {
//       return res.redirect(
//         ['https://', req.get('Host'), req.url].join('')
//       );
//     }
//     next();
//   }
// };
app.use(express.static('./dist/thesisfev2'));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname,'/dist/thesisfev2/index.html'));
});

// app.use(forceSSL());

app.listen(PORT, () => console.log(`Server running on PORT: ${PORT}`));