import React from 'react';
import {Alert, Button, Share, StyleSheet, Text, View,} from 'react-native';
import {checkTime} from './classes/funtions';
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
        this.date = new Date();
    }

    static navigationOptions = {
        header: null,
    };

    componentDidMount() {
        // this.getData();
    }

    async IsItTimeYet() {
        let date = this.date;
        let hours = date.getHours();
        let minutes = date.getMinutes();
        hours = checkTime(hours);
        minutes = checkTime(minutes);
        let timeHuman = hours + ":" + minutes;
        // let time = hours+minutes;
        console.log('timecheck hours');
        let correctHours = this.state.allowedHours <= hours;
        let correctMinutes = null;
        if (hours === this.state.allowedHours) {
            correctMinutes = minutes >= this.state.allowedMinutes;
        } else {
            correctMinutes = true;
        }
        if (correctHours && correctMinutes) {
            return Alert.alert("Het is: " + timeHuman + " dus ja! HET IS ZOVER!");
        } else {
            // console.log(this.state.allowedHours, this.state.allowedMinutes);
            return Alert.alert("Wel yes, but actually no");
        }
        //Ten eerste is het altijd tijd voor bier! Echter zegt mijn baas anders. Volgens hem is het: <span>" + time + "</span>
    }

    async getData() {
        let date = this.date;
        let todayInt = date.getDay();
        let week = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
        let europeanWeekday = todayInt - 1;
        let today = week[europeanWeekday];
        // let today = week[3];
        return UpdateTime._getData(today);
        // .then((response) => {
        //     this.setData(response);
        //     log(response, 'fokking response getdata');
        // })
    }

    async setData(response) {
        let hours = response.substring(0, 2);
        let minutes = response.substring(3, 5);
        this.setState({
            allowedHours: hours,
            allowedMinutes: minutes,
        }, () => {
            console.log('set time: ', this.state.allowedHours, this.state.allowedMinutes)
        });
    }

    share(message) {
        Share.share({
            message:
            message,
        });
    }

    render() {

        return (
            <View style={styles.container}>
                <Button title={'Is het al tijd voor bier?'} onPress={() => {
                    //todo: zorg er voor dat getdata eerst data haalt dan set en dan vraagt of het tijd is

                    this.getData()
                        .then(response => {
                            this.setData(response)
                                .then(this.IsItTimeYet());
                        })
                        .then(() => console.log(this.state.allowedHours))
                }}/>
                {/*<Button title={'checksettime'} onPress={() => this.getData()}/>*/}
                <Button title={'share'}
                        onPress={() => this.share('Hey, ik ben nu een biertje aan het drinken! Doe je mee? klink! 🍻')}/>

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
