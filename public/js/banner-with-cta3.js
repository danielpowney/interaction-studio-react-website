'use strict';

class BannerWithCTA3 extends React.Component {
 
 	// prevents re-rendering, allowing IS to freely change DOM and personalise content
 	shouldComponentUpdate() {
        return false;
    }
 
    render() {
        return (null)
    }
}

const element = <BannerWithCTA3 />;
 
ReactDOM.render(
	element,
	document.getElementById('banner3')
);