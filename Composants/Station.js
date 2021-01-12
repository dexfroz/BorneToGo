// Components/Station.js

import React, { PureComponent } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import Borne from './Borne';


class Station extends PureComponent {

    constructor(props) {
        super(props);
    }

    // Méthode pour afficher les bornes disponibles
    renderBornesDisponibles(nbTotal, nbDispo) {
        return (
            (nbDispo == 0) ?
                <Text style={styles.pasdispo}>Pas de bornes disponibles</Text> :
                (nbDispo > 1) ? <Text style={styles.dispo}>{nbDispo}/{nbTotal} disponibles</Text> :
                    <Text style={styles.dispo}>{nbDispo}/{nbTotal} disponible</Text>
        )
    }

    renderBornes(nbTotal) {
        return (
            (nbTotal >= 2) ? <Text style={styles.borne}>Bornes : </Text> : <Text style={styles.borne}>Borne : </Text>
        )
    }

    render() {
        const { station } = this.props;

        // On compte le nombre de bornes disponibles pour la station
        var nbTotal = Object.keys(station.bornes).length;
        var nbDispo = 0;
        for (const obj of station.bornes) {
            if (obj.status)
                nbDispo++;
        }

        console.log(station);
        return (
            <View>
                <Text style={styles.adresse}>{station.adresse}</Text>
                <Text style={styles.horaire}>{station.horaire}</Text>
                {this.renderBornes(nbTotal)}
                {this.renderBornesDisponibles(nbTotal, nbDispo)}
                {station.bornes.map(item =>
                    <Borne
                        key={`Borne-${item.idStation}-${item.idBorne}`} borne={item} />
                )}
            </View>
        );
    }
}

/* <Text style={styles.description}>{marker.description}</Text> */


const styles = StyleSheet.create({
    // Affichage des informations
    station: {
        fontSize: 14,
        marginBottom: 5,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    borne: {

    },
    adresse: {

    },
    horaire: {

    },
    dispo: {
        fontSize: 14,
        fontWeight: "bold",
        color: 'green',
    },
    pasdispo: {
        fontSize: 14,
        fontWeight: "bold",
        color: 'red',
    },
})

export default Station