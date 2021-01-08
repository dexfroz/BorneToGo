// Pages/PageMap.js

import React from 'react'
<<<<<<< Updated upstream
import { StyleSheet, View, Text, Image, Button } from 'react-native'
=======
import { StyleSheet, View, Dimensions } from 'react-native'
import MapView, { MAP_TYPES, PROVIDER_DEFAULT } from 'react-native-maps';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 43.12;
const LONGITUDE = 5.94;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
>>>>>>> Stashed changes

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

    onRegionChange(region) {
        this.setState({ region });
    }

    get mapType() {
        return this.props.provider === PROVIDER_DEFAULT ? MAP_TYPES.STANDARD : MAP_TYPES.NONE;
    }

    render() {
        return (
<<<<<<< Updated upstream
            <View>
                <Text>Go To Credits</Text>
                <Button 
                title="GoToCredits"
                onPress={() => this.props.navigation.navigate("Credits")} />
                </View>
=======
            <View style={styles.map}>
                <MapView
                    region={this.state.region}
                    provider={this.props.provider}
                    mapType={this.mapType}
                    rotateEnabled={false}
                    style={styles.map}
                    showsUserLocation
                >
                    <MapView.UrlTile
                        urlTemplate={"https://www.openstreetmap.org/#map=16/43.1002/5.8609"}
                        shouldReplaceMapContent={true}
                    />
                </MapView>
            </View>
>>>>>>> Stashed changes
        );
    }
}

//onRegionChange={this.onRegionChange}

const styles = StyleSheet.create({
    map: {
        flex: 1
    },
})

export default PageMap