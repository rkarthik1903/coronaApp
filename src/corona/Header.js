import React, { Component } from 'react'
import './Corona_app.css'

class Header extends Component {
    render() {
        return (
            <div>
                <div className = 'header_Comp'>
                    {/* <img style={{maxHeight:150, maxWidth:2000}}  src = './Covid-19.jpg'/> */}
                    <div className= 'h2_comp'><h2 >Covid-19</h2></div>
                    {/* <div className = 'imageDiv'><img src='./Covid-19.jpg'></img></div> */}
                    
                </div>
            </div>
        )
    }
}

export default Header
