const settings = {
	baseUrl: process.env.BASE_URL || 'http://localhost',
	port: process.env.PORT || 3989,
	database: {
        mongoURI: 'mongodb+srv://IgnacioMorales:pencilBackendAssignment@pencil-backend-assignme.2uswk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
		host: 'localhost',
		name: 'pencil'
	}
}

module.exports = settings;
