<!DOCTYPE html>
<html lang="ru" class="layout-html">
<head>
	<title>Лидеры России</title>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
	<meta name="robots" content="noindex">

	<link rel="preload" href="assets/i/intro.png" as="image" media="(min-width: 767px)"/>
	<link rel="preload" href="assets/i/intro_m.png" as="image" media="(max-width: 767px)"/>


	<meta property="og:title" content="Лидеры России"/>
	<meta property="og:url" content="https://xn-----glcffqdavsretbqa9n.xn--p1ai/"/>
	<meta property="og:type" content="website"/>
	<meta property="og:image" content="assets/i/icon.png"/>
	<meta property="og:site_name" content="Лидеры России"/>

	<meta name="web_author" content="RooX Solutions LTD, roox@rooxteam.com" />
	<meta name="designer" content="RooX" />

    <!-- Google Analytics -->
    <script>
        window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;
        ga('create', 'UA-126134239-1', 'auto');

        var urlWithoutLastSection = window.location.pathname.replace(/\/[^/]+\/*$/, '/');
        ga('set', 'page', urlWithoutLastSection);
        ga('send', 'pageview');
    </script>
    <script async src='https://www.google-analytics.com/analytics.js'></script>
    <!-- End Google Analytics -->

</head>

<body>
<header class="header">
	<div class="header-logos">
		<div class="header-logos__item">
			<a href="https://гпн-лидеры-россии.рф" target="_blank" data-stat-action="logo" rel="noopener noreferrer">
				<div class="logo"></div>
			</a>
		</div>
	</div>
</header>
<main>
	<div class="wrapper">
        <div class="scene-content initial-load">
            <div class="content-animation">
                <h1><span class="scene-content__welcome"></span></h1>
            </div>
        </div>
	</div>
</main>
<script>
    try{var pathParts=window.location.pathname.split("/"),lastSegment=pathParts.pop()||pathParts.pop(),preloadInfo=fetch&&"function"==typeof fetch&&fetch("/ny2018/webapi-1/info/"+lastSegment+"/").then(function(t){return 200==t.status?t.json():null}).then(function(t){return null!==t&&(document.getElementsByClassName("scene-content__welcome")[0].innerText=t.data.jsonBody.clientName+", здравствуйте!",document.getElementsByClassName("initial-load")[0].style.visibility="visible"),t})}catch(t){}
</script>
</body>
</html>