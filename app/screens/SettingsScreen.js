import React from 'react';
import {StyleSheet, View} from 'react-native';
import UpdateTime from "./components/updatetime";


export default class SettingsScreen extends React.Component {
    static navigationOptions = {
        title: "Settings",
    };

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <View style={styles.settings}>
                <UpdateTime/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    settings: {
        flex: 1,
        backgroundColor: '#d3d26a',
    },
 });

