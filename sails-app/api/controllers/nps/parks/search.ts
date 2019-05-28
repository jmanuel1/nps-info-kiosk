import { Request, Response } from 'express';
import { NPSResponse, fulfillSearchRequest } from '../nps-data-api';
import * as Fuse from 'fuse.js';

// Some intermediate types are used to properly extend the NPSResponse
// interface
type NPSResponseDatum = NPSResponse['data'][0];
interface NPSParksResponseDatum extends NPSResponseDatum {
  designation: string;
}
interface NPSParksResponse extends NPSResponse {
  data: NPSParksResponseDatum[];
}

/* NOTE and shrug: For some unknown reason, using a machine action doesn't work
/* because something else finishes the request early. */
// TODO: search by user-friendly state names as well as state codes
module.exports = async function search(req: Request, res: Response) {
  await fulfillSearchRequest(
    req,
    res,
    {
      endpoint: '/parks',
      responseTransform: designationFilter(req.param('designation')),
      ourParameters: [ 'term', 'state' ],
      parameterMapping: { term: 'q', state: 'stateCode' }
    }
  );
};

function designationFilter(designation: string) {
  return (npsResponse: NPSParksResponse) => {
    return filterByDesignation(npsResponse, designation);
  };
}

function filterByDesignation(
  npsResponse: NPSParksResponse, designation: string
) {
  const parks = npsResponse.data;

  // Don't filter if no designation has been specified
  if (!designation) {
    return npsResponse;
  }

  // fuzzy search
  const searchOptions = {
    shouldSort: true,
    threshold: 0.6,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: [
      'designation'
    ]
  };
  const fuse = new Fuse(parks, searchOptions);
  const filteredParks = fuse.search(designation);

  return { ...npsResponse, data: filteredParks };
}
