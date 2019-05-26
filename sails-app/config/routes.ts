/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  //  ╦ ╦╔═╗╔╗ ╔═╗╔═╗╔═╗╔═╗╔═╗
  //  ║║║║╣ ╠╩╗╠═╝╠═╣║ ╦║╣ ╚═╗
  //  ╚╩╝╚═╝╚═╝╩  ╩ ╩╚═╝╚═╝╚═╝
  'GET /':                   { action: 'assets/get-static-asset' },

  // Static pages are in assets/dist
  'GET /*':                  { action: 'assets/get-static-asset' },


  //  ╔═╗╔═╗╦  ╔═╗╔╗╔╔╦╗╔═╗╔═╗╦╔╗╔╔╦╗╔═╗
  //  ╠═╣╠═╝║  ║╣ ║║║ ║║╠═╝║ ║║║║║ ║ ╚═╗
  //  ╩ ╩╩  ╩  ╚═╝╝╚╝═╩╝╩  ╚═╝╩╝╚╝ ╩ ╚═╝
  // Note that, in this app, these API endpoints may be accessed using the
  // `Cloud.*()` methods from the Parasails library, or by using those method
  // names as the `action` in <ajax-form>.
  // TODO: Use Sails Blueprints to reduce repetition.
  'GET /api/v1/nps/parks/search': { action: 'nps/parks/search' },
  'GET /api/v1/nps/visitorcenters/search': {
    action: 'nps/visitorcenters/search'
  },
  'GET /api/v1/nps/campgrounds/search': {
    action: 'nps/campgrounds/search'
  },
  'GET /api/v1/nps/alerts/search': {
    action: 'nps/alerts/search'
  },
  'GET /api/v1/nps/articles/search': {
    action: 'nps/articles/search'
  },
  'GET /api/v1/nps/events/search': {
    action: 'nps/events/search'
  },
  'GET /api/v1/nps/news-releases/search': {
    action: 'nps/news-releases/search'
  }

};
