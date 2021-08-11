# Interaction Studio on a React Website
Hello world node.js app which shows how Interaction Studio can work with a React based website for both personalisation and listening

Page template uses EJS template engine. Index page is located here: ./views/pages/index.ejs

Express is used for the MVC pattern. routes.js and controller.js handle HTTP requests and return the page HTML.

Make sure to set the following environment variables: 
* IS_API_CREDENTIALS
* IS_AUTHEVENT_HOSTNAME
* IS_AUTHEVENT_PATH
* IS_BEACON_URL

The React components are located in the /public/js folder

The Interaction Studio sitemap and templates used are located in the /interaction-studio folder. You'll need to setup these in Interaction Studio with corresponding web campaigns and a server side campaign based on the templates.

The app requires node.js installed. 
Use the following commands to initialise and start the app:
* npm init
* node app.js
Then navigate to localhost:3000 in your browser. See screenshot.PNG for an example.

> Notes:
* All code in this repository is for educational purposes only

## Personalisation

There are 4 patterns for Interaction Studio campaigns to personalise content inside React components on a website.

1. IS replaces placeholder React component content
2. IS updates React component state directly
3. IS updates store which React component subscribes to
4. Server side rendered React component which uses Event API and server side campaigns

### 1. IS replaces placeholder React component content

HTML contains a div `<div id="banner1"></div>` which is configured as a content zone in the sitemap. The JavaScript file banner1-placeholder.js attaches a placeholder React component to the element. 

The React component shouldComponentUpdate() returns false which allows IS to manipulate the DOM. The IS web template replaces the React component HTML with campaign generated HTML.

### 2. IS updates React component state directly

HTML contains a div `<div id="banner2"></div>`. The JavaScript file banner-with-cta1.js attaches a React component to the element. This element contains some default state data for ctaUrl, subheader, header, ctaText and imageURL which is used when rendering the React component. 

The rendered React component is made available to window object via reference `<Banner2SetState ref={Banner2SetState => {window.Banner2SetState = Banner2SetState}} />`. 

The IS web template updates the state of the React component which makes it automatically re-render. Handlebars and CSS are not required in the template.

```javascript
return Evergage.util.resolveWhenTrue.bind(() => {

    if (Evergage.cashDom("#banner2 .banner").length > 0 ) {

        Evergage.DisplayUtils.bind(buildBindId(context));

        Banner2SetState.setState({
            ctaUrl: context.ctaUrl,
            subheader: context.subheader,
            ctaText: context.ctaText,
            imageURL: context.imageURL,
            header: context.header,
            experience : context.experience,
            userGroup : context.userGroup,
            campaign : context.campaign
        });

        return true;
    }
});
```

### 3. IS updates store which React component subscribes to

HTML contains a div `<div id="banner3"></div>`. The JavaScript file banner3-reduxStore.js creates a Redux store and a React component. 

```javascript
const myStore = Redux.createStore(myReducer);
```

The initial state of the React component comes from the Redux store getState() function.

```javascript
/**
 * Constructor
 */
constructor(props) {
    super(props);
    this.state = myStore.getState();
}
```

The IS web template dispatches an action to update the Redux store with new data. Handlebars and CSS are not required in the template.

```javascript
myStore.dispatch({ 
    type : 'BANNER_UPDATE', 
    payload : { 
        ctaUrl: context.ctaUrl,
        subheader: context.subheader,
        ctaText: context.ctaText,
        imageURL: context.imageURL,
        header: context.header,
        experience : context.experience,
        userGroup : context.userGroup,
        campaign : context.campaign
    }
});
```

The rendered React component is made available to window object via reference `<Banner3ReduxStore ref={Banner3ReduxStore => {window.Banner3ReduxStore = Banner3ReduxStore}} />`. 

The React component subscribes to any Redux store changes. Whenever the store changes, the state of the React component is updated which causes it to re-render.
```javascript
myStore.subscribe(() => Banner3ReduxStore.setState(myStore.getState()));
```

### 4. Server side rendered React component which uses Event API and server side campaigns

The controller.js file handles incoming HTTP requests and returns the page HTML. When a request comes in, it calls the IS API to retrieve any server side campaigns. The HTTP request includes a 1 second timeout. If a campaign response is returned, a React component is rendered server side using the campaign data passed in as properties. 

```javascript
let props = {
    ctaUrl: jsonResponse.campaignResponses[0].payload.ctaUrl,
    subheader: jsonResponse.campaignResponses[0].payload.subheader,
    ctaText: jsonResponse.campaignResponses[0].payload.ctaText,
    imageURL: jsonResponse.campaignResponses[0].payload.imageURL,
    header: jsonResponse.campaignResponses[0].payload.header
};

const html = ReactDOMServer.renderToString(React.createElement(Banner4Server, props));
```

The HTML of the React component is output directly into the EJS template e.g. `<%- campaigns[0].html %>`

Note that a separate API request is needed to send campaign stats (e.g. impressions, clicks etc...) for server side campaigns

## Listening

The most elegant way to listen to UI events within a React component is to change the React component to send custom JS events which Interaction Studio can listen to.

For example, the ToggleBtn component sends a custom JavaScript event whenever the button is clicked

```javascript
handleClick() {
    this.setState(prevState => ({
        isToggleOn : !prevState.isToggleOn,
        clicks : prevState.clicks + 1
    }));
    document.dispatchEvent(new CustomEvent('toggle-btn-click'));
}

/**
 * DOM rendering logic
 */
render() {
    return (
       <div className="toggle-btn">
           <a onClick={this.handleClick} className="slds-button slds-button_neutral">{this.state.isToggleOn ? 'ON' : 'OFF'}</a>
           <p>Clicks: {this.state.clicks}</p>
       </div>
    )
}
```

Then in the Interaction Studio sitemap code, an event listener catches the custom JavaScript event and then sends a "tracking" event to Interaction Studio as follows:
```javascript
// Custom event listeners for React component UI events
document.addEventListener('toggle-btn-click', () => {
    Evergage.sendEvent({
        'action' : 'Toggle Btn Click'
    });
});
```
