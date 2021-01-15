// Components/MarkerItineraire.js

import React, { PureComponent } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Marker, Callout } from 'react-native-maps';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { Svg, Image as ImageSvg } from 'react-native-svg'; // On utilise Svg car un bug de react native fait que les images de react-native ne s'affichent pas (sauf dans un <Text></Text> mais cela ajoute des marges et compliquent la mise en forme)
import { connect } from 'react-redux';


class MarkerItineraire extends PureComponent {

    constructor(props) {
        super(props);
    }

    

    render() {
        const { marker, propsnavigation } = this.props;
        console.log(marker);
        return (
            <Marker
                coordinate={{
                    latitude: marker.latitude,
                    longitude: marker.longitude
                }}
                pinColor={marker.etape ? 'linen' : 'red'}
                title={marker.title}
                description={marker.description}
                label={marker.label}
                key={`Marker-${marker.label}-${marker.latitude}-${marker.longitude}`}
                onPress={() => propsnavigation.navigation.navigate('Station ', {
                    marker: marker,
                })}
            >
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