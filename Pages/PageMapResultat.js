// Pages/PageMap.js

import React from 'react'
import { StyleSheet, Text, View, Dimensions, Image, FlatList } from 'react-native'
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import MapView, { MAP_TYPES, PROVIDER_OSMDROID } from 'react-native-maps';
import StationMap from '../Composants/StationMap';
import { connect } from 'react-redux';

// Dimensions de l'écran
const { width, height } = Dimensions.get('window');

// Calcul et initialisation des coordonnées de la position initiale de la map
const ASPECT_RATIO = width / height;
const LATITUDE = 43.12; //43.12
const LONGITUDE = 5.94; //5.94
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

// Fonction de log pour tester
function log(eventName, e) {
    console.log(eventName, e.nativeEvent);
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
            borneActive: null,
            depart: {
                latitude: 43.128509312147266, longitude: 5.910204722839521
            },
            arrivee: {
                latitude: 43.10812070483795, longitude: 5.947803122944097
            },
            itineraire: [
                {
                    latitude: 43.12791336292106, longitude: 5.917451725844116
                },
                {
                    latitude: 43.12597677442589, longitude: 5.925830466816465
                },
                {
                    latitude: 43.125412978218435, longitude: 5.9297786784644
                },
                {
                    latitude: 43.12384685037814, longitude: 5.936559302816287
                },
                {
                    latitude: 43.12209273959727, longitude: 5.940593345152218
                },
                {
                    latitude: 43.121340962437955, longitude: 5.940593345152218
                },
                {
                    latitude: 43.120087979977725, longitude: 5.939477546208237
                },
                {
                    latitude: 43.117707242609995, longitude: 5.936387641440288
                },
                {
                    latitude: 43.1175192857147, longitude: 5.9363018107522905
                },
                {
                    latitude: 43.113634713950745, longitude: 5.939820868960231
                },
                {
                    latitude: 43.11225625824453, longitude: 5.938533408640252
                },
                {
                    latitude: 43.10981255591486, longitude: 5.940421683776221
                },
                {
                    latitude: 43.10874732180053, longitude: 5.941194159968208
                },
                {
                    latitude: 43.10855933738532, longitude: 5.942395789600187
                },
                {
                    latitude: 43.10874732180053, longitude: 5.942567450976185
                },
            ]

        };
    }

    onRegionChange(region) {
        this.setState({ region });
    }

    onMapPress(e) {
        log('OnMapPress', e)
        this.setState({
            markers: [
                ...this.state.markers,
                {
                    coordinate: e.nativeEvent.coordinate,
                    key: id++,
                    marker1: true,
                },
            ],
        });
    }

    // Permet de définir le provider de la map comme étant openstreetmap si on ne trouve pas d'autres providers
    get mapType() {
        return this.props.provider === PROVIDER_OSMDROID ? MAP_TYPES.STANDARD : MAP_TYPES.NONE;
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

                    <MapView.Polyline
                        coordinates={[
                            this.state.depart, // optional
                            ...this.state.itineraire,
                            this.state.arrivee, // optional
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