'use strict';

/**
 * This component demonstrates how IS can listen to a button click within a React component. 
 * A custom event is dispatched which Interaction Studio listens to.
 */
class ToggleBtn extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isToggleOn : false,
            clicks: 0
        };

        this.handleClick = this.handleClick.bind(this);
    }

    /**
     * Return false to prevent re-rendering. Allows Interaction Studio to freely 
     * change the DOM and personalise content
     */
    shouldComponentUpdate() {
        return true;
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
}

const element = <ToggleBtn />;
 
ReactDOM.render(
    element,
    document.getElementById('container')
);