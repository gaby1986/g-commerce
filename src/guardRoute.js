import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from './my_auth';
import Menu from './app/header'

export class GuardRoute extends React.Component {
    render() {
        const {
            type,
            valid,
            token,
            ...rest
        } = this.props;
        const {
            isLoggedIn,
            checkEmail,
        } = this.context;

        if (type === 'private' && !isLoggedIn) {
            return <Route />;
        } else if (type === 'public' && isLoggedIn) {
            return  <Route {...rest} />;
        }else if (valid==='validar' && checkEmail) {
            return  <Menu valid={checkEmail} ing={isLoggedIn}/>;
        }else if (valid==='validar' && !checkEmail) {
            return  <Menu valid={checkEmail} ing={isLoggedIn}/>;
        } 
        return <Route {...rest} />;
    };
}

GuardRoute.contextType = AuthContext;

export default GuardRoute;