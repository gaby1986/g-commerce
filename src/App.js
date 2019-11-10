import React from 'react';
import {BrowserRouter as Router, Redirect, Route} from 'react-router-dom'
import Home from './app/home'
import AdminProduct from './app/adminProducts'
import Signup from './app/signup'
import Protected from './app/protected'
import Signin from './app/signin'
import Root from './app/root'
import Menu from './app/header'
import {AuthContextProvider} from './my_auth'
import GuardRoute from './guardRoute'
import 'materialize-css/dist/css/materialize.min.css'


function App() {
  
  return (
    <AuthContextProvider>
      <Root>
        <Router>
                <GuardRoute valid='validar' exact component={Menu}/>
                <GuardRoute token='423423' type="public" path='/' exact component={Home}/>
                <GuardRoute type="public" path="/signin" exact component={Signin}/>
                <GuardRoute type="public" path="/signup" exact component={Signup}/>
                <GuardRoute type="public" path="/protected" exact component={Protected}/>
                <GuardRoute type="private" path="/admin" exact component={AdminProduct}/>
        </Router>
      </Root>
    </AuthContextProvider>
  );
}

export default App;
