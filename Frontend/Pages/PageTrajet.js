// Pages/PageTrajet.js

/**
 * Page comportant le formulaire d'entrée de l'itinéraire
 */

import React from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'
import RouteForm from '../Store/Forms/RouteForm'

class PageTrajet extends React.Component {

    constructor(props) {
        super(props)
    }

    recupereItineraire(values) {
        console.log(values);
        // RECUPARATION DE L'ITINERAIRE + REQUETE POST
        // PASSER A LA VUE SUIVANTE => PAGEMAPRESULTATS en lui transmettant les itinéraires (formatés) dans un tableau immuable

        return (
            <View></View>
        )
    }

    render() {
        return (
            <View style={styles.main_container}>
                <View style={styles.titre}>
                    <Image
                        style={styles.image}
                        source={require('../Images/itineraire.png')}
                    />
                    <View style={styles.info_titre}>
                        <Text style={styles.title}>Définissez votre itinéraire</Text>
                        <Text style={styles.explication}>Entrez les adresses des étapes de votre trajet.</Text>
                    </View>
                </View>
                <RouteForm
                    onSubmit={(values) => {
                        console.log("Itinéraire envoyé");
                        //console.log(values);
                        this.recupereItineraire(values);
                    }} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
    },
    image: {
        height: 75,
        width: 75,
        marginEnd: 10
    },
    titre: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    info_titre: {
        flex: 1,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
    explication: {
        fontSize: 14,
        fontStyle: 'italic',
    },
})

export default PageTrajet