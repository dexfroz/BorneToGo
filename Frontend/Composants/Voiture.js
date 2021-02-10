// Composants/Voiture.js

import React, { PureComponent } from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native'

const { width, height } = Dimensions.get('window');

class Voiture extends PureComponent{

    
    constructor(props){
        super(props);
    }
    
    render(){
        return (
            <View style={styles.container}>
                <View style={styles.sousContainer}>
                    <Text style={styles.title}>Modele</Text> 
                    <Text>{this.props.model}</Text>
                </View>
                <View style={styles.sousContainer}>
                    <Text style={styles.title}>Autonomie</Text> 
                    <Text>{this.props.currentAutonomy} km restants</Text>
                </View>
                <View style={styles.sousContainer}>
                    <Text style={styles.title}>Capacite</Text> 
                    <Text>{this.props.maxAutonomy} km</Text>
                </View>
                <View style={styles.sousContainer}>
                    <Text style={styles.title}>Type de prise</Text> 
                    <Text>{this.props.batteryType}</Text>
                </View>
            </View>
        )
    }

}
const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:"row",
        width: width,
        alignItems: "center",
        backgroundColor: '#fff'
    },
    sousContainer:{
        flex:1,
        flexDirection:"column",
    },
    title:{
        fontWeight: "bold", 
        textDecorationLine: "underline"
    },
});

export default Voiture