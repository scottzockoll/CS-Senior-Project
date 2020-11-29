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
                    {this.props.header && (
                        <Text textAlign="center" size={'xxlarge'}>
                            {this.props.header}
                        </Text>
                    )}
                    <Box margin={{ top: '10px' }} width="medium">
                        {this.props.body && (
                            <Text textAlign="center" size={'medium'}>
                                {this.props.body}
                            </Text>
                        )}
                    </Box>
                    <Box margin={{ top: '20px' }} direction="row" justify="center">
                        <Button
                            margin={{ right: 'small' }}
                            label={en.UI_LABELS.BUTTON_LABELS.yes}
                            onClick={this.props.onConfirm}
                        />
                        <Button primary label={en.UI_LABELS.BUTTON_LABELS.no} onClick={this.props.onCancel} />
                    </Box>
                </Box>
            </Layer>
        );
    }
}

export default Confirmation;
