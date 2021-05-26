# Interaction Studio on a React Website
Hello world node.js app which shows how Interaction Studio can work with a React based website

Page template uses EJS template engine. Index page is located here: ./views/pages/index.ejs

Express is used for the MVC pattern. routes.js and controller.js handle HTTP requests and return the page HTML.

Make sure to set the following environment variables: 
* IS_API_CREDENTIALS
* IS_AUTHEVENT_URL
* IS_BEACON_URL

> Note: The example code in this repository is for educational purposes only

## Patterns

There are 3 patterns to integrate Interaction Studio campaigns with React components on a website.

1. IS updates React component state client side
2. React component rendered server side using campaign data returned via IS Event API and server side campaigns
3. IS replaces placeholder React component content

The corresponding React components are located in the /public/js folder.

### 1. IS updates React component state client side

HTML contains a div `<div id="banner1"></div>`. The JavaScript file banner-with-cta1.js attaches a React component to the element. This element contains some default state data for ctaUrl, subheader, header, ctaText and imageURL which is used when rendering the React component. 

The rendered React component is made available to window object via reference `<BannerWithCTA1 ref={BannerWithCTA1 => {window.BannerWithCTA1 = BannerWithCTA1}} />`. 

The IS web template updates the state of the React component which makes it automatically re-render.

```javascript
BannerWithCTA1.setState({
    ctaUrl: context.ctaUrl,
    subheader: context.subheader,
    ctaText: context.ctaText,
    imageURL: context.imageURL,
    header: context.header
});
```

### 2. React component rendered server side using campaign data returned via IS Event API and server side campaigns

The controller.js file handles incoming HTTP requests and returns the page HTML. When a request comes in, it calls the IS API to retrieve any server side campaigns. A React component is created server side and campaign data is passed in as properties for rendering. The HTML of the React component is then output directly in the EJS template `<%- campaigns[0].html %>`

### 3. IS replaces placeholder React component content

HTML contains a div `<div id="banner3"></div>` which is configured as a content zone in the sitemap. The JavaScript file banner-with-cta3.js attaches a placeholder React component to the element. 

The React component shouldComponentUpdate() returns false which allows IS to manipulate the DOM. The IS web template replaces the React component HTML with campaign generated HTML.