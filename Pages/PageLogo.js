// Components/PageLogo.js

import React from 'react'
import { StyleSheet, View, Text, TouchableHighlight, Image } from 'react-native'

class PageLogo extends React.Component {


    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={styles.main_container}>
                <View style={styles.logoBTG}>
                    <TouchableHighlight
                        underlayColor='transparent'
                        onPress={() => this.props.navigation.navigate('BorneToGo')}>
                        <Image
                            source={require('../Images/logo_borne_to_go.png')}
                        />
                    </TouchableHighlight>
                </View>
                <View style={styles.logoISEN}>
                    <Image
                        style={styles.imageLogoISEN}
                        source={require('../Images/logo_isen.png')}
                    />
                </View>

            </View >
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        marginTop: 20,
    },
    logoBTG: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    logoISEN: {
        alignItems: 'flex-end',
    },
    imageLogoISEN: {
        height: 75,
        width: 200
    }
})

export default PageLogo