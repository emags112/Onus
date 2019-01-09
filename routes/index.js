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

router.get('/', function(req, res){ 
    res.render('landing/landing', {user: null});
});

//new user form (also part of modal)
router.get('/register', function(req, res){
    res.render('landing/register');
});

//user create 'post'
router.post('/register', function(req, res){
    User.register(new User({username: req.body.username,
                                name: req.body.name}), req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.redirect('/register');
        }
        passport.authenticate('local')(req, res, function(){
            res.redirect('/' + user._id)
        })
    });
});

//user update put
router.put('/:user_id', isLoggedIn, function(req, res){

});

//login form
router.get('/login', function(req, res){
    res.render('landing/login');
});

//login post
router.post('/login', function(req, res){
    User.findOne({'username': req.body.username}, function(err, foundUser){
        if(err){
            return res.redirect('back');
        }
        passport.authenticate('local')(req, res, function(){
            if(err){
                return res.redirect('/onus/login')
            }
            res.redirect('/' + foundUser._id)
        });
    }); 
});

//logout
router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});

// user profile page (show for all)
router.get('/:user_id', isLoggedIn, function(req, res){
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

module.exports = router;