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
    res.redirect('/onus/login');
}

// new item
router.get('/new', isLoggedIn, function(req, res){
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
router.post('/', isLoggedIn, function(req, res){
    Collection.findById(req.body.selectiedCol, function(err, foundCol){
        if(err){
            console.log(err);
        } else {
            Item.create(req.body.item, function(err, item){
                if(err){
                    console.log(err);
                } else {
                    foundCol.contents.push(item);
                    foundCol.save();
                    res.redirect('/onus/' + req.params.user_id);
                }
            })
        }
    })
});

//edit item
router.get('/:itemID/edit', isLoggedIn, function(req, res){
    // find user so that list of collections can be created
    User.findOne({'_id': req.params.user_id}).populate('collections').exec(function(err, foundUser){
        if(err){
            console.log(err);
        } else {
            // find collections so that initial collection in list can be set
            Collection.findOne({'_id': req.params.col_id}).populate('contents').exec(function(err, foundcollection){
                if(err){
                    console.log(err);
                } else {
                    Item.findOne({'_id': req.params.itemID}, function(err, foundItem){
                        if(err){
                            console.log(err);
                        } else {
                            res.render('item/edit', {user: foundUser, collection: foundcollection, item: foundItem});
                        }
                    });
                }
            });
        }
    });
});

// update item
router.put('/:itemID', isLoggedIn, function(req, res){
    Item.findOneAndUpdate({'_id': req.params.itemID}, req.body.item, function(err, foundItem){
        if(err){
            res.redirect('back');
        } else {
            res.redirect('/onus/' + req.params.user_id);
        }
    })
});

// delete item
router.delete('/:itemID/', isLoggedIn, function(req, res){
    Item.findByIdAndDelete(req.params.itemID, function(err, data){
        if(err){
            console.log(err);
            res.redirect('back');
        } else {
            console.log(data);
            res.redirect('/onus/' + req.params.user_id);
        }
    })
});

module.exports = router;