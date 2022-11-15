import React from 'react';
import {AppBar,Button, Box, Container, IconButton, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {hover} from "@testing-library/user-event/dist/hover";

const Mui = () => {
    const btnStyles = {
        // fontSize:20,
        color:'black',
        backgroundColor:'green',
        borderRadius: 15,
        border:0,
        // '&:hover':{
        // backgroundColor: 'yellow'
        // }
    }
    return (

<AppBar  position='relative'>
    <Container  fixed>
        <Toolbar>
            <IconButton edge='start' color='inherit' aria-laabel = 'menu'>
                <Menu/>
            </IconButton>
            <Typography variant='h5'>Shopping list</Typography>
            <Box m={2}>
                <Button sx={btnStyles} color='primary' variant='outlined' >Login</Button>
            </Box>
            <Button color='secondary' variant='contained'>Sign up</Button>
        </Toolbar>
    </Container>
</AppBar>
    );
};

export default Mui;