// Components/Borne.js

import React, { PureComponent } from 'react'
import { StyleSheet, View, Text } from 'react-native'


class Borne extends PureComponent {

    constructor(props) {
        super(props);
    }

    render() {
        const { station, borne, connecteur, propsnavigation } = this.props;

        return (
            <View>
                <Text style={styles.borne}>{connecteur.type}</Text>
            </View>
        );
    }
}

/* <Text style={styles.description}>{marker.description}</Text> */


const styles = StyleSheet.create({
    // Affichage des informations
    borne: {
        fontSize: 8,
        marginBottom: 5,
        fontWeight: 'bold',
        textAlign: 'center',
        textAlignVertical: 'center',
        color: 'white',
        backgroundColor: '#70B445',
        borderRadius: 10,
        height: 20,
        width: 40
    },
})

export default Borne