import React from 'react';
import {Alert, AsyncStorage, Button, Share, StyleSheet, Text, View,} from 'react-native';
import {checkTime} from './classes/funtions';
import UpdateTime from "./components/updatetime";
import checkIfFirstLaunch from './utils/checkiffirstlaunch';

export default class HomeScreen extends React.Component {
    //todo: background script die kijkt of het al tijd is -> bericht sturen dat het zo ver is en vragen of de gebruiker een berichtje wilt sturen
    constructor(props) {
        super(props);
        this.state = {
            allowedHours: 17,
            allowedMinutes: 30,
            // allowedTime: null,
            isFirstLaunch: false,
            hasCheckedAsyncStorage: false,
            keepAsFirstLaunch: false
        };
        this.date = new Date();
    }

    static navigationOptions = {
        header: null,
    };

    componentDidMount() {
        // this.getData();
    }

    async componentWillMount() {
        let isFirstLaunch = await checkIfFirstLaunch();
        if (!this.state.keepAsFirstLaunch) {
            isFirstLaunch = false;
        }
        this.setState({isFirstLaunch, hasCheckedAsyncStorage: true});
    }

    async IsItTimeYet() {
        let date = this.date;
        let hours = date.getHours();
        let minutes = date.getMinutes();
        hours = checkTime(hours);
        minutes = checkTime(minutes);
        let timeHuman = hours + ":" + minutes;
        let correctHours = this.state.allowedHours <= hours;
        let correctMinutes = null;
        if (hours === this.state.allowedHours) {
            correctMinutes = minutes >= this.state.allowedMinutes;
        } else {
            correctMinutes = true;
        }
        if (correctHours && correctMinutes) {
            return Alert.alert(
                'Is het al zo ver?',
                "Het is: " + timeHuman + " dus ja! HET IS ZO VER! Zou je het willen delen met je vrienden?",
                [
                    {text: 'Vraag het mij later', onPress: () => Alert.alert('Ja hallo... Ik ben toch niet je slaaf ofzo?')},
                    {
                        text: 'Nee bedankt',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                    },
                    {text: 'Sure, the more the merrier zeggen ze in Trumpland toch?', onPress: () => this.share('Hey, ik ben nu een biertje aan het drinken! Doe je mee? klink! 🍻')},
                ],
                {cancelable: false},
            );
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
        console.log(today);
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
        });
    }

    share(message) {
        Share.share({
            message:
            message,
        });
    }

    render() {
        const {hasCheckedAsyncStorage, isFirstLaunch} = this.state;
        if (!hasCheckedAsyncStorage) {
            return null;
        }
        // dit haalt weg dat er onthouden wordt dat de app al gedraaid is
        AsyncStorage.removeItem('hasLaunched');

        const {navigate} = this.props.navigation;

        if (this.state.isFirstLaunch) {
            return (
                <View>
                    <UpdateTime/>
                    <Button
                        title={'done'}
                        onPress={() => {
                            this.setState({keepAsFirstLaunch: false}, function () {
                            });

                        }}
                    />
                </View>
            )
        } else {
            return (
                <View style={styles.container}>
                    <Button title={'Is het al tijd voor bier?'} onPress={() => {
                        //todo: zorg er voor dat getdata eerst data haalt dan set en dan vraagt of het tijd is

                        this.getData()
                            .then(response => {
                                this.setData(response)
                                    .then(this.IsItTimeYet());
                            })
                    }}/>
                    {/*<Button title={'checksettime'} onPress={() => this.getData()}/>*/}


                    <Text>{this.state.allowedTime}</Text>
                </View>
            );
        }
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
