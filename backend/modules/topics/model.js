'use strict';

// Define schema
module.exports = (module) => {

	/**
	 * Schema
	 */
	module.schema = new global.database.mongodb.mongoose.Schema({
		id: { type: String },
		root: { type: Boolean, default: true },
		last: { type: Boolean, default: true },
		annotation: { type: String, required: true },
		prevTopic: { type: global.database.mongodb.mongoose.Schema.Types.ObjectId, ref: 'topics' },
		nextTopics: [{ type: global.database.mongodb.mongoose.Schema.Types.ObjectId, ref: 'topics' }]
		
	}, { timestamps: true } );

};
