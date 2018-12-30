const   express     =   require('express'),
        app         =   express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('*', function(req, res){
    res.send('Onus is your home page');
})

app.listen(3000, function(){
    console.log("Own this, Onus")
})