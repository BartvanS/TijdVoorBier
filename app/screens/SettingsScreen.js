import React from 'react';
import {Alert, View, Button, Text, TextInput} from 'react-native';
import axios from 'axios';

// const HOST = 'http://213.10.130.7';
const HOST = '192.168.2.17:8080';

export default class SettingsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            beerTime: "17:30",
        }
    }

    onChange(text){
        this.setState({beerTime: text}, () => {
            this.updateBeerTime();
        });
    }

    updateBeerTime(){
        fetch('192.168.2.17:8080' + '/saveBeerTime', {
            method: 'GET',
            // headers: {
            //     Accept: 'application/json',
            //     'Content-Type': 'application/json',
            // },
        })
            .then(function(response) {
                console.log('kaas')
                return response.json();
            })
            .then(function(myJson) {
                console.log(JSON.stringify(myJson));
            })
            .catch((error) => {
                console.error(error);
            });

        // axios.get('192.168.2.17:8080')
        //     .then(function (response) {
        //         // handle success
        //         console.log(response);
        //     })
        //     .catch(function (error) {
        //         // handle error
        //         console.log(error);
        //     })
        //     .then(function () {
        //         // always executed
        //     });

        // fetch('http://facebook.github.io/react-native/movies.json')
        //     .then((response) => response.json())
        //     .then((responseJson) => {
        //         console.log(responseJson.movies);
        //         return responseJson.movies;
        //     })
        //     .catch((error) => {
        //         console.error(error);
        //     });
    }

     render() {

        return (
            <View>
                <TextInput
                onChangeText={(text) => this.onChange(text)}
                placeholder={"Type hier de toegestane tijd in in HH:MM"}
                />
            </View>
        );
    }
}
