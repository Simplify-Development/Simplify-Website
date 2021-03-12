import React from "react";
import { getUserDetails } from "../../utils/api";
import './style.css';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify'

/*export function ApplicationPage( {
    history,
}) {
    const [user, setUser] = React.useState( null );
    const [loading, setLoading ] = React.useState( true )

    React.useEffect( () => {
        getUserDetails()
        .then( ( { data } ) => {
            setUser( data );
            setLoading(false);
        }).catch( (err) => {
            window.location.href = `http://localhost:${process.env.PORT || 5001}/api/auth/discord`
            setLoading(false);
        })
    }, [])

    return !loading && (
        <h1>Application Page</h1>
    )
}
*/

export function ApplicationPage(props) {
    const navSlide = () => {
        const burger = document.querySelector('.burger');
        const nav = document.querySelector('.nav-links')
        const navLinks = document.querySelectorAll('.nav-links a')

        // Toggle Links
        nav.classList.toggle('nav-active')


        //Animate Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = ''
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 5 + 0.5}s`
            }
        })

        //Burger Animation
        burger.classList.toggle('toggle')
    }

    const closed = () => {
        toast.error('Sorry but this application is closed')
    }

    return (
        <body>

            <div className="nav">

                <div className="page-cont">
                    <ul className="nav-links">
                    <Link><li><a className="aa" onClick={() => {
                            window.open("https://discord.com/invite/96MAcmwA", "_blank")
                        }}>Discord</a></li></Link>
                        <Link to="/rules"><li><a className="ab" >Rules</a></li></Link>
                        <Link to="/faq"><li><a className="ac" >FAQ</a></li></Link>
                        <Link to="/team"><li><a className="ad" >Team</a></li></Link>
                    </ul>

                    <div className="burger" onClick={navSlide}>
                        <div className="line1"></div>
                        <div className="line2"></div>
                        <div className="line3"></div>
                    </div>
                </div>

                <Link to="/">
                    <button className="login-btn">
                        Home
                        <a class="login-btn-logo"><i class="fas fa-home"></i></a>
                    </button>
                </Link>
            </div>

            <div className="app-desc-box-container">
                <div className="app-desc-box">
                    <h1>Applications</h1>
                    <p>
                        Here you can find a list of all current applications, take note that some applications may be closed for the time being.
                        If you have any question feel free to read <Link to="/faq"><a>FAQ</a></Link> or message our <a onClick={() => { window.open("https://discord.com/invite/96MAcmwA", "_blank") }}>ModMail</a>.
                    </p>
                </div>
            </div>

            <div className="app-list-container">
                <div className="app-list">
                    <h2 className="app-title">Staff</h2>
                    <p className="app-desc">
                        Your job as this role will be to keep our server as clean as possible, you will be managing the community and making sure that everyone follows the rules.
                    </p>
                    <div className="app-bottom">
                        <div className="role-spacing">
                            <Link to="/staff"><button className="open-btn">Open</button></Link>
                        </div>
                    </div>
                </div>

                <div className="app-list">
                    <h2 className="app-title">Support</h2>
                    <p className="app-desc">
                        Your job as this role will be to help our members with what every they need from some help with code to changing their discord username. 
                    </p>
                    <div className="app-bottom">
                        <div className="role-spacing">
                            <Link to="/support"><button className="open-btn">Open</button></Link>
                        </div>
                    </div>
                </div>

                <div className="app-list">
                    <h2 className="app-title">Development</h2>
                    <p className="app-desc">
                        Your job as this role is to develop stuff for the server, this can be everything from a website to a discord bot. Take note this role is a bit harder to get.
                    </p>
                    <div className="app-bottom">
                        <div className="role-spacing">
                            <button className="closed-btn" onClick={closed}>Closed</button>
                        </div> 
                    </div>
                </div>
            </div>


            <div className="footer-container">
                <footer>
                    <div className="container">
                        <div className="about">
                            <h2>About</h2>
                            <p>Simplify Code is a coding community for everyone to join, we are growing more every day so why not join?</p>
                            <br />
                            <p>© Simplify Development 2020-2021</p>
                        </div>
                        <ul className="icons">
                            <li><a onClick={() => window.open("https://discord.com/invite/96MAcmwA", "_blank")}><i class="fab fa-discord"></i></a></li>
                            <li><a onClick={() => window.open("https://github.com/Simplify-Development", "_blank")}><i class="fab fa-github"></i></a></li>
                        </ul>
                    </div>

                    <div className="links">
                        <div className="product">
                            <h2>Product</h2>
                            <ul>
                            <Link to="/rules"><li><a >Rules</a></li></Link>
                                <Link to="/faq"><li><a >FAQ</a></li></Link>
                                <Link to="/privacy"><li><a >Privacy</a></li></Link>
                            </ul>
                        </div>
                        <div className="reacources">
                            <h2>Resources</h2>
                            <ul>
                                <li><a onClick={() => window.open("https://discord.com/invite/96MAcmwA", "_blank")}>Support</a></li>
                                <li><a onClick={() => window.open("https://discord.com/invite/96MAcmwA", "_blank")}>Contact</a></li>
                            </ul>
                        </div>
                    </div>
                </footer>
            </div>
        </body>
    )
}