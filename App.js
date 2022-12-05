import 'react-native-gesture-handler';
import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './src/contexts/authContext/AuthContext';
import { ThemeContext, ThemeProvider } from './src/contexts/themeContext/ThemeContext';
import { LoginNavigation } from './src/navigation/LoginNavigation';


const App = () => {
  // const {theme} = useContext(ThemeContext);
  return (
    <AppState>
      <NavigationContainer
        // theme={theme}
      >
        <LoginNavigation/>
      </NavigationContainer>
    </AppState>
  );
};

const AppState = ({children}) => {
  return (
    <ThemeProvider>
      <AuthProvider>
        {children}
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
