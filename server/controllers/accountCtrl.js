var Account = require('./../models/Account');
const {body, validationResult} = require('express-validator/check');
const {sanitizeBody} = require('express-validator/filter');

//display Account information
exports.account_detail = function(req, res, next) {
    Account.find({_id: req.session.accountId},'first_name last_name email username')
    .exec(function(err, account_detail){
        if(err){return next(err);}
        //successful, so render
        //console.log(account_detail[0].first_name);
        res.render('account_detail', {
            account: account_detail[0]
        });

    });
};

//handle Account creation on POST
exports.account_create_post = [

// Validate that the first name field is not empty.
body('first_name', 'First name required').isLength({ min: 1 }).trim(),
// Sanitize (trim and escape) the first name field.
sanitizeBody('first_name').trim().escape(),
// Validate that the last name field is not empty.
body('last_name', 'Last name required').isLength({ min: 1 }).trim(),
// Sanitize (trim and escape) the last name field.
sanitizeBody('last_name').trim().escape(),
//Validate that the email is an email
body('email', 'Must be a valid email address').isEmail(),
//validate username
body('username', 'username required').isLength({ min: 3 }).trim(),
// Sanitize (trim and escape) the username field.
sanitizeBody('username').trim().escape(),
//Validate password
body('password', 'Passwords must be at 8-24 characters long and contain at least one number').isLength({min: 8}).matches(/\d/),
// Sanitize (trim and escape) the password field.
sanitizeBody('password').trim().escape(),


//process request
(req,res,next) => {

    const errors = validationResult(req);

    var account = new Account(
        {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
        }
    );

    if (!errors.isEmpty()) {
        // There are errors. Render the form again with sanitized values/error messages.
       console.log("Errors!");
    return;
    }
    else {
        // Data from form is valid.
        // Check if account with same email already exists.
        Account.findOne({ 'email': req.body.email })
            .exec( function(err, found_email) {
                 if (err) { return next(err); }

                 if (found_email) {
                     // Email exists, redirect to its detail page.
                     //res.render('error');
                     console.log("This email already exists in the db");
                 }
                 else {

                     account.save(function (err) {
                       if (err) { return next(err); }
                       // Account saved. Redirect to account detail page.
                       req.session.accountId = account._id;
                       console.log(req.session.accountId);
                       //res.redirect('/loggedin');
                     });

                 }

             });

    
            }
        }

        ];


//handle Account login on POST
exports.account_login_post = function(req,res,next){
    console.log(req.body.login_email);
    console.log(req.body.login_password);

if(req.body.login_email && req.body.login_password){
    Account.authenticate(req.body.login_email, req.body.login_password, function (error, account) {	
        if (!account) {	   
        console.log(error);
        var err = new Error('Wrong email or password.');	        
        err.status = 401;	         
        return next(err);	         
        }  
        else {
                 req.session.accountId = account._id;
                 console.log(req.session.accountId);	        
                 return res.redirect('/loggedin');	        
            }	       
            });	    
         } else {	   
            console.log(req.body.login_email);
           var err = new Error('Email and password are required.');	
           err.status = 401;
             return next(err);	 

           }

};
             
//display account update form on GET?
       
//handle Account update on POST
exports.account_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Account update POST');
};

//handle Account sign out on GET
exports.logout_get = function(req,res,next){
    //console.log(req.session);
    if(req.session){
        req.session.destroy(function(err){
            if (err){
                return next(err);
            }else{
                return res.render('index');
                //console.log(req.session);
            }
        });
    }

};
