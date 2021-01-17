// Components/PageStationNonSelectionnable.js

import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native'
import Station from '../Composants/Station'

class PageStationNonSelectionnable extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {

        const { station } = this.props.route.params;

        return (
            <View style={styles.main_container}>
                <Station station={station} />
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
})

export default PageStationNonSelectionnable