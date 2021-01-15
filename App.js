import 'react-native-gesture-handler';
import React from 'react';
import PageLogo from './Pages/PageLogo';
import PageStation from './Pages/PageStation';
import PageStationNonSelectionnable from './Pages/PageStationNonSelectionnable';
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
            <Stack.Screen name="Station" component={PageStation} />
            <Stack.Screen name="Station " component={PageStationNonSelectionnable} />
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

