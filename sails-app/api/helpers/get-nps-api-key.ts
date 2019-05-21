module.exports = {


  friendlyName: 'Get the NPS Data API key',


  description:
    'Get the NPS Data API key from the environment variable NPS_API_KEY',


  inputs: {

  },


  exits: {

    success: {
      outputFriendlyName: 'NPS Data API key',
    },

  },

  sync: true,

  fn(inputs): string {

    // The server start script checks that the environment variable exists, so
    // we can just return it
    return process.env.NPS_API_KEY;

  }


};
