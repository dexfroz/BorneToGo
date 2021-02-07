// Pages/PageTrajet.js

/**
 * Page comportant le formulaire d'entrée de l'itinéraire
 */

import React from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'
import RouteForm from '../Store/Forms/RouteForm'

function getUserSteps(values) {
    var userSteps = [];

    return userSteps;
}

class PageTrajet extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: null,
        }
    }

    requestPOST(userSteps) {
        // récupération de la voiture dans le redux
        var car = {
            "model": "Tesla cybertruck",
            "subscription": "",
            "batteryType": "",
            "maxAutonomy": 200,
            "currentAutonomy": 50,
            "maxWattage": 42.1,
            "connectors": [
                "EF-T2",
                "EF"
            ]
        }

        // ecriture du json à envoyer
        var requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(setJsonInputBackend("trip", "fastest", car, userSteps))
        };

        // envoi du json par requête POST avec récupération du résultat
        fetch('http://192.168.1.32:4321/bornetogo/backend/', requestOptions)
            .then(response => response.json())
            .then(data => this.setState({ data: data }));
    }

    recupereItineraire(values) {
        // RECUPARATION DE L'ITINERAIRE + REQUETE POST

        var userSteps_balises = [];
        var userSteps = [];

        // On transforme la sortie du formulaire en tableau
        var valuesTableau = Object.keys(values).map(function (cle) {
            return [cle, values[cle]];
        });

        // On récupère les userSteps
        if (valuesTableau.length == 0) {
            // FORMULAIRE VIDE => TOAST
        }
        else {
            // On regarde dans le tableau et on récupère la balise de chaque étape
            for (var i = 0; i < valuesTableau.length; i++) {
                if (valuesTableau[i][0].includes("_address")) {
                    var str_address = "_address";
                    var str = valuesTableau[i][0].substr(0, valuesTableau[i][0].length - str_address.length);
                    userSteps_balises.push(str);
                }
                else if (valuesTableau[i][0].includes("_name")) {
                    var str_name = "_name";
                    var str = valuesTableau[i][0].substr(0, valuesTableau[i][0].length - str_name.length);
                    userSteps_balises.push(str);
                }
            }

            // On retire les doublons de userSteps_balises
            var userSteps_balises_reduce = userSteps_balises.reduce(
                (unique, item) => {
                    return unique.includes(item) ? unique : [...unique, item]
                }, []);

            // On récupère les champs address et name pour chaque balise
            for (var i = 0; i < userSteps_balises_reduce.length; i++) {
                var position_address = - 1;
                var position_name = -1;

                for (var j = 0; j < valuesTableau.length; j++) {
                    if (valuesTableau[j][0] == userSteps_balises_reduce[i] + "_address") {
                        position_address = j;
                    }
                    else if (valuesTableau[j][0] == userSteps_balises_reduce[i] + "_name") {
                        position_name = j;
                    }
                }

                if (position_address != -1 && position_name != -1) {
                    userSteps.push(
                        {
                            "address": valuesTableau[position_address][1].toString(),
                            "name": valuesTableau[position_name][1].toString(),
                        }
                    )
                }
                else if (position_address == -1 && position_name != -1) {
                    userSteps.push(
                        {
                            "address": "",
                            "name": valuesTableau[position_name][1].toString(),
                        }
                    )
                }
                else if (position_address == -1 && position_name != -1) {
                    userSteps.push(
                        {
                            "address": valuesTableau[position_address][1].toString(),
                            "name": "",
                        }
                    )
                }
                else {
                    userSteps.push(
                        {
                            "address": "",
                            "name": "",
                        }
                    )
                }
            }

            // requête post avec les userSteps ainsi récupérés
            //this.requestPOST(userSteps);

            // DATA
            //console.log('DATA', this.state.data);
        }

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