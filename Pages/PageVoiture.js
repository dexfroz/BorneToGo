// Pages/PageVoiture.js

import React from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'

class PageVoiture extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style = {styles.mainContainer}>
                <Text>Bonjour voiture</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
mainContainer:{
    flex:1,
},
})

export default PageVoiture