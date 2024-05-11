import React, { Component } from 'react'

export class Header extends Component {
  render() {
    return (
    <div className='header'>
            <h1>Hungry Mouth</h1>
        
        <div className="hungry-mouth">
            <img src="https://scontent-atl3-1.xx.fbcdn.net/v/t39.30808-6/302092386_605427531193288_5666416753223050090_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=5f2048&_nc_ohc=kD4mYDH1YNUQ7kNvgELtIPp&_nc_ht=scontent-atl3-1.xx&oh=00_AYAkW5yDvV5k8FCH4_U4EYK2gu6tU3jPk5DbwuRqMfPYDg&oe=6644A0CC" alt="image of mouth open with text reading 'hungry mouth"/>
        </div>
    </div>
    )
  }
}

export default Header