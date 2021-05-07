import React from "react";
import './style.css';
import { Link } from 'react-router-dom'
import Typist from 'react-typist'

export function PageNotFound(props) {
    return (
        <body>
            <div className="code">
                <Typist cursor={{
                    show: false
                }
                }>
                    <p>
                        <span className="color-comment">// (404) I find your lack of</span><br />
                        <span className="color-comment">// navigation disturbing</span> <br />
                        <span className="color-pink">if</span> (<span className="color-blue">lost</span> === <span className="color-dark-blue">true</span>) {"{"}<br />
                        <div className="tab-in-code">
                            <Link to="/"><span className="color-yellow">getBack</span></Link>(); <br />
                            <span className="color-blue">lost</span> = <span className="color-dark-blue">false</span>;
                            </div>
                        {"}"}
                    </p>
                </Typist>
            </div>
        </body>
    )
}