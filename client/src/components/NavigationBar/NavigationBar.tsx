import React, { Component } from 'react';
import { isTemplateExpression } from 'typescript';
import { Button } from '../Button';
import { MenuItems } from '../MenuItems';
import './NavigationBar.css';

class NavigationBar extends Component {
    state = { selected: false };

    toggleSelection = () => {
        this.setState({ selected: !this.state.selected });
    };

    render() {
        return (
            <nav className="NavigationBarItems">
                <h1 className="navigation-bar-logo">
                    FlickPick <i className="fas fa-film"></i>
                </h1>
                <div className="menu-icon" onClick={this.toggleSelection}>
                    <i
                        className={
                            this.state.selected ? 'fas fa-times' : 'fas fa-bars'
                        }
                    ></i>
                </div>
                <ul
                    className={
                        this.state.selected
                            ? 'navigation-menu active'
                            : 'navigation-menu'
                    }
                >
                    {MenuItems.map((menuItem, index) => {
                        return (
                            <li key={`navigationBar-${menuItem.title}`}>
                                <a
                                    className={menuItem.className}
                                    href={menuItem.url}
                                >
                                    {menuItem.title}
                                </a>
                            </li>
                        );
                    })}
                </ul>
                <Button>Sign Up</Button>
            </nav>
        );
    }
}

export default NavigationBar;
