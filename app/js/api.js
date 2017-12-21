import { stubResponse0 } from './api_stub';

function ajax_response(response) {

    var deferred = $.Deferred().resolve(
        [{
            'data': {
                'jsonBody': response
            }
        }]
    );
    return deferred.promise();
  }

export var API = {
    getInfo: function () {
        window.currentLink = this.getLinkID();
        com.rooxteam.statistic.client.logOperation("getInfo", com.rooxteam.statistic.getContext({ "linkId" : window.currentLink}));
        var linkId = this.getLinkID();
        if (linkId == 'test0' || (linkId == 'index.html' && window.location.search == '?test0'))
            return ajax_response(stubResponse0);

        return $.ajax({
            url: '/ny2018/webapi-1/info/' + linkId + '/',
            dataType: 'json'
        });
    },

    sendVote: function (vote) {
        ga('send', 'event', {
            'eventCategory': '2017results',
            'eventAction': 'vote',
            'eventValue': vote
          });
        com.rooxteam.statistic.client.logOperation("sendVote", com.rooxteam.statistic.getContext({ "vote": vote, "linkId" : this.getLinkID()}));

        return $.ajax({
            type: 'PUT',
            url: '/ny2018/webapi-1/feedbacks/' + this.getLinkID() + '/',
            data: JSON.stringify({ "vote": vote }),
            contentType: "application/json",
            dataType: 'json'
        });
    },

    getLinkID: function () {
        var pathParts = window.location.pathname.split('/');
        var lastSegment = pathParts.pop() || pathParts.pop();
        return lastSegment;
    }
}
