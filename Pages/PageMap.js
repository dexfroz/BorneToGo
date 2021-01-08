// Pages/PageMap.js

import React from 'react'
import { StyleSheet, View, Text, Image, Button } from 'react-native'

class PageMap extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View>
                <Text>Go To Credits</Text>
                <Button 
                title="GoToCredits"
                onPress={() => this.props.navigation.navigate("Credits")} />
                </View>
        );
    }
}

const styles = StyleSheet.create({

})

export default PageMap