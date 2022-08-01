import React from 'react'
import profilePic from '../../assets/profilePic.jpg'
import './about.css'

export default function About() {
  return (
    <main id="about">
        <div className='titleContainer'><h1 className="title">About</h1></div>
        <div className='aboutContainer'>
            <div className="aboutItem">
                <div className='appInfo'>
                    <p>Music data has become important, Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis quia autem debitis cupiditate enim, deleniti et quas quod soluta vero nisi corrupti dolorem ducimus. Impedit pariatur aliquid voluptates iusto enim?</p>
                    <h2>Spotify</h2>
                    <p>Music data has become important, Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis quia autem debitis cupiditate enim, deleniti et quas quod soluta vero nisi corrupti dolorem ducimus. Impedit pariatur aliquid voluptates iusto enim?</p>
                    <p>Music data has become important, Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis quia autem debitis cupiditate enim, deleniti et quas quod soluta vero nisi corrupti dolorem ducimus. Impedit pariatur aliquid voluptates iusto enim?</p>
                    <h2>Metadata sources</h2>
                    <p>Music data has become important, Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis quia autem debitis cupiditate enim, deleniti et quas quod soluta vero nisi corrupti dolorem ducimus. Impedit pariatur aliquid voluptates iusto enim?</p>
                    <p>Music data has become important, Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis quia autem debitis cupiditate enim, deleniti et quas quod soluta vero nisi corrupti dolorem ducimus. Impedit pariatur aliquid voluptates iusto enim?</p>
                </div>
                <div className='otherInfo'>
                    <div className="contact">
                        <h2><a href="mailto:contact@xportify.com">contact@xportify.com</a></h2>
                    </div>
                </div>
            </div>
            <div className="aboutItem aboutMeContainer">
                <div className='aboutMe'>
                    <div className='titleContainer'><h1 className="title">Me</h1></div>
                    <div className='bioContainer'><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. In quo quidem, temporibus explicabo quod recusandae officia odit natus suscipit dignissimos, eaque impedit exercitationem a eligendi, doloribus laborum vero. At, temporibus.</p></div>
                    <div className="profileContainer">
                        <img className="profilePic" src={profilePic}></img>
                    </div>
                </div>
                <div className="socials">
                        <div className='socialTitle'><h2>Find me on social media</h2></div>
                        <div className="socialLinks">
                            <a href="">Instagram</a>
                            <a href="">Linkedin</a>
                        </div>
                </div>
            </div>
        </div>
    </main>
  )
}

