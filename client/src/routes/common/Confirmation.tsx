import React from 'react';
import { Box, Button, Layer, Text } from 'grommet';
import en from '../../en.json';

interface ConfirmationProps {
    header?: string;
    body?: string;
    onConfirm: () => void;
    onCancel: () => void;
}

class Confirmation extends React.Component<ConfirmationProps> {
    render() {
        return (
            <Layer onEsc={this.props.onCancel} onClickOutside={this.props.onCancel}>
                <Box pad={{ horizontal: 'medium', vertical: 'small' }}>
                    {this.props.header && <Text size={'xxlarge'}>{this.props.header}</Text>}
                    {this.props.body && <Text size={'medium'}>{this.props.body}</Text>}
                    <Box direction="row" justify="center">
                        <Button label={en.UI_LABELS.yes} onClick={this.props.onConfirm} />
                        <Button label={en.UI_LABELS.no} onClick={this.props.onCancel} />
                    </Box>
                </Box>
            </Layer>
        );
    }
}

export default Confirmation;