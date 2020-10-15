import { Box, Carousel, Heading, Image } from 'grommet';
import React from 'react';
import './Homepage.css';

function Homepage() {
    return (
        <div>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <Heading textAlign="center" margin="none">
                Welcome to FlickPick!{' '}
            </Heading>
            <br></br>
            <br></br>
            <Box
                alignContent="center"
                height="medium"
                width="large"
                overflow="visible"
            >
                <Carousel play={5000}>
                    <Image src="images/movie1.jpg" />
                    <Image src="images/movie2.jpg" />
                    <Image src="images/movie3.jpg" />
                </Carousel>
            </Box>
        </div>
    );
}

export default Homepage;
