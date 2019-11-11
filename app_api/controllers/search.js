const searchFor = function(req, res){ 
res
.status(200)
.json({"status" : "success"});
};
const getResults = function(req, res){
res
.status(200)
.json({"status" : "success"}); 
};

module.exports = {
	searchFor,
	getResults
};

