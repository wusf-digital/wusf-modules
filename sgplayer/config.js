const config = {
    "debug": false,
    "version": "3.2.7",
    "autoLoad": true,
    "autoPlay": false,
    "pageTitle": "WUSF",
    "theme": "sg-gray",
    "layout": "audio",
    "skins": { 
        "global": [] 
    },
    "mobileEnabled": false,
    "hls": { 
        "enabled": false 
    },
    "artworkLookup": {
        "proxy": false,
        "fallback": false,
        "explicit": true,
        "matchThreshold": 60,
        "limit": 10
    },
    "autoHideControls": false,
    "menuPlayTimeout": 100,
    "userInactivityTimeout": 2000,
    "companionBannerTimeout": 30000,
    "companionBackgroundColor": "#6d6d6d",
    "volume": 1.0,
    "streamSelectorLabel": "Station: ",
    "fallbackOrder": [
        "html5", 
        "flash"
    ],
    "streams": [
        {
            "name": "WUSF 89.7",
            "geoRedirect": false,
            "fallbackArt": "https://player.streamguys.com/wusf/sgplayer/include/image/wusf.png",
            "type": "audio",
            "source": [
                {
                    "title": "AAC", 
                    "type": "audio/aac", 
                    "src": "https://wusf.streamguys1.com/wusf"
                }
            ],
            "metaData": {
                "enabled": false,
                "autoScrollSong": true,
                "autoScrollPrev": false,
                "songArraySize": 15,
                "sgmd": {
                    "source": "https://jetio.streamguys.com",
                    "key": "bde4ce9b8e5f8db632bc31aa5f5d8877dd9360fa",
                    "scraperId": "33e63f45-db1b-479b-ade5-7f8070883e14",
                    "socketIO": { 
                        "forceNew": true 
                    }
                },
                "delay": false,
                "delimiter": " - ",
                "albumOrder": 3,
                "artistOrder": 1,
                "trackOrder": 2
            }
	    },
        {
            "name": "WSMR",
            "geoRedirect": false,
            "fallbackArt": "https://player.streamguys.com/wusf/sgplayer/include/image/wsmr.png",
            "type": "audio",
            "source": [
                {
                    "title": "AAC", 
                    "type": "audio/aac", 
                    "src": "https://wusf.streamguys1.com/wsmr"
                }
            ],
            "metaData": {
                "enabled": true,
                "autoScrollSong": true,
                "autoScrollPrev": false,
                "songArraySize": 15,
                "sgmd": {
                    "source": "https://jetio.streamguys.com",
                    "key": "bde4ce9b8e5f8db632bc31aa5f5d8877dd9360fa",
                    "scraperId": "86be031f-4151-408f-a15e-6a2b1f536751",
                    "socketIO": { 
                        "forceNew": true 
                    }
                },
                "delay": false,
                "delimiter": " - ",
                "albumOrder": 3,
                "artistOrder": 1,
                "trackOrder": 2
            }

        }
    ],
    "activityMonitor": {
        "enabled": false,
        "timeout": 240,
        "promptTimeout": 60
    },
    "privacy": {
        "enabled": false,
        "prompt": true,
        "rejectExpires": 1,
        "ccpa": {
            "enabled": false
        },
        "policy": {
            "href": "https://www.streamguys.com/privacy"
        }
    },
    "playerComponents": {
        "title": true,
        "art": true,
        "song": true,
        "about": true,
        "details": true,
        "collapseCards": false,
        "marqueeMetadata": true,
        "prevPlayed": true,
        "infoButton": false,
        "artworkLookup": false,
        "buySongButton": true,
        "previousBuyNowButtons": true,
        "socialButtons": true,
        "bannerAd": true,
        "bannerOverlay": true,
        "debugLog": false,
        "cedexisRadar": false,
        "qualityPicker": true
    },
    "images": {
        "favicon": "https://player.streamguys.com/wusf/sgplayer/include/image/wusf.png",
        "fallbackAlbumArt": "https://player.streamguys.com/wusf/sgplayer/include/image/wusf.png",
        "fallbackAlbumBG": "https://player.streamguys.com/wusf/sgplayer/include/image/wusf.png",
        "infoButton": "https://player.streamguys.com/wusf/sgplayer/include/image/info_button.png",
        "buySongButton": "https://player.streamguys.com/wusf/sgplayer/include/image/itunes-store-blk.svg",
        "loadingIndicator": "https://player.streamguys.com/wusf/sgplayer/include/image/loader.gif"
    },
    "flashFallback": {
        "bufferTime": 10,
        "reconnectTimeout": 120
    },
    "adswizz": {
        "scripts": [
            "https://cdn.adswizz.com/adswizz/js/SynchroClient2.js",
            "https://synchrobox.adswizz.com/register2.php"
        ]
    },
    "addThis": {
        "config": {
            "svcs": {
                "facebook": "Facebook",
                "twitter": "Twitter",
                "expanded": "More"
            }
        },
        "share": {
            "title": "WUSF",
            "url": "https://wusf.org",
            "image": "include/image/wusf.png",
            "description": "I listened to this on SGPlayer!"
        }
    }
}

export default config