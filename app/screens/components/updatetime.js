import React from 'react';
import {StyleSheet, View, Text, Button, TextInput} from "react-native";
import TimePicker from 'react-native-simple-time-picker';
import {checkTime} from '../classes/funtions';
const HOST = 'http://192.168.2.17:8080';
// const HOST = 'localhost:8080';

export default class UpdateBeerTime extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            beerTime: '17:30',
            selectedHours: 17,
            selectedMinutes: 30,
        }
    }

    handleBeerTime(text) {

        this.setState({beerTime: text}, function () {
            console.log(this.state.beerTime + ' has been set as time');
        });

    }

    async handleSubmit() {
    await this._setstate();

        let data = this.state;

        fetch(HOST + '/saveBeerTime', {
            method: 'POST',
            body: JSON.stringify(data), // data can be `string` or {object}!
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(function (response) {
                return response;
            })
            .then(function (myJson) {
                // console.log(JSON.stringify(myJson));
            })
            .catch((error) => {
                console.error(error);
            });
    }

    async _setstate(){
        let selectedHours = this.state.selectedHours;
        let selectedMinutes = this.state.selectedMinutes;
        let formattedHours = checkTime(selectedHours);
        let formattedMinutes = checkTime(selectedMinutes);
        this.setState({
            selectedHours: formattedHours,
            selectedMinutes: formattedMinutes,
        });
    }

    render() {
        return (
            <React.Fragment>
                <TextInput
                    placeholder={"Type hier de toegestane tijd in in HH:MM"}
                    onChangeText={(text) => this.handleBeerTime(text)}
                />
                <Button title={'Voer tijd in'} onPress={() => this.handleSubmit()}/>
                <View>
                    <Text>{this.state.selectedHours}:{this.state.selectedMinutes}</Text>
                    <TimePicker
                        selectedHours={parseInt(this.state.selectedHours)}
                        selectedMinutes={parseInt(this.state.selectedMinutes)}
                        onChange={(hours, minutes) => this.setState({selectedHours: hours, selectedMinutes: minutes})}
                    />
                </View>
            </React.Fragment>
        );
    }
}