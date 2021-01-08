// Components/PageLogo.js

import React from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'

class PageLogo extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={styles.main_container}>
                <View style={styles.logoBTG}>
                    <Image
                        source={require('../Images/logo_borne_to_go.png')}
                    />
                </View>
                <View style={styles.logoISEN}>
                    <Image
                        style={styles.imageLogoISEN}
                        source={require('../Images/logo_isen.jpg')}
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