'use strict';

// Define schema
module.exports = (module) => {

	/**
	 * Schema
	 */
	module.schema = new global.database.mongodb.mongoose.Schema({
		id: { type: String },
		number: { type: Number },
		annotations: [{ type: global.database.mongodb.mongoose.Schema.Types.ObjectId, ref: 'topics' }]
		
	}, { timestamps: true } );

	module.schema.post('validate', async question => {
		if (!question.number || question.number == 0) {
			let counter = await global.modules.counters.model.findOneAndUpdate({ name: 'questions' }, { $inc: { sequence: 1 } }, { returnNewDocument: true });
			
			if (counter && counter.sequence == 1) counter = await global.modules.counters.model.findOneAndUpdate({ name: 'questions' }, { $inc: { sequence: 1 } }, { returnNewDocument: true });
			
			if (!counter) counter = await global.modules.counters.model.create({ name: 'questions', sequence: 1 });

			question.number = counter.sequence;
		}

	});
};
