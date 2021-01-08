import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, } from 'react-native';
import PageLogo from './Pages/PageLogo';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PageAPropos from './Pages/PageAPropos';
import PageMap from './Pages/PageMap';


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName ="Home">
        
      <Stack.Screen name="Home" component={PageLogo} />
      <Stack.Screen name="Credits" component={PageAPropos} />
      <Stack.Screen name="Map" component={PageMap} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

