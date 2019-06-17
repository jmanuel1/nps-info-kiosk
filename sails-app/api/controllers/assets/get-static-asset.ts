import * as fs from 'fs';
import * as path from 'path';
import { Request, Response } from 'express';

/* Gets a static asset from assets/dist. */
module.exports = {


  friendlyName: 'Retrieve static assets',


  description: 'Get any static asset under assets/dist.',


  exits: {

    success: {
      description: 'The asset was retrieved successfully.'
    }

  },


  async fn() {
    // create req, res names instead
    const that: { req: Request, res: Response } = this;
    const pth = isURLPathEmpty(this.req.path) ? 'index.html' : this.req.path;
    // Current working directory is root of sails project
    let pathToFile = path.join('assets/dist', pth);
    let fileContents: string | Buffer;
    const contentType = getContentType(pth);
    const isBinary = isTypeBinary(contentType);
    try {
      fileContents = fs.readFileSync(pathToFile, isBinary ? null : 'utf8');
    } catch (err) {
      // To be compatible with the client router, just get index.html
      fileContents = fs.readFileSync('assets/dist/index.html', 'utf8');
      pathToFile = 'assets/dist/index.html';
    }
    return that.res.status(200).set('Content-Type', contentType)
      .send(fileContents);
    // that.res.type(getContentType(pth)).sendFile(pathToFile, { root: process.cwd() });

  }


};

function isTypeBinary(type: string) {
  // Images must be binary, or they won't send!
  return new Set(['image/png', 'image/x-icon']).has(type);
}

function getContentType(pth: string): string {
  const extension = path.extname(pth);
  const typeMap = { '.css': 'text/css', '.svg': 'image/svg+xml', '.js': 'application/javascript', '.png': 'image/png', '.ico': 'image/x-icon' };
  return typeMap[extension] || 'text/html';
}

function isURLPathEmpty(pth: string) {
  return !pth || pth === '' || pth === '/';
}
