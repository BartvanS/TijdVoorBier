import React from 'react';
import {
    StyleSheet,
    View,
    Button,
    Alert,
    AsyncStorage,
    Text,
    Share,
} from 'react-native';
import {checkTime, log} from './classes/funtions';
import UpdateTime from "./components/updatetime";

export default class HomeScreen extends React.Component {
    //todo: background script die kijkt of het al tijd is -> bericht sturen dat het zo ver is en vragen of de gebruiker een berichtje wilt sturen
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
        this.getData();
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
        let correctHours = this.state.allowedHours <= hours;
        let correctMinuts = null;
        if (hours === this.state.allowedHours) {
            correctMinuts = minutes >= this.state.allowedMinutes;
        } else {
            correctMinuts = true;
        }
        if (correctHours && correctMinuts) {
            return Alert.alert("Het is: " + timeHuman + " dus ja! HET IS ZOVER!");
        } else {
            console.log(this.state.allowedHours, this.state.allowedMinutes);
            return Alert.alert("Wel yes, but actually no");
        }
        //Ten eerste is het altijd tijd voor bier! Echter zegt mijn baas anders. Volgens hem is het: <span>" + time + "</span>
    }

    getData() {
        let date = new Date();
        let todayInt = date.getDay();
        let week = ['monday', 'thursday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
        let europeanWeekday = todayInt - 1;
        let today = week[europeanWeekday];
        UpdateTime._getData(today)
        .then((response) => this.setData(response))
    }

    setData(response){
        let hours = response.substring(0, 2);
        let minutes = response.substring(3, 5);
        console.log(response, 'Biertijd van vandaag');
        this.setState({
                allowedHours: hours,
                allowedMinutes: minutes,
            });
    }

    share(message){
        Share.share({
            message:
                message,
        });
    }

    render() {

        return (
            <View style={styles.container}>
                <Button title={'Is het al tijd voor bier?'} onPress={() => this.IsItTimeYet()}/>
                <Button title={'checksettime'} onPress={() => this.getData()}/>
                <Button title={'share'} onPress={() => this.share('Hey, ik ben nu een biertje aan het drinken! Doe je mee? klink! 🍻')}/>

                <Text>{this.state.allowedTime}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#b000b5',
    },
});
