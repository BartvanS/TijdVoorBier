export function checkTime(t) {
    if (t < 10) {
        t = "0" + t;
    }else{
        t = t.toString();
    }
    return t;
}