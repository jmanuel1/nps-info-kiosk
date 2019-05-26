/**
 * Module dependencies
 */

import { fulfillSearchRequest } from '../nps-data-api';

/**
 * nps/alerts/search.ts
 *
 * Search alerts.
 */
module.exports = async function search(req, res) {

  await fulfillSearchRequest(req, res, { endpoint: '/alerts' });

};
