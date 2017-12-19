<!DOCTYPE html>
<html lang="ru" class="layout-html">
<head>
	<title>Итоги уходящего 2017 года</title>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
	<meta name="apple-itunes-app" content="app-id=557857165" />
	<meta name="google-play-app" content="app-id=ru.raiffeisennews" />

    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-111419738-1"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'UA-111419738-1');
    </script>
</head>

<body>
<header class="header">
	<div class="header-logos">
		<div class="header-logos__item">
			<a href="https://www.raiffeisen.ru" target="_blank">
				<svg class="raiff-logo">
					<use xlink:href="#spr-raiff-logo-rus"></use>
				</svg>
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
						<svg class="raiff-logo">
							<use xlink:href="#spr-raiff-logo-rus"></use>
						</svg>
					</a>
				</div>
			</div>

			<noscript>
				<div class="scene-content" style="display:none;">
					<div class="content-animation">
						<h1><span class="scene-content__welcome">&nbsp;</span></h1>
						<p class="scene-content__subtitle">Ваш браузер не поддерживается</p>
					</div>
				</div>
			</noscript>

			<div class="scene-content" style="display:none;">
				<div class="content-animation">
					<h1><span class="scene-content__welcome">&nbsp;</span></h1>
					<p class="scene-content__subtitle">За&nbsp;окном морозный декабрь,близятся
					                                   новогодние праздники, а&nbsp;значит
					                                   самое время подвести итоги
					                                   уходящего 2017&nbsp;года.</p>
				</div>
				<div class="container-btn">
					<a href="" class="btn btn-default" data-action="top-scroll">Поехали?</a>
				</div>
			</div>
			<div class="scene-bottom">
				<img class="scene-bottom__img hidden-xs" src="assets/i/intro.png" alt="">
				<img class="scene-bottom__img visible-xs" src="assets/i/intro_m.png" alt="">
			</div>
			<footer class="footer">
				<span class="copyright">© 2003–2017 АО «Райффайзенбанк». </span>
			</footer>
		</section>

		<script id="page_error_template" type="text/template">
		<section class="scene scene--intro visible">
			<div class="scene-logos">
				<div class="scene-logos__item">
					<a href="https://www.raiffeisen.ru" target="_blank">
						<svg class="raiff-logo">
							<use xlink:href="#spr-raiff-logo-rus"></use>
						</svg>
					</a>
				</div>
			</div>
			<div class="scene-content">
				<div class="content-animation">
					<h1>Упс</h1>
					<p class="scene-content__subtitle">Запрашиваемая вами страница не существует или у вас оказалась неверная ссылка. Проверьте, пожалуйста, ссылку</p>
				</div>
				<div class="container-btn">
					<a href="https://www.raiffeisen.ru" class="btn btn-default">На главную</a>
				</div>
			</div>
			<div class="scene-bottom">
				<img class="scene-bottom__img hidden-xs" src="assets/i/intro.png" alt="">
				<img class="scene-bottom__img visible-xs" src="assets/i/intro_m.png" alt="">
			</div>
			<footer class="footer">
				<span class="copyright">© 2003–2017 АО «Райффайзенбанк». </span>
			</footer>
		</section>
		</script>

		<script id="page_template" type="text/template">
		<section class="scene scene--time" id="top-scroll" style=" background-image: url('assets/i/time-bg{{imgmod}}.png');">
			<div class="scene-content">
				<div class="content-animation">
					<div class="scene-content__top-title">Вы с Райффайзенбанком уже</div>
					<span class="scene-content__val">{{timeWithBank_val}}</span>
					<span class="scene-content__val-desc">{{timeWithBank_desc}}</span>
				</div>

			</div>
			<div class="scene-bottom">
				<img class="scene-bottom__img visible-xs" src="assets/i/time{{imgmod}}.png" alt="">
			</div>
			<footer class="footer">
				<span class="copyright">© 2003–2017 АО «Райффайзенбанк». </span>
				<span class="footer__center"><svg class="footer__mouse">
					<use xlink:href="#spr-mouse"></use>
				</svg></span>
				<span class="footer__note">Итоги 2017 года</span>
			</footer>
		</section>
		<section class="scene scene--operation" style="background-image: url('assets/i/operation-bg{{imgmod}}.png');">
			<div class="scene-content">
				<div class="content-animation">
				<div class="scene-content__top-title">Вы&nbsp;совершили за&nbsp;2017&nbsp;год<br>
				                                      по&nbsp;своим&nbsp;картам
				</div>
				<span class="scene-content__val">{{numberOfTransactionsByCard}}</span>
				<span class="scene-content__val-desc">{{#decl_operations}}{{numberOfTransactionsByCard}}{{/decl_operations}}</span>
				</div>
			</div>
			<div class="scene-bottom">
				<img class="scene-bottom__img visible-xs" src="assets/i/operation{{imgmod}}.png" alt="">
			</div>
			<footer class="footer">
				<span class="copyright">© 2003–2017 АО «Райффайзенбанк». </span>
				<span class="footer__center"><svg class="footer__mouse">
					<use xlink:href="#spr-mouse"></use>
				</svg></span>
				<span class="footer__note">Итоги 2017 года</span>
			</footer>
		</section>
		{{#numberOfTransactionsByNFC}}
		<section class="scene scene--mobile-operation" style="background-image: url('assets/i/mobile-operation-bg{{imgmod}}.png');">
			<div class="scene-content">
				<div class="content-animation">
				<div class="scene-content__top-title scene-content__top-title--bold">В том числе</div>
				<span class="scene-content__val">{{numberOfTransactionsByNFC}}</span>
				<span class="scene-content__val-desc">{{#decl_operations}}{{numberOfTransactionsByNFC}}{{/decl_operations}}</span>
				<div class="scene-content__top-title">С помощью вашего мобильного устройства</div>
				</div>
			</div>
			<div class="scene-bottom">
				<img class="scene-bottom__img visible-xs" src="assets/i/mobile-operation{{imgmod}}.png" alt="">
			</div>
			<footer class="footer">
				<span class="copyright">© 2003–2017 АО «Райффайзенбанк». </span>
				<span class="footer__center"><svg class="footer__mouse">
					<use xlink:href="#spr-mouse"></use>
				</svg></span>
				<span class="footer__note">Итоги 2017 года</span>
			</footer>
		</section>
		{{/numberOfTransactionsByNFC}}
		<section class="scene scene--total-sum" style="background-image: url('assets/i/total-sum-bg{{imgmod}}.png');">
			<div class="scene-content">
				<div class="content-animation">
				<div class="scene-content__top-title">Общая сумма ваших операций<br>
				                                      за&nbsp;2017&nbsp;год составила
				</div>
				<span class="scene-content__val">{{#spaced_number}}{{totalSumOfTransactions}}{{/spaced_number}}</span>
				<span class="scene-content__val-desc">{{#decl_rouble}}{{totalSumOfTransactions}}{{/decl_rouble}}</span>
				</div>
			</div>
			<div class="scene-bottom">
				<img class="scene-bottom__img visible-xs" src="assets/i/total-sum{{imgmod}}.png" alt="">
			</div>
			<footer class="footer">
				<span class="copyright">© 2003–2017 АО «Райффайзенбанк». </span>
				<span class="footer__center"><svg class="footer__mouse">
					<use xlink:href="#spr-mouse"></use>
				</svg></span>
				<span class="footer__note">Итоги 2017 года</span>
			</footer>
		</section>
		{{#expensesByCategory.length}}
		<section class="scene scene--costs" style="background-image: url('assets/i/costs-bg{{imgmod}}.png');">
			<div class="scene-content">
				<div class="content-animation">
				<div class="scene-slider">
					{{#expensesByCategory}}
					<div class="scene-slider-item">
						<div class="scene-content__top-title scene-content__top-title--bold-sm">На {{categoryName}} вы
						                                                                        потратили:
						</div>
						<span class="scene-content__val">{{#spaced_number}}{{totalExpenses}}{{/spaced_number}}</span>
						<span class="scene-content__val-desc">{{#decl_rouble}}{{totalExpenses}}{{/decl_rouble}}</span>

						{{^clientsSpentAlike}}
						{{#clientsSpentMore}}
						<div class="cost-right">
							<div class="cost__diagram" data-percent="{{clientsSpentMore}}">
								<div  class="cost__percent cost__percent--val">{{clientsSpentMore}}%</div>
								<svg class="diagram-svg" width="100" height="100" viewPort="0 0 90 90" version="1.1" xmlns="http://www.w3.org/2000/svg">
									<circle r="45" cx="50" cy="50" fill="transparent" stroke-dasharray="282.74" stroke-dashoffset="0"></circle>
									<circle class="diagram-bar" r="45" cx="50" cy="50" fill="transparent" stroke-dasharray="282.74" stroke-dashoffset="0"></circle>
								</svg>

							</div>
							<div class="cost__desc">Только&nbsp;{{clientsSpentMore}}% клиентов Райффайзенбанка {{#decl_spent}}{{clientsSpentMore}}{{/decl_spent}} в&nbsp;этой категории больше, чем&nbsp;вы</div>
						</div>
						<div class="cost-note">Только&nbsp;{{clientsSpentMore}}% клиентов Райффайзенбанка {{#decl_spent}}{{clientsSpentMore}}{{/decl_spent}} в&nbsp;этой категории больше, чем&nbsp;вы
						</div>
						{{/clientsSpentMore}}
						{{/clientsSpentAlike}}
						{{#clientsSpentAlike}}
						<div class="cost-right">
							<div class="cost__desc no-diagram">Клиенты Райффайзенбанка тратят на&nbsp;{{categoryName}} в&nbsp;среднем так же, как и&nbsp;вы</div>
						</div>

						<div class="cost-note">Клиенты Райффайзенбанка тратят на&nbsp;{{categoryName}} в&nbsp;среднем так же, как и&nbsp;вы
						</div>
						{{/clientsSpentAlike}}
					</div>
					{{/expensesByCategory}}
				</div>
				</div>
			</div>
			<div class="scene-bottom">
				<img class="scene-bottom__img visible-xs" src="assets/i/costs{{imgmod}}.png" alt="">
			</div>
			<footer class="footer">
				<span class="copyright">© 2003–2017 АО «Райффайзенбанк». </span>
				<span class="footer__center"><svg class="footer__mouse">
					<use xlink:href="#spr-mouse"></use>
				</svg></span>
				<span class="footer__note">Итоги 2017 года</span>
			</footer>
		</section>
		{{/expensesByCategory.length}}
		{{#largestExpense}}
		<section class="scene scene--largest-purchase" style=" background-image: url('assets/i/largest-purchase-bg{{imgmod}}.png');">
			<div class="scene-content">
				<div class="content-animation">
				<span class="scene-content__val">{{#spaced_number}}{{sum}}{{/spaced_number}}</span>
				<span class="scene-content__val-desc">{{#decl_rouble}}{{sum}}{{/decl_rouble}}</span>
				<div class="scene-content__top-title">Составила ваша самая
				                                      крупная&nbsp;покупка
				</div>
				<hr class="light-line">
				<div class="scene-content__detail">{{#date_DnumMtxt}}{{date}}{{/date_DnumMtxt}} — {{outletName}}</div>
				<hr class="bold-line">
				</div>
			</div>
			<div class="scene-bottom">
				<img class="scene-bottom__img visible-xs" src="assets/i/largest-purchase{{imgmod}}.png" alt="">
			</div>
			<footer class="footer">
				<span class="copyright">© 2003–2017 АО «Райффайзенбанк». </span>
				<span class="footer__center"><svg class="footer__mouse">
					<use xlink:href="#spr-mouse"></use>
				</svg></span>
				<span class="footer__note">Итоги 2017 года</span>
			</footer>
		</section>
		{{/largestExpense}}
		{{#monthWithMinPayments}}
		<section class="scene scene--econom-month" style="background-image: url('assets/i/econom-month-bg{{imgmod}}.png');">
			<div class="scene-content">
				<div class="content-animation">
				<div class="scene-content__top-title scene-content__top-title--bold-sm">Ваш самый экономный месяц был
				</div>
				<span class="scene-content__val">{{name}}</span>
				<div class="scene-content__top-title">Тогда вы&nbsp;совершили 
					<span class="value">{{transactionsCount}}&nbsp;{{#decl_transaction}}{{transactionsCount}}{{/decl_transaction}}</span><br>
					на&nbsp;сумму <span class="value">{{#spaced_number}}{{sum}}{{/spaced_number}} {{#decl_rouble}}{{sum}}{{/decl_rouble}}</span>
				</div>
				</div>
			</div>
			<div class="scene-bottom">
				<img class="scene-bottom__img visible-xs" src="assets/i/econom-month{{imgmod}}.png" alt="">
			</div>
			<footer class="footer">
				<span class="copyright">© 2003–2017 АО «Райффайзенбанк». </span>
				<span class="footer__center"><svg class="footer__mouse">
					<use xlink:href="#spr-mouse"></use>
				</svg></span>
				<span class="footer__note">Итоги 2017 года</span>
			</footer>
		</section>
		{{/monthWithMinPayments}}
		{{#monthWithMaxPayments}}
		<section class="scene scene--hot-month" style="background-image: url('assets/i/hot-month-bg{{imgmod}}.png');">
			<div class="scene-content">
				<div class="content-animation">
				<div class="scene-content__top-title scene-content__top-title--bold-sm">А вот самый «горячий» месяц
				                                                                        был
				</div>
				<span class="scene-content__val">{{name}}</span>
				<div class="scene-content__top-title">Тогда вы&nbsp;совершили 
					<span class="value">{{transactionsCount}}&nbsp;{{#decl_transaction}}{{transactionsCount}}{{/decl_transaction}}</span><br>
						на&nbsp;сумму <span class="value">{{#spaced_number}}{{sum}}{{/spaced_number}} {{#decl_rouble}}{{sum}}{{/decl_rouble}}</span>
				</div>
				</div>
			</div>
			<div class="scene-bottom">
				<img class="scene-bottom__img visible-xs" src="assets/i/hot-month{{imgmod}}.png" alt="">
			</div>
			<footer class="footer">
				<span class="copyright">© 2003–2017 АО «Райффайзенбанк». </span>
				<span class="footer__center"><svg class="footer__mouse">
					<use xlink:href="#spr-mouse"></use>
				</svg></span>
				<span class="footer__note">Итоги 2017 года</span>
			</footer>
		</section>
		{{/monthWithMaxPayments}}
		{{#percentsFromTDAndSA}}
		<section class="scene scene--deposits" style="background-image: url('assets/i/deposits-bg{{imgmod}}.png');">
			<div class="scene-content">
				<div class="content-animation">
				<div class="scene-content__top-title">Ваши накопительные счета
				                                      и&nbsp;депозиты <br>принесли вам за&nbsp;год
				</div>
				<span class="scene-content__val">{{#spaced_number}}{{percentsFromTDAndSA}}{{/spaced_number}}</span>
				<span class="scene-content__val-desc">{{#decl_rouble}}{{percentsFromTDAndSA}}{{/decl_rouble}}</span>
				</div>
			</div>
			<div class="scene-bottom">
				<img class="scene-bottom__img visible-xs" src="assets/i/deposits{{imgmod}}.png" alt="">
			</div>
			<footer class="footer">
				<span class="copyright">© 2003–2017 АО «Райффайзенбанк». </span>
				<span class="footer__center"><svg class="footer__mouse">
					<use xlink:href="#spr-mouse"></use>
				</svg></span>
				<span class="footer__note">Итоги 2017 года</span>
			</footer>
		</section>
		{{/percentsFromTDAndSA}}
		{{#growthOfDepositsWithoutPercents}}
		<section class="scene scene--contribution" style="background-image: url('assets/i/contribution-bg{{imgmod}}.png');">
			<div class="scene-content">
				<div class="content-animation">
				<div class="scene-content__top-title">За&nbsp;2017 год вы&nbsp;пополнили свои вклады&nbsp;на
				</div>
				<span class="scene-content__val">{{#spaced_number}}{{growthOfDepositsWithoutPercents}}{{/spaced_number}}</span>
				<span class="scene-content__val-desc">{{#decl_rouble}}{{growthOfDepositsWithoutPercents}}{{/decl_rouble}}</span>
				</div>
			</div>
			<div class="scene-bottom">
				<img class="scene-bottom__img visible-xs" src="assets/i/contribution{{imgmod}}.png" alt="">
			</div>
			<footer class="footer">
				<span class="copyright">© 2003–2017 АО «Райффайзенбанк». </span>
				<span class="footer__center"><svg class="footer__mouse">
					<use xlink:href="#spr-mouse"></use>
				</svg></span>
				<span class="footer__note">Итоги 2017 года</span>
			</footer>
		</section>
		{{/growthOfDepositsWithoutPercents}}
		{{#cashBackProgram}}
		<section class="scene scene--cashback" style="background-image: url('assets/i/cashback-bg{{imgmod}}.png');">
			<div class="scene-content">
				<div class="content-animation">
				<div class="scene-content__top-title">Ваш кэшбек по&nbsp;пакету<br>
				                                      услуг &laquo;Золотой&raquo; составил
				</div>
				<span class="scene-content__val">{{#spaced_number}}{{sum}}{{/spaced_number}}</span>
				<span class="scene-content__val-desc">{{#decl_rouble}}{{sum}}{{/decl_rouble}}</span>
				</div>
			</div>
			<div class="scene-bottom">
				<img class="scene-bottom__img visible-xs" src="assets/i/cashback{{imgmod}}.png" alt="">
			</div>
			<footer class="footer">
				<span class="copyright">© 2003–2017 АО «Райффайзенбанк». </span>
				<span class="footer__center"><svg class="footer__mouse">
					<use xlink:href="#spr-mouse"></use>
				</svg></span>
				<span class="footer__note">Итоги 2017 года</span>
			</footer>
		</section>
		{{/cashBackProgram}}
		{{#visitedCountries.length}}
		<section class="scene scene--countries" style="background-image: url('assets/i/countries-bg{{imgmod}}.png');">
			<div class="scene-content">
				<div class="content-animation">
				<div class="countries-slider__title">Страны, которые вы&nbsp;посетили
				                                     в&nbsp;этом&nbsp;году
				</div>
				<div class="countries-slider">
					{{#visitedCountries}}
					<div class="countries-slider-item">
						<div class="countries-slider-item__title">{{countryName}}</div>
						{{#otherClientsPercent}}
						<p class="countries-slider-item__note">
							Туда {{#decl_visited}}{{otherClientsPercent}}{{/decl_visited}} также
							{{otherClientsPercent}}%&nbsp;наших клиентов
						</p>
						{{/otherClientsPercent}}
					</div>
					{{/visitedCountries}}
				</div>
				</div>
			</div>
			<div class="scene-bottom">
				<img class="scene-bottom__img visible-xs" src="assets/i/countries{{imgmod}}.png" alt="">
			</div>
			<footer class="footer">
				<span class="copyright">© 2003–2017 АО «Райффайзенбанк». </span>
				<span class="footer__center"><svg class="footer__mouse">
					<use xlink:href="#spr-mouse"></use>
				</svg></span>
				<span class="footer__note">Итоги 2017 года</span>
			</footer>
		</section>
		{{/visitedCountries.length}}
		{{#totalSumOfLoansPaid}}
		<section class="scene scene--credit" style="background-image: url('assets/i/credit-bg{{imgmod}}.png');">
			<div class="scene-content">
				<div class="content-animation">
				<div class="scene-content__top-title">

					<!--В&nbsp;2017&nbsp;году вы&nbsp;закрыли<br> свой кредит на&nbsp;сумму-->
					В&nbsp;2017 году вы&nbsp;закрыли свои кредиты на&nbsp;общую сумму

				</div>
				<span class="scene-content__val">{{#spaced_number}}{{totalSumOfLoansPaid}}{{/spaced_number}}</span>
				<span class="scene-content__val-desc">{{#decl_rouble}}{{totalSumOfLoansPaid}}{{/decl_rouble}}</span>
				</div>
			</div>
			<div class="scene-bottom">
				<img class="scene-bottom__img visible-xs" src="assets/i/credit{{imgmod}}.png" alt="">
			</div>
			<footer class="footer">
				<span class="copyright">© 2003–2017 АО «Райффайзенбанк». </span>
				<span class="footer__center"><svg class="footer__mouse">
					<use xlink:href="#spr-mouse"></use>
				</svg></span>
				<span class="footer__note">Итоги 2017 года</span>
			</footer>
		</section>
		{{/totalSumOfLoansPaid}}
		{{#coBrandStats}}
		<section class="scene scene--points" style="background-image: url('assets/i/points-bg{{imgmod}}.png');">
			<div class="scene-content">
				<div class="content-animation">
				<div class="scene-content__top-title scene-content__top-title--bold">А еще вы накопили</div>
				<span class="scene-content__val">{{#spaced_number}}{{sum}}{{/spaced_number}}</span>
				<span class="scene-content__val-desc">{{#decl_bonus}}{{sum}}{{/decl_bonus}}</span>
				<div class="scene-content__top-title">В программе {{brandName}}</div>
				</div>
			</div>
			<div class="scene-bottom">
				<img class="scene-bottom__img visible-xs" src="assets/i/points{{imgmod}}.png" alt="">
			</div>
			<footer class="footer">
				<span class="copyright">© 2003–2017 АО «Райффайзенбанк». </span>
				<span class="footer__center"><svg class="footer__mouse">
					<use xlink:href="#spr-mouse"></use>
				</svg></span>
				<span class="footer__note">Итоги 2017 года</span>
			</footer>
		</section>
		{{/coBrandStats}}
		<section class="scene scene--finish">
			<div class="scene-content">
				<div class="content-animation">
				<h2 class="scene-content__title">Продуктивный<br>
				                                 был год,не так ли?</h2>
				<p class="scene-content__subtitle">В&nbsp;наступающем 2018 году
				                                   мы&nbsp;желаем вам <br>достижения новых
				                                   вершин&nbsp;&mdash; эмоциональных
				                                   и&nbsp;финансовых.</p>
				<div class="btn-container-bottom">
					<div class="btn-container-bottom__content">
						<h3 class="btn-container-bottom__title">Нам удалось вас удивить? :)</h3>
						<button type="button" data-action="vote-yes" class="btn btn-inverted">Да, не ожидал{{verbsuffix}}!</button>
						<button type="button" data-action="vote-no" class="btn btn-inverted">Предсказуемо!</button>
					</div>
					<div class="btn-container-bottom__content result">
						<h3 class="btn-container-bottom__title">Благодарим за ваш ответ!</h3>
					</div>
				</div>
				<div class="scene-content__note">Спасибо за&nbsp;доверие. Всегда&nbsp;ваш, Райффайзенбанк.</div>
				</div>
			</div>
			<div class="scene-bottom">
				<img class="scene-bottom__img hidden-xs" src="assets/i/finish.png" alt="">
				<img class="scene-bottom__img visible-xs" src="assets/i/finish_m.png" alt="">
			</div>
			<footer class="footer">
				<span class="copyright">© 2003–2017 АО «Райффайзенбанк». </span>
				<span class="footer__note">Итоги 2017 года</span>
			</footer>
		</section>
		</script>
	</div>
</main>
</body>
</html>