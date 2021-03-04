import React from 'react';

import "./Accordion.css";

function Accordion(props) {
    return (
        <div className="accordion-section">
            <button className="accordion">
                <p className="accordion-title">{props.title}</p>
            </button>
        <div className="accordion-content">
            <div className="accordion-text"
                dangerouslySetInnerHTML={{ __html: props.content}}
            />
        </div>
        </div>
    )
}

export default Accordion;