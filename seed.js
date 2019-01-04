const   mongoose    = require('mongoose'),
        User        = require('./models/user'),
        Collection  = require('./models/collection'),
        userData    = {
            name: "Evan",
            email: "magnussen.evan@gmail.com",
            password: "there isnt auth yet",
        },
        collectionData  =[
            {name: "Home",},
            {name: "Office",},
            {name: "Guitars",},
            {name: "Tech",},
            {name: "random",},
        ];

function seedDB(){
    //remove users
    User.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log('removed users');
        //remove collections
        Collection.remove({}, function(err){
            if(err){
                console.log(err);
            }
            console.log('collections removed');
            //add users back in
            User.create(userData, function(err, user){
                if(err){
                    console.log(err);
                } else {
                    console.log('user created');
                    collectionData.forEach(function(collection){
                        Collection.create(collection, function(err, collect){
                            if(err){
                                console.log(err);
                            } else {
                                user.collections.push(collect);
                                user.update();
                                console.log('collection created');
                            }
                        });
                    }); 
                }
            });
        });
    });
};

module.exports = seedDB;