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

    const urlParts = module.lib.url.parse(req.url, true);
    const filter = urlParts.query._filters ? JSON.parse(urlParts.query._filters) : {};

    const topics = await module.model.find(filter).catch(next);

    for (const topic of topics) {
      // if (topic.nextTopics) await topic.populate('nextTopics');
      // let lastTopic = topic;

      // while (lastTopic.prevTopic) {
      //   lastTopic = (await lastTopic.populate('prevTopic')).prevTopic;
      //   console.log(lastTopic);
      // }
    }

    res.send({ data: topics });
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

    const urlParts = module.lib.url.parse(req.url, true);

    if (!urlParts.query.q) return res.send({ error: 'ERRORRRRRRRR' })

    const filter = {
      annotation: { $regex: JSON.parse(urlParts.query.q), $options: 'i' }
    };

    // ----------------- FUNCIONA PERO NO AL 100% -----------------
    
    // const topic = await module.model.findOne(filter).catch(next);
    
    // let topicsIds = [ topic._id ];
    
    // let nextT = topic;

    // while (!nextT.last) {
      //   for (const nextTopic of nextT.nextTopics) {
        //     nextT = await nextTopic.populate('nextTopics');
        
        //     topicsIds.push(nextT._id);
        //     console.log(nextTopic.last);
    //   }
    // }
    
    // ----------------- FUNCIONA PERO NO AL 100% -----------------



    const topic = await module.model.findOne(filter).catch(next);
    
    let topics = [ topic ];

    for (let i = 0; i < topics.length; i++) {
      if (!topics[i].last) {
        const nextTopics = (await topics[i].populate('nextTopics')).nextTopics;
        for (const nextTopic of nextTopics) topics.push(nextTopic)
      }
    }
    
    const topicsIds = topics.map(topic => topic._id);


    const questions = await global.modules.questions.model.find({ annotations: { $in: topicsIds } }).catch(next);

    const numbers = questions.map(question => question.number);

    res.send({ questions: numbers });
    // res.send({ data: topic, topicsIds });
  });

  /**
   * FindById
   *
   * @param {Object} req - Request
   * @param {Object} res - Response
   * @param {Object} next - Next
   * @return {void}
   */
  module.router.get('/:id', /**global.helpers.security.auth(['administrator']),**/ (req, res, next) => {
    global.helpers.database.findById(req, res, module.model)
      .then(result => res.send(result))
      .catch(next);
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
    const topic = await module.model.findByIdAndUpdate(req.params.id, req.body, { new: true }).catch(next);

    res.send({ data: topic });
  });
  
  /**
   * Delete
   *
   * @param {Object} req - Request
   * @param {Object} res - Response
   * @param {Object} next - Next
   * @return {void}
   */
  module.router.delete('/:id', /**global.helpers.security.auth(['administrator']),**/ (req, res, next) => {
    global.helpers.database.delete(req, res, module.model)
      .then(result => res.send(result))
      .catch(next);
  });
  
};
