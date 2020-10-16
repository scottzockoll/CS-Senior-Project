import { Box, Carousel, Heading, Image } from 'grommet';
import React from 'react';

function Homepage() {
    return (
        <Box background="light-3">
            <Box justify="center" direction="row">
                <Heading margin="large">Welcome to FlickPick! </Heading>
            </Box>
            <Box justify="center" direction="row">
                <Carousel play={5000}>
                    <Image src="images/movie1.jpg" />
                    <Image src="images/movie2.jpg" />
                    <Image src="images/movie3.jpg" />
                </Carousel>
            </Box>
        </Box>
    );
}

export default Homepage;
