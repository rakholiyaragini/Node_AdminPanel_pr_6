const cookieParser = require('cookie-parser')
const signUpModel = require('../models/signUpmodel.js');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const logIn = (req, res) => {
    res.render('pages/samples/login-basic');
}

const logInController = async (req, res) => {
    console.log("signup>>",signUpModel);
    
    const data = await signUpModel.findOne({ email: req.body.email });
        console.log("login_con",req.body);
        console.log("signupmodel",signUpModel);
        
        console.log("data",data);
        
        if (data) {
            bcrypt.compare(req.body.password, data.password, function (err, result) {
                if (err) {
                    console.error("Error in bcrypt compare:", err);
                    return res.redirect('/login');
                }

                if (result) {
                    res.cookie("userId", data._id.toString());
                    res.redirect('/');
                } else {
                    console.log("Incorrect password");
                    res.redirect('/logIn');
                }
            });
        } else {
            console.log("No user found with this email");
            res.redirect('/logIn');
        }
}

module.exports = { logIn, logInController }
