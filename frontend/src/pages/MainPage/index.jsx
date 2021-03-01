import React from "react";
import Typist from 'react-typist';
import "./style.css";

export function MainPage(props) {
    const login = () => window.location.href = 'http://localhost:5000/api/auth/discord'

    return (
        <div className="body">
            <div className="nav">

                <div className="page-cont">
                    <ul className="nav-links">
                        <li><a className="aa" href="#discord-page">Discord</a></li>
                        <li><a className="ab" href="#">Faq</a></li>
                        <li><a className="ac" href="#">Basic Rules</a></li>
                        <li><a className="ad" href="#">Team</a></li>
                    </ul>
                </div>

                <button onClick={login} className="login-btn">
                    <a class="login-btn-logo"><i class="fab fa-discord"></i></a>
                    Login
                </button>
            </div>

            <div className="discord-container">
                <div className="discord" id="discord-page">
                    <Typist avgTypingDelay={60}  cursor={{
                        show: false,
                    }}>
                        <h2>Learn code, Chat with friends, Have fun.</h2>
                        <Typist.Delay ms={200} />
                        <p>
                            Simplify code is a great coding community for everyone to join from a beginner to a software 
                            developer, we have everything you would need to get started. So join now!
                        </p>
                        <Typist.Delay ms={200} />
                        <button onClick={() => {
                            window.open("https://discord.com/invite/96MAcmwA", "_blank")
                        }}>Joub <Typist.Backspace count={4} delay={200}/><Typist.Delay ms={400} />oin now</button>
                    </Typist>
                    
                </div>
            </div>
        </div>
    );
}