import React from 'react';
import {StyleSheet, View, Text, Button, Picker, AsyncStorage, CheckBox} from "react-native";
import TimePicker from 'react-native-simple-time-picker';
import {checkTime, log} from '../classes/funtions';
import {setStorage, getStorage, getDay} from '../utils/utils';

const HOST = 'http://192.168.2.21:8080';
// const HOST = 'http://localhost:8080';

export default class UpdateTime extends React.Component {

    constructor(props) {
        super(props);
        let day = getDay();
        this.state = {
            beerTime: '07:30',
            selectedHours: 17,
            selectedMinutes: 30,
            day: day,
            alwaysTimeForBeer: false,
        }
    }

    async handleSubmit() {
        log(this.state.day);
        let key = this.state.day;
        await this._setState();
        setStorage(key, this.state.beerTime)
            .then(UpdateTime._getData(key));
    }

    static async _getData(key) {
        try {
            const value = getStorage(key);
            if (value !== null) {
                return value;
            } else {
                return '17:30';
            }
        } catch (error) {
            // Error retrieving data
            console.log('Yo, er gaat hier iets fout bij het ophalen van de data...', error)
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

    async handleTheTruth(data) {
        //BUT YOU CANT HANDLE THE TRUTH!
        setStorage('alwaysTimeForBeer', data);
    }

    render() {
        return (
            <View style={styles.updateTime}>
                <View style={this.state.alwaysTimeForBeer ? styles.timePickerDisabled : styles.timePicker}>
                    <Text>{this.state.selectedHours}:{this.state.selectedMinutes}</Text>
                    <TimePicker
                        selectedHours={parseInt(this.state.selectedHours)}
                        selectedMinutes={parseInt(this.state.selectedMinutes)}
                        onChange={(hours, minutes) => this.setState({selectedHours: hours, selectedMinutes: minutes})}
                    />
                    <Picker
                        selectedValue={this.state.day}
                        // enabled={false}
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
                <View style={styles.checkbox}>
                    <Text>Is het altijd tijd voor bier?</Text>
                    <CheckBox
                        value={this.state.alwaysTimeForBeer}
                        onChange={() => {
                            this.setState({alwaysTimeForBeer: !this.state.alwaysTimeForBeer}, function () {
                                this.handleTheTruth(this.state.alwaysTimeForBeer);
                            });
                        }}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    updateTime: {
        backgroundColor: '#d3c83d',
    },
    checkbox: {},
    timePicker: {},
    timePickerDisabled: {
        display: 'none',
    }

});