/**
 * Module dependencies
 */

import { fulfillSearchRequest } from '../nps-data-api';


/**
 * nps/articles/search.ts
 *
 * Search articles.
 */
module.exports = async function search(req, res) {

  await fulfillSearchRequest(req, res, { endpoint: '/articles' });

};
