// Components/StationMapNonSelectionable.js

import React, { PureComponent } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Marker, Callout } from 'react-native-maps';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { Svg, Image as ImageSvg } from 'react-native-svg'; // On utilise Svg car un bug de react native fait que les images de react-native ne s'affichent pas (sauf dans un <Text></Text> mais cela ajoute des marges et compliquent la mise en forme)
import { connect } from 'react-redux';


class StationMapNonSelectionable extends PureComponent {

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

    // Méthode pour afficher le callout
    renderCalloutMarker(propsnavigation, marker, nbTotal, nbDispo) {

        return (
            <Callout
                tooltip
                onPress={() => propsnavigation.navigation.navigate('Station ', {
                    station: marker,
                })}
            >
                <View>
                    <View style={styles.bulle}>
                        <Text style={styles.name}>
                            {marker.title}
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

        // On compte le nombre de bornes disponibles pour la station
        var nbTotal = Object.keys(marker.data.bornes).length;
        var nbDispo = 0;
        for (const obj of marker.data.bornes) {
            if (obj.status)
                nbDispo++;
        }

        marker.data = {
            ...marker.data,
            "latitude": marker.location.latitude ? marker.location.latitude : 0,
            "longitude": marker.location.longitude ? marker.location.longitude : 0,
        }

        return (
            <Marker
                coordinate={{
                    latitude: marker.data.latitude ? marker.location.latitude : 0,
                    longitude: marker.data.longitude ? marker.location.longitude : 0,
                }}
                ref={(ref) => this.markerRef = ref}
                title={marker.data.adresse}
                pinColor={depart ? 'green' : arrivee ? 'green' : 'green'}
                key={`Station-${marker.data.idStation}-${depart ? 'depart' : ''}${arrivee ? 'arrivee' : ''}`}
            >
                { this.renderCalloutMarker(propsnavigation, marker.data, nbTotal, nbDispo)}
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