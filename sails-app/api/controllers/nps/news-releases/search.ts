/**
 * Module dependencies
 */

import { fulfillSearchRequest } from '../nps-data-api';


/**
 * nps/news-releases/search.ts
 *
 * Search news releases.
 */
module.exports = async function search(req, res) {

  await fulfillSearchRequest(req, res, { endpoint: 'newsreleases' });

};
