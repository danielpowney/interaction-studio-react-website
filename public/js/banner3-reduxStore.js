let defaultState = { 
    ctaUrl      : 'https://www.northerntrailoutfitters.com',
    subheader   : 'Subheader Text',
    header      : 'Header Text',
    ctaText     : 'Call To Action',
    imageURL    : 'https://cdn.evergage.com/evergage-content/nto/nto_hero_banner_bike.jpg',
    // Note attributes are not rendered if null
    experience  : null,
    userGroup   : null,
    campaign    : null
};

function myReducer(state = { defaultState }, action) {
    switch (action.type) {
        case 'BANNER_UPDATE': {
            var payload = {
                ctaURL : action.payload.ctaURL ? action.payload.ctaURL : state.ctaURL,
                subheader : action.payload.subheader ? action.payload.subheader : state.subheader,
                header : action.payload.header ? action.payload.header : state.header,
                ctaText : action.payload.ctaText ? action.payload.ctaText : state.ctaText,
                imageURL : action.payload.imageURL ? action.payload.imageURL : state.imageURL,
                experience : action.payload.experience ? action.payload.experience : state.experience,
                userGroup : action.payload.userGroup ? action.payload.userGroup : state.userGroup,
                campaign : action.payload.campaign ? action.payload.campaign : state.campaign
            }
            return payload;
            break;
        }
        default:
            return state;
    }
}

const myStore = Redux.createStore(myReducer);

// whener the store changes, update the banner state
myStore.subscribe(() => Banner3ReduxStore.setState(myStore.getState()));

'use strict';

/**
 *
 */
class Banner3ReduxStore extends React.Component {

    /**
     * Constructor
     */
    constructor(props) {
        super(props);
        this.state = myStore.getState();
  	}

    /**
     * When component has been rendered for the first time
     */
    componentDidMount() {
        
    }

    /**
     * When component tears down
     */
    componentWillUnmount() {
        
    }

    /**
     * DOM rendering logic
     */
    render() {

        let style = {
            backgroundImage: "url(" + this.state.imageURL + ")",
            backgroundSize: 'cover'
        }

        let clickthrough = this.state.experience ? '' : null;

        return (
            <div className="banner" style={style} data-evg-campaign-id={this.state.campaign} 
                    data-evg-experience-id={this.state.experience} data-evg-user-group={this.state.userGroup}>
                {this.state.header !== '' ? <h1>{this.state.header}</h1> : ''}
                {this.state.subheader !== '' ? <h2>{this.state.subheader}</h2> : ''}
                <a className="slds-button slds-button_neutral" href={this.state.ctaUrl} data-evg-clickthrough={clickthrough}>{this.state.ctaText}</a>
            </div>
        );
        
    }
}

ReactDOM.render(
    <Banner3ReduxStore ref={Banner3ReduxStore => {window.Banner3ReduxStore = Banner3ReduxStore}} />, 
        document.getElementById('banner3')
);