var allowedDomains = [
    "localhost:3000"
];

Evergage.init().then(() => {

    //site-map here.
    const config = {

        //Events or attributes that should be captured on every page that is matched as a page type
        global: {
            onActionEvent: (actionEvent) => {
                return actionEvent;
            },
            contentZones: [],
            listeners: []
        },

        pageTypeDefault: {
            name: "default"
        },

        pageTypes: [

            /**
             * Main page
             */
            {
                name: "Home",
                action: "View Home",
                isMatch: () => /^\/$/.test(window.location.pathname),
                contentZones: [{
                    name: "banner1",
                    selector: "#banner1"
                }],
                listeners: []
            }
        ]
    };

    Evergage.initSitemap(config);
});