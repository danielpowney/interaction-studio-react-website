var allowedDomains = [
    "localhost:3000"
];

Evergage.init().then(() => {
    
    // Custom event listeners for React component UI events
    document.addEventListener('toggle-btn-click', () => {
        Evergage.sendEvent({
            'action' : 'Toggle Btn Click'
        });
    });

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
             * Home page
             * 
             * Match based on URL
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