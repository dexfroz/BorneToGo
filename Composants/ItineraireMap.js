// Components/ItineraireMap.js

import React, { PureComponent } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Polyline } from 'react-native-maps';


function calculCouleurItinéraire(id) {
    var color = 'blue';
    switch (id) {
        case 1:
            color = 'green';
            break;
        case 2:
            color = 'mediumseagreen';
            break;
        case 3:
            color = 'teal';
            break;
        case 4:
            color = 'darkseagreen';
            break;
        case 5:
            color = 'yellowgreen';
            break;
        case 6:
            color = 'forestgreen';
            break;
        default:
            color = 'red';
    }

    return color;
}

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
                key={`Polyline-Itinéraire-${itineraire.idItineraire}`}
                strokeWidth={6}
                strokeColor={calculCouleurItinéraire(itineraire.idItineraire)}
                tappable={true}
                onPress={() => { }}
                accessibilityLabel={"Itinéraire 1"}
            />
        );
    }
}


const styles = StyleSheet.create({

})

export default ItineraireMap