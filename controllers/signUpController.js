const signUpModel = require('../models/signUpmodel.js');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const signUpController = async (req, res) => {
    try {
        // Check if the email already exists in the database
        const existingUser = await signUpModel.findOne({ email: req.body.email });
        console.log("req", req.body);

        // If a user with the same email is found, redirect to the login page
        if (existingUser) {
            console.log("Email already exists. Redirecting to login.");
            return res.redirect('/login'); // Redirect to login if email already exists
        }

        // Check if passwords match
        if (req.body.password === req.body.con_password) {
            // Hash the password
            bcrypt.hash(req.body.password, saltRounds, async (err, hashPassword) => {
                if (err) {
                    console.error("Error hashing password:", err);
                    return res.redirect('/signUp');
                }

                // Create a new user if email is not found
                const newUser = {
                    name: req.body.name,
                    email: req.body.email,
                    password: hashPassword
                };

                let model = new signUpModel(newUser);
                console.log("Saving new user to database", model);

                await model.save();

                // Redirect to login after successful registration
                res.redirect('/login');
            });
        } else {
            console.log("Passwords do not match");
            res.redirect('/'); // Redirect back to the home page if passwords do not match
        }
    } catch (error) {
        console.error("Error in sign-up process:", error);
        res.redirect('/signUp'); // Redirect to sign-up page in case of an error
    }
};

// Render the sign-up form
const signUpform = (req, res) => {
    res.render('pages/samples/register-basic');
}

module.exports = { signUpController, signUpform };
