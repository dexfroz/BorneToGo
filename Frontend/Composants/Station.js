// Components/Station.js

import React, { PureComponent } from 'react'
import { StyleSheet, View, Text, Image, Dimensions, FlatList } from 'react-native'
import Borne from './Borne';

// Dimensions de l'écran
const { width, height } = Dimensions.get('window');

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

    renderTitleBornes(nbTotal) {
        return (
            (nbTotal >= 2) ? <Text style={styles.borne_titre}>Bornes : </Text> : <Text style={styles.borne_titre}></Text>
        )
    }

    renderBorne(item, station, propsnavigation) {
        return (
            <Borne
                key={`Borne-${station.idStation}-${item.idBorne}`}
                borne={item}
                station={station}
                propsnavigation={propsnavigation}
            />
        )
    }

    render() {
        const { station, propsnavigation } = this.props;
        // Création de deux tableaux : un pour les bornes disponibles, un autre pour les bornes non disponibles
        var bornesDispo = [];
        var bornesNonDispo = [];

        // On compte le nombre de bornes disponibles pour la station
        var nbTotal = Object.keys(station.bornes).length;
        var nbDispo = 0;
        if (nbTotal > 0) {
            for (const obj of station.bornes) {
                if (obj.status) {
                    nbDispo++;
                    bornesDispo.push(obj);
                }
                else {
                    bornesNonDispo.push(obj);
                }
            }
        }

        var allBornes = bornesDispo.concat(bornesNonDispo);

        return (
            <View>
                <View style={styles.header}>
                    <View style={styles.titre}>
                        <Image
                            style={styles.image}
                            source={require('../Images/borne.png')}
                        />
                        <View style={styles.titre_adresse}>
                            <Text style={styles.title}>{station.title}</Text>
                            <Text style={styles.adresse}>{station.adresse}</Text>
                        </View>
                    </View>
                    <View style={styles.info_generale}>
                        <View style={styles.disponibilite}>
                            {this.renderTitleBornes(nbTotal)}
                            {this.renderBornesDisponibles(nbTotal, nbDispo)}
                        </View>
                    </View>
                </View>
                <View style={styles.bornes}>
                    <FlatList
                        nestedScrollEnabled
                        vertical
                        data={allBornes}
                        renderItem={(item) => this.renderBorne(item, station, propsnavigation)}
                        keyExtractor={(item) => `Borne-${station.idStation}-${item.idBorne}`}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        margin: 10,
    },
    // Affichage des informations du chapeau
    image: {
        height: 75,
        width: 75,
        marginEnd: 10
    },
    titre: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    // TITRE ET ADRESSE
    titre_adresse: {
        flex: 1
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
    adresse: {
        fontSize: 14,
        fontStyle: 'italic',
    },
    horaire: {
        fontSize: 18,
        textAlign: 'right',
        fontStyle: 'italic',
    },
    // Disponibilité de la borne
    disponibilite: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10
    },
    borne_titre: {
        fontSize: 18,
        fontWeight: "bold",
    },
    dispo: {
        fontSize: 18,
        fontWeight: "bold",
        color: 'green',
    },
    pasdispo: {
        fontSize: 18,
        fontWeight: "bold",
        color: 'red',
    },
    bornes: {
        marginBottom: 270,
    }
})

export default Station