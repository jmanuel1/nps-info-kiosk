/**
 * Module dependencies
 */

import { fulfillSearchRequest } from '../nps-data-api';

/**
 * nps/places/search.ts
 *
 * Search places.
 */
module.exports = async function search(req, res) {

  await fulfillSearchRequest(req, res, { endpoint: '/places' });

};
