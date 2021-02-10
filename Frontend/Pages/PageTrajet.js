// Pages/PageTrajet.js

/**
 * Page comportant le formulaire d'entrée de l'itinéraire
 */

import React from 'react'
import { StyleSheet, View, Text, Image, ActivityIndicator } from 'react-native'
import RouteForm from '../Store/Forms/RouteForm'
import { setJsonInputBackend, getRoutesFromAPI } from '../Fonctions/HTTPRequestjson'
import { getItineraires } from '../Fonctions/Itineraire';

class PageTrajet extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: null,
            isLoading: false
        }
    }

    afficheLoading() {
        if (this.state.isLoading) {
            return (
                <View style={styles.loading_container}>
                    <ActivityIndicator size='large' color='green' />
                </View>
            )
        }
    }

    getRoutes(useCase, optimOption, car, userSteps) {
        getRoutesFromAPI(useCase, optimOption, car, userSteps).then(data => {
            var routes = getItineraires(data.routes);
            this.setState({
                data: routes
            });
        })
    }

    recupereItineraire(values) {
        // LOADING
        this.setState({ isLoading: true })

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

            var userSteps_depart = [];
            var userSteps_arrivee = [];
            var userSteps_etapes = [];

            // On récupère les champs address et name pour chaque balise
            for (var i = 0; i < userSteps_balises_reduce.length; i++) {
                var position_address = - 1;
                var position_name = -1;

                for (var j = 0; j < valuesTableau.length; j++) {
                    if (valuesTableau[j][0] == userSteps_balises_reduce[i] + "_address") {
                        position_address = j;
                    }

                    if (valuesTableau[j][0] == userSteps_balises_reduce[i] + "_name") {
                        position_name = j;
                    }
                }

                if (position_address != -1 && position_name != -1) {
                    if (userSteps_balises_reduce[i] == "arrivee") {
                        userSteps_arrivee.push(
                            {
                                "location": [],
                                "address": valuesTableau[position_address][1].toString(),
                                "name": valuesTableau[position_name][1].toString(),
                            }
                        )
                    }
                    else if (userSteps_balises_reduce[i] == "depart") {
                        userSteps_depart.push(
                            {
                                "location": [],
                                "address": valuesTableau[position_address][1].toString(),
                                "name": valuesTableau[position_name][1].toString(),
                            }
                        )
                    }
                    else {
                        userSteps_etapes.push(
                            {
                                "location": [],
                                "address": valuesTableau[position_address][1].toString(),
                                "name": valuesTableau[position_name][1].toString(),
                            }
                        )
                    }
                }
                else if (position_address == -1 && position_name != -1) {
                    if (userSteps_balises_reduce[i] == "arrivee") {
                        userSteps_arrivee.push(
                            {
                                "location": [],
                                "address": "",
                                "name": valuesTableau[position_name][1].toString(),
                            }
                        )
                    }
                    else if (userSteps_balises_reduce[i] == "depart") {
                        userSteps_depart.push(
                            {
                                "location": [],
                                "address": "",
                                "name": valuesTableau[position_name][1].toString(),
                            }
                        )
                    }
                    else {
                        userSteps_etapes.push(
                            {
                                "location": [],
                                "address": "",
                                "name": valuesTableau[position_name][1].toString(),
                            }
                        )
                    }
                }
                else if (position_address != -1 && position_name == -1) {
                    if (userSteps_balises_reduce[i] == "arrivee") {
                        userSteps_arrivee.push(
                            {
                                "location": [],
                                "address": valuesTableau[position_address][1].toString(),
                                "name": "",
                            }
                        )
                    }
                    else if (userSteps_balises_reduce[i] == "depart") {
                        userSteps_depart.push(
                            {
                                "location": [],
                                "address": valuesTableau[position_address][1].toString(),
                                "name": "",
                            }
                        )
                    }
                    else {
                        userSteps_etapes.push(
                            {
                                "location": [],
                                "address": valuesTableau[position_address][1].toString(),
                                "name": "",
                            }
                        )
                    }
                }
            }

            // On ordonne les étapes dans l'ordre etape-1, etape-2, etC.
            userSteps_etapes.sort();

            // On concatène tous les tableaux pour obtenir le trajet complet
            userSteps = userSteps_depart.concat(userSteps_etapes, userSteps_arrivee);

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

            // requête post avec les userSteps ainsi récupérés (si présents)
            if (userSteps.length > 0) {
                //this.getRoutes("trip", "fastest", car, userSteps);
            }

            // PASSER A LA VUE SUIVANTE => PAGEMAPRESULTATS
            if (this.state.data) {
                //console.log("Waypoints", this.state.data[0].waypoints);
                var data = this.state.data;
                this.setState({ isLoading: false, data: null });
                /*this.props.navigation.navigate('Resultats',
                    {
                        itineraires: data // transmission des itinéraires
                    }
                );*/
            }

        }
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
                        this.recupereItineraire(values)
                    }} />
                {this.afficheLoading()}
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
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 100,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default PageTrajet