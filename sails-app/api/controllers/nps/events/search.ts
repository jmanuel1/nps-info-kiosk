/**
 * Module dependencies
 */

import { fulfillSearchRequest } from '../nps-data-api';


/**
 * nps/events/search.ts
 *
 * Search events.
 */
module.exports = async function search(req, res) {

  await fulfillSearchRequest(req, res, { endpoint: '/events' });

};
