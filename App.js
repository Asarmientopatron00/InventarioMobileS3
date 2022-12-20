import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './src/contexts/authContext/AuthContext';
import { CommonProvider } from './src/contexts/commonContext/CommonContext';
import { ThemeProvider } from './src/contexts/themeContext/ThemeContext';
import { LoginNavigation } from './src/navigation/LoginNavigation';
import { RemisionProvider } from './src/contexts/remisionContext/RemisionContext';


const App = () => {
  return (
    <AppState>
      <NavigationContainer
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
        <CommonProvider>
          <RemisionProvider>
            {children}
          </RemisionProvider>
        </CommonProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
