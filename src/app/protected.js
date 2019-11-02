import React, {Component} from 'react'
import firebase from '../firebase'
import {AuthContext} from '../my_auth'


class Protected extends Component{
    static contextType = AuthContext
    constructor(props){
        super(props)
        this.state = {
            name: '',
            pass:''
        }
        this.test = this.test.bind(this)
    }

    test(){
        fetch('http://localhost:3001/protected',{
                method: 'GET',
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + this.context.token.token
                }
            }).then(res => res.json())
            .then(data => {
                console.log(data)
            }).catch(error => console.log(error))
    }

    render(){
        this.test()
        return(
            <div>Bien</div>
        )
    }
}

export default Protected;