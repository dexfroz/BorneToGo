// Composants/Voiture.js

import React, { PureComponent } from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native'

const { width, height } = Dimensions.get('window');

class Voiture extends PureComponent {


    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.sousContainer}>
                    <View>
                        <Text style={styles.title}>Modele</Text>
                        <Text style={styles.info}>{this.props.model}</Text>
                    </View>
                    <View>
                        <Text style={styles.title}>Autonomie</Text>
                        <Text style={styles.info}>{this.props.currentAutonomy} km restants</Text>
                    </View>
                </View>
                <View style={styles.sousContainer}>
                    <View>
                        <Text style={styles.title}>Capacite</Text>
                        <Text style={styles.info}>{this.props.maxAutonomy} km</Text>
                    </View>
                    <View>
                        <Text style={styles.title}>Type de prise</Text>
                        <Text style={styles.info}>{this.props.batteryType}</Text>
                    </View>
                </View>
            </View>
        )
    }

}
const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
    },
    sousContainer: {
        flex: 1,
    },
    title: {
        fontWeight: "bold",
        textDecorationLine: "underline",
        textAlign: 'center',
    },
    info: {
        marginBottom: 10,
        textAlign: 'center',
    }
});

export default Voiture