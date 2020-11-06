import { Box, Button, Heading, TextInput } from 'grommet';
import React from 'react';

interface InitialSurveyModalProps {}

export default class openInitialSurvey extends React.Component<InitialSurveyModalProps> {
    render() {
        const numberOfChildren: number[] = [1, 2, 3, 4, 5];
        return (
            <Box height={'auto'} width={'large'}>
                <Box margin={{ left: 'auto', right: 'auto' }} direction="row">
                    <Heading>Initial Survey</Heading>
                </Box>
                {numberOfChildren.map(() => {
                    return (
                        <Box>
                            <Box width={'medium'} margin={{ left: '3%', bottom: '2%' }}>
                                <TextInput
                                    placeholder="Movie search"
                                    // value={value}
                                    // onChange={event => setValue(event.target.value)}
                                />
                            </Box>
                            <Box>{/*star rating goes here*/}</Box>
                        </Box>
                    );
                })}
                <Box width="35%" margin={{ top: 'medium', left: 'auto', right: 'auto' }}>
                    <Box>
                        <Button
                            primary
                            label="Submit Survey"
                            onClick={() => {
                                this.setState({ showInitialSurvey: false });
                            }}
                        />
                    </Box>
                    <Box margin={{ top: '2%', bottom: '5%' }}>
                        <Button
                            label="Close"
                            onClick={() => {
                                this.setState({ showInitialSurvey: false });
                            }}
                        />
                    </Box>
                </Box>
            </Box>
        );
    }
}
