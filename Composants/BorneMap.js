// Components/BorneMap.js

import React, { PureComponent } from 'react'
import { StyleSheet, View, Text } from 'react-native'


class BorneMap extends PureComponent {

    constructor(props) {
        super(props);
    }

    render() {
        const { borne } = this.props;
        console.log(borne);
        return (
            <View>
                {
                    borne.status ? <Text style={styles.borne}>Borne n° {borne.idBorne} disponible </Text> : <Text style={styles.borne}>Borne n° {borne.idBorne} non disponible</Text>
                }

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

export default BorneMap