import{createTheme} from "@mui/material";

export const dashboardTheme = new createTheme({
    components: {
        // Name of the component
        MuiButton: {
            styleOverrides: {
                // Name of the slot
                root: {
                    // Some CSS
                    // fontSize: '2rem! important',
                    // backgroundColor:'blue!important'
                },
            },
        },
     },
    palette: {
        primary: {
            // Purple and green play nicely together.
            main: '#bada55',
        },
        secondary: {
            // This is green.A700 as hex.
            main: '#11cb5f',
        },
        alter:{
            main:'#24cb11'
        }
    },
})