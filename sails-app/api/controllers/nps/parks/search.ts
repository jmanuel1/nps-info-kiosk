import { request } from 'https';
import { stringify } from 'querystring';

declare var sails: any;

class Parameters {
  term: string;
  state: string;
  designation: string;
}

class NPSParameters {
  parkCode: string;
  stateCode: string;

  static fromOurParameters(parameters: Parameters) {
    return {
      parkCode: parameters.term,
      stateCode: parameters.state
    };
  }
}

/* NOTE and shrug: For some unknown reason, using a machine action doesn't work
/* because something else finishes the request early. */
module.exports = async function search(req, res) {
    let NPS_API_KEY;
    try {
      NPS_API_KEY = getNPSAPIKey();
    } catch (e) {
      sails.log.error('No API key for the NPS Data API!');
      sails.log.error('Make sure to set an environment variable NPS_API_KEY=<your API key>.');
      return res.serverError();
    }
    const parameters = getParameters(req);
    // For now, just make the park codes searchable
    const npsResponse =
      await makeNPSRequest('GET', '/parks', NPSParameters.fromOurParameters(parameters), NPS_API_KEY);
    const ourResponse = {
      results: filterByDesignation(npsResponse, parameters.designation)
    };

    // sails.log.debug(res.getHeaders());
    res.status(200).write(JSON.stringify(ourResponse));
    return res.end();
  };

function filterByDesignation(npsResponse, designation: string) {
  const parks = npsResponse.data;

  // Don't filter if no designation has been specified
  if (!designation) {
    return npsResponse;
  }

  // TODO: Don't use exact matching
  const filteredParks = parks.filter((park) => {
    return park.designation === designation;
  });

  return { ...npsResponse, data: filteredParks };
}

function getParameters(req): Parameters {
  return {
    term: req.param('term'),
    state: req.param('state'),
    designation: req.param('designation')
  };
}

function makeNPSRequest(
  method: string,
  endpoint: string,
  parameters: NPSParameters,
  apiKey: string): Promise<object> {
  let normalizedEndpoint: string;
  if (endpoint[0] === '/') {
    normalizedEndpoint = endpoint;
  } else {
    normalizedEndpoint = '/' + endpoint;
  }

  const query = stringify(parameters);

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
    req.end(); // must close the request, or we get a 'socket hang up' error
  });
}

function getNPSAPIKey(): string {
  // Get the API key from an environment variable
  const key = process.env.NPS_API_KEY;

  if (!key) {
    throw new Error('No NPS API key');
  }

  return key;
}