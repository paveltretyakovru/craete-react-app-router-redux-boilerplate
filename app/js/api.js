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
        com.rooxteam.statistic.client.logOperation("getInfo", com.rooxteam.statistic.getContext({ "linkId" : this.getLinkID()}));
        var linkId = this.getLinkID();
        if (linkId == 'index.html' || linkId == 'index.php' || linkId == 'test1')
            return ajax_response(stubResponse0);

        return $.ajax({
            url: '/ny2018/webapi-1/info/' + linkId + '/',
            dataType: 'json'
        });
    },

    sendVote: function (vote) {

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
