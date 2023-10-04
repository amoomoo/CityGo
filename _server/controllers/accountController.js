const Account = require('../../_models/AccountModel');
const bcrypt = require('bcrypt');

const accountController = {};


//make sure username isn't taken and email isn't in use
accountController.validateNewUser = async(req, res, next) => {
    const { email } = await Account.findOne({email: req.body.email})
    const { username } = await Account.findOne({username: req.body.username})
    console.log(email, username)
    if(email || username) {
        return res.redirect('/login')
    }
    if (!email && !username) {
        return next()
    }
}

// hash password, create new user in DB
accountController.createUser = async (req, res, next) => {
    const emailExists = await Account.exists({email: req.body.email})
    const usernameExists = await Account.exists({username: req.body.username})

    if (!emailExists && !usernameExists) {
        try{
            // HASH PASSWORD
            const pwd = req.body.password   
            const salt = await bcrypt.genSalt(10)
            const hash = await bcrypt.hash(pwd, salt)
            // CREATE MONGODB ACCOUNT DOCUMENT
            const newAccount = await Account.create({firstName: req.body.firstName, lastName: req.body.lastName, email: req.body.email, username: req.body.username, password: hash})
            res.locals.newAccount = newAccount;
            return next();
        }
        catch(err) {
            return next((err) => {
                err = {
                    log: 'Error caught in hashPassword express middleware',
                    status: 500,
                    message: {error: 'There was an error creating your account, please try again'}
                };
            });
        };
    }
    return next();
};

// validate login attempt, check if username exists, then compare password
accountController.verifyUser = async(req, res, next) => {
    const userExists = await Account.exists({username: req.body.username})
    if(userExists) {
        const user = await Account.findOne({username: req.body.username})
        const found = await bcrypt.compare(req.body.password, user.password)
        if (!found) {
            res.locals.failedLogin = 'Username or password is incorrect, please try again'
        }
        return next();
    } else {
        res.locals.failedLogin = 'Username or password is incorrect, please try again'
        return next();
    }
};

module.exports = accountController