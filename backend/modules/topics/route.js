'use strict';

// Define module
module.exports = (module) => {

  /**
   * Find
   *
   * @param {Object} req - Request
   * @param {Object} res - Response
   * @param {Object} next - Next
   * @return {void}
   */
  module.router.get('/', async (req, res, next) => {

    const filter = req.query._filters ? JSON.parse(req.query._filters) : {};

    const data = await module.model.find(filter).catch(next);

    res.send({ data });
  });

  /**
   * Search
   *
   * @param {Object} req - Request
   * @param {Object} res - Response
   * @param {Object} next - Next
   * @return {void}
   */
  module.router.get('/search', async (req, res, next) => {

    if (!req.query.q) return next(module.lib.httpError(400, 'Please provide query params.'));

    const query = JSON.parse(req.query.q);

    const filter = { annotation: { $regex: query, $options: 'i' } };

    const topic = await module.model.findOne(filter).catch(next);
    
    if (!topic) return next(module.lib.httpError(404, `Topic '${ query }' not found`));

    let topics = [ topic ];

    for (let i = 0; i < topics.length; i++) {

      if (!topics[i].last) {

        const nextTopics = (await topics[i].populate('nextTopics')).nextTopics;

        for (const nextTopic of nextTopics) topics.push(nextTopic);
      }
    }
    
    const topicsIds = topics.map(topic => topic._id);

    const questions = await global.modules.questions.model.find({ annotations: { $in: topicsIds } }).catch(next);
    // const questions = await global.modules.questions.model.find({ annotations: { $in: topicsIds } }).populate('annotations').catch(next);

    const numbers = questions.map(question => question.number);

    res.send({ questions: numbers });
    // res.send({ questions, topic });
  });

  /**
   * Create
   *
   * @param {Object} req - Request
   * @param {Object} res - Response
   * @param {Object} next - Next
   * @return {void}
   */
  module.router.post('/', async (req, res, next) => {
    const topic = await module.model.create(req.body).catch(next);

    if (!req.body.root) await module.model.updateOne({ _id: req.body.prevTopic }, { $push: { nextTopics: topic._id }, last: false }).catch(next);

    res.send({ data: topic });
  });

  /**
   * Update
   *
   * @param {Object} req - Request
   * @param {Object} res - Response
   * @param {Object} next - Next
   * @return {void}
   */
  module.router.put('/:id', async (req, res, next) => {
    const data = await module.model.findByIdAndUpdate(req.params.id, req.body, { new: true }).catch(next);

    res.send({ data });
  });
  
};
