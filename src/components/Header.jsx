import React from "react";
import PropTypes from "prop-types";

function Header(props){
    const headerStyles = {
        backgroundColor : props.bgColor, 
        color: props.textColor
    }
    return (
        <header style={ headerStyles}>
            <div className="container">
                <h2>{props.text}</h2>
            </div>
        </header>
    )
}

// Setting the default prop when no prop is being passed 
Header.defaultProps = {
    text : "Feedback UI",
    bgColor : 'rgba(0,0,0,0.4)',
    textColor : '#ff6a95'
}

// Prop types - Now we cannot pass any other type for these props, Extra type checking for these props
Header.propTypes = {
    text : PropTypes.string.isRequired,
    bgColor : PropTypes.string,
    textColor : PropTypes.string
}

export default Header;