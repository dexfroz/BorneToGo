// Pages/PageVoiture.js

/**
 * Page comportant le formulaire d'entrée de la voiture
 */

import React from 'react'
import { StyleSheet, View, Image, Text, Dimensions } from 'react-native'
import SelectionVoiture from '../Composants/SelectionVoiture'
import { ScrollView } from 'react-native-gesture-handler'

const { width, height } = Dimensions.get('window');


class PageVoiture extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={styles.mainContainer}>
                <View style={styles.titre}>
                    <Image
                        style={styles.image}
                        source={require('../Images/voiture.png')}
                    />
                    <View style={styles.info_titre}>
                        <Text style={styles.title}>Renseignez votre véhicule</Text>
                        <Text style={styles.explication}>Choisissez le dans la liste ou décrivez-le si vous ne le trouvez pas.</Text>
                    </View>
                </View>
                <ScrollView>
                    <SelectionVoiture
                        propsnavigation={this.props}
                    />
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
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
    image: {
        height: 75,
        width: 75,
        marginEnd: 10
    },
})

export default PageVoiture