// Pages/PageMap.js

import React from 'react'
import { StyleSheet, View, Text, FlatList, Dimensions, Image } from 'react-native'
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import MapView, { MAP_TYPES, PROVIDER_OSMDROID, Geojson } from 'react-native-maps';
import MarkerItineraire from '../Composants/MarkerItineraire';
import ItineraireMap from '../Composants/ItineraireMap';

// Dimensions de l'écran
const { width, height } = Dimensions.get('window');

// Calcul et initialisation des coordonnées de la position initiale de la map
const ASPECT_RATIO = width / height;
const LATITUDE = 43.12; //43.12
const LONGITUDE = 5.94; //5.94
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const test2 = [
    {
        "waypoints": [
            {
                "distance": 13.1164,
                "location": [
                    43.128509312147266,
                    5.910204722839521
                ],
                "name": "La Grignotte Daniel",
                "address": "Place Colonel Bonnier, 83200 Toulon",
                "isStation": true,
                "data": {
                    "title": 'La Grignotte Daniel',
                    "adresse": 'Place Colonel Bonnier',
                    "codepostale": '83200',
                    "ville": 'TOULON',
                    "paiement": 'Payant',
                    "horaire": '24/24 7/7 jours',
                    "bornes": [
                        {
                            "puissance": 22.0,
                            "status": true,
                            "connecteurs": [
                                {
                                    "type": 'EF-T2',
                                },
                                {
                                    "type": 'EF',
                                },
                            ]
                        },
                        {
                            "puissance": 4.0,
                            "status": true,
                            "connecteurs": [
                                {
                                    "type": 'EF',
                                },
                            ]
                        },
                    ],
                },
            },
            {
                "distance": 13.1164,
                "location": [
                    43.113634713950745,
                    5.939820868960231
                ],
                "name": "Sur le chemin",
                "address": "Autre part, 83200 Toulon",
                "isStation": true,
                "data": {
                    "title": 'La Grignotte Daniel',
                    "adresse": 'Autre part',
                    "codepostale": '83200',
                    "ville": 'TOULON',
                    "paiement": 'Payant',
                    "horaire": '24/24 7/7 jours',
                    "bornes": [
                        {
                            "puissance": 22.0,
                            "status": true,
                            "connecteurs": [
                                {
                                    "type": 'EF-T2',
                                },
                                {
                                    "type": 'EF',
                                },
                            ]
                        },
                        {
                            "idBorne": 2,
                            "puissance": 4.0,
                            "status": true,
                            "connecteurs": [
                                {
                                    "type": 'EF',
                                },
                            ]
                        },
                    ],
                },
            },
            {
                "distance": 39.681465,
                "location": [
                    43.121340962437955,
                    5.940593345152218
                ],
                "name": "ISEN Yncréa Méditerranée - Campus de Toulon",
                "address": "ISEN Yncréa Méditerranée - Campus de Toulon, Maison du numérique et de l'innovation, Place Georges Pompidou, 83000 Toulon",
                "isStation": false,
                "data": {}
            },
            {
                "distance": 42.555302,
                "location": [
                    43.10812070483795,
                    5.947803122944097
                ],
                "name": "Parking des plages du Mourillon",
                "address": "Parking des plages du Mourillon, 683 Littoral Frédéric Mistral, 83000 Toulon",
                "isStation": true,
                "data": {
                    "title": 'Parking des plages du Mourillon',
                    "adresse": 'Parking Plages Du Mourillon',
                    "codepostale": '83000',
                    "ville": 'TOULON',
                    "paiement": 'Payant',
                    "horaire": '24/24 7/7 jours',
                    "bornes": [
                        {
                            "puissance": 22.0,
                            "status": true,
                            "connecteurs": [
                                {
                                    "type": 'EF-T2',
                                },
                                {
                                    "type": 'EF',
                                },
                            ]
                        },
                        {
                            "idBorne": 2,
                            "puissance": 4.0,
                            "status": true,
                            "connecteurs": [
                                {
                                    "type": 'EF',
                                },
                            ]
                        },
                    ],
                },
            }
        ],
        "routes": [
            {
                "legs": [
                    {
                        "steps": [],
                        "weight": 1286.4,
                        "distance": 24038.5,
                        "summary": "",
                        "duration": 1286.4
                    },
                    {
                        "steps": [],
                        "weight": 1300.0,
                        "distance": 25038.5,
                        "summary": "",
                        "duration": 1300.0
                    },
                    {
                        "steps": [],
                        "weight": 2147.1,
                        "distance": 40111.2,
                        "summary": "",
                        "duration": 2147.1
                    }
                ],
                "weight_name": "routability",
                "geometry": {
                    "coordinates": [
                        [43.128509312147266, 5.910204722839521],
                        [43.12791336292106, 5.917451725844116],
                        [43.12597677442589, 5.925830466816465],
                        [43.125412978218435, 5.9297786784644],
                        [43.12384685037814, 5.936559302816287],
                        [43.12209273959727, 5.940593345152218],
                        [43.121340962437955, 5.940593345152218],
                        [43.120087979977725, 5.939477546208237],
                        [43.117707242609995, 5.936387641440288],
                        [43.1175192857147, 5.9363018107522905],
                        [43.113634713950745, 5.939820868960231],
                        [43.11225625824453, 5.938533408640252],
                        [43.10981255591486, 5.940421683776221],
                        [43.10874732180053, 5.941194159968208],
                        [43.10855933738532, 5.942395789600187],
                        [43.10874732180053, 5.942567450976185],
                        [43.10812070483795, 5.947803122944097],
                    ],
                    "type": "LineString"
                },
                "weight": 4733.5,
                "distance": 89188.2,
                "duration": 4733.5
            }
        ]
    },
    {
        "waypoints": [
            {
                "distance": 13.1164,
                "location": [
                    43.128509312147266,
                    5.910204722839521
                ],
                "name": "La Grignotte Daniel",
                "address": "Place Colonel Bonnier, 83200 Toulon",
                "isStation": true,
                "data": {
                    "title": 'La Grignotte Daniel',
                    "adresse": 'Place Colonel Bonnier',
                    "codepostale": '83200',
                    "ville": 'TOULON',
                    "paiement": 'Payant',
                    "horaire": '24/24 7/7 jours',
                    "bornes": [
                        {
                            "puissance": 22.0,
                            "status": true,
                            "connecteurs": [
                                {
                                    "type": 'EF-T2',
                                },
                                {
                                    "type": 'EF',
                                },
                            ]
                        },
                        {
                            "puissance": 4.0,
                            "status": true,
                            "connecteurs": [
                                {
                                    "type": 'EF',
                                },
                            ]
                        },
                    ],
                },
            },
            {
                "distance": 39.681465,
                "location": [
                    43.129393264496485,
                    5.932176845489365
                ],
                "name": "AGRIA des lices",
                "address": "98 Rue Montebello, 83000 Toulon",
                "isStation": false,
                "data": {}
            },
            {
                "distance": 42.555302,
                "location": [
                    43.10812070483795,
                    5.947803122944097
                ],
                "name": "Parking des plages du Mourillon",
                "address": "Parking des plages du Mourillon, 683 Littoral Frédéric Mistral, 83000 Toulon",
                "isStation": true,
                "data": {
                    "title": 'Parking des plages du Mourillon',
                    "adresse": 'Parking Plages Du Mourillon',
                    "codepostale": '83000',
                    "ville": 'TOULON',
                    "paiement": 'Payant',
                    "horaire": '24/24 7/7 jours',
                    "bornes": [
                        {
                            "puissance": 22.0,
                            "status": true,
                            "connecteurs": [
                                {
                                    "type": 'EF-T2',
                                },
                                {
                                    "type": 'EF',
                                },
                            ]
                        },
                        {
                            "idBorne": 2,
                            "puissance": 4.0,
                            "status": true,
                            "connecteurs": [
                                {
                                    "type": 'EF',
                                },
                            ]
                        },
                    ],
                },
            }
        ],
        "routes": [
            {
                "legs": [
                    {
                        "steps": [],
                        "weight": 1286.4,
                        "distance": 24038.5,
                        "summary": "",
                        "duration": 1286.4
                    },
                    {
                        "steps": [],
                        "weight": 2147.1,
                        "distance": 40111.2,
                        "summary": "",
                        "duration": 2147.1
                    }
                ],
                "weight_name": "routability",
                "geometry": {
                    "coordinates": [
                        [43.128801217356035, 5.910367175362114],
                        [43.128550653475244, 5.9156028473537505],
                        [43.12773631377393, 5.9174911225005875],
                        [43.127548387687845, 5.920066043155367],
                        [43.128362729891045, 5.921696826236725],
                        [43.12923970167762, 5.92581669928437],
                        [43.12992874211769, 5.92676083685779],
                        [43.129051780210425, 5.928391619939149],
                        [43.12961554287991, 5.932339831609809],
                        [43.129490262735786, 5.933369799871722],
                        [43.12880121735606, 5.934228106756646],
                        [43.12704724863563, 5.935258075018558],
                        [43.12692196323106, 5.935172244330065],
                        [43.12648346229433, 5.936459704657454],
                        [43.126107601846684, 5.9369746887884105],
                        [43.124729427113486, 5.9369746887884105],
                        [43.12322592835699, 5.938691302558262],
                        [43.122474165122235, 5.939292117377712],
                        [43.121972984500346, 5.940751239082085],
                        [43.12109590853294, 5.940493747016607],
                        [43.11758747892922, 5.936373873968962],
                        [43.11332697252702, 5.94023625495113],
                        [43.11345228577269, 5.939892932197159],
                        [43.1120111679554, 5.938519641181277],
                        [43.11125926692729, 5.940064593574145],
                        [43.1095047952718, 5.940579577705099],
                        [43.1084395558013, 5.940837069770578],
                        [43.10831423229185, 5.941952868720981],
                        [43.10869020205046, 5.943841143867819],
                        [43.10800092239559, 5.94744603278451],
                    ],
                    "type": "LineString"
                },
                "weight": 3433.5,
                "distance": 64149.7,
                "duration": 3433.5
            }
        ]
    }
];

// Fonction de log pour tester
function log(eventName, e) {
    console.log(eventName, e.nativeEvent);
}

// Récupères les différents itinéraires résultats
function getItineraires(document) {

    var i = 0;

    document = document.map(function (itineraire) {
        // Conversion des points de l'itinéraires du JSON en LatLng
        itineraire.routes[0].geometry.coordinates = itineraire.routes[0].geometry.coordinates.map(function (coordinates) {
            var coord = {
                "latitude": coordinates[0],
                "longitude": coordinates[1],
            }
            return coord
        });

        // Ajout des identifiants pour les stations, les bornes et les connecteurs
        var j = 0;
        itineraire.waypoints = itineraire.waypoints.map(function (waypoint) {
            j++;
            var info = identification(waypoint, j);
            return info;
        });

        // Ajout d'un identifiant
        i++;
        var info_itineraire = {
            ...itineraire,
            "idItineraire": i,
        }

        return info_itineraire
    });

    return document;
}

// Ajout des identifiants
function identification(element, id) {
    var info_element = element;

    if (info_element.isStation) {
        // Numéroter les bornes
        var j = 0;
        info_element.data.bornes = info_element.data.bornes.map(function (borne) {
            // Numéroter les connecteurs
            var k = 0;
            borne.connecteurs = borne.connecteurs.map(function (connecteur) {
                k++;
                var info_connecteur = {
                    "idConnecteur": k,
                    ...connecteur,
                }
                return info_connecteur;
            });

            j++;
            var info_borne = {
                "idBorne": j,
                ...borne,
            }

            return info_borne;
        });

        // Convertir la localisation en LatLng
        info_element.location = {
            "latitude": info_element.location[0],
            "longitude": info_element.location[1],
        };

        // Ajouter l'identifiant
        info_element = {
            "idStation": id,
            ...info_element,
        }
    }

    return info_element;
}

function formaterDistance(distance) {
    let kmetres = Math.floor(distance / 1000);
    distance %= 1000;
    let metres = Math.trunc(distance);

    var new_distance = "";
    if (kmetres < 1) {
        new_distance = metres.toString() + " m";
    }
    else {
        new_distance = kmetres.toString() + " km";
    }
    return new_distance;
}

function formateDuree(duree) {
    let heures = Math.floor(duree / 3600);
    duree %= 3600;
    let minutes = Math.floor(duree / 60);
    let secondes = duree % 60;

    if (secondes > 30) {
        minutes++;
    }

    var new_duree = "";
    if (heures < 1) {
        new_duree = minutes.toString() + " min";
    }
    else {
        new_duree = heures.toString() + " h " + minutes.toString() + " min";
    }

    return new_duree;
}

class PageMap extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            region: {
                latitude: LATITUDE,
                longitude: LONGITUDE,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
            },
            idItineraireCourant: 0,
            itineraires: getItineraires(test2),
        };
    }

    // Permet de définir le provider de la map comme étant openstreetmap si on ne trouve pas d'autres providers
    get mapType() {
        return this.props.provider === PROVIDER_OSMDROID ? MAP_TYPES.STANDARD : MAP_TYPES.NONE;
    }

    changerItineraireActif(id, itineraires) {
        this.state.idItineraireCourant = id - 1;
        this.setState({ state: this.state });
    }

    renderItineraire(item) {
        // Récupération des informations pour : 
        // DEPART
        var depart = this.state.itineraires[this.state.idItineraireCourant].waypoints[0];

        // ARRIVEE
        var arrivee = this.state.itineraires[this.state.idItineraireCourant].waypoints[this.state.itineraires[this.state.idItineraireCourant].waypoints.length - 1];

        // STATIONS et ETAPES
        var stations = [];
        var etapes = [];
        for (var i = 1; i < this.state.itineraires[this.state.idItineraireCourant].waypoints.length - 1; i++) {
            if (this.state.itineraires[this.state.idItineraireCourant].waypoints[i].isStation) {
                stations.push(this.state.itineraires[this.state.idItineraireCourant].waypoints[i]);
            }
            else {
                etapes.push(this.state.itineraires[this.state.idItineraireCourant].waypoints[i]);
            }
        }

        // DUREE
        var duree = this.state.itineraires[this.state.idItineraireCourant].routes[0].duration;

        duree = formateDuree(duree);

        // DISTANCE
        var distance = this.state.itineraires[this.state.idItineraireCourant].routes[0].distance;

        distance = formaterDistance(distance);

        // console.log("DEPART", depart);
        // console.log("ARRIVEE", arrivee);
        // console.log("ETAPES", etapes);
        // console.log("STATIONS", stations);

        return (
            <TouchableWithoutFeedback
                key={`Itineraire-${item.idItineraire}`}
                onPressIn={() => this.changerItineraireActif(item.idItineraire)}
            >
                <View style={styles.itineraire}>
                    <View style={styles.informations}>
                        <View>
                            <Text style={styles.title}>Itinéraire n° {item.idItineraire}</Text>
                        </View>
                        <View style={styles.info1}>
                            <View>
                                <Image
                                    style={styles.image}
                                    source={require('../Images/itineraire.png')}
                                />
                            </View>
                            <View style={styles.depart_arrivee}>
                                <Text>{depart.name}</Text>
                                <Text>{arrivee.name}</Text>
                            </View>
                        </View>
                        <View style={styles.info2}>
                            <Text>{duree}</Text>
                            <Text>{distance}</Text>
                        </View>
                    </View>
                    <View style={styles.boutons}>
                        <View>
                            <TouchableOpacity
                                key={`Bouton Info`}
                            //onPress={ }
                            >
                                <View style={styles.bouton_info}>
                                    <Image
                                        style={styles.image_bouton}
                                        source={require('../Images/info.png')}
                                    />
                                    <Text style={styles.voir_info}>Voir Info</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View>
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
                </View>
            </TouchableWithoutFeedback >
        )
    }

    renderItineraires() {
        return (
            <FlatList
                horizontal
                style={styles.itineraires}
                pagingEnabled
                scrollEnabled
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={16}
                snapToAlignment="center"
                data={this.state.itineraires}
                keyExtractor={(item) => `${item.idItineraire}`}
                renderItem={({ item }) => this.renderItineraire(item)}
            />
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <MapView
                    region={this.state.region}
                    provider={this.props.provider}
                    mapType={this.mapType}
                    rotateEnabled={false}
                    style={styles.map}
                    showsUserLocation
                >
                    <MapView.UrlTile
                        //Permet de récupérer la source de la carte sur openstreetmap
                        urlTemplate={"https://www.openstreetmap.org/#map={z}/{x}/{y}"}
                        shouldReplaceMapContent={true}
                        zIndex={-3}
                    />
                    <ItineraireMap
                        key={`Itinéraire-${this.state.itineraires[this.state.idItineraireCourant].idItineraire}`}
                        itineraire={this.state.itineraires[this.state.idItineraireCourant]}
                        propsnavigation={this.props}
                    />
                </MapView>
                {this.renderItineraires()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    // Vue totale de la page
    container: {
        flex: 1
    },
    // Carte
    map: {
        flex: 1
    },
    // Scroll des itinéraires
    itineraires: {
        position: 'absolute',
        right: 0,
        left: 0,
        bottom: 24,
    },
    // Itinéraire individuel
    itineraire: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 18,
        marginHorizontal: 24,
        width: width - (24 * 2),
    },
    // Informations affichées sur l'itinéraire
    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
    image_bouton: {
        height: 30,
        width: 30
    },
    image: {
        height: 60,
        width: 60
    },
    informations: {
        flex: 1,
    },
    info1: {
        flexDirection: 'row',
    },
    depart_arrivee: {
        flex: 1,
        justifyContent: 'space-evenly',
        marginLeft: 10,
    },
    info2: {
        marginTop: 10,
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-evenly'
    },
    boutons: {
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    bouton_info: {
        flexDirection: 'column',
        alignItems: 'center',
        width: 60,
        height: 50,
    },
    voir_info: {
        fontStyle: 'italic',
        textAlignVertical: 'center',
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
    },
})

export default PageMap

/*
{this.state.markers.map(item =>
                        <MarkerItineraire
                            key={`Marker-${item.label}-${item.latitude}-${item.longitude}`}
                            marker={item}
                            propsnavigation={this.props}
                        />
                    )}

                    {itineraires.map(item =>
                        <ItineraireMap
                            key={`Itinéraire-${item.idItineraire}`}
                            itineraire={item}
                            propsnavigation={this.props}
                        />
                    )}
*/