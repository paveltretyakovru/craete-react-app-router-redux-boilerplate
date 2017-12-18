export var API = {
    getInfo: function () {
        com.rooxteam.statistic.client.logOperation("getInfo", com.rooxteam.statistic.getContext({ "linkId" : this.getLinkID()}));
        return $.ajax({
            url: '/ny2018/webapi-1/info/' + this.getLinkID(),
            dataType: 'json'
        });
    },

    sendVote: function (vote) {

        com.rooxteam.statistic.client.logOperation("sendVote", com.rooxteam.statistic.getContext({ "vote": vote, "linkId" : this.getLinkID()}));

        return $.ajax({
            type: 'PUT',
            url: '/ny2018/webapi-1/feedbacks/' + this.getLinkID(),
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
