import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from './my_auth';

export class GuardRoute extends React.Component {
    render() {
        const {
            type,
            ...rest
        } = this.props;
        const {
            isLoggedIn,
        } = this.context;

        if (type === 'private' && !isLoggedIn) {
            return <Route />;
        } else if (type === 'public' && isLoggedIn) {
            return  <Route {...rest} />;
        }
        return <Route {...rest} />;
    };
}

GuardRoute.contextType = AuthContext;

export default GuardRoute;