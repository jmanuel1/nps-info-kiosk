/**
 * Module dependencies
 */

import { stringify } from 'querystring';
import { Request, Response } from 'express';
import { arrangeAddresses, makeNPSRequest, NPSResponse as BaseNPSResponse } from '../nps-data-api';

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

interface NPSResponse extends BaseNPSResponse {
  data: { addresses: { type: string }[] }[];
}

/**
 * nps/visitorcenters/search.ts
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
