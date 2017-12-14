import './../vendor/statistics.custom.build-1.0.1180';

com.rooxteam.statistic.updateConfiguration(
    com.rooxteam.config.statistic,
    {
        "ENABLED": true,
        "LIC_ENABLED": true,
        "TRANSPORT": "POST",
        "CREDENTIALS_SYNC_ENABLED": true,
        "SERVER_ADDRESS": 'https://raif.demo.rooxteam.com/pushreport',
        "LIC_SERVER_ADDRESS": 'https://lic.rooxcloud.com/pushreport',
        "IO_EVENTS_ENABLED": true,
        "VIEW_EVENTS_ENABLED": true,
        "DOM_EVENTS_ENABLED": true,
        "AUTO_GENERATE_UIID": true,
        "AUTO_GENERATE_IID": true,
        "ACCUMULATE_TIME": 30000,
        "ACCUMULATE_OPERATION_LIMIT": 1,
        "OPERATOR_ID": "RAIF",
        "WRAP_LINKS": true,
        "JQUERY_AJAX_WRAP": true,
        "USE_LS_WITH_MUTEX": true,
        "USE_ELECTION": false
    },
    "",
    "raif-ny"
);
