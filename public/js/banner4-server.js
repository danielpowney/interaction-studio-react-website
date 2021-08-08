var React = require('react');

/**
 *
 */
class Banner4Server extends React.Component {

    /**
     * Constructor
     */
    constructor(props) {
        super(props);
  	}
    
    /**
     * When component has been rendered for the first time
     */
    componentDidMount() {}

    /**
     * When component tears down
     */
    componentWillUnmount() {}

    /**
     * DOM rendering logic
     */
    render() {

        let style = {
            backgroundImage: "url(" + this.props.imageURL + ")",
            backgroundSize: 'cover'
        }

        return (
            <div className="banner" style={style} data-evg-campaign-id={this.props.campaign} 
                    data-evg-experience-id={this.props.experience} data-evg-user-group={this.props.userGroup}>
                {this.props.header !== '' ? <h1>{this.props.header}</h1> : ''}
                {this.props.subheader !== '' ? <h2>{this.props.subheader}</h2> : ''}
                <a className="slds-button slds-button_neutral" href={this.props.ctaUrl} data-evg-clickthrough>{this.props.ctaText}</a>
            </div>
        );
    }
}

module.exports = Banner4Server;