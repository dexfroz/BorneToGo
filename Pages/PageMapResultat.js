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

const test2 = {
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
            "weight": 3433.5,
            "distance": 64149.7,
            "duration": 3433.5
        }
    ]
};

const test =
{
    itineraire: [
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
};


// Fonction de log pour tester
function log(eventName, e) {
    console.log(eventName, e.nativeEvent);
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
        // Conversion des points de l'itinéraires du JSON en LatLng
        var itineraire = test2.routes[0].geometry.coordinates.map(function (itineraire) {
            var coord = {
                "latitude": itineraire[0],
                "longitude": itineraire[1]
            }
            return coord;
        });

        // Récupération des informations pour : 
        // DEPART
        // ARRIVEE
        // ETAPES ET STATIONS
        // Ajout des identifiants
        var i = test2.waypoints.length;
        var depart = identification(test2.waypoints.shift(), 0);
        var arrivee = identification(test2.waypoints.pop(), i);
        i = 0;
        var etape = test2.waypoints.map(function (waypoint) {
            i++;
            var info = identification(waypoint, i);
            return info;
        });

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
                            ...itineraire
                        ]}
                        strokeWidth={6}
                        strokeColor={'teal'}
                        tappable={true}
                        onPress={e => log('Polyline pressé', e)}
                    />

                </MapView>
            </View>
        );
    }
}

/*

*/

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