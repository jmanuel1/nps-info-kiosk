import { request } from 'https';
import { stringify } from 'querystring';

declare var sails: any;

/* NOTE and shrug: For some unknown reason, using a machine action doesn't work
/* because something else finishes the request early. */
module.exports = async function search(req, res) {
    const NPS_API_KEY = getNPSAPIKey();
    const term: string = req.param('term');
    // For now, just make the park codes searchable
    const npsResponse =
      await makeNPSRequest('GET', '/parks', { parkCode: term }, NPS_API_KEY);
    console.log(res.getHeaders());
    res.status(200).write(JSON.stringify({ results: npsResponse }));
    return res.end();
  };


function makeNPSRequest(
  method: string,
  endpoint: string,
  parameters: object,
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
  return process.env.NPS_API_KEY;
}
