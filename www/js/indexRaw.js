const EVENT_DEVICE_READY = 'deviceready';
const EVENT_OFFLINE = 'offline';

const ELEMENT_STATS = document.getElementById("stats");
const ELEMENT_INFO = document.getElementById("info");
const ELEMENT_NETWORK_ERROR = document.getElementById("networkError");
const ELEMENT_DONE = document.getElementById("done");
const ELEMENT_LOADING = document.getElementById("loading");

const ENDPOINT_STATUSES_USER_TIMELINE = 'statuses/user_timeline';

const CML_LAST_ID = '1257686929354772481';

const STYLE_DISPLAY_BLOCK = 'block';
const STYLE_DISPLAY_NONE = 'none';

const KEY_MATCH_COUNT = 'matchCount';
const KEY_TWEET_COUNT = 'tweetCount';
const KEY_CML_LAST_ID = 'CMLlastID';

const NOTIFICATION_TITLE = 'Hortas Urbanas';
const NOTIFICATION_TEXT = 'Tweet da Câmara Municipal de Lisboa. Clica para saberes mais.';
const NOTIFICATION_ICON = 'res://notifications_active';
const NOTIFICATION_ACTION_CLICK = 'click';

const STRING_NO_CONNECTION = 'SEM CONEXAO';
const STRING_ALL_DONE = "TUDO FEITO!";
const STRING_LOOKING_FOR_TWEETS = 'A PROCURAR TWEETS...';

const TWITTER_URL = 'http://www.twitter.com/';

const TWITTER_ACCOUNT_CMLISBOA = "CamaraLisboa";

const Twitter = require('twitter');
const storage = window.localStorage;
const TwitterClient = new Twitter({
    consumer_key: '',
    consumer_secret: '',
    bearer_token: ''
});

// USED FOR COUNTING TWEETS
var tweetCount;
var matchCount;

var footerString;

// CREATES NOTIFICATION WITH LINK TO RELEVANT TWEET
function createNotification(screenName, tweetID) {

    let url = TWITTER_URL + screenName + '/status/' + tweetID;

    let notification = cordova.plugins.notification.local.schedule({
        title: NOTIFICATION_TITLE,
        text: NOTIFICATION_TEXT,
        foreground: false,
        vibrate: true,
        smallIcon: NOTIFICATION_ICON
    });

    cordova.plugins.notification.local.on(NOTIFICATION_ACTION_CLICK, function(not, eopts) {
        window.open(url);
    }, notification);

}

/* GETS TWEETS FROM CMLISBOA ACCOUNT SINCE LAST CHECKED TWEET ID
   IF RETRIEVED TWEET MATCHES THE WORDS 'HORTA' OR 'HORTAS' IT
   SENDS NOTIFICATION WITH LINK TO SAID TWEET */
function getTweets() {

    let CMLlastID = CML_LAST_ID;

    if(storage.getItem(KEY_CML_LAST_ID) != null) {
        CMLlastID = storage.getItem(KEY_CML_LAST_ID);
    }
    else {
        storage.setItem(KEY_CML_LAST_ID, CMLlastID);
    }

    ELEMENT_LOADING.style.display = STYLE_DISPLAY_BLOCK;
    ELEMENT_INFO.innerHTML = STRING_LOOKING_FOR_TWEETS;

    TwitterClient.get(ENDPOINT_STATUSES_USER_TIMELINE, {screen_name: TWITTER_ACCOUNT_CMLISBOA, since_id: CMLlastID}, function(error, tweets, response) {
        if (!error) {
            tweets.forEach(element => {
                if(element.text.search(/horta/i) >= 0 || element.text.search(/hortas/i) >= 0) {
                    createNotification(TWITTER_ACCOUNT_CMLISBOA, element.id_str);
                    matchCount++;
                }
                storage.setItem(KEY_CML_LAST_ID,element.id_str);
                tweetCount++;
            });

        }
    });

    // WAITS 2 SECONDS THEN UPDATES FOOTER STATS & LOCAL STORAGE
    setTimeout(function() {

        storage.setItem(KEY_TWEET_COUNT, tweetCount);
        storage.setItem(KEY_MATCH_COUNT, matchCount);
        ELEMENT_STATS.innerHTML = footerString;
        ELEMENT_INFO.innerHTML = STRING_ALL_DONE;
        ELEMENT_LOADING.style.display = STYLE_DISPLAY_NONE;
        ELEMENT_DONE.style.display = STYLE_DISPLAY_BLOCK;

    }, 2000);

}

/* GETS EXECUTED WHEN APP IS RAN AND WHENEVER IT LOSES CONNECTION
   KEEPS CHECKING FOR NETWORK STATUS CHANGES AND WHEN IT GETS CONNECTION
   CALLS FUNCTION THAT GETS TWEETS */
function checkNetwork() {

    let networkState = navigator.connection.type;

    let checkingNetwork = setInterval(function() {

        if(networkState != Connection.NONE) {

            ELEMENT_NETWORK_ERROR.style.display = STYLE_DISPLAY_NONE;
            ELEMENT_INFO.innerHTML = "";
            getTweets();
            clearInterval(checkingNetwork);

        }
        else {

            ELEMENT_NETWORK_ERROR.style.display = STYLE_DISPLAY_BLOCK;
            ELEMENT_INFO.innerHTML = STRING_NO_CONNECTION;

        }

        networkState = navigator.connection.type;

    }, 2000);

}

// CHECKS FOR EXISTING KEYS IN LOCAL STORAGE AND IF THEY DON'T EXIST, SETS 0 AS THEIR VALUES
function checkStorage(key) {

    let count = 0;

    if(storage.getItem(key) != null) {
        count = storage.getItem(key);
    }
    else {
        storage.setItem(key,count);
    }

    return count;

}

function updateStats() {

    tweetCount = checkStorage(KEY_TWEET_COUNT);
    matchCount = checkStorage(KEY_MATCH_COUNT);
    footerString = tweetCount + " TWEET(S) ANALISADO(S) | " + matchCount + " TWEET(S) RELEVANTE(S)";
    ELEMENT_STATS.innerHTML = footerString;

}

// GETS EXECUTED WHEN APP IS READY
function deviceIsReady() {

    updateStats();

}

// GETS EXECUTED WHEN APP IS LAUNCHED
var app = {

    // ADDS EVENT LISTENERS ON STARTUP
    initialize: function() {
        document.addEventListener(EVENT_DEVICE_READY, this.onDeviceReady.bind(this), false);
        document.addEventListener(EVENT_OFFLINE, this.onDeviceReady.bind(this), false);
    },

    // TRIGGERS EVENTS
    onDeviceReady: function() {
        this.receivedEvent(EVENT_DEVICE_READY);
        this.receivedEvent(EVENT_OFFLINE);
    },

    // HANDLES EVENTS
    receivedEvent: function(id) {

        switch(id) {
            case EVENT_DEVICE_READY:
                deviceIsReady();
                break;
            case EVENT_OFFLINE:
                checkNetwork();
                break;

        }
    }
};

app.initialize();