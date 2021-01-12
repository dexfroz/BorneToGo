// Components/Borne.js

import React, { PureComponent } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import Connecteur from './Connecteur';

class Borne extends PureComponent {

    constructor(props) {
        super(props);
    }

    renderDispo(status) {
        return (
            (status) ? <Text style={styles.dispo}>Disponible{borne.idBorne}</Text> : <Text style={styles.pasdispo}>Pas disponible</Text>
        )
    }

    renderBorne(nbTotal) {
        return (
            (nbTotal >= 2) ? <Text style={styles.borne}>Borne n° {borne.idBorne}</Text> : <Text style={styles.borne}>Borne : </Text>
        )
    }

    render() {
        const { station } = this.props;
        console.log(station);
        return (
            <View>
                {this.renderBorne(nbTotal)}
                <Text style={styles.type}>type : {borne.type} kW</Text>
                <View>
                    {station.bornes.connecteur.map(item =>
                        <Connecteur
                            key={`Connecteur-${item.idStation}-${item.idBorne}-${item.idConnecteur}`} connecteur={item} />
                    )}
                </View>
                {this.renderDispo(station.bornes.status)}
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
    type: {
        fontSize: 14,
        marginBottom: 5,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    dispo: {
        backgroundColor: 'green',
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 10,
        borderRadius: 10,
    },
    pasdispo: {
        backgroundColor: 'red',
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 10,
        borderRadius: 10,
    },
})

export default Borne