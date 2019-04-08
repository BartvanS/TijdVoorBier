import React from 'react';
import {View, Button, TextInput} from 'react-native';
import UpdateTime from "./components/updatetime";

// const HOST = 'http://213.10.130.7';

export default class SettingsScreen extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <View>
                <UpdateTime/>
            </View>
        );
    }
}
