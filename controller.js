require('babel-register')({
    presets: ['react']
});
var React = require('react');
var ReactDOMServer = require('react-dom/server');
var BannerWithCTA2 = require('./public/js/banner-with-cta2');


/**
 * Main controller
 */
var controller = {

    /**
     * Serves initial page display
     */
    index : async function(req, res) {

        // Get server side campaign
        let campaigns = [];

        const request = require('request-promise');
        const options = {
            url : process.env.IS_AUTHEVENT_URL,
            method : 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + process.env.IS_API_CREDENTIALS
            },
            body : JSON.stringify({ 
                    "action": "hello world", 
                    "source": { 
                    "channel": "Server" 
                },
                "user": {
                    "id": "testuser"
                }
            }) 
        };

        try {
            var response = await request(options);
            const jsonResponse = JSON.parse(response);
            campaigns = jsonResponse.campaignResponses;
        } catch (e) {
            console.log(e);
        }

        let props = {
            ctaUrl: campaigns[0].payload.ctaUrl,
            subheader: campaigns[0].payload.subheader,
            ctaText: campaigns[0].payload.ctaText,
            imageURL: campaigns[0].payload.imageURL,
            header: campaigns[0].payload.header
        };
        const html = ReactDOMServer.renderToString(React.createElement(BannerWithCTA2, props));

        res.render("pages/index", { campaigns : [ { html : html } ], beaconURL : process.env.IS_BEACON_URL } );
    }

}

module.exports = controller;