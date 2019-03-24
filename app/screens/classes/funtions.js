export function checkTime(t) {
    if (t < 10) {
        t = "0" + t;
    } else {
        t = t.toString();
    }
    return t;
}

import FunnyLogger from 'funny-log'
export function clearConsole() {
    let logger = new FunnyLogger();
    //npm i funny-log
    //Toen ik eindelijk klaar was met onderstaande array te maken kwam ik er achter dat het een random functie heeft...
    // let logs = ['haha', 'goToYourDaddy', 'angry', 'why', 'partyTime', 'wtf', 'iAmChampion', 'youSoMean', 'iDontCare', 'hehehe', 'allPraiseToHim', 'mmmOkay', 'homer', 'really', 'soWhat', 'omg', 'noWay', 'facepalm', 'doubleFacepalm', 'bender', 'smile', 'tableFlip', 'random'];
    let a;
    for (a = 0; a <= 22; a++) {
        logger.random('');
    }
    console.log('-----------------------------------------------------------------------------------------------------------')

}