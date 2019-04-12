import React from 'react';
import {
    Alert,
    Button,
    Share,
    StyleSheet,
    Text,
    View,
    ImageBackground
} from 'react-native';
import {checkTime} from './classes/funtions';
import UpdateTime from "./components/updatetime";
import checkIfFirstLaunch from './utils/checkiffirstlaunch';

export default class HomeScreen extends React.Component {
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
                    {
                        text: 'Vraag het mij later',
                        onPress: () => Alert.alert('Ja hallo... Ik ben toch niet je slaaf ofzo?')
                    },
                    {
                        text: 'Nee bedankt',
                        onPress: () => {
                            console.log('Cancel Pressed');
                        },
                        style: 'cancel',
                    },
                    {
                        text: 'Sure, the more the merrier zeggen ze in Trumpland toch?',
                        onPress: () => this.share('Hey, ik ben nu een biertje aan het drinken! Doe je mee? klink! 🍻')
                    },
                ],
                {cancelable: false},
            );
        } else {
            return Alert.alert("Wel yes, but actually no");
        }
    }

    async getData() {
        let date = this.date;
        let todayInt = date.getDay();
        let week = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
        let europeanWeekday = todayInt - 1;
        let today = week[europeanWeekday];
        console.log(today);
        return UpdateTime._getData(today);
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

        if (isFirstLaunch) {
            return (
                <View>
                    <UpdateTime/>
                    <Button
                        title={'done'}
                        onPress={() => {
                            this.setState({keepAsFirstLaunch: true}, function () {
                            });

                        }}
                    />
                </View>
            )
        } else {
            return (
                <ImageBackground source={require('./components/images/beer.jpeg')}
                                 style={{width: '100%', height: '100%'}}>
                    <View style={styles.container}>
                        <Button title={'Is het al tijd voor bier?'} onPress={() => {
                            this.getData()
                                .then(response => {
                                    this.setData(response);
                                    console.log('setdata')
                                })
                                .then(response => {
                                    this.IsItTimeYet();
                                    console.log('timeyes')
                                });

                        }}/>
                        <Text>{this.state.allowedTime}</Text>
                    </View>
                </ImageBackground>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
