import { createMuiTheme } from '@material-ui/core/styles';

export default createMuiTheme({
  palette: {
    primary: {
      light: '#33c9dc',
      main: '#00bcd4',
      dark: '#008394',
      contrastThreshold: '#ffffff'
    },
    secondary: {
      light: '#ff6333',
      main: '#ff3d00',
      dark: '#b22a00',
      contrastText: '#ffffff'
    }
  },
  typography: {
    useNextVarients: true,
    fontWeight: 300,
    fontFamily: ['Roboto', 'sans-serif'].join(','),
    fontStyle: 'normal',
    fontSize: 16,
    htmlFontSize: 10
  },
  form: {
    textAlign: 'center'
  },
  textField: {
    color: 'red',
    marginBottom: '1rem'
  },
  button: {
    color: '#fff',
    margin: '2rem auto',
    position: 'relative'
  },
  error: {
    color: 'red'
  },
  progress: {
    position: 'absolute'
  }
});

export const themeStyles = {
  form: {
    textAlign: 'center'
  },
  textField: {
    color: 'red',
    marginBottom: '1rem'
  },
  button: {
    color: '#fff',
    margin: '2rem auto',
    position: 'relative'
  },
  error: {
    color: 'red'
  },
  progress: {
    position: 'absolute'
  },
  text: {
    textAlign: 'center',
    margin: '1rem auto'
  }
};
