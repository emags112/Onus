const   express     =   require('express'),
        mongoose    =   require('mongoose'),
        bodyParser  =   require('body-parser'),
        item        =   require('./models/item'),
        User        =   require('./models/user'),
        collection  =   require('./models/collection'),
        seedDB      =   require('./seed'),      
        app         =   express();


seedDB();
mongoose.connect('mongodb://localhost/onus', {useNewUrlParser: true});
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));


app.get('/', function(req, res){
    User.findOne({'name': 'Evan'}, function(err, foundUser){
        if(err){
            console.log(err);
        } else {
            console.log(foundUser);
            res.render('main/home', {user: foundUser});
        }
    });
});

//new user
app.get('/onus/new', function(req, res){
    res.send("new user form");
});

app.post('/onus', function(req, res){
    res.redirect('/onus/' + req.params.user_id);
});

//no one gets herre without authentication

// index route:
    // user profile page (show for all)
    app.get('/onus/:user_id', function(req, res){
        res.render('onus/index');
    });

    // user collections list:
        // new collection
        app.get('/onus/:user_id/collections/new', function(req, res){
            res.send(req.params);
        });
        //create collection
        app.post('/onus/:user_id/collections', function(req, res){
            res.redirect('/onus/' + req.params.user_id);
        });
        //edit collection
        app.get('/onus/:user_id/collections/:col_id/edit', function(req, res){
            res.send(req.params);
        });
        // update collection
        app.put('/onus/:user_id/collections/:col_id', function(req, res){
            res.redirect('/onus/' + req.params.user_id);
        });
        // delete collection
        app.delete('/onus/:user_id/collections/:col_id', function(req, res){
            res.redirect('/onus/' + req.params.user_id);
        });
        // collection items list:
            // new item
            app.get('/onus/:user_id/collections/:col_id/items/new', function(req, res){
                res.send(req.params);
            });
            //create item
            app.post('/onus/:user_id/collections/:col_id/items', function(req, res){
                res.redirect('/onus/' + req.params.user_id);
            });
            //edit item
            app.get('/onus/:user_id/collections/:col_id/items/:item_id/edit', function(req, res){
                res.send(req.params);
            });
            // update item
            app.put('/onus/:user_id/collections/:col_id/items/:item_id', function(req, res){
                res.redirect('/onus/' + req.params.user_id);
            });
            // delete item
            app.delete('/onus/:user_id/collections/:col_id/items/:item_id', function(req, res){
                res.redirect('/onus/' + req.params.user_id);
            });

// create user





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