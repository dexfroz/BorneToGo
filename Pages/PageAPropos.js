// Pages/PageAPropos.js

import React from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'

class PageAPropos extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style = {styles.mainContainer}>
                <View style ={styles.textStyle}>
                    <Text> Hello World !</Text>
                </View>
                <View style = {styles.footer}>
                    <View style ={styles.footerTextStyle}>
                        <Text>© BorneToGo application</Text>
                    </View>
                    <View style={styles.logoISEN}>
                        <Image
                            style={styles.imageLogoISEN}
                            source={require('../Images/logo_isen.jpg')}
                        />
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({

    mainContainer:{
        flex:1,
    },
    textStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    footer: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    footerTextStyle: {
        
        alignItems: 'flex-start'
    },
    logoISEN: {
        
        alignItems: 'flex-end'
    },
    imageLogoISEN: {
        height: 75,
        width: 200
    }
})

export default PageAPropos