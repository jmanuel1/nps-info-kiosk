import * as fs from 'fs';
import * as path from 'path';

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

    const pth = isURLPathEmpty(this.req.path) ? 'index.html' : this.req.path;
    // Current working directory is root of sails project
    const pathToFile = path.join('assets/dist', pth);
    let fileContents: string;
    try {
      fileContents = fs.readFileSync(pathToFile, 'utf8');
    } catch (err) {
      // To be compatible with the client router, just get index.html
      fileContents = fs.readFileSync('assets/dist/index.html', 'utf8');
    }
    return this.res.status(200).set('Content-Type', getContentType(pth))
      .send(fileContents);

  }


};

function getContentType(pth: string) {
  const extension = path.extname(pth);
  const typeMap = { '.css': 'text/css' };
  return typeMap[extension] || 'text/html';
}

function isURLPathEmpty(pth: string) {
  return !pth || pth === '' || pth === '/';
}
