//Composants/Footer.js

import React from 'react'
import { StyleSheet, View } from 'react-native'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { FontAwesome } from '@expo/vector-icons'
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import PageAPropos from '../Pages/PageAPropos';
import PageTrajet from '../Pages/PageTrajet'
import PageVoiture from '../Pages/PageVoiture'
import PageMap from '../Pages/PageMap';
import PageMapResultat from '../Pages/PageMapResultat';

const Tab = createBottomTabNavigator();

class Footer extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        //We have one Tab.Screen for each menu in the bottom tab. The name of each tab is managed here with prio to
        // the option 'tabBarLabel'.
        return (
            <View style={styles.footer}>
                <Tab.Navigator>
                    <Tab.Screen
                        name="Voiture"
                        component={PageVoiture}
                        options={{
                            tabBarIcon: ({ color, size }) => (
                                <FontAwesome name="car" size={size} color={color} />
                            ),
                        }}
                    />
                    <Tab.Screen
                        name="Map"
                        component={PageMap}
                        options={{
                            tabBarLabel: "Borne",
                            tabBarIcon: ({ color, size }) => (
                                <Feather name="battery-charging" size={size} color={color} />
                            ),
                        }}
                    />
                    <Tab.Screen
                        name="Itinéraire"
                        component={PageTrajet}
                        options={{
                            tabBarIcon: ({ color, size }) => (
                                <AntDesign name="enviromento" size={size} color={color} />
                            ),
                        }}
                    />
                    <Tab.Screen
                        name="A propos"
                        component={PageAPropos}
                        options={{
                            tabBarIcon: ({ color, size }) => (
                                <MaterialCommunityIcons name="human-greeting" size={size} color={color} />
                            ),
                        }}
                    />
                    <Tab.Screen
                        name="Resultat"
                        component={PageMapResultat}
                        options={{
                            tabBarIcon: ({ color, size }) => (
                                <MaterialCommunityIcons name="tree" size={size} color={color} />
                            ),
                        }}
                    />
                </Tab.Navigator>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    footer: {
        flex: 1
    },
})

export default Footer