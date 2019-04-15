import {AsyncStorage} from "react-native";

/**
 * Set storage
 *
 * @param key
 * @param data
 * @returns {Promise<void>}
 */
export async function setStorage(key, data) {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
        // Error saving data
        console.log('Yo, er gaat hier iets fout bij het opslaan van de data...', error)
    }}

/**
 *
 * @param key
 * @returns {Promise<any>}
 */
export async function getStorage(key) {
    const value = await AsyncStorage.getItem(key);
    return JSON.parse(value);
}

export function getDay(){
    const week = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    let date = new Date();
    let todayInt = date.getDay();
    let europeanWeekday = todayInt - 1;
    return week[europeanWeekday];
}