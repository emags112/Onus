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

// new item
router.get('/new', function(req, res){
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
router.post('/', function(req, res){
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
router.get('/:item_id/edit', function(req, res){
    res.send(req.params);
});
// update item
router.put('/:item_id', function(req, res){
    res.redirect('/onus/' + req.params.user_id);
});
// delete item
router.delete('/:item_id', function(req, res){
    res.redirect('/onus/' + req.params.user_id);
});

module.exports = router;