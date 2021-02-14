// Pages/PageStat.js

/**
 * Page affichant les statistiques sur un trajet
 */

import React from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'
import { formaterDureeAmpoules } from '../Fonctions/Format'



class PageStat extends React.Component {

    constructor(props) {
        super(props)
    }

    renderStats(stats) {
        // Message ampoules
        var message = "";

        if (stats.lightBulbsNumber < 2) {
            message = " ampoule "
        }
        else {
            message = " ampoules "
        }

        message = message + " de " + stats.wattage + " Watts fonctionnant sur une durée de " + formaterDureeAmpoules(stats.days);

        return (
            <View style={styles.stat_container}>
                <View style={styles.titre_stat_container}>
                    <Text style={styles.titre_stat_text}>Vous avez économisé...</Text>
                </View>
                <View style={styles.money_container}>
                    <View style={styles.image_container}>
                        <Image
                            style={styles.image_stat}
                            source={require('../Images/money.png')}
                        />
                    </View>
                    <View style={styles.sub_stat_container}>
                        <Text style={styles.money_text}>{stats.moneySavings} €</Text>
                    </View>
                </View>
                <View style={styles.emission_container}>
                    <View style={styles.image_container}>
                        <Image
                            style={styles.image_stat}
                            source={require('../Images/co2.png')}
                        />
                    </View>
                    <View style={styles.sub_stat_container}>
                        <Text style={styles.ampoule_text}>{stats.carbonEmissionSavings} kg</Text>
                    </View>
                </View>
                <View style={styles.ampoule_container}>
                    <View style={styles.image_container}>
                        <Image
                            style={styles.image_stat}
                            source={require('../Images/lightbulb.png')}
                        />
                    </View>
                    <View style={styles.sub_stat_container}>
                        <Text style={styles.text}>... l'équivalent de </Text>
                        <Text style={styles.ampoule_text}>{stats.lightBulbsNumber}</Text>
                        <Text style={styles.text}>{message}</Text>
                    </View>
                </View>
            </View>
        )
    }

    render() {
        // il faudra récupérer stats directement dans itinéraire
        var stats =
        {
            "moneySavings": 12.30,
            "carbonEmissionSavings": 0.123,
            "lightBulbsNumber": 3,
            "wattage": 5,
            "days": 12
        };

        return (
            <View style={styles.main_container}>
                <View style={styles.titre}>
                    <Image
                        style={styles.image}
                        source={require('../Images/stat2.png')}
                    />
                    <View style={styles.info_titre}>
                        <Text style={styles.title}>Statistiques de l'itinéraire</Text>
                        <Text style={styles.explication}>Vous trouverez la réduction des émissions de carbone et l'économie réalisée avec ce trajet.</Text>
                    </View>
                </View>
                {this.renderStats(stats)}
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
    image_stat: {
        height: 60,
        width: 60,
    },
    stat_container: {
        flex: 1,
    },
    titre_stat_container: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    titre_stat_text: {
        fontWeight: "bold",
        fontSize: 20
    },
    money_container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: "#4D87C3",
        marginVertical: 10,
        marginHorizontal: 24,
        padding: 10,
        borderRadius: 10,
    },
    text: {
        color: 'white',
        fontWeight: "bold",
        fontSize: 16,
        textAlign: 'center',
        fontStyle: 'italic'
    },
    money_text: {
        color: 'white',
        fontWeight: "bold",
        fontSize: 45,
        textAlign: 'center'
    },
    emission_container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: "#6CA648",
        marginVertical: 10,
        marginHorizontal: 24,
        padding: 10,
        borderRadius: 10,
    },
    emission_text: {
        color: 'white',
        fontWeight: "bold",
        fontSize: 45,
        textAlign: 'center'
    },
    ampoule_container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: "#FFC300",
        marginVertical: 10,
        marginHorizontal: 24,
        padding: 10,
        borderRadius: 10,
    },
    ampoule_text: {
        color: 'white',
        fontWeight: "bold",
        fontSize: 45,
        textAlign: 'center'
    },
    image_container: {
        width: 80,
        justifyContent: 'center',
        alignItems: 'center'
    },
    sub_stat_container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    }
})

export default PageStat