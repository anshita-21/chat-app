import React from 'react'
import './LeftSidebar.css'
import assets from '../../assets/assets'

const LeftSidebar = () => {
  return (
    <div className="ls">
        <div className="ls-top">
            <div className="ls-nav">
                <img src={assets.logo} className='logo' alt=""></img>
                <div className="menu">
                    <img src={assets.menu_icon} alt=""></img>
                </div>
            </div>
            <div className="ls-search">
                <img src={assets.search_icon} alt=""></img>
                <input type="text" className="text" placeholder='search here...'/>
            </div>
        </div>
        <div className="ls-list">
            {Array(5).fill("").map((item, index) => (
                <div className="friends">
                    <img src={assets.profile_img} alt=""></img>
                    <div>
                        <p>Joey Tribbiani</p>
                        <span>Hello, how r u?</span>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default LeftSidebar