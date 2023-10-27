import { createTheme } from '@mui/material/styles';
import { green, grey, red, deepOrange, blue, lightBlue } from '@mui/material/colors';

const MyTheme = createTheme({
    palette: {
        primary: green,
        secondary: grey,
        error: red,
        warning: deepOrange,
        info: blue,
        success: lightBlue
    }
});

export default MyTheme;