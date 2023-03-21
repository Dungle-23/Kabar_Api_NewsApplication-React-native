import { View, Text } from 'react-native'
import React from 'react'
import AppNavigator from './src/component/Context/AppNavigator'
import { AppContextProvider } from './src/component/Context/AppContext'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const App = () => {
  const Stack = createNativeStackNavigator();
  return (
    <AppContextProvider>
      <NavigationContainer>
        <AppNavigator></AppNavigator>
      </NavigationContainer>
    </AppContextProvider>
  )
}


export default App