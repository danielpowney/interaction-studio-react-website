var React = require('react');

class BannerWithCTA2 extends React.Component {

    /**
     * Constructor
     */
    constructor(props) {

        super(props);
    
  	}
    
  	/**
     * Render
     */
    render() {

        let style = {
            backgroundImage: "url(" + this.props.imageURL + ")",
            backgroundSize: 'cover'
        }

        return (
            <div className="banner" style={style}>
                {this.props.header !== '' ? <h1>{this.props.header}</h1> : ''}
                {this.props.subheader !== '' ? <h2>{this.props.subheader}</h2> : ''}
                <a href={this.props.ctaUrl}>{this.props.ctaText}</a>
            </div>
        );
    }
}

module.exports = BannerWithCTA2;