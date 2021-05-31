let defaultState = { 
    ctaUrl      : 'https://www.northerntrailoutfitters.com',
    subheader   : 'Subheader Text',
    header      : 'Header Text',
    ctaText     : 'Call To Action',
    imageURL    : 'https://cdn.evergage.com/evergage-content/nto/nto_hero_banner_bike.jpg',
};

function myReducer(state = { defaultState }, action) {
    switch (action.type) {
        case 'BANNER_UPDATE':
            return action.payload;
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

                console.log( 'here');

        return (
            <div className="banner" style={style}>
                {this.state.header !== '' ? <h1>{this.state.header}</h1> : ''}
                {this.state.subheader !== '' ? <h2>{this.state.subheader}</h2> : ''}
                <a className="slds-button slds-button_neutral" href={this.state.ctaUrl}>{this.state.ctaText}</a>
            </div>
        );
        
    }
}

ReactDOM.render(
    <Banner3ReduxStore ref={Banner3ReduxStore => {window.Banner3ReduxStore = Banner3ReduxStore}} />, 
        document.getElementById('banner3')
);