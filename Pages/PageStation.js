// Components/PageStation.js

import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native'
import Station from '../Composants/Station'

class PageStation extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        const { station } = this.props.route.params;

        return (
            <View style={styles.main_container}>
                <View style={styles.station}>
                    <Station station={station} />
                </View>
                <View style={styles.vue_bouton}>
                    <TouchableOpacity
                        style={styles.bouton}
                    >
                        <View>
                            <Text style={styles.selection}>Sélectionner</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View >
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        backgroundColor: 'white',
    },
    station: {
        flex: 9,
    },
    vue_bouton: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center'
    },
    bouton: {
        backgroundColor: '#70B445',
        padding: 15,
        borderRadius: 6,
        marginHorizontal: 24,
        marginVertical: 12
    },
    selection: {
        color: 'white',
        fontWeight: "bold",
        textAlign: 'center',
    },
})

export default PageStation