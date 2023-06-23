import React from 'react'
import PropTypes from 'prop-types'

const Button = props => {
    return (
        <div>Button</div>
    )
}

Button.propTypes = {
    value: PropTypes.string.isRequired,
    type: PropTypes.string,
}

export default Button