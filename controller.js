require('babel-register')({
    presets: ['react']
});
var React = require('react');
var ReactDOMServer = require('react-dom/server');
var Banner4Server = require('./public/js/banner4-server.js');


/**
 * Main controller
 */
var controller = {

    /**
     * Serves initial page display
     */
    index : async function(req, res) {

        // Get any server side campaigns

        const https = require('https')

        const data = JSON.stringify({ 
            "action": "Banner4ServerSide - Retrieve", 
            "source": { 
                "channel": "Server" 
            },
            "user": {
                "id": "testuser" // make sure to update this with a real user identifier...
            }
        });

        const options = {
            hostname: process.env.IS_AUTHEVENT_HOSTNAME, // do not include https://
            path: process.env.IS_AUTHEVENT_PATH,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': data.length,
                'Authorization': 'Basic ' + process.env.IS_API_CREDENTIALS
            },
            timeout: 1000 // 1s
        };

        const eventRequest = https.request(options, eventResponse => {

            eventResponse.on('data', d => {
                const jsonResponse = JSON.parse(d);
                
                if (jsonResponse.campaignResponses.length > 0) {
                    
                    let props = {
                        ctaUrl: jsonResponse.campaignResponses[0].payload.ctaUrl,
                        subheader: jsonResponse.campaignResponses[0].payload.subheader,
                        ctaText: jsonResponse.campaignResponses[0].payload.ctaText,
                        imageURL: jsonResponse.campaignResponses[0].payload.imageURL,
                        header: jsonResponse.campaignResponses[0].payload.header,
                        experience: jsonResponse.campaignResponses[0].payload.experience,
                        userGroup: jsonResponse.campaignResponses[0].payload.userGroup,
                        campaign: jsonResponse.campaignResponses[0].payload.campaign 
                    };
                    
                    const html = ReactDOMServer.renderToString(React.createElement(Banner4Server, props));
                    
                    res.render("pages/index", { campaigns : [ { html : html } ], beaconURL : process.env.IS_BEACON_URL } );

                } else {
                	console.log('no campaign');
                    res.render("pages/index", { beaconURL : process.env.IS_BEACON_URL } );
                
                }
            })
        });

        eventRequest.on('error', error => {
        	console.log(error);
            res.render("pages/index", { beaconURL : process.env.IS_BEACON_URL } );
        });

        eventRequest.on('timeout', error => {
            console.log('timeout');
            eventRequest.abort();
        });

        eventRequest.write(data);
        eventRequest.end();
    }

}

module.exports = controller;