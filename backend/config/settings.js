const settings = {
	baseUrl: process.env.BASE_URL || 'http://localhost',
	port: process.env.PORT || 3989,
	database: {
        mongoURI: 'mongodb+srv://Nacho:nacho00@gym-deco.zrd6h.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
		host: 'localhost',
		name: 'pencil'
	}
}

module.exports = settings;
