const express = require('express');
const router = express.Router();
const ctrlUsers = require('../controllers/users'); 
const ctrlSearch = require('../controllers/search');

//register
router
	.route('/register')
	.post(ctrlUsers.registerUser);
//login
router	
	.route('/:userid')
	.get(ctrlUsers.loginUser)
	.put(ctrlUsers.updateUser)
	.delete(ctrlUsers.deleteUser);
//search
router
	.route('/search')
	.put(ctrlSearch.searchFor);
	
//results	
router
	.route('/results')
	.get(ctrlSearch.getResults)
	
module.exports = router;