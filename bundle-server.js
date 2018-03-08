//a file used in developement and would be never used on heroku
//it finds all the code and compiles it to one big sendFile
const express = require('express');
const app = express();
app.use(require('./build.js'));
//runs on port 8081
app.listen(8081, () => console.log(`Ready to compile and serve bundle.js`));
