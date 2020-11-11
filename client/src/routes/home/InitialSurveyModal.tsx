import { Box, Button, Heading, Layer, TextInput } from 'grommet';
import React from 'react';
import { store } from '../..';
import { toggleInitialSurveyModal } from './actions';

export default class openInitialSurvey extends React.Component {
    render() {
        const numberOfChildren: number[] = [1, 2, 3, 4, 5];
        let { initialSurveyVisible } = store.getState();
        return (
            <Box>
                {initialSurveyVisible && (
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
                                        store.dispatch(toggleInitialSurveyModal(true));
                                    }}
                                />
                            </Box>

                            <Box margin={{ top: '2%', bottom: '5%' }}>
                                <Button
                                    label="Close"
                                    onClick={() => {
                                        store.dispatch(toggleInitialSurveyModal(true));
                                    }}
                                />
                            </Box>
                        </Box>
                    </Box>
                )}
            </Box>
        );
    }
}
