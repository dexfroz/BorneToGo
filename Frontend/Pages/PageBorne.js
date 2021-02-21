// Pages/PageBorne.js

/**
 * Page permettant d'indiquer sa localisation et le use case : fastest, cheapest de la borne recherchée
 */

import React from 'react';
import { StyleSheet, View, Text, Image, ActivityIndicator } from 'react-native';
import BorneForm from '../Store/Forms/BorneForm';
import { Slider, Icon } from 'react-native-elements';
import { getRoutesFromAPI } from '../Fonctions/HTTPRequestjson';
import { getItineraires } from '../Fonctions/Itineraire';
import { ScrollView } from 'react-native-gesture-handler';
import Toast from 'react-native-simple-toast';
import { connect } from 'react-redux';

class PageBorne extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            data: null,
            value: 0,
            text_value: "La plus proche",
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
                        console.log("REPONSE", data);
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
        if (this.state.data) {
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
        var userSteps = [];

        if (Object.keys(values).length > 0) {
            // On transforme la sortie du formulaire en tableau avec la localisation de l'utilisateur
            if (values.depart_address && values.depart_name) {
                userSteps.push(
                    {
                        "location": [],
                        "address": values.depart_address,
                        "name": values.depart_name,
                    }
                )
            }
            else if (values.depart_address && !values.depart_name) {
                userSteps.push(
                    {
                        "location": [],
                        "address": values.depart_address,
                        "name": "",
                    }
                )
            }
            else if (!values.depart_address && values.depart_name) {
                userSteps.push(
                    {
                        "location": [],
                        "address": "",
                        "name": values.depart_name,
                    }
                )
            }
        }
        else {
            // FORMULAIRE VIDE => TOAST
            Toast.showWithGravity("Vous n'avez pas renseigné d'itinéraire.", Toast.LONG, Toast.BOTTOM);
            console.log("Pas de localisation renseignée");
            this.setState({ isLoading: false, data: null });
        }

        this.state.userSteps = userSteps;
    }

    renderSlider() {
        return (
            <View style={styles.slider}>
                <Slider
                    value={this.state.value}
                    onValueChange={(value) => this.setValue(value)}
                    maximumValue={1}
                    minimumValue={0}
                    step={1}
                    trackStyle={{ height: 10, backgroundColor: 'transparent' }}
                    thumbStyle={{ height: 20, width: 20, backgroundColor: 'transparent' }}
                    thumbProps={{
                        children: (
                            <Icon
                                name="leaf"
                                type="font-awesome"
                                size={20}
                                reverse
                                containerStyle={{ bottom: 20, right: 20 }}
                                color="#70B445"
                            />
                        ),
                    }}
                />
            </View >
        )
    }

    renderValue() {
        return (
            <Text style={styles.slider_text}>{this.state.text_value}</Text>
        )
    }

    render() {
        // récupération de la voiture dans le redux
        var car = this.props.car;

        // On récupère le useCase
        var useCase = "fastest";
        if (this.state.text_value == "La plus proche") {
            useCase = "fastest";
        }
        else {
            //useCase = "cheapest"; // PAS ENCORE DISPONIBLE
        }

        return (
            <View style={styles.main_container}>
                <View style={styles.titre}>
                    <Image
                        style={styles.image}
                        source={require('../Images/borne.png')}
                    />
                    <View style={styles.info_titre}>
                        <Text style={styles.title}>Rendez-vous à une borne</Text>
                        <Text style={styles.explication}>Entrez votre localisation et définissez si vous voulez vous rendre à la borne la plus proche ou la moins chère.</Text>
                    </View>
                </View>
                <ScrollView>
                    <View style={styles.slider_vue}>
                        <Text style={styles.label}>À quelle borne voulez-vous vous rendre ?</Text>
                        {this.renderSlider()}
                        {this.renderValue()}
                    </View>
                    <BorneForm
                        onSubmit={(values) => {
                            this.recupereItineraire(values);
                            this.getRoutes("refill", useCase, car, this.state.userSteps);
                        }} />
                    {this.afficheLoading()}
                </ScrollView>
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
    },
    field_text_title: {
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 15,
        fontWeight: 'bold',
        color: 'grey',
    },
    label: {
        textAlign: 'center',
        marginHorizontal: 24,
        marginTop: 10,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#70B445',
    },
    slider_vue: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    slider: {
        width: 75,
        marginTop: 15,
    },
    slider_text: {
        fontWeight: 'bold',
        fontSize: 15,
        color: 'grey'
    },
})

const mapStateToProps = (state) => {
    return {
        car: state.carSelected.car
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch: (action) => { dispatch(action) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PageBorne)