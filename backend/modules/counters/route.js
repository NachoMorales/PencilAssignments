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
    const counter = await module.model.create(req.body).catch(next);

    res.send({ data: counter });
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
