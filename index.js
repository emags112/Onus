const   express         =   require('express'),
        app             =   express(),
        mongoose        =   require('mongoose'),
        bodyParser      =   require('body-parser'),
        passport        =   require('passport'),      
        localStrategy   =   require('passport-local'),      
        Item            =   require('./models/item'),
        User            =   require('./models/user'),
        Collection      =   require('./models/collection'),
        seedDB          =   require('./seed');

// creates a user with collection and item
seedDB();
//connects to database
mongoose.connect('mongodb://localhost:27017/onus', {useNewUrlParser: true});
app.use(express.static(__dirname + '/public'));
// turns req.body to json format
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
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

// middleware to determin if the user is logged in and limit access if not
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}


app.get('/', function(req, res){
    User.findOne({'name': 'Evan'}, function(err, foundUser){
        if(err){
            console.log(err);
        } else {
            res.render('landing/landing', {user: foundUser});
        }
    });
});

//new user form (also part of modal)
app.get('/onus/new', function(req, res){
    res.render('landing/register');
});

//user create 'post'
app.post('/register', function(req, res){
    User.register(new User({username: req.body.username,
                                name: req.body.name}), req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.redirect('/');
        }
        passport.authenticate('local')(req, res, function(){
            res.redirect('/onus/' + user._id)
        })
    });
});

//no one gets here without authentication

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
                User.findOne({'_id': req.params.user_id}).populate('collections').exec( function(err, foundUser){
                    if(err){
                        console.log(err);
                    } else {
                        Collection.findOne({'_id': req.params.col_id}, function(err, foundcollection){
                            if(err){
                                console.log(err);
                            } else {
                                res.render('item/new', {user: foundUser, collection: foundcollection});
                            }
                        });
                    }
                });
            });
            //create item
            app.post('/onus/:user_id/collections/:col_id/items', function(req, res){
                Collection.findById(req.body.selectiedCol, function(err, foundCol){
                    console.log(req.body)
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






app.listen(3000, function(){
    console.log("Own this, Onus")
});