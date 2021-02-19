// Pages/PageTrajet.js

/**
 * Page comportant le formulaire d'entrée de l'itinéraire
 */

import React from 'react'
import { StyleSheet, View, Text, Image, ActivityIndicator } from 'react-native'
import RouteForm from '../Store/Forms/RouteForm'
import { getRoutesFromAPI } from '../Fonctions/HTTPRequestjson'
import { getItineraires } from '../Fonctions/Itineraire'
import Toast from 'react-native-simple-toast';

class PageTrajet extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: null,
            isLoading: false,
            userSteps: [],
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

    async getRoutes(useCase, optimOption, car, userSteps) {
        // requête post avec les userSteps ainsi récupérés (si présents)
        if (userSteps.length > 0) {
            getRoutesFromAPI(useCase, optimOption, car, userSteps).then(data => {
                if (data) {
                    if (data.routes && Object.keys(data).length > 0) {
                        var routes = getItineraires(data.routes);
                        this.state.data = routes;
                        this.afficherResultat();
                    }
                    else {
                        // MESSAGE TOAST : Nous n'avons pas pu calculer d'itinéraire
                        Toast.showWithGravity("Nous n'avons pas pu trouver d'itinéraire correspondant à votre recherche.", Toast.LONG, Toast.BOTTOM);
                        console.log("Pas d'itinéraire trouvé");
                        this.setState({ isLoading: false, data: null });
                    }
                }
                else {
                    // MESSAGE TOAST : Nous n'avons pas pu calculer d'itinéraire
                    Toast.showWithGravity("Nous n'avons pas pu trouver d'itinéraire correspondant à votre recherche.", Toast.LONG, Toast.BOTTOM);
                    console.log("Pas d'itinéraire trouvé");
                    this.setState({ isLoading: false, data: null });
                }
            })
        }
    }

    afficherResultat() {
        // PASSER A LA VUE SUIVANTE => PAGEMAPRESULTATS
        //Object.keys(this.state.depart.data).length > 0
        if (this.state.data && Object.keys(this.state.data).length > 0) {
            var data = this.state.data;
            this.setState({ isLoading: false, data: null });
            this.props.navigation.navigate('Resultats',
                {
                    itineraires: data // transmission des itinéraires
                }
            );
        }
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
        if (valuesTableau.length == 0 && Object.keys(values).length <= 0) {
            // FORMULAIRE VIDE => TOAST
            Toast.showWithGravity("Vous n'avez pas renseigné d'itinéraire.", Toast.LONG, Toast.BOTTOM);
            console.log("Pas d'itinéraire renseigné");
            this.setState({ isLoading: false, data: null });
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

            this.state.userSteps = userSteps;

        }
    }

    render() {

        // récupération de la voiture dans le redux
        var car = {
            "model": "Renault ZOE R135",
            "subscription": "",
            "maxAutonomy": 390,
            "currentAutonomy": 390,
            "capacity": 52,
            "courantConnecteurs": [
                {
                    "courant": "AC (Three-Phase)",
                    "connecteur": "IEC 62196-2 Type 2",
                    "puissance": 22
                },
                {
                    "courant": "DC",
                    "connecteur": "IEC 62196-3 Configuration FF",
                    "puissance": 50
                }
            ]
        };

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
                        this.recupereItineraire(values);
                        this.getRoutes("trip", "fastest", car, this.state.userSteps);
                    }} />
                {this.afficheLoading()}
            </View>
        );
    }

    componentDidUpdate() {

    }

    componentDidMount() {
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
        alignItems: 'flex-start',
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
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default PageTrajet