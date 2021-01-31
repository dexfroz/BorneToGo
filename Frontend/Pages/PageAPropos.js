// Pages/PageAPropos.js

/**
 * Page à propos de l'équipe ayant réalisé le projet.
 */

import React from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';

class PageAPropos extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={styles.mainContainer}>
                <View style={styles.textStyle}>
                    <ScrollView>
                        <View style={styles.textScroll}>
                            <Text style={styles.text}>Cette application a été réalisée dans le cadre du Bureau d'Etude de Master 2 à l'ISEN Toulon. Il a été réalisé par un groupe de 7 élèves :</Text>
                            <View style={styles.noms}>
                                <Text style={styles.pierrick}>Pierrick André</Text>
                                <Text style={styles.guillaume}>Guillaume Bessueille</Text>
                                <Text style={styles.benjamin}>Benjamin Callegarin</Text>
                                <Text style={styles.marie}>Marie Giannoni</Text>
                                <Text style={styles.lucas}>Lucas Magerand</Text>
                                <Text style={styles.florian}>Florian Sananes</Text>
                                <Text style={styles.arnaud}>Arnaud Van Den Reysen</Text>
                                <View style={styles.vue_anais}>
                                    <Text style={styles.text}>sous la tutelle de </Text>
                                    <Text style={styles.anais}>Anaïs Galligani.</Text>
                                </View>
                            </View>
                            <Text style={styles.text}>Cette application permet aux possesseurs de voitures électriques de localiser les bornes de rechargement les plus proches et de réaliser des itinéraires prenant en compte l'autonomie de la voiture pour lui éviter de tomber en panne.</Text>
                        </View>
                    </ScrollView>
                </View>
                <View style={styles.footer}>
                    <View style={styles.footerTextStyle}>
                        <Text>© BorneToGo application</Text>
                    </View>
                    <View style={styles.logoISEN}>
                        <Image
                            style={styles.imageLogoISEN}
                            source={require('../Images/logo_isen.png')}
                        />
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({

    mainContainer: {
        flex: 1,
    },
    textStyle: {
        flex: 8,
    },
    textScroll: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 24,
        marginVertical: 14,
        backgroundColor: 'white',
        paddingHorizontal: 14,
        paddingVertical: 14,
        borderRadius: 10,
    },
    text: {
        fontSize: 18,
    },
    noms: {
        margin: 10,
    },
    pierrick: {
        fontWeight: 'bold',
        fontSize: 18,
        color: '#45A8B4',
    },
    guillaume: {
        fontWeight: 'bold',
        fontSize: 18,
        color: '#45A8B4',
    },
    benjamin: {
        fontWeight: 'bold',
        fontSize: 18,
        color: '#45B4A5',
    },
    marie: {
        fontWeight: 'bold',
        fontSize: 18,
        color: '#45B489',
    },
    lucas: {
        fontWeight: 'bold',
        fontSize: 18,
        color: '#45B46D',
    },
    florian: {
        fontWeight: 'bold',
        fontSize: 18,
        color: '#45B452',
    },
    arnaud: {
        fontWeight: 'bold',
        fontSize: 18,
        color: '#54B445',
    },
    vue_anais: {
        flexDirection: 'row',
    },
    anais: {
        fontWeight: 'bold',
        fontSize: 18,
        color: '#70B445',
    },
    footer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-end',
    },
    footerTextStyle: {
        justifyContent: 'flex-end',
        alignItems: 'flex-start'
    },
    logoISEN: {

        alignItems: 'flex-end'
    },
    imageLogoISEN: {
        height: 75,
        width: 180
    }
})

export default PageAPropos