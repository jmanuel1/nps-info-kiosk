/**
 * Module dependencies
 */

import { fulfillSearchRequest } from '../nps-data-api';
import { Request, Response } from 'express';

/**
 * nps/lesson-plans/search.ts
 *
 * Search lesson plans.
 */
module.exports = async function search(req: Request, res: Response) {

  await fulfillSearchRequest(req, res, { endpoint: '/lessonplans' });

};
