const User = require('../Models/User');
//const userSignUp = require('../Validations/userSignup');

exports.signUp = (req, res) => {
    //const isValid = userSignUp(req.body);
    // if (!isValid) {
    //     res.status(401).json({
    //         message: "Input invalid"
    //     });
    // }
    const email = req.body.email;
    const password = req.body.password;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;

    const signUpUser = new User({
        email: email,
        password: password,
        firstname: firstname,
        lastname: lastname
    });

    signUpUser.save().then(
        result => {
            res.status(200).json({
                message: "User signed up successfully !",
                user: result
            });
        }
    ).catch(
        error => {
            res.status(500).json({
                message: error
            });
        }
    );
}

exports.logIn = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    User.find({
        email: email,
        password: password,
    }).then(
        result => {
            if (result.length >= 1) {
                res.status(200).json({
                    message: "User logged in successfully !",
                    isAuthenticated: true,
                    user: result
                });
            } else {
                res.status(200).json({
                    message: "User NOT logged in successfully !",
                    isAuthenticated: false,
                    user: result
                });
            }
        }
    ).catch(
        error => {
            res.status(500).json({
                message: error
            });
        }
    );
}