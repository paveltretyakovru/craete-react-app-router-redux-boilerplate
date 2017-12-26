try {
    var pathParts = window.location.pathname.split("/"),
        lastSegment = pathParts.pop() || pathParts.pop(),
        preloadInfo = fetch && "function" == typeof fetch && fetch("/ny2018/webapi-1/info/" + lastSegment + "/").then(function(response){
            if (response.status == 200) {
                return response.json();
            } else {
                return null;
            }
        }).then(function(data) {
            document.getElementsByClassName("scene-content__welcome")[0].innerText = data.data.jsonBody.clientName + ", здравствуйте!";
            return data;
        })
} catch (t) {}