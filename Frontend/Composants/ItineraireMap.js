// Components/ItineraireMap.js

import React, { PureComponent } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Polyline } from 'react-native-maps';
import { calculCouleurItinéraire } from '../Fonctions/Format'

class ItineraireMap extends PureComponent {

    constructor(props) {
        super(props);
    }

    render() {
        const { itineraire, propsnavigation } = this.props;

        return (
            <Polyline
                coordinates={[
                    ...itineraire.fullPath.geometry.coordinates
                ]}
                key={`Polyline-Itinéraire-${itineraire.idRoute}`}
                strokeWidth={6}
                strokeColor={calculCouleurItinéraire(itineraire.idRoute)}
                tappable={true}
                onPress={() => { }}
                accessibilityLabel={`Itinéraire-${itineraire.idRoute}`}
            />
        );
    }
}


const styles = StyleSheet.create({

})

export default ItineraireMap