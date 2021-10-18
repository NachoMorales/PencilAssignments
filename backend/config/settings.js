const path = require('path');

const settings = {
	token      : {
		secret:     'ts$s38*jsjmjnT1',
		expires:    '1d', // expires in 24 hours
		noexpires:  '100y', // expires in 100 years
	},
	crypto		 : {
		saltRounds : 12
	},
	baseUrl    : process.env.BASE_URL || 'http://localhost',
	uploadDir  : process.env.UPLOAD_DIR || '/tmp',
	files:{
		path: process.env.IMAGES_DIR || './files'
	},
	url        : function() {
		return this.baseUrl + ':' + this.port
	},
	path       : path.normalize(path.join(__dirname, '..')),
	port       : process.env.PORT || 3989,
	database   : {
        mongoURI: 'mongodb+srv://Nacho:nacho00@gym-deco.zrd6h.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
		// logging  : 'console.log',
		// timezone : '-03:00',
		host     : 'localhost',
		name     : 'pencil',
		itemsPerPage  : 20
	},
	businessRules: {

	}
}

module.exports = settings;
