var express = require('express');
var router = express.Router();

var mongo = require('mongodb');
var db = require('monk')('localhost/node-blog');

router.get('/show/:category', function(req, res, next){

    var posts = db.get('posts');

    posts.find({ category: req.params.category },{}, function(err, posts) {
        res.render('index', {
            'title' : req.params.category,
            'posts' : posts
        })
    });
  
});

// Add post

router.get('/add', function(req, res, next){

    res.render('addcategory', {
        'title' : 'Add Category'
    })
  
});


router.post('/add', function(req, res, next){
    
    // Get from value
    var name = req.body.name;

    // Form Validation
    req.checkBody('name', 'Title field is required').notEmpty();

    var errors = req.validationErrors();

    if(errors){
        res.render('addcategory', {
            "errors" : errors
        });
    } else {
        var categories = db.get('categories');
        categories.insert({
            "name" : name
        }, function(err, post){
            if(err){
                res.send(err);
            } else {
                req.flash('success', 'Category added successfylly!');
                res.location('/');
                res.redirect('/');
            }
        })
    }

});


module.exports = router;