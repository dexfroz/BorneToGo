import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Footer from './Composants/Footer';
import { Provider } from 'react-redux';
import Store from './Store/configureStore';
import PageLogo from './Pages/PageLogo';
import PageStation from './Pages/PageStation';
import PageItineraire from './Pages/PageItineraire';
import PageMapResultat from './Pages/PageMapResultat';
import PageVoiture from './Pages/PageVoiture';
import PageTrajet from './Pages/PageTrajet';
import PageBorne from './Pages/PageBorne';
import PageAPropos from './Pages/PageAPropos';
import PageStat from './Pages/PageStat';


const Stack = createStackNavigator();

export default class App extends React.Component {
  render() {
    return (
      <Provider store={Store} >
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={PageLogo} />
            <Stack.Screen name="Voiture" component={PageVoiture} />
            <Stack.Screen name="Itinéraire" component={PageTrajet} />
            <Stack.Screen name="Borne" component={PageBorne} />
            <Stack.Screen name="BorneToGo" component={Footer} />
            <Stack.Screen name="Station" component={PageStation} />
            <Stack.Screen name="Informations" component={PageItineraire} />
            <Stack.Screen name="Resultats" component={PageMapResultat} />
            <Stack.Screen name="Statistiques" component={PageStat} />
            <Stack.Screen name="A Propos" component={PageAPropos} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    )
  }
}

