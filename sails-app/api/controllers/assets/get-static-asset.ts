const fs = require('fs');
const path = require('path');

/* Gets a static asset from assets/dist. */
module.exports = {


  friendlyName: 'Retrieve static assets',


  description: 'Get any static asset under assets/dist.',


  exits: {

    success: {
      description: 'The asset was retrieved successfully.'
    }

  },


  fn: async function(inputs) {

    const pth = isURLPathEmpty(this.req.path) ? 'index.html' : this.req.path;
    // Current working directory is root of sails project
    const pathToFile = path.join('assets/dist', pth);
    let fileContents;
    try {
      fileContents = fs.readFileSync(pathToFile, 'utf8');
    } catch (err) {
      // To be compatible with the client router, just get index.html
      fileContents = fs.readFileSync('assets/dist/index.html');
    }
    return this.res.status(200).set('Content-Type', 'text/html').send(fileContents);

  }


};

function isURLPathEmpty(pth) {
  return !pth || pth === '' || pth === '/';
}
