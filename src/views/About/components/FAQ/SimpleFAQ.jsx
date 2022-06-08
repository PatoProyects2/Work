import React, { useState } from 'react'

const FAQ = ({title, info}) => {

    const [expanded, setExpanded] = useState(false)

    return (
        <article className="faq-question">
            <header onClick={() => setExpanded(!expanded)} >
                <h4 className="faq-question-title">{ title }</h4>
                <button className='faq-btn'> 
                    <i className={`fa-solid ${ expanded ? 'fa-minus' : 'fa-plus'}`}></i>
                </button>
            </header>
            {
                expanded && <p>{ info }</p>
            }
        </article>

    );
}

export default FAQ
