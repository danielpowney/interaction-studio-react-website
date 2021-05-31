# Interaction Studio on a React Website
Hello world node.js app which shows how Interaction Studio can work with a React based website

Page template uses EJS template engine. Index page is located here: ./views/pages/index.ejs

Express is used for the MVC pattern. routes.js and controller.js handle HTTP requests and return the page HTML.

Make sure to set the following environment variables: 
* IS_API_CREDENTIALS
* IS_AUTHEVENT_HOSTNAME
* IS_AUTHEVENT_PATH
* IS_BEACON_URL

> Note: The example code in this repository is for educational purposes only

## Patterns

There are 4 patterns to integrate Interaction Studio campaigns with React components on a website.

1. IS replaces placeholder React component content
2. IS updates React component state directly
3. IS updates store which React component subscribes to
4. Server side rendered React component which uses Event API and server side campaigns

The corresponding React components are located in the /public/js folder.

### 1. IS replaces placeholder React component content

HTML contains a div `<div id="banner1"></div>` which is configured as a content zone in the sitemap. The JavaScript file banner-with-cta3.js attaches a placeholder React component to the element. 

The React component shouldComponentUpdate() returns false which allows IS to manipulate the DOM. The IS web template replaces the React component HTML with campaign generated HTML.

### 2. IS updates React component state directly

HTML contains a div `<div id="banner2"></div>`. The JavaScript file banner-with-cta1.js attaches a React component to the element. This element contains some default state data for ctaUrl, subheader, header, ctaText and imageURL which is used when rendering the React component. 

The rendered React component is made available to window object via reference `<Banner2SetState ref={Banner2SetState => {window.Banner2SetState = Banner2SetState}} />`. 

The IS web template updates the state of the React component which makes it automatically re-render. Handlebars and CSS are not required in the template.

```javascript
setTimeout(function(){
    Banner2SetState.setState({
        ctaUrl: context.ctaUrl,
        subheader: context.subheader,
        ctaText: context.ctaText,
        imageURL: context.imageURL,
        header: context.header,
        experience : context.experience,
        userGroup : context.userGroup,
        campaign : context.campaign
    })}, 1000
);
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

The React component subscribes to any Redux store changes. Whener the store changes, the state of the React component is updated which causes it to re-render.
```javascript
myStore.subscribe(() => Banner3ReduxStore.setState(myStore.getState()));
```

### 4. Server side rendered React component which uses Event API and server side campaigns

The controller.js file handles incoming HTTP requests and returns the page HTML. When a request comes in, it calls the IS API to retrieve any server side campaigns. The HTTP request includes a 1 second timeout. If a campaign response is returned, a React component is rendered server side using the campaign data passed in as properties. The HTML of the React component is output directly into the EJS template e.g. `<%- campaigns[0].html %>`