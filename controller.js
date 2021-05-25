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
	        url : "https://dpowney1463884.australia-3.evergage.com/api2/authevent/dev",
	        method : 'POST',
	        headers: {
		        'Content-Type': 'application/json',
		        'Authorization': 'Basic QUFDRTg1RjItMzg4Ny00OEIxLUJEQUEtNjRGQzI2NUNCQTlDOmxJT3pHUXpiX0JhbWI1dzNRWnhOOW5ESV9WT2ZhTlNBTEtOaTVLT0w0UXM='
		        // AACE85F2-3887-48B1-BDAA-64FC265CBA9C:lIOzGQzb_Bamb5w3QZxN9nDI_VOfaNSALKNi5KOL4Qs
		        // AACE9147-F130-4632-B34F-A35480BDF5FF:Oz2fUIcHRKteqrdEDMlMpa97DqLk0JMINiD80riM8TE
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

		res.render("pages/index", { campaigns : [ { html : html } ] } );
	}

}

module.exports = controller;