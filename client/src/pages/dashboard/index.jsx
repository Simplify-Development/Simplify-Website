import React from "react";
import { getUserDetails } from "../../utils/api";
import './style.css';
import { Link } from 'react-router-dom'
import axios from 'axios';
import CountUp from 'react-countup';
import { toast } from 'react-toastify'

export function DashboardPage( {
    history,
}) {

    const [user, setUser] = React.useState( null );
    const [loading, setLoading ] = React.useState( true )
    const [count, setCount] = React.useState(0);
    const [apps, setApps] = React.useState(0)

    const getNumberOfUsers = () => {
        axios.get('https://simplify-code.com/api/users')
        .then((res) => {
            const data = res.data;
            setCount(data)
        })
        .catch(() => {
            console.log('There was an error getting the number of users.')
        })
    }
    getNumberOfUsers()

    const getNumberOfApps = () => {
        axios.get('https://simplify-code.com/api/apps')
        .then((res) => {
            const data = res.data;
            setApps(data)
        })
        .catch(() => {
            console.log('There was an error getting the number of applications.')
        })
    }
    getNumberOfApps()

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


    React.useEffect( () => {
        getUserDetails()
        .then( ( { data } ) => {
            setUser( data );
            console.log(data)
            setLoading(false);
        }).catch( (err) => {
            console.error(err)
            window.location.href = `https://simplify-code.com/api/auth/discord`
            setLoading(false);
        })
    }, [])

    return !loading && (
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

            <div className="info-container">

                <div className="info-box">
                    <h2>Total Users</h2>
                    <h1>
                        <CountUp end={count} />
                    </h1>
                </div>

                <div className="info-box">
                    <h2>Total Applications</h2>
                    <h1>
                        <CountUp end={apps} />
                    </h1>
                </div>
            </div>

            <div className="app-container">
                <div className="app-box">
                    <h1>How to apply</h1>
                    <p>
                        If you want to become staff, support or any other role, then apply here.
                        Fill out the given questions and await a response from our bot <span className="discord-color-span">@Simplify Utilities#8736</span>.
                        If you wonder why we ask you specific questions read <Link to="/faq"><a>FAQ</a></Link> or message our <a onClick={() => {window.open("https://discord.com/invite/96MAcmwA", "_blank")}}>ModMail</a>. <br/>
                        <Link to="/applications">
                            <button className="application-btn">
                            New<i class="fas fa-pencil-alt"></i>
                            </button>
                        </Link>
                    </p>
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
