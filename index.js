const   express     =   require('express'),
        mongoose    =   require('mongoose'),
        item        =   require('./models/item'),
        user        =   require('./models/user'),
        collection  =   require('./models/collection'),
        app         =   express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
mongoose.connect('mongodb://localhost/onus');

app.get('/', function(req, res){
    res.render('home');
});

//index route
app.get('/onus', function(req, res){
    res.render('Onus');
});

//create user
app.get('/onus/new', function(req, res){
    res.render('Onus');
});

//show user
app.get('/onus/:userID', function(req, res){
    res.render('Onus');
});

//show collections
app.get('/onus/:userID/collections', function(req, res){
    res.render('Onus');
});

//new collection
app.get('/onus/:userID/collections/new', function(req, res){
    res.render('Onus');
});

//create collection
app.post('/onus/:userID/collections', function(req, res){
    res.render('Onus');
});

app.listen(3000, function(){
    console.log("Own this, Onus")
});

//user - single
    //{
        //Name
        //Username
        //Password
    //}
    //home - multiple
        //{
            //name
            //Owner
        //}
        //room - multiple
            //{
                //name
                //home
            //}
            //item - multiple
                //{
                    //name
                    //description
                    //purchase price (or estimate)
                    //image
                    //priority
                    //room
                //}