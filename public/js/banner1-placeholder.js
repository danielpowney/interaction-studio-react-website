'use strict';

/**
 *
 */
class Banner1Placeholder extends React.Component {

    /**
     * Return false to prevent re-rendering. Allows Interaction Studio to freely 
     * change the DOM and personalise content
     */
    shouldComponentUpdate() {
        return false;
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
        return (
            <div className="banner"></div>
        )
    }
}

const element = <Banner1Placeholder />;
 
ReactDOM.render(
    element,
    document.getElementById('banner1')
);