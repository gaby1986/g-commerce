import React from 'react';
import { AuthContext } from '../my_auth';

class Root extends React.Component {
    render() {
        const {
            children,
        } = this.props;
        const {
            authReady,
        } = this.context;

        if (!authReady) {
            return <div>Loading...</div>;
        }else{

        }

        return children;
    };
}

Root.contextType = AuthContext;

export default Root;
