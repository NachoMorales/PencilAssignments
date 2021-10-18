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

    const data = await module.model.find(filter).catch(next);

    res.send({ data });
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
    const data = await module.model.create(req.body).catch(next);

    res.send({ data });
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
