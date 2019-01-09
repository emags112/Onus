const   express         =   require('express'),
        app             =   express(),
        mongoose        =   require('mongoose'),
        bodyParser      =   require('body-parser'),
        passport        =   require('passport'),      
        localStrategy   =   require('passport-local'),      
        Item            =   require('./models/item'),
        User            =   require('./models/user'),
        Collection      =   require('./models/collection'),
        methodOverride  =   require('method-override'),
        seedDB          =   require('./seed');

const   itemRoutes       =   require('./routes/item'),
        collectionRoutes =   require('./routes/collection');
        indexRoutes      =   require('./routes/index');

// creates a user with collection and item
// seedDB();
//connects to database
mongoose.connect('mongodb://localhost:27017/onus', {useNewUrlParser: true});
app.use(express.static(__dirname + '/public'));
// turns req.body to json format
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
//allows for restful put and delete from forms
app.use(methodOverride('_method'));
//tracks session of user
app.use(require('express-session')({
    secret: 'onus own this',
    resave: false,
    saveUninitialized: false
}));
// starts passport
app.use(passport.initialize());
// starts clean session fro user
app.use(passport.session());
// defines what the current user is
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

// passposrt setup
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// allows for ejs use as main compiler
app.set('view engine', 'ejs');

app.use('/', indexRoutes)
app.use('/onus/:user_id/collections', collectionRoutes)
app.use('/onus/:user_id/collections/:col_id/items', itemRoutes)

app.listen(3000, function(){
    console.log("Own this, Onus")
});