//import model
var Account = require('./../models/Account');


const {body, validationResult} = require('express-validator/check');
const {sanitizeBody} = require('express-validator/filter');



//handle Account creation on POST
exports.account_create_post = function(req,res,next){


    var account = new Account(
        {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
        }
    );

     Account.findOne({ 'email': req.body.email })
            .exec( function(err, found_email) {
                 if (err) { return next(err); }

                 if (found_email) {
                     // Email exists, redirect to its detail page.
                     console.log("This email already exists in the db");
                 }
                 else {

                     account.save(function (err) {
                       if (err) { return next(err); }
                       // Account saved. Redirect to account detail page.
                       req.session.accountId = account._id;
                       req.session.email = account.email; 
                       console.log(req.session.accountId);
                       console.log(req.session.email);
                       res.send(req.session.accountId); 
                       //res.redirect('/loggedin'); 
                       
                     });

                 }

             })
             };


//handle Account login on POST
exports.account_login_post = function(req,res,next){
    console.log(req.body.login_email);
    console.log(req.body.login_password);

if(req.body.login_email && req.body.login_password){
    Account.authenticate(req.body.login_email, req.body.login_password, function (error, account) {	
        if (!account) {	   
        console.log("error: account not found");
        var err = new Error('Wrong email or password.');	        
        err.status = 401;	         
        return next(err);	         
        }  
        else {
                 req.session.accountId = account._id;
                 req.session.email = account.email;
                 console.log(req.session.accountId);
                 console.log(req.session.email);
                 console.log("you're logged in!");	
                 res.send(req.session.accountId);       
                 //return res.redirect('/loggedin');
                 //need to send something else here?	        
            }	       
            });	    
         } else {	   
            console.log(req.body.login_email);
           var err = new Error('Email and password are required.');	
           err.status = 401;
             return next(err);	 

           }

};
             

//send Accounts on GET
exports.get_accounts = function(req,res){
      //looks at our Account Schema
      Account.find(function(err, accounts) {
        if (err)
          res.send(err);
        //responds with a json object of our database comments.
        res.json(accounts);
        console.log(accounts);
      });

};



//handle Account sign out on GET
exports.logout_get = function(req,res,next){
    //console.log(req.session);
    if(req.session){
        req.session.destroy(function(err){
            if (err){
                return next(err);
            }else{
                //return res.render('index');
                res.json({ message: 'Session destroyed' });
                console.log('session destroyed');
                //return something else here?
            }
        });
    }

};
