import React from 'react'
import PropTypes from 'prop-types'
import { useLogout } from '../utils/Auth'

const Logout = props => {
    const { logout, isLoading } = useLogout();

    const handleLogout = () => {
        logout(props.role);
    };

    return (
        <div>
            <button onClick={handleLogout} disabled={isLoading}>
                Logout
            </button>
        </div>
    );
}

Logout.propTypes = {
    "role": PropTypes.string.isRequired
}

export default Logout