// Components/MarkerItineraire.js

import React, { PureComponent } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Marker, Callout } from 'react-native-maps';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { Svg, Image as ImageSvg } from 'react-native-svg'; // On utilise Svg car un bug de react native fait que les images de react-native ne s'affichent pas (sauf dans un <Text></Text> mais cela ajoute des marges et compliquent la mise en forme)
import { connect } from 'react-redux';
import StationMapNonSelectionnable from './StationMapNonSelectionnable';


class MarkerItineraire extends PureComponent {

    constructor(props) {
        super(props);
    }

    render() {
        const { marker, depart, arrivee, propsnavigation } = this.props;

        var title = marker.name + "\n" + marker.address;
        return (
            <Marker
                coordinate={{
                    latitude: marker.location.latitude ? marker.location.latitude : 0,
                    longitude: marker.location.longitude ? marker.location.longitude : 0,
                }}
                pinColor={depart ? 'tomato' : arrivee ? 'teal' : 'linen'}
                title={title}
                key={`Marker-${marker.location.latitude}-${marker.location.longitude}-${depart ? 'depart' : ''}${arrivee ? 'arrivee' : ''}`}
            />
        );
    }
}
/*
*/


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

/* REDUX */
// Connexion du state global au component PageMap
const mapStateToProps = (state) => {
    return {
        active: state.borneActive.active
    }
}

// Dispatcher
const mapDispatchToProps = (dispatch) => {
    return {
        dispatch: (action) => { dispatch(action) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MarkerItineraire)