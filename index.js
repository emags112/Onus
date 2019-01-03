const   express     =   require('express'),
        mongoose    =   require('mongoose'),
        item        =   require('./models/item'),
        user        =   require('./models/user'),
        collection  =   require('./models/collection'),
        app         =   express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
mongoose.connect('mongodb://localhost/onus', {useNewUrlParser: true});

app.get('/', function(req, res){
    res.render('home');
});

//new user
app.get('/onus/new', function(req, res){
    res.send("new user form");
});

app.post('/onus', function(req, res){
    res.send(req.params);
});

//no one gets herre without authentication

// index route:
    // user profile page (show for all)
    app.get('/onus/:id', function(req, res){
        res.send(req.params);
    });

    // user collections list:
        // new collection
        app.get('/onus/:id/collections/new', function(req, res){
            res.send(req.params);
        });
        //create collection
        app.post('/onus/:id/collections', function(req, res){
            res.redirect('/onus/' + req.params.id);
        });
        //edit collection
        app.get('/onus/:id/collections/:id/edit', function(req, res){
            res.send(req.params);
        });
        // update collection
        app.put('/onus/:id/collections/:id', function(req, res){
            res.redirect('/onus/' + req.params.id);
        });
        // delete collection
        app.delete('/onus/:id/collections/:id', function(req, res){
            res.redirect('/onus/' + req.params.id);
        });
        // collection items list:
            // new item
            app.get('/onus/:id/collections/:id/items/new', function(req, res){
                res.send(req.params);
            });
            //create item
            app.post('/onus/:id/collections/:id/items', function(req, res){
                res.redirect('/onus/' + req.params.id);
            });
            //edit item
            app.get('/onus/:id/collections/:id/items/:id/edit', function(req, res){
                res.send(req.params);
            });
            // update item
            app.put('/onus/:id/collections/:id/items/:id', function(req, res){
                res.redirect('/onus/' + req.params.id);
            });
            // delete item
            app.delete('/onus/:id/collections/:id/items/:id', function(req, res){
                res.redirect('/onus/' + req.params.id);
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