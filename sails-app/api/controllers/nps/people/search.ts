/**
 * Module dependencies
 */

import { fulfillSearchRequest } from '../nps-data-api';


/**
 * nps/people/search.ts
 *
 * Search people.
 */
module.exports = async function search(req, res) {

  await fulfillSearchRequest(req, res, { endpoint: '/people' });

};
