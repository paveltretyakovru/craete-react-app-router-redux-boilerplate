export var API = {
    getInfo: function () {
        return $.ajax({
            url: '/webapi-1/info/' + this.getLinkID(),
            dataType: 'json'
        });
    },

    sendVote: function (vote) {
        return $.ajax({
            type: 'PUT',
            url: '/webapi-1/feedbacks/' + this.getLinkID(),
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
