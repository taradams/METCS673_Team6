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
            password: req.body.password
        }
    );

     Account.findOne({ 'email': req.body.email })
            .exec( function(err, found_email) {
                 if (err) { return next(err); }

                 if (found_email) {
                     // Email exists, redirect to its detail page.
                     console.log("This email already exists in the db");
                     res.json({message: "An account with this email already exists"});
                 }
                 else {

                     account.save(function (err) {
                       if (err) { return next(err); }
                       
                       // Account saved. Set session data.

                       req.session.accountId = account._id;
                       req.session.email = account.email;
                       req.session.first_name = account.first_name;
                       req.session.last_name = account.last_name; 

                       var user = {
                        account_id: req.session.accountId,
                        email: req.session.email,
                        first_name: req.session.first_name,
                        last_name: req.session.last_name
                       };

                       //test with console.log
                       console.log(req.session.accountId);
                       console.log(req.session.email);

                        //response to client
                       res.send(user); 
                     
                       
                     });

                 }

             })
             };


//handle Account login on POST
exports.account_login_post = function(req,res,next){
    //console.log(req.body.email);
    //console.log(req.body.password);

if(req.body.email && req.body.password){
    Account.authenticate(req.body.email, req.body.password, function (error, account) {	
        if (!account) {	   
        console.log("error: account not found");
        var err = new Error('Wrong email or password.');	        
        err.status = 401;	         
        return next(err);	         
        }  
        else {
                //set session data
                req.session.accountId = account._id;
                req.session.email = account.email;
                req.session.first_name = account.first_name;
                req.session.last_name = account.last_name; 

                var user = {
                    account_id: req.session.accountId,
                    email: req.session.email,
                    first_name: req.session.first_name,
                    last_name: req.session.last_name
                   };

                 //test with console.log
                 console.log(req.session.accountId);
                 console.log(req.session.email);
                 console.log("you're logged in!");	

                 //response to client
                 res.send(user);               
            }	       
            });	    
         } else {	   
            console.log(req.body.email);
           var err = new Error('Email and password are required.');	
           err.status = 401;
             return next(err);	 

           }

};

//handle checking for user on GET
exports.get_user = function(req,res,next){
    if(req.session.accountId){
        var user = {
            account_id: req.session.accountId,
            email: req.session.email,
            first_name: req.session.first_name,
            last_name: req.session.last_name
           };
        res.send(user);
            }else{
                res.json({ message: 'no user session' });
                console.log('no session');
                err.status = 401;
                return next(err);
                //return something else here?
            }
        };



//send Accounts on GET
exports.get_accounts = function(req,res){
      //looks at our Account Schema
      Account.find(function(err, accounts) {
        if (err)
          res.send(err);
        //responds with a json object of our database accounts.
        res.json(accounts);
        console.log(accounts);
      });

};



//handle Account sign out on GET
exports.logout_get = function(req,res,next){
    if(req.session){
        req.session.destroy(function(err){
            if (err){
                return next(err);
            }else{
                res.json({ message: 'Session destroyed' });
                console.log('session destroyed');
                //return something else here?
            }
        });
    }

};
