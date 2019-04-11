import React from 'react';
import {StyleSheet, View, Text, Button, Picker, AsyncStorage} from "react-native";
import TimePicker from 'react-native-simple-time-picker';
import {checkTime, clearConsole, log} from '../classes/funtions';

const HOST = 'http://192.168.2.21:8080';
// const HOST = 'http://localhost:8080';

export default class UpdateTime extends React.Component {

    constructor(props) {
        super(props);
        clearConsole();
        //todo: gesette biertijd ophalen en kunnen instellen voor elke dag van de week?

        // this.getBeerTime();
        this.state = {
            beerTime: '07:30',
            selectedHours: 17,
            selectedMinutes: 30,
            day: 'monday',
        }
    }

    async handleSubmit() {
        log(this.state.day);
        let key = this.state.day;
        await this._setState();
        this._storeData(this.state.selectedHours, this.state.selectedMinutes, key)
            .then(UpdateTime._getData(key));
    }

    async _storeData(selectedHours, selectedMinutes, key) {
        log(this.state.beerTime);
        try {
            await AsyncStorage.setItem(key, this.state.beerTime);
        } catch (error) {
            // Error saving data
        }
    };

    static async _getData(key) {
        try {
            const value = await AsyncStorage.getItem(key);
            if (value !== null) {
                // We have data!!
                return value;
            } else {
                return '17:30';
            }
        } catch (error) {
            // Error retrieving data
        }
    }

    async _setState() {
        let selectedHours = this.state.selectedHours;
        let selectedMinutes = this.state.selectedMinutes;
        let formattedHours = checkTime(selectedHours);
        let formattedMinutes = checkTime(selectedMinutes);
        let beerTime = formattedHours + ':' + formattedMinutes;
        this.setState({
            selectedHours: formattedHours,
            selectedMinutes: formattedMinutes,
            beerTime: beerTime,
        });
    }


    render() {
        return (
            <View>
                <Text>{this.state.selectedHours}:{this.state.selectedMinutes}</Text>
                <TimePicker
                    selectedHours={parseInt(this.state.selectedHours)}
                    selectedMinutes={parseInt(this.state.selectedMinutes)}
                    onChange={(hours, minutes) => this.setState({selectedHours: hours, selectedMinutes: minutes})}
                />
                <Picker
                    selectedValue={this.state.day}
                    onValueChange={(day, itemIndex) =>
                        this.setState({day: day,})
                    }>
                    <Picker.Item label="Maandag" value="monday"/>
                    <Picker.Item label="Dinsdag" value="tuesday"/>
                    <Picker.Item label="Woensdag" value="wednesday"/>
                    <Picker.Item label="Donderdag" value="thursday"/>
                    <Picker.Item label="Vrijdag" value="friday"/>
                    <Picker.Item label="Zaterdag" value="saturday"/>
                    <Picker.Item label="Zondag" value="sunday"/>
                </Picker>
                <Button title={'Voer tijd in'} onPress={() => this.handleSubmit()}/>
            </View>
        );
    }
}