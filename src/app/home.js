import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {AuthContext} from '../my_auth'

class Home extends Component{
    static contextType = AuthContext

    render(){  
        return(
            <div className="container">
                <h1>Home</h1>
                <span>{this.context.email}</span>
            </div>
        )
    }
}

export default Home;