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
import {getDay, getStorage} from './utils/utils';


const week = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

export default class HomeScreen extends React.Component {
    //TODO: https://facebook.github.io/react-native/docs/headless-js-android
    //dit gebruiken om te checken of het al tijd is en een berichtje te sturen!

    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        this.state = {
            allowedHours: null,
            allowedMinutes: null,
            // allowedTime: null,
            isFirstLaunch: false,
            hasCheckedAsyncStorage: false,
            keepAsFirstLaunch: false
        };

    }

    async componentDidMount() {
        let isFirstLaunch = await checkIfFirstLaunch();
        this.setState({isFirstLaunch, hasCheckedAsyncStorage: true});
    }


    async IsItTimeYet() {
        let date = new Date();
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
        // getStorage('alwaysTimeForBeer').then(response => {
        //     console.log('getresp', response)
        //
        //     if (response === true) {
        //         return 'alwaysTimeForBeer';
        //     } else {
                let today = getDay();
                console.log(UpdateTime._getData(today))
                return UpdateTime._getData(today);
            // }
        // });
    }

    async setData(response) {
        console.log('test', response);
        // if (response === 'alwaysTimeForBeer'){
        //     console.log('yasss')
        // }else {
            let hours = response.substring(0, 2);
            let minutes = response.substring(3, 5);
            this.setState({
                allowedHours: hours,
                allowedMinutes: minutes,
            });
        // }
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
                            // this.setState({keepAsFirstLaunch: true}, function () {
                            // });
                        }}
                    />
                </View>
            )
        } else {
            return (
                <ImageBackground
                    source={require('./components/images/beer.jpeg')}
                    style={{width: '100%', height: '100%'}}>
                    <View style={styles.container}>
                        <Button title={'Is het al tijd voor bier?'} onPress={() => {
                            this.getData()
                                .then(response => {
                                    console.log('response' , response);
                                    this.setData(response);
                                })
                                .then(response => {
                                    this.IsItTimeYet();
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
