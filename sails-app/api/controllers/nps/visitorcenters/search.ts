/**
 * Module dependencies
 */

import { request } from 'https';
import { stringify } from 'querystring';
import { Request, Response } from 'express';
import { arrangeAddresses, makeNPSRequest } from '../nps-data-api';

declare var sails: any;

class Parameters {
  parkCode: string;
}

class NPSParameters {
  parkCode: string;
  fields: string[];

  static fromOurParameters(parameters: Parameters): NPSParameters {
    const npsParameters = new NPSParameters();
    npsParameters.parkCode = parameters.parkCode;
    npsParameters.fields = [ 'addresses' ];

    return npsParameters;
  }

  toQueryString(): string {
    return stringify({
      ...this,
      fields: this.fields.join()
    });
  }
}

interface NPSResponse {
  data: { addresses: { type: string }[] }[];
}

/**
 * nps/visitorcenters/search.js
 *
 * Search for visitor centers.
 */
module.exports = async function search(req: Request, res: Response) {
  const NPS_API_KEY = sails.helpers.getNpsApiKey();
  const parameters = getParameters(req);
  const npsParameters = NPSParameters.fromOurParameters(parameters);
  const endpoint = '/visitorcenters';
  const npsResponse: NPSResponse =
    await makeNPSRequest('GET', endpoint, npsParameters, NPS_API_KEY);
  const ourResponse = {
    results: arrangeAddresses(npsResponse)
  };
  res.status(200).write(JSON.stringify(ourResponse));
  return res.end();
};

function getParameters(req: Request): Parameters {
  return {
    parkCode: req.param('parkCode')
  };
}

function makeNPSRequest(
  method: string,
  endpoint: string,
  parameters: NPSParameters,
  apiKey: string): Promise<NPSResponse> {
  let normalizedEndpoint: string;
  if (endpoint[0] === '/') {
    normalizedEndpoint = endpoint;
  } else {
    normalizedEndpoint = '/' + endpoint;
  }

  const query = parameters.toQueryString();

  return new Promise((resolve, reject) => {
    const req = request({
      headers: { 'X-Api-Key': apiKey },
      method,
      hostname: 'developer.nps.gov',
      path: `/api/v1${normalizedEndpoint}?${query}`,
      agent: false
    }, (res) => {
      res.setEncoding('utf8');
      let body = '';
      res.on('data', (chunk) => {
        body += chunk;
      });
      res.on('end', () => {
        sails.log.debug('The response body from the NPS Data API:');
        sails.log.debug(body);
        resolve(JSON.parse(body));
      });
    });
    req.on('error', () => {
      reject(new Error('Failed to access the NPS Data API!'));
    });
    req.end(); // must close the request, or we get a 'socket hang up' error
  });
}
