const mongoose = require('mongoose');
const userSchema = mongoose.model('Users');

const registerUser = function(req, res) {
        userSchema.create({
            userName: req.body.userName,
            email: req.body.email,
            book: req.body.book,
            password: req.body.password
        }, (err, user) => {
        if(err) {
            res
            .status(400)
            .json(err);
        } else{
            res
            .status(201)
            .json(user)
        }
    });
};
const loginUser = function(req, res) {
    if(req.params && req.params.userid) {
userSchema
.findById(req.params.userid)
.exec((err, user) =>{
    if(!user) {
        res
        .status(404)
        .json({
            "Error message":"No such user found"
        });
        return;
    } else if (err) {
        res
        .status(404)
        .json(err);
        return;
    }
res
.status(200)
.json(user); 
});
} else {
    res
    .status(404)
    .json({
        "Error message":"No userid in request"
    });
}
};
const updateUser = function(req, res){
    if(!req.params.userid) {
        res
        .status(404)
        .json({
            "Error":"userid is required!"
        });
        return;
    }
    userSchema
    .findByIdAndUpdate(req.params.userid)
    .exec((err, user) => {
        if(!user) {
            res
            .json(402)
            .status({
                "Error":"userid not found"
            });
            return;
        } else if (err) {
            res
            .status(400)
            .json(err);
            return;
        }
        user.userName = req.body.userName;
        user.email = req.body.email;
        user.book = req.body.book;
        user.password = req.body.password;
        user.save((err, user) => {
            if(err){
                res
                .status(404)
                .json(err);
            } else {
                res
                .status(200)
                .json(user);
            }
        });
    }
    );
};
const deleteUser = function(req, res){
    const userid = req.params.userid;
    if(userid) {
        userSchema
        .findByIdAndRemove(userid)
        .exec((err, user) =>{
            if(err) {
                res
                .status(404)
                .json(err);
                return;
            }
            res
            .status(204)
            .json({
                "userid":"User removed"
            });
        }
        );
        } else {
            res
            .status(404)
            .json({
                "Error message":"No userid in request"
            });
        }
};


module.exports = {
registerUser,
loginUser,
updateUser,
deleteUser
};
