function storageAvailable(type) {
    try {
        var storage = window[type],
            x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return "window.localStorage Available";
    }
    catch(e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            storage.length !== 0;
    }
}

function clearStorage(){
    window.localStorage.clear();
    log.innerHTML = "";
}
function dump(){
    var o = window.localStorage;
    console.log(o);
    log.innerHTML += "<br><br>window.localStorage dump:";
    for(var k in o){
        if (o.hasOwnProperty(k)) {
            log.innerHTML += "<br>" + k +": " + o[k];
        }
    }
}

function get(){
    log.innerHTML += "<br><br>" + key.value + ": " + window.localStorage.getItem(key.value);
    clearValue();
}

function set(){
    window.localStorage.setItem(key.value,value.value);
    clearValue();
}

function remove(){
    window.localStorage.removeItem(key.value);
    log.innerHTML += "<br><br>" + key.value + ": " + window.localStorage[key.value];
}

var clearValue = function(){
    value.value = "";
    key.value = "";
}

///********** space check from https://stackoverflow.com/questions/4391575/how-to-find-the-size-of-localstorage

var localStorageSpace = function(){
        var allStrings = '';
        for(var key in window.localStorage){
            if(window.localStorage.hasOwnProperty(key)){
                allStrings += window.localStorage[key];
            }
        }
        return allStrings ? 3 + ((allStrings.length*16)/(8*1024)): 0;//in KB
    };

var totalLocalStorageSpace = 1024 * 1024 * 5 - unescape(encodeURIComponent(JSON.stringify(window.localStorage))).length;//bull shit

var get_totalLocalStorageSpace = function(){
    log.innerHTML += "<br> TOTAL LOCAL STORAGE: " + totalLocalStorageSpace + " bites";
}
var remainingLocalStorageSpace = function(){
    return totalLocalStorageSpace - Math.floor(localStorageSpace() * 1000);
}

var get_remainingLocalStorageSpace = function(){
    log.innerHTML += "<br> REMAINING LOCAL STORAGE: " + remainingLocalStorageSpace() + " bites";
}

var qEnoughLocalStorage = function(x){
    return ((remainingLocalStorageSpace() - x) > 0)? true : false;
}
