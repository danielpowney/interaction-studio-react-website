'use strict';

class BannerWithCTA1 extends React.Component {

	/**
	 * Constructor
	 */
	constructor(props) {
    	
    	super(props);
    
    	this.state = { 
    		ctaUrl : 'https://www.northerntrailoutfitters.com',
    		subheader : 'Subheader Text',
        	header : 'Header Text',
        	ctaText : 'Call To Action',
        	imageURL : 'https://cdn.evergage.com/evergage-content/nto/nto_hero_banner_bike.jpg', 
        	// TODO add experience, userGroup and campaign
     	};
  	}

  	/**
  	 * Render
  	 */
    render() {

        let style = {
            backgroundImage: "url(" + this.state.imageURL + ")",
            backgroundSize: 'cover'
        }

        return (
            <div className="banner" style={style}>
                {this.state.header !== '' ? <h1>{this.state.header}</h1> : ''}
                {this.state.subheader !== '' ? <h2>{this.state.subheader}</h2> : ''}
                <a href={this.state.ctaUrl}>{this.state.ctaText}</a>
            </div>
        );
        
    }
}

ReactDOM.render(
	<BannerWithCTA1 ref={BannerWithCTA1 => {window.BannerWithCTA1 = BannerWithCTA1}} />,
	document.getElementById('banner1')
);