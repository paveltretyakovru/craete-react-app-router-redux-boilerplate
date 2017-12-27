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
            if (data !== null) {
                document.getElementsByClassName("scene-content__welcome")[0].innerText = data.data.jsonBody.clientName + ", здравствуйте!";
                document.getElementsByClassName("initial-load")[0].style.visibility = "visible";
                // for desktop
                // document.getElementsByClassName("initial-load")[0].style.opacity = "1";
            }
            return data;
        })
} catch (t) {}