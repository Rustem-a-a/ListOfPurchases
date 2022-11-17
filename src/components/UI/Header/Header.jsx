import React from 'react';
import {AppBar, Box, Button, Container, IconButton, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {useDispatch, useSelector} from "react-redux";
import {logoutAuthSlice} from "../../../store/slices/authSlice";
import {Stack,Avatar} from '@mui/material'
import {Link} from 'react-router-dom'
import styles from './Header.module.scss'

const Header = () => {
    const authState = useSelector(state=>state.authReducer)
    const dispatch = useDispatch()

    return (

        <AppBar  position='relative'>
            <Container  fixed>
                <Toolbar>
                    <IconButton edge='start' color='inherit' aria-laabel = 'menu'>
                        <Menu/>
                    </IconButton>
                    <Typography variant='h5'><Link to='/'>Shopping list</Link></Typography>
                    <Box mr={90}>
                    </Box>
                    {authState.loading ? <Button color='alter' variant='contained'>Loading...</Button>
                                       : <>{!authState.isAuth && <Link to='/login'><Button color='alter' variant='contained'>Sign in</Button></Link>}
                                          {!authState.isAuth && <Link to='/registration'><Button color='alter' variant='contained'>Sign up</Button></Link>}</>
                    }
                    {authState.isAuth &&
                        <Stack direction="row" spacing={2}>
                            <Avatar sx={{ bgcolor: [500] }}>{authState.user.username[0].toUpperCase()}</Avatar>
                        </Stack>
                    }
                    <Box mr={2}>
                    </Box>
                    {authState.isAuth && <Link to='/'><Button color='alter' variant='contained' onClick={()=>dispatch(logoutAuthSlice())}>Exit</Button></Link>}
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Header;