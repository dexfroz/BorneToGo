import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, } from 'react-native';
import PageLogo from './Pages/PageLogo';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Footer from './Composants/Footer';
import { Provider } from 'react-redux';
import Store from './Store/configureStore';

const Stack = createStackNavigator();

export default class App extends React.Component {
  render() {
    return (
      <Provider store={Store} >
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={PageLogo} />
            <Stack.Screen name="BorneToGo" component={Footer} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    )
  }
}

/*
const styles = StyleSheet.create({
  container: {

  },
});
*/

