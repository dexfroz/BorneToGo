// Components/PageStation.js

import React from 'react'
import { StyleSheet, View, Text, TouchableHighlight, Image } from 'react-native'
import Station from '../Composants/Station'

class PageStation extends React.Component {

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
})

export default PageStation