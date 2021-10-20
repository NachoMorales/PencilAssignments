const settings = {
	baseUrl: process.env.BASE_URL || 'http://localhost',
	port: process.env.PORT || 3989,
	mongoURI: process.env.MONGODB_URI || 'mongodb://localhost/pencil'
}

module.exports = settings;
