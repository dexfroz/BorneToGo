// Pages/PageMap.js

import React from 'react'
import { StyleSheet, Text, View, Dimensions, Image, FlatList } from 'react-native'
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import MapView, { MAP_TYPES, PROVIDER_OSMDROID, Geojson } from 'react-native-maps';
import StationMap from '../Composants/StationMap';
import { connect } from 'react-redux';
import MarkerItineraire from '../Composants/MarkerItineraire';

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

function calculCouleurItinéraire(id) {
    var color;
    switch (id) {
        case 1:
            color = 'green';
            break;
        case 2:
            color = 'mediumseagreen';
            break;
        case 3:
            color = 'teal';
            break;
        case 4:
            color = 'darkseagreen';
            break;
        case 5:
            color = 'yellowgreen';
            break;
        case 6:
            color = 'forestgreen';
            break;
        default:
            color = 'red';
    }

    return color;
}

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
        };
    }

    // Permet de définir le provider de la map comme étant openstreetmap si on ne trouve pas d'autres providers
    get mapType() {
        return this.props.provider === PROVIDER_OSMDROID ? MAP_TYPES.STANDARD : MAP_TYPES.NONE;
    }

    render() {
        var itineraires = getItineraires(test2);
        console.log("Itinéraire routes", itineraires[0].routes[0].geometry.coordinates);
        // Récupération des informations pour : 
        // DEPART
        // ARRIVEE
        // ETAPES ET STATIONS
        // Ajout des identifiants
        /*var i = test2.waypoints.length;
        var depart = identification(test2.waypoints.shift(), 0);
        var arrivee = identification(test2.waypoints.pop(), i);
        i = 0;
        var etape = test2.waypoints.map(function (waypoint) {
            i++;
            var info = identification(waypoint, i);
            return info;
        });*/

        // console.log("DEPART", depart);
        // console.log("ARRIVEE", arrivee);
        // console.log("ETAPES", etape);

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

                    <MapView.Polyline
                        coordinates={[
                            //...itineraire
                        ]}
                        strokeWidth={6}
                        strokeColor={'teal'}
                        tappable={true}
                        onPress={e => log('Polyline pressé', e)}
                    />

                    {itineraires.map(item =>
                        <MapView.Polyline
                            coordinates={[
                                ...item.routes[0].geometry.coordinates
                            ]}
                            key={`Itinéraire-${item.idItineraire}`}
                            strokeWidth={6}
                            strokeColor={calculCouleurItinéraire(item.idItineraire)}
                            tappable={true}
                            onPress={(e) => log('Polyline pressé : ', e)}
                        />
                    )}

                </MapView>
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
*/