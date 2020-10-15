import React from 'react';
import { Button, Grommet, Header, Menu, Image } from 'grommet';

function NavigationBar() {
    return (
        <div>
            <Grommet className="NavigationBar">
                <Header style={{ height: 60 }} background="brand">
                    <Button plain={true} label="FlickPick" hoverIndicator />
                    <Menu
                        dropBackground="white"
                        label="Sign Up"
                        items={[{ label: 'Sign In' }, { label: 'Home' }]}
                    />
                </Header>
            </Grommet>
        </div>
    );
}

export default NavigationBar;
