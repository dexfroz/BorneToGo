// Components/StationMapNonSelectionable.js

import React, { PureComponent } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Marker, Callout } from 'react-native-maps';
import { Svg, Image as ImageSvg } from 'react-native-svg';


class StationMapNonSelectionable extends PureComponent {

    constructor(props) {
        super(props);
    }

    // Méthode pour afficher les bornes disponibles
    renderBornesDisponibles(nbTotal, nbDispo) {
        return (
            (nbDispo == 0)
                ?
                <Text style={styles.pasdispo}>Pas de bornes disponibles</Text>
                :
                (nbDispo > 1)
                    ?
                    <Text style={styles.dispo}>{nbDispo}/{nbTotal} disponibles</Text>
                    :
                    <Text style={styles.dispo}>{nbDispo}/{nbTotal} disponible</Text>
        )
    }

    // Méthode pour afficher le callout
    renderCalloutMarker(propsnavigation, marker, nbTotal, nbDispo) {

        return (
            <Callout
                tooltip
                onPress={() => propsnavigation.navigation.navigate('Station', {
                    station: marker,
                })}
            >
                <View>
                    <View style={styles.bulle}>
                        <Text style={styles.name}>
                            {marker.name}
                        </Text>
                        <Text style={styles.description}>
                            <View style={styles.bornesDispo}>
                                {this.renderBornesDisponibles(nbTotal, nbDispo)}
                            </View>
                        </Text>
                        <View style={styles.image}>
                            <Svg width={100} height={100} >
                                <ImageSvg
                                    width="100%"
                                    height="100%"
                                    preserveAspectRatio="xMidYMid slice"
                                    href={require('../Images/borne.png')}
                                />
                            </Svg>
                        </View>
                    </View>
                    <View style={styles.arrowborder} />
                    <View style={styles.arrow} />
                </View>
            </Callout>
        )
    }

    render() {
        const { marker, depart, arrivee, propsnavigation } = this.props;

        // marker.data = {
        //     "paymentStatus": "",
        //     "bornes": [
        //         {
        //             "idBorne": 1,
        //             "status": false,
        //             "courant": "AC (Single-Phase)",
        //             "connecteur": "CEE 7/4",
        //             "puissance": 22
        //         },
        //         {
        //             "idBorne": 2,
        //             "status": true,
        //             "courant": "AC (Three-Phase)",
        //             "connecteur": "IEC 62196-2",
        //             "puissance": 22
        //         },
        //         {
        //             "idBorne": 3,
        //             "status": true,
        //             "courant": "AC (Single-Phase)",
        //             "connecteur": "CEE 7/4",
        //             "puissance": 22
        //         },
        //         {
        //             "idBorne": 4,
        //             "status": true,
        //             "courant": "AC (Three-Phase)",
        //             "connecteur": "IEC 62196-2",
        //             "puissance": 22
        //         }
        //     ]
        // };

        // Création de deux tableaux : un pour les bornes disponibles, un autre pour les bornes non disponibles
        var bornesDispo = [];
        var bornesNonDispo = [];

        // On compte le nombre de bornes disponibles pour la station
        var nbTotal = Object.keys(marker.data.bornes).length;
        var nbDispo = 0;
        if (nbTotal > 0) {
            for (const obj of marker.data.bornes) {
                if (obj.status) {
                    nbDispo++;
                    bornesDispo.push(obj);
                }
                else {
                    bornesNonDispo.push(obj);
                }
            }
        }

        var title = marker.name;

        return (
            <Marker
                coordinate={{
                    latitude: marker.location.latitude ? marker.location.latitude : 0,
                    longitude: marker.location.longitude ? marker.location.longitude : 0,
                }}
                ref={(ref) => this.markerRef = ref}
                title={title}
                pinColor={depart ? 'green' : arrivee ? 'green' : 'green'}
                key={`Station-${marker.data.idStation}-${depart ? 'depart' : ''}${arrivee ? 'arrivee' : ''}`}
            >
                { this.renderCalloutMarker(propsnavigation, marker, nbTotal, nbDispo)}
            </Marker >
        );
    }
}


const styles = StyleSheet.create({
    // Bulle d'information
    bulle: {
        flexDirection: 'column',
        alignSelf: 'center',
        backgroundColor: '#fff',
        borderRadius: 6,
        borderColor: '#ccc',
        borderWidth: 0.5,
        padding: 15,
        width: 200,
    },
    // Affichage des informations
    name: {
        fontSize: 16,
        marginBottom: 5,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    description: {
        fontSize: 14,
        fontStyle: 'italic',
        textAlign: 'center',
        marginBottom: 5,
    },
    bornesDispo: {
        justifyContent: 'center',
    },
    dispo: {
        fontSize: 14,
        color: 'green',
    },
    pasdispo: {
        fontSize: 14,
        color: 'red',
    },
    // Flèche sous la bulle
    arrow: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        borderTopColor: '#fff',
        borderWidth: 16,
        alignSelf: 'center',
        marginTop: -32,
    },
    arrowborder: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        borderTopColor: '#007a87',
        borderWidth: 16,
        alignSelf: 'center',
        marginTop: -0.5,
    },
    image: {
        alignItems: 'center',
        justifyContent: 'center',
    },
})

export default StationMapNonSelectionable