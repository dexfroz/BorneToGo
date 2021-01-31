// Composants/Voiture.js

import React, { PureComponent } from 'react'
import { StyleSheet, Text, View } from 'react-native'

class Voiture extends PureComponent{

    
    constructor(props){
        super(props);
    }
    
    render(){
        return (
            <View style={styles.container}>
                <Text>Modele : {this.props.modele}</Text>
                <Text>Autonomie : {this.props.autonomie} km restants</Text>
                <Text>Capacite : {this.props.capacite} km</Text>
                <Text>Type de prise : {this.props.typePrise}</Text>
            </View>
        )
    }

}
const styles = StyleSheet.create({
    container:{
        flex:1,
    },
});

export default Voiture