const   express     =   require('express'),
        mongoose    =   require('mongoose'),
        bodyParser  =   require('body-parser'),
        Item        =   require('./models/item'),
        User        =   require('./models/user'),
        Collection  =   require('./models/collection'),
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
            res.render('landing/landing', {user: foundUser});
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
        User.findOne({'_id': req.params.user_id}).populate({path: 'collections', 
                                                        populate:{
                                                            path: 'contents'
                                                        }}).exec(function(err, foundUser){
            if(err){
                console.log(err);
            } else {
                res.render('onus/index', {user: foundUser});
            }
        });
    });

    // user collections list:
        // new collection form
        app.get('/onus/:user_id/collections/new', function(req, res){
            User.findOne({'_id': req.params.user_id}, function(err, foundUser){
                if(err){
                    console.log(err);
                } else {
                    res.render('collections/new', {user: foundUser});
                }
            });
        });
        //create collection route
        app.post('/onus/:user_id/collections', function(req, res){
            User.findById(req.params.user_id, function(err, foundUser){
                if(err){
                    console.log(err);
                } else {
                    Collection.create(req.body.collection, function(err, collection){
                        if(err){
                            console.log(err);
                        } else {
                            foundUser.collections.push(collection);
                            foundUser.save();
                            res.redirect('/onus/' + foundUser._id);
                        }
                    })
                }
            })
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
                User.findOne({'_id': req.params.user_id}, function(err, foundUser){
                    if(err){
                        console.log(err);
                    } else {
                        res.render('item/new', {user: foundUser, col_id: req.params.col_id});
                    }
                });
            });
            //create item
            app.post('/onus/:user_id/collections/:col_id/items', function(req, res){
                Collection.findById(req.params.col_id, function(err, foundCol){
                    console.log(foundCol)
                    if(err){
                        console.log(err);
                    } else {
                        Item.create(req.body.item, function(err, item){
                            console.log(req.body.item,)
                            if(err){
                                console.log(err);
                            } else {
                                foundCol.contents.push(item);
                                console.log(foundCol)
                                foundCol.save();
                                res.redirect('/onus/' + req.params.user_id);
                            }
                        })
                    }
                })
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