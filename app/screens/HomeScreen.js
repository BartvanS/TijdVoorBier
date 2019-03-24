import React from 'react';
import {
    StyleSheet,
    View,
    Button,
    Alert,
    AsyncStorage,
    Text,
} from 'react-native';
import {checkTime} from './classes/funtions';

export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allowedHours: 17,
            allowedMinutes: 30,
            // allowedTime: null,
        }
    }

    static navigationOptions = {
        header: null,
    };

    componentDidMount() {
    }

    render() {

        return (
            <View style={styles.container}>
                <Button title={'Is het al tijd voor bier?'} onPress={() => this.IsItTimeYet()}/>

                <Text>{this.state.allowedTime}</Text>
            </View>
        );
    }

    IsItTimeYet() {
        let date = new Date();
        let hours = date.getHours();
        let minutes = date.getMinutes();
        hours = checkTime(hours);
        minutes = checkTime(minutes);
        console.log(hours, minutes);
        let timeHuman = hours + ":" + minutes;
        // let time = hours+minutes;
        let correctHours =  this.state.allowedHours <= hours;
        let correctMinuts = null;
        if (hours === this.state.allowedHours){
            if (minutes >= this.state.allowedMinutes ){
                correctMinuts = true;
            }else {
                correctMinuts = false;
            }
        }else{
            correctMinuts = true;
        }
        if (correctHours && correctMinuts) {
            return Alert.alert("Het is: " +timeHuman + " dus ja! HET IS ZOVER!");
        } else {
            console.log(this.state.allowedHours, this.state.allowedMinutes);
            return Alert.alert("Wel yes, but actually no");
        }
        //Ten eerste is het altijd tijd voor bier! Echter zegt mijn baas anders. Volgens hem is het: <span>" + time + "</span>
    }

        _retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem('allowedTime');
            if (value !== null) {
                // We have data!!
                console.log(value);
                // if (value !== this.state.allowedTime) {
                    this.setState({"allowedTime": value,}, () => {
                        console.log("kaas" + this.state.allowedTime)
                    })
                // }

                // let valueItems = [];
                // return  JSON.stringify(value);
                // value.forEach(function (element) {
                //     return element;
                // })
            }
        } catch (error) {
            // Error retrieving data
            console.log('Failed getting the allowed time.', error);

        }
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#b000b5',
    },
});
