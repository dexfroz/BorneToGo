// Components/ItineraireInfo.js

import React, { PureComponent } from 'react'
import { StyleSheet, View, Text, Image, Dimensions, FlatList } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Svg, { Circle, Line, Text as TextSVG } from 'react-native-svg';
import { formaterDuree, formaterDistance } from '../Fonctions/Format'
import { getDepart, getArrivee, getDistance, getDuree, getStationsEtapes, getFirstLeg, getOtherLegs } from '../Fonctions/Itineraire'

// Dimensions de l'écran
const { width, height } = Dimensions.get('window');

class ItineraireInfo extends PureComponent {

    constructor(props) {
        super(props);
    }

    renderBorne(item, propsnavigation) {
        var stationPleine = false;
        if (item.isStation && Object.keys(item.data).length > 0) {
            stationPleine = true;
        }

        return (
            item.isStation ?
                stationPleine ?
                    <View style={styles.bouton_borne}>
                        <TouchableOpacity
                            key={`Bouton-Borne-${item.idStation}`}
                            onPress={() => propsnavigation.navigation.navigate('Station', {
                                station: item.data,
                            })}
                        >
                            <View >
                                <Image
                                    style={styles.image_borne}
                                    source={require('../Images/borne_icone.png')}
                                />
                            </View>
                        </TouchableOpacity>
                    </View>
                    :
                    <View style={styles.bouton_borne}>
                        <View >
                            <Image
                                style={styles.image_borne}
                                source={require('../Images/borne_icone.png')}
                            />
                        </View>
                    </View>
                :
                <View></View>
        )
    }

    renderLigneTexte(hauteur, leg) {
        return (
            <Svg height={hauteur} width="100%">
                <Line x1="50%" y1="0%" x2="50%" y2="100%" stroke="green" strokeWidth="10" />
                <TextSVG
                    fill="black"
                    fontSize="16"
                    fontWeight="bold"
                    x="75%"
                    y="30%"
                    textAnchor="middle"
                >
                    {formaterDistance(leg.length)}
                </TextSVG>
                <TextSVG
                    fill="black"
                    fontSize="16"
                    fontWeight="bold"
                    x="75%"
                    y="80%"
                    textAnchor="middle"
                >
                    {formaterDuree(leg.duration)}
                </TextSVG>
            </Svg>
        )
    }

    renderLigne(hauteur) {
        return (
            <Svg height={hauteur} width="100%">
                <Line x1="50%" y1="0%" x2="50%" y2="100%" stroke="green" strokeWidth="10" />
            </Svg>
        )
    }

    renderDepart(depart, propsnavigation, hauteur, leg) {
        return (
            <View>
                <View style={styles.vue_depart}>
                    <View style={{ flex: 1 }}>
                        <Image
                            style={styles.image_marker}
                            source={require('../Images/marker_icone.png')}
                        />
                    </View>
                    <View style={{ flex: 3 }}>
                        <Text style={styles.name_adresse}>{depart.name}</Text>
                        <Text style={styles.name_adresse}>{depart.address}</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                        {this.renderBorne(depart, propsnavigation)}
                    </View>
                </View>
                {this.renderLigneTexte(hauteur, leg[0])}
            </View>
        )
    }

    renderArrivee(arrivee, propsnavigation, hauteur) {
        return (
            <View>
                <View style={styles.vue_arrivee}>
                    <View style={{ flex: 1 }}>
                        <Image
                            style={styles.image_marker}
                            source={require('../Images/marker_icone.png')}
                        />
                    </View>
                    <View style={{ flex: 3 }}>
                        <Text style={styles.name_adresse}>{arrivee.name}</Text>
                        <Text style={styles.name_adresse}>{arrivee.address}</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                        {this.renderBorne(arrivee, propsnavigation)}
                    </View>
                </View>
            </View>

        )
    }

    renderEtapeStation(stations_etapes, propsnavigation, hauteur, legs) {
        return (
            stations_etapes.map(item =>
                <View
                    key={`Item-${item.name}-${item.address}`}>
                    <View style={styles.vue_trajet}>
                        <View style={{ flex: 1 }}>
                            <Image
                                style={styles.image_marker}
                                source={require('../Images/marker_icone.png')}
                            />
                        </View>
                        <View style={{ flex: 3 }}>
                            <Text style={styles.name_adresse}>{item.name}</Text>
                            <Text style={styles.name_adresse}>{item.address}</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            {this.renderBorne(item, propsnavigation)}
                        </View>
                    </View>
                    {this.renderLigneTexte(hauteur, legs[stations_etapes.indexOf(item)])}
                </View>
            )
        )
    }


    renderTrajet(stations_etapes, propsnavigation, hauteur, legs) {
        var rien = false;
        if (stations_etapes.length == 0) {
            rien = true;
        }

        return (
            rien ?
                <View></View>
                :
                <View>
                    {this.renderEtapeStation(stations_etapes, propsnavigation, hauteur, legs)}
                </View>
        )
    }

    renderFooter(duree, distance) {
        return (
            <View style={styles.footer}>
                <View style={styles.duree_distance}>
                    <Text style={styles.duree}>Durée : {duree}</Text>
                    <Text style={styles.distance}>Distance : {distance}</Text>
                </View>
                <View style={styles.vue_bouton_stat}>
                    <TouchableOpacity
                        key={`Bouton Statistique`}
                    //onPress={ }
                    >
                        <View style={styles.bouton_stat}>
                            <Image
                                style={styles.image_bouton}
                                source={require('../Images/stat.png')}
                            />
                            <Text style={styles.voir_stat}>Voir Stat</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    render() {
        const { itineraire, propsnavigation } = this.props;

        // DUREE
        var duree = formaterDuree(getDuree(itineraire));

        // DISTANCE
        var distance = formaterDistance(getDistance(itineraire));

        // DEPART
        var depart = getDepart(itineraire);

        // STATIONS et ETAPES
        var stations_etapes = getStationsEtapes(itineraire);

        // ARRIVEE
        var arrivee = getArrivee(itineraire);

        // LEG_DEPART
        var leg_depart = getFirstLeg(itineraire);

        // LEG
        var legs = getOtherLegs(itineraire);

        var hauteur;
        var haut;

        if (stations_etapes.length == 0) {
            haut = (10 / 12) * height - (2 / 12) * height - 175;
        }
        else if (stations_etapes.length > 0 && stations_etapes.length <= 2) {
            haut = (stations_etapes.length + 1) * height / 12 - 250;
        }
        else if (stations_etapes.length > 2 && stations_etapes.length <= 5) {
            haut = (stations_etapes.length + 1) * height / 12 - 300;
        }
        else if (stations_etapes.length > 5 && stations_etapes.length <= 7) {
            haut = (stations_etapes.length + 1) * height / 12 - 350;
        }
        else if (stations_etapes.length > 7) {
            haut = (stations_etapes.length + 1) * height / 12 - 400;
        }
        hauteur = haut.toString();

        return (
            <View style={styles.main_container}>
                <View style={styles.header}>
                    <View style={styles.titre}>
                        <Image
                            style={styles.image}
                            source={require('../Images/itineraire.png')}
                        />
                        <View style={styles.titre_adresse}>
                            <Text style={styles.title}>Itineraire n° {itineraire.idRoute}</Text>
                            <View>
                                <Text>Départ : {depart.name}, {depart.address}</Text>
                                <Text>Arrivée : {arrivee.name}, {arrivee.address}</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <ScrollView style={styles.middle}>
                    {this.renderDepart(depart, propsnavigation, hauteur, leg_depart)}
                    {this.renderTrajet(stations_etapes, propsnavigation, hauteur, legs)}
                    {this.renderArrivee(arrivee, propsnavigation, hauteur)}
                </ScrollView>
                {this.renderFooter(duree, distance)}
            </View>
        );
    }
}


const styles = StyleSheet.create({
    main_container: {
        flex: 1,
    },
    header: {
        margin: 10,
    },
    middle: {
        flex: 10,
    },
    // Affichage des informations du chapeau
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
    // TITRE ET ADRESSE
    titre_adresse: {
        flex: 1
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
    adresse: {
        fontSize: 14,
        fontStyle: 'italic',
    },
    horaire: {
        fontSize: 18,
        textAlign: 'right',
        fontStyle: 'italic',
    },
    // DEPART
    vue_depart: {
        backgroundColor: 'crimson',
        marginHorizontal: 24,
        padding: 24,
        borderRadius: 10,
        flexDirection: 'row',
    },
    // ARRIVEE
    vue_arrivee: {
        backgroundColor: 'steelblue',
        marginHorizontal: 24,
        padding: 24,
        borderRadius: 10,
        flexDirection: 'row',
    },
    // TRAJET
    vue_trajet: {
        backgroundColor: '#70B445',
        marginHorizontal: 24,
        padding: 24,
        borderRadius: 10,
        flexDirection: 'row',
    },
    image_marker: {
        height: 40,
        width: 40,
        tintColor: 'white'
    },
    // Footer
    footer: {
        backgroundColor: '#70B445',
        paddingHorizontal: 24,
        paddingTop: 12,
        paddingBottom: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    vue_bouton_stat: {
        justifyContent: 'center',
    },
    bouton_stat: {
        flexDirection: 'column',
        alignItems: 'center',
        width: 60,
        height: 50,
    },
    voir_stat: {
        fontStyle: 'italic',
        textAlignVertical: 'center',
        color: 'white',
    },
    image_bouton: {
        height: 30,
        width: 30,
        tintColor: 'white'
    },
    duree_distance: {
        justifyContent: 'center',
    },
    duree: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16
    },
    distance: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16
    },
    bouton_borne: {
        flex: 1,
    },
    image_borne: {
        height: 40,
        width: 35,
    },
    name_adresse: {
        color: 'white',
    }
})

export default ItineraireInfo