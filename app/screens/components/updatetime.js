import React from 'react';
import {StyleSheet, View, Text, Button, TextInput, AsyncStorage} from "react-native";
import TimePicker from 'react-native-simple-time-picker';
import {checkTime, clearConsole, log} from '../classes/funtions';

const HOST = 'http://192.168.2.21:8080';
// const HOST = 'http://localhost:8080';

export default class UpdateBeerTime extends React.Component {

    constructor(props) {
        super(props);
        clearConsole();
        this.getBeerTime();
        this.state = {
            beerTime: '07:30',
            selectedHours: 17,
            selectedMinutes: 30,
        }
    }


    getBeerTime() {
        fetch(HOST + '/getBeerTime', {
            method: 'GET',
        })
            .then(function (response) {
                // console.log(response);
                return response;
            })
            .then(function (myJson) {
                console.log(JSON.stringify(myJson._bodyText));
            })
            .catch((error) => {
                console.error(error);
            });
    }

    async handleSubmit() {
        await this._setstate();
        // let token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        // log(token);
        // let data = this.state;
        // data['userToken'] = token;
        //
        // fetch(HOST + '/saveBeerTime', {
        //     method: 'POST',
        //     body: JSON.stringify(data), // data can be `string` or {object}!
        //     headers: {
        //         'Content-Type': 'application/json'
        //     }
        // }).then(function (response) {
        //     return response;
        // }).then(function (myJson) {
        //     // console.log(JSON.stringify(myJson));
        // }).catch((error) => {
        //     console.error(error);
        // });
    }

    async _setstate() {
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
            <React.Fragment>
                {/*<TextInput*/}
                    {/*placeholder={"Type hier de toegestane tijd in in HH:MM"}*/}
                    {/*onChangeText={(text) => this.handleBeerTime(text)}*/}
                {/*/>*/}
                <View>
                    <Text>{this.state.selectedHours}:{this.state.selectedMinutes}</Text>
                    <TimePicker
                        selectedHours={parseInt(this.state.selectedHours)}
                        selectedMinutes={parseInt(this.state.selectedMinutes)}
                        onChange={(hours, minutes) => this.setState({selectedHours: hours, selectedMinutes: minutes})}
                    />
                    <Button title={'Voer tijd in'} onPress={() => this.handleSubmit()}/>

                </View>
            </React.Fragment>
        );
    }
}