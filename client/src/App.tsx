import React from 'react';
import logo from './onion.png';
import './App.css';
import {
    Box,
    Button,
    Carousel,
    Grommet,
    Heading,
    Image,
    TextInput,
} from 'grommet';
import { Ticket } from 'grommet-icons';

type WelcomeProps = {
    title: string;
};

type MenuBarButtonProps = {
    label: string;
};

function MenuBarButton({ label }: MenuBarButtonProps) {
    return (
        <Box fill pad="small">
            <Button>{label}</Button>
        </Box>
    );
}

function MenuBar() {
    return (
        <Box
            tag="header"
            direction="row"
            align="center"
            justify="between"
            background="brand"
            elevation="medium"
        >
            <Box pad="small">
                <Button icon={<Ticket color="white" />} />
            </Box>
            <Box fill pad="small">
                <TextInput placeholder="Search" color="white" />
            </Box>
            <Box direction="row" align="center">
                <MenuBarButton label={'Home'} />
                <MenuBarButton label={'Contact'} />
                <MenuBarButton label={'Sign In'} />
                <MenuBarButton label={'Sign Up'} />
            </Box>
        </Box>
    );
}

function Welcome({ title }: WelcomeProps) {
    return (
        <Box pad="medium" align="center">
            <Heading margin="none" color="black">
                {title}
            </Heading>
            <HomeScreenButtons />
        </Box>
    );
}

function HomeScreenButtons() {
    return (
        <Box pad="small" align="center" justify="center" direction="row">
            <Box pad="small">
                <Button primary label="Take A Movie Survey" />
            </Box>
            <Box pad="small">
                <Button primary label="Sign in" />
            </Box>
        </Box>
    );
}

function MovieCarousel() {
    return (
        <Box overflow="hidden">
            <Carousel>
                <Image
                    fit="cover"
                    src="http://placehold.jp/50/99ccff/003366/500x300.png?text=Some%20movie%20cover"
                />
                <Image
                    fit="cover"
                    src="http://placehold.jp/50/99ccff/003366/500x300.png?text=Some%20movie%20cover"
                />
                <Image
                    fit="cover"
                    src="http://placehold.jp/50/99ccff/003366/500x300.png?text=Some%20movie%20cover"
                />
            </Carousel>
        </Box>
    );
}

function App() {
    return (
        <div className="App">
            {/*<Box background={'green'} > Testing </Box>*/}
            <MenuBar></MenuBar>
            <Welcome title={'Welcome to FlickPick!'}></Welcome>
            <MovieCarousel />
        </div>
    );
}

export default App;
