import React from 'react';
import './Button.css';

const STYLES = ['button--primary', 'button--outline'];

const SIZES = ['button--medium', 'button--large'];

export interface ButtonProperties {
    children?: string;
    type?: any;
    onClick?: any;
    buttonStyle?: any;
    buttonSize?: any;
}

export const Button = ({
    children,
    type,
    onClick,
    buttonStyle,
    buttonSize,
}: ButtonProperties) => {
    const checkButtonStyle = STYLES.includes(buttonStyle)
        ? buttonStyle
        : STYLES[0];
    const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];
    return (
        <button
            className={`button ${checkButtonStyle} ${checkButtonSize}`}
            onClick={onClick}
            type={type}
        >
            {children}
        </button>
    );
};
