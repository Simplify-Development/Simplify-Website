import React from "react";
import { getUserDetails } from "../../utils/api";
import './style.css';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify'

export function ApplicationPage({
    history,
}) {
    const [user, setUser] = React.useState(null);
    const [loading, setLoading] = React.useState(true)

    React.useEffect(() => {
        getUserDetails()
            .then(({ data }) => {
                setUser(data);
                console.log(data)
                setLoading(false);
            }).catch((err) => {
                console.error(err)
                window.location.href = `https://simplify-code.com/api/auth/discord`
            })
    }, [])

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

    return !loading && (
        <body>

            <div className="nav">

                <div className="page-cont">
                    <ul className="nav-links">
                        <Link><li><a className="aa" onClick={() => {
                            window.open("https://discord.gg/XveJX7Z", "_blank")
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
                </button>
                </Link>
            </div>


            <div className="applications-container">
                <ul className="app-top">
                    <li>
                        <span className="app-name">Name</span>
                        <span className="app-name">Status</span>
                    </li>
                </ul>
                <ul className="applications" >
                    <Link to="/applications/staff">
                        <li>
                            <span className="app-name" >Staff Team</span>
                            <button className="open-btn">Available</button>
                        </li>
                    </Link>

                    <li onClick={closed} >
                        <span className="app-name" >Development Team</span>
                        <button className="closed-btn">Unavailable</button>
                    </li>
                    <Link to="/applications/support">
                        <li>
                            <span className="app-name" >Support Team</span>
                            <button className="open-btn">Available</button>
                        </li>
                    </Link>

                    <Link to="/applications/appeal">
                        <li>
                            <span className="app-name" >Ban Appeal</span>
                            <button className="open-btn">Available</button>
                        </li>
                    </Link>
                    <Link to="/applications/art">
                        <li>
                            <span className="app-name" >Art poster</span>
                            <button className="open-btn">Available</button>
                        </li>
                    </Link>
                    <Link to="/applications/creator">
                        <li>
                            <span className="app-name" >Content Creator</span>
                            <button className="open-btn">Available</button>
                        </li>
                    </Link>

                </ul>
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
                            <li><a onClick={() => window.open("https://discord.com/invite/XveJX7Z", "_blank")}><i class="fab fa-discord"></i></a></li>
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
                                <li><a onClick={() => window.open("https://discord.com/invite/XveJX7Z", "_blank")}>Support</a></li>
                                <li><a onClick={() => window.open("https://discord.com/invite/XveJX7Z", "_blank")}>Contact</a></li>
                            </ul>
                        </div>
                    </div>
                </footer>
            </div>
        </body>
    )
}



