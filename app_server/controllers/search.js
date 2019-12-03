const request = require('request');
const apiOptions = {
    server: 'http://localhost:3000'
};
if (process.env.NODE_ENV === 'production') {
    apiOptions.server = 'https://bt-connect.herokuapp.com/';
}


/* GET 'Search' page */
const _renderSearchpage = function (req, res) {
    res.render('search', {
        title: 'Search',
        pageHeader: {
            title: 'Search',
            strapline: 'Search for bus and train connections'
        },
        error: req.query.err
    });
};
const searchCtrl = function (req, res) {
    const path = '/api/search';
    const putdata = {
        locFrom=req.body.locFrom,
        locTo=req.body.locTo
    };
    const requestOptions = {
        url: apiOptions.server + path,
        method: 'PUT',
        json: putdata
    };
    if (!putdata.locFrom || !putdata.locTo) {
        res.redirect('/api/search');
    } else {
        request(requestOptions, (err, response, body) => {
            if (response.statusCode === 200) {
                _renderSearchpage(req, res);
            } else if (response.statusCode === 400 && body.locFrom && body.locTo === 'ValidationError') {
                res.redirect('/api/search/new?err=val');
            } else {
                _showError(req, res, response.statusCode);
            }
        }
        );
    }
};


/* GET results page */
const _renderResultspage = function (req, res) {
    res.render('results', {
        title: 'Results',
        pageHeader: {
            title: 'Results',
            strapline: 'Nearest bus and train connections'
        },
        error: req.query.err
    });
};
const resultsCtrl = function (req, res) {
    const path = '/api/results';
    const postdata = {

    }
    _renderResultspage(req, res);
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
const search = function (req, res) {
    _renderSearchpage(req, res, (req, res, responseData) => {
    });
}

module.exports = {
    searchCtrl,
    search,
    resultsCtrl
};

