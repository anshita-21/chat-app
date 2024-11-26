import React from 'react'
import './RightSidebar.css'
import assets from '../../assets/assets'

const RightSidebar = () => {
  return (
    <div className="rs">
      <div className="rs-profile">
        <img src={assets.avatar_icon} alt="" />
        <h3>Anshita Verma <img src={assets.green_dot} alt="" className="dot" /></h3>
        <p>hey, i am Anshita</p>
      </div>
      <hr />
      <div className="rs-media">
        <p>media</p>
        <div>
          <img src={assets.pic1} alt="" />
          <img src={assets.pic2} alt="" />
          <img src={assets.pic3} alt="" />
          <img src={assets.pic4} alt="" />
          <img src={assets.pic1} alt="" />
          <img src={assets.pic2} alt="" />
        </div>
      </div>
      <button>logout</button>
    </div>
  )
}

export default RightSidebar