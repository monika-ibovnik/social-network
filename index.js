const express = require('express');
const app = express();
const compression = require('compression');
const cookieSession = require('cookie-session');
const csurf = require('csurf');
const bodyParser = require('body-parser');
app.use(compression());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//code to test if we are in the production
if (process.env.NODE_ENV != 'production') {
    app.use(
        '/bundle.js',
        require('http-proxy-middleware')({
            target: 'http://localhost:8081/'
        })
    );
} else {
    //the server compiles changes automatically, while it runs on port 8081
    app.use('/bundle.js', (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

app.use(cookieSession({
    name: 'session',
    secret: process.env.secret || require('./config/cookiesecret.json').secret,
    maxAge: 1000 * 60 * 60 * 24 * 14
}));

app.use(express.static('./public/'));

app.use(csurf());
app.use(function(req, res, next){
    res.cookie('mytoken', req.csrfToken());
    next();
});

function redirectIfNotLoggedIn(req,res,next){
    if(!req.session.user && req.url!='/welcome'){
        res.redirect('/welcome');
    }else if(req.session.user && req.url === '/welcome'){
        res.redirect('/');
    }else{
        next();
    }
}

const authRoutes = require('./routes/authorisation.js');
const picUploadRoutes = require('./routes/upload.js');
const profileRoutes = require('./routes/profile.js');
const friendshipRoutes = require('./routes/friendship.js');

app.use(authRoutes);
app.use(picUploadRoutes);
app.use(profileRoutes);
app.use(friendshipRoutes);

app.get('*', redirectIfNotLoggedIn, function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.listen(8080, function() {
    console.log("I'm listening.");
});
