// Store/Forms/BorneForm

import React from 'react'
import { StyleSheet, FlatList, Image, View, Button, Text, SafeAreaView } from 'react-native'
import { reduxForm, Field } from "redux-form";
import TextInputClass from './TextInputClass'
import { Slider, Icon } from 'react-native-elements';
import FieldWrapper from './FieldWrapper';


class BorneForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            text_value: "La plus proche",
        }
    }

    renderValue() {
        return (
            <Text style={styles.slider_text}>{this.state.text_value}</Text>
        )
    }

    setValue(value) {
        var text_value = "";
        if (this.state.value == 0) {
            text_value = "La plus proche";
        }
        else {
            text_value = "La moins chère";
        }
        this.setState({ value: value, text_value: text_value });
    }

    renderUserPosition() {

        var name_field1 = "depart_name";
        var name_field2 = "depart_address";

        return (
            <View>
                <Text style={styles.label}>Où êtes-vous ?</Text>
                <View style={styles.field}>
                    <Text style={styles.field_text_title}>Nom      </Text>
                    <View style={styles.field_text}>
                        <Field
                            name={name_field1}
                            textContentType="name"
                            autoCorrect={false}
                            autoCapitalize="none"
                            component={TextInputClass}
                        />
                    </View>
                </View>
                <View style={styles.field}>
                    <Text style={styles.field_text_title}>Adresse</Text>
                    <View style={styles.field_text}>
                        <Field
                            name={name_field2}
                            textContentType="addressCity"
                            autoCorrect={false}
                            autoCapitalize="none"
                            component={TextInputClass}
                        />
                    </View>
                </View>
            </View>
        )
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


    render() {
        return (
            <View style={styles.main_container}>
                <View>
                    {this.renderUserPosition()}
                </View>
                <View style={styles.valider}>
                    <Button
                        title="Valider"
                        onPress={this.props.handleSubmit}
                        color="#70B445"
                    >
                        <Text>Valider l'itinéraire</Text>
                    </Button>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
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
    etape: {
        flexDirection: 'row',
    },
    field: {
        flexDirection: 'row',
        marginHorizontal: 24,
        justifyContent: 'center',
        alignItems: 'center'
    },
    field_text: {
        flex: 1,
    },
    valider: {
        marginHorizontal: 24,
        marginTop: 10,
    },
})

export default reduxForm({
    form: 'borne',
})(BorneForm);
