'use strict';

/**
 *
 */
class Banner2SetState extends React.Component {

    /**
     * Constructor
     */
    constructor(props) {
        super(props);
    
        this.state = { 
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
    <Banner2SetState ref={Banner2SetState => {window.Banner2SetState = Banner2SetState}} />, 
        document.getElementById('banner2')
);