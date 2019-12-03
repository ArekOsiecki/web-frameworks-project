const express = require('express');
const router = express.Router();
const ctrlUsers = require('../controllers/users');
const ctrlSearch = require('../controllers/search');


/* Users pages */
router.get('/', ctrlUsers.loginCtrl);
router.get('/register', ctrlUsers.registerCtrl);
/* Search pages */
router.get('/search', ctrlSearch.searchCtrl);
router.get('/results', ctrlSearch.resultsCtrl);

module.exports = router;

