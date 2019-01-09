const   express         =   require('express'),
        router          =   express.Router({mergeParams: true}),
        mongoose        =   require('mongoose'),
        bodyParser      =   require('body-parser'),
        passport        =   require('passport'),      
        localStrategy   =   require('passport-local'),      
        Item            =   require('../models/item'),
        User            =   require('../models/user'),
        Collection      =   require('../models/collection');

// middleware to determin if the user is logged in and limit access if not
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}

// new collection form
router.get('/new', isLoggedIn, function(req, res){
    User.findOne({'_id': req.params.user_id}, function(err, foundUser){
        if(err){
            console.log(err);
        } else {
            res.render('collections/new', {user: foundUser});
        }
    });
});

//create collection route
router.post('/', isLoggedIn, function(req, res){
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
                    res.redirect('/' + foundUser._id);
                }
            })
        }
    })
});

//edit collection form
router.get('/:col_id/edit', isLoggedIn, function(req, res){
    res.send(req.params);
});

// update collection
router.put('/:col_id', isLoggedIn, function(req, res){
    res.redirect('/' + req.params.user_id);
});

// delete collection
router.delete('/:col_id', isLoggedIn, function(req, res){
    res.redirect('/' + req.params.user_id);
});

module.exports = router;