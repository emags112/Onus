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
    Collection.findOne({"_id": req.params.col_id}, function(err, foundCol){
        if(err){
            return res.redirect('back');
        } else {
            res.render('collections/edit',{collection: foundCol})
        }
    });
});

// update collection
router.put('/:col_id', isLoggedIn, function(req, res){
    Collection.findOneAndUpdate({"_id": req.params.col_id}, req.body.collection, function(err, foundCol){
        if(err){
            return res.redirect('back');
        } else {
            res.redirect('/'+ req.params.user_id)
        }
    });
});

// delete collection
router.delete('/:col_id', isLoggedIn, function(req, res){
    Collection.findOne({"_id": req.params.col_id}, function(err, foundCollection){
        if(err){
            return res.redirect('back');
        }
        User.findOneAndUpdate({ '_id': req.params.user_id }, { $pull: { 'collections': foundCollection._id } }, { "new": true}, function(err, updatedUser){
            if(err){
                console.log(err);
            }
        });
        foundCollection.contents.forEach(function(thing){
            Item.findByIdAndDelete({"_id": thing._id}, function(err){
                if(err){
                    return res.redirect('back');
                }
            });
        });
        Collection.findByIdAndDelete({"_id": foundCollection._id}, function(err){
            if(err){
                return res.redirect('back'); 
            }
            res.redirect('/'+ req.params.user_id)
        });
    });
});

module.exports = router;