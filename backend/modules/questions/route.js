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
  module.router.get('/', /**global.helpers.security.auth(['administrator']),**/ (req, res, next) => {
    global.helpers.database.find(req, res, module.model)
      .then(result => res.send(result))
      .catch(next);
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
    const question = await module.model.create(req.body).catch(next);

    res.send({ data: question });
  });

  /**
   * Update
   *
   * @param {Object} req - Request
   * @param {Object} res - Response
   * @param {Object} next - Next
   * @return {void}
   */
  module.router.put('/:id', /**global.helpers.security.auth(['administrator']),**/ (req, res, next) => {
    global.helpers.database.update(req, res, module.model)
      .then(result => res.send(result))
      .catch(next);
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
