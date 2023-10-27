import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: '#4caf50',
        secondary: '#9e9e9e',
        info: '#2196f3',
        error: '#f44336',
        outline: '#e0e0e0',
        picker: '#e3f2fd'
    }
};

export default function Main() {
    return (
        <PaperProvider theme={theme}>
            <App />
        </PaperProvider>
    );
}

AppRegistry.registerComponent(appName, () => Main);