// Components/Borne.js

import React, { PureComponent } from 'react'
import { StyleSheet, View, Text } from 'react-native'


class Borne extends PureComponent {

    constructor(props) {
        super(props);
    }

    renderConnecteur(nbTotal, station) {
        return (
            (nbTotal >= 2) ? <Text style={styles.borne}>Connecteur n° {station.bornes.connecteurs.idConnecteur} : {station.bornes.connecteurs.type}</Text> : <Text style={styles.borne}>Connecteur : {station.bornes.connecteurs.type}</Text>
        )
    }

    render() {
        const { station } = this.props;
        console.log(station);

        var nbTotal = Object.keys(station.bornes.connecteur).length;
        return (
            <View>
                {this.renderConnecteur(nbTotal, station)}
            </View>
        );
    }
}

/* <Text style={styles.description}>{marker.description}</Text> */


const styles = StyleSheet.create({
    // Affichage des informations
    borne: {
        fontSize: 14,
        marginBottom: 5,
        fontWeight: 'bold',
        textAlign: 'center',
    },
})

export default Borne