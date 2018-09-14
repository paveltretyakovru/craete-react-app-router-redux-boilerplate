<!DOCTYPE html>
<html lang="ru" class="layout-html">
<head>
	<title>Итоги уходящего 2017 года</title>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
	<meta name="robots" content="noindex">

	<link rel="preload" href="assets/i/intro.png" as="image" media="(min-width: 767px)"/>
	<link rel="preload" href="assets/i/intro_m.png" as="image" media="(max-width: 767px)"/>


	<meta property="og:title" content="Итоги уходящего 2017 года от РайффайзенБанк"/>
	<meta property="og:url" content="https://www.raiffeisen.ru/"/>
	<meta property="og:type" content="website"/>
	<meta property="og:image" content="assets/i/icon.png"/>
	<meta property="og:site_name" content="РайффайзенБанк - ипотека, потребительские кредиты, кредитные карты, банковские услуги"/>

	<meta name="web_author" content="RooX Solutions LTD, roox@rooxteam.com" />
	<meta name="designer" content="CreativePeople" />


	<!-- Google Analytics -->
	<script>
        window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;
        ga('create', 'UA-111419738-1', 'auto');

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
			<a href="https://www.raiffeisen.ru" target="_blank" data-stat-action="logo" rel="noopener noreferrer">
				<div class="raiff-logo"></div>
			</a>
		</div>
	</div>
</header>
<main>
	<div class="wrapper">
		<section class="scene scene--intro visible">
			<div class="scene-logos">
				<div class="scene-logos__item">
					<a href="https://www.raiffeisen.ru" target="_blank">
						<div class="logo"></div>
					</a>
				</div>
			</div>

			<noscript>
				<div class="scene-content">
					<div class="content-animation">
						<h1><span class="scene-content__welcome">&nbsp;</span></h1>
						<p class="scene-content__subtitle">Ваш браузер не поддерживается</p>
					</div>
				</div>
				<footer class="footer">
					<span class="copyright">© 2003–2017 АО «Райффайзенбанк». </span>
				</footer>
			</noscript>
			<div class="scene-content initial-load" style="visibility: hidden">
				<div class="content-animation">
					<h1><span class="scene-content__welcome">&nbsp;</span></h1>
					<p class="scene-content__subtitle">За&nbsp;окном морозный декабрь, близятся
						новогодние праздники, а&nbsp;значит
						самое время подвести итоги
						уходящего 2017&nbsp;года.</p>
				</div>
				<div class="container-btn">
					<a href="" class="btn btn-default" data-action="top-scroll">Поехали?</a>
				</div>
			</div>
			<div class="scene-bottom">
				<picture>
					<source class="scene-bottom__img" srcset="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" media="(min-width: 767px)">
					<source class="scene-bottom__img" srcset="assets/i/intro_m.png" media="(max-width: 767px)">
					<img class="scene-bottom__img" src="assets/i/intro.png">
				</picture>
			</div>
			<footer class="footer">
				<span class="copyright">© 2003–2017 АО «Райффайзенбанк». </span>
			</footer>
		</section>
	</div>
</main>
<script>
    try{var pathParts=window.location.pathname.split("/"),lastSegment=pathParts.pop()||pathParts.pop(),preloadInfo=fetch&&"function"==typeof fetch&&fetch("/ny2018/webapi-1/info/"+lastSegment+"/").then(function(t){return 200==t.status?t.json():null}).then(function(t){return null!==t&&(document.getElementsByClassName("scene-content__welcome")[0].innerText=t.data.jsonBody.clientName+", здравствуйте!",document.getElementsByClassName("initial-load")[0].style.visibility="visible"),t})}catch(t){}
</script>
</body>
</html>