const request = require('request');
const apiOptions = {
    server: 'http://localhost:3000'
};
if (process.env.NODE_ENV === 'production') {
    apiOptions.server = 'https://bt-connect.herokuapp.com/';
}



/* GET 'Login' page */
const _renderLoginpage = function (req, res, responseBody) {
    if (!(responseBody instanceof Array)) {
        message = "API lookup error";
        responseBody = [];
    } else {
        if (!responseBody.length) {
            message = "No connection found";
        }
    }
    res.render('index', {
        title: 'Login',
        pageHeader: {
            title: 'Login',
            strapline: 'Login to find bus and train connections'
        },
        users: responseBody,
        message: message,
        error: req.query.err
    });
};

const loginCtrl = function (req, res) {
    const userid = req.params.userid;
    const path = `/api/${userid}`;
    const postdata = {
        userName: req.body.userName,
        password: req.body.password
    };
    const requestOptions = {
        url: apiOptions.server + path,
        method: 'POST',
        json: postdata

    };
    if (!postdata.userName || !postdata.password) {
        res.redirect('/api/');
    } else {
        request(requestOptions, (err, response, body) => {
            if (response.statusCode === 200) {
                _renderLoginpage(req, res, body);
            }
            else if (response.statusCode === 400 && body.name && body.name === 'ValidationError') {
                res.redirect('/api/new?err=val')
            } else {
                _showError(req, res, response.statusCode);
            }
        }
        );
    }
};

/* GET 'Register' page */
const _renderRegisterpage = function (req, res) {
    res.render('register', {
        title: 'Register',
        pageHeader: {
            title: 'Register',
            strapline: 'Register to find bus and train connections'
        },
        error: req.query.err
    });
};
const registerCtrl = function (req, res) {
    const path = '/api/register';
    const postdata = {
        userName=req.body.userName,
        email=req.body.email,
        book=req.body.book,
        password=req.body.password
    };
    const requestOptions = {
        url: apiOptions.server + path,
        method: 'POST',
        json: postdata

    };
    if (!postdata.userName || !postdata.password) {
        res.redirect('/api/register');
    } else {
        request(requestOptions, (err, response, body) => {
            if (response.statusCode === 201) {
                _renderRegisterpage(req, res);
            }
            else if (response.statusCode === 400 && body.name && body.name === 'ValidationError') {
                res.redirect('/api/register/new?err=val');
            }
            else {
                _showError(req, res, statusCode);
            }
        }
        );
    }
};

const _showError = function (req, res, status) {
    let title = '';
    let content = '';
    if (status === 404) {
        title = '404 Page not found';
        content = 'There is no such page';
    } else {
        title = `${status}, something went wrong`;
        content = 'Something is wrong';
    }
    res.status(status);
    res.render('generic-text', {
        title: title,
        content: content
    });
};
const logUser = function (req, res) {
    _renderLoginpage(req, res, (req, res, responseData) => {
    });
}
const regUser = function (req, res) {
    _renderRegisterpage(req, res, (req, res, responseData) => {
    });
}
module.exports = {
    registerCtrl,
    regUser,
    loginCtrl,
    logUser
};

