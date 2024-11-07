import React from 'react';
import PropTypes from 'prop-types';
import './Button.css'; // Make sure the path is correct

const Button = ({ children, onClick, type = 'button', className = '', disabled = false, icon = null, ariaLabel = '' }) => {
    return (
        <button
            type={type}
            className={`universal-button ${className}`}
            onClick={onClick}
            disabled={disabled}
            aria-label={ariaLabel || (typeof children === 'string' ? children : '')}
        >
            {icon && <span className="button-icon">{icon}</span>}
            {children && <span className="button-text">{children}</span>}
        </button>
    );
};

Button.propTypes = {
    children: PropTypes.node,
    onClick: PropTypes.func,
    type: PropTypes.oneOf(['button', 'submit', 'reset']),
    className: PropTypes.string,
    disabled: PropTypes.bool,
    icon: PropTypes.node, // Ikona je nyní povolená jako jeden z vlastností
    ariaLabel: PropTypes.string // Přidáno pro lepší přístupnost
};

export default Button;