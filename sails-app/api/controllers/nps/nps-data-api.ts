/**
 * nps/nps-data-api.ts
 *
 * Wrappers around the NPS Data API to make it more pleasant.
 */

/**
 * Module dependencies
 */

import { request } from 'https';
import { stringify } from 'querystring';
import { Request, Response } from 'express';

declare var sails: any;

export class Parameters {
  parkCode: string;
}

export class NPSParameters {
  parkCode: string;
  fields: string[];

  static fromOurParameters(
    parameters: Parameters,
    parameterMapping: { [ param: string ]: string } = {}
  ): NPSParameters {
    const npsParameters = new NPSParameters();
    for (const param in parameterMapping) {
      if (parameterMapping.hasOwnProperty(param)) {
        npsParameters[parameterMapping[param]] = parameters[param];
      }
    }
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

export interface NPSResponse {
  data: { addresses: { type: string }[] }[];
}

export interface SearchOptions {
  endpoint: string;
  responseTransform?: (npsResponse: NPSResponse) => any;
  ourParameters?: string[];
  parameterMapping?: { [ parameter: string ]: string };
}

export async function fulfillSearchRequest(
  req: Request,
  res: Response,
  {
    endpoint,
    responseTransform = (x) => x,
    ourParameters = [],
    parameterMapping = {}
  }: SearchOptions
) {
  const NPS_API_KEY = sails.helpers.getNpsApiKey();
  const parameters = getParameters(req, ourParameters);
  const npsParameters =
    NPSParameters.fromOurParameters(parameters, parameterMapping);
  const npsResponse: NPSResponse =
    await makeNPSRequest('GET', endpoint, npsParameters, NPS_API_KEY);
  const ourResponse = {
    results: responseTransform(npsResponse)
  };
  res.status(200).write(JSON.stringify(ourResponse));
  return res.end();
}

export function arrangeAddresses(npsResponse: NPSResponse) {
  const data = npsResponse.data.map((location) => {
    const addresses = location.addresses;
    // Don't do anything if there are no addresses
    if (!addresses) {
      return location;
    }
    const physical = addresses.filter((address) => {
      return address.type === 'Physical';
    })[0];
    const mailing = addresses.filter((address) => {
      return address.type === 'Mailing';
    })[0];
    return {
      ...location,
      addresses: {
        physical, mailing
      }
    };
  });
  return { ...npsResponse, data };
}

export function getParameters(
  req: Request, params: string[] = []
): Parameters {
  const paramObject = {};
  for (const param of params) {
    paramObject[param] = req.param(param);
  }
  return {
    ...paramObject,
    parkCode: req.param('parkCode')
  };
}

export function makeNPSRequest(
  method: string,
  endpoint: string,
  parameters: NPSParameters,
  apiKey: string
): Promise<NPSResponse> {
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
        try {
          resolve(JSON.parse(body));
        } catch (err) { // sometimes we get something unexpected
          sails.log.error('Failed to parse response!');
          sails.log.error(err);
          sails.log.error(`Endpoint: ${endpoint}`);
          reject(err);
        }
      });
    });
    req.on('error', () => {
      reject(new Error('Failed to access the NPS Data API!'));
    });
    req.end(); // must close the request, or we get a 'socket hang up' error
  });
}
