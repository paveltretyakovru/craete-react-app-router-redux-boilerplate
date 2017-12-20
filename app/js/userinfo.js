export var UserInfo = {
    numDeclension: function(titles) {
        if (titles === undefined || titles.constructor !== Array) throw new Error('Invalid Argument: Array is expected');
        if (titles.length != 3) throw new Error('Invalid Argument: 3 titles are expected');

        var cases = [2, 0, 1, 1, 1, 2];
        return function (number) {
            number = parseInt(number);
            number = Math.abs(number);
            if (number % 100 > 4 && number % 100 < 20) return titles[2];
            if (number % 10 > 5) return titles[2];
            return titles[cases[number % 10]];
        }
    },

    numberWithSpaces: function (x) {
        var parts = x.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, "&nbsp;");
        return parts.join(".");
    },

    date_DnumMtxt: function (date_string) {
        var months = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];
        var date = new Date(date_string);
        return date.getDate() + ' ' + months[date.getMonth()];
    },

    render: function (template, userdata) {

        var Hogan = require('hogan.js');
        var createLambda = function (lambda) {
            return function () {
                return function (text) {
                    var rendered = Hogan.compile(text).render(this);
                    return lambda.call(null, rendered);
                };
            };
        };


        var context = jQuery.extend(true, {}, userdata);
        context.decl_operations  = createLambda(this.numDeclension(['операцию', 'операции', 'операций']));
        context.decl_rouble      = createLambda(this.numDeclension(['рубль', 'рубля', 'рублей']));
        context.decl_transaction = createLambda(this.numDeclension(['транзакцию', 'транзакции', 'транзакций']));
        context.decl_visited     = createLambda(this.numDeclension(['отправился', 'отправилось', 'отправились']));
        context.decl_bonus       = createLambda(this.numDeclension(['балл', 'балла', 'баллов']));
        context.decl_spent       = createLambda(this.numDeclension(['тратит', 'тратят', 'тратят']));

        context.spaced_number    = createLambda(this.numberWithSpaces);

        context.date_DnumMtxt    = createLambda(this.date_DnumMtxt);

        {
            var decl_months = this.numDeclension(['месяц', 'месяца', 'месяцев']);
            var decl_years = this.numDeclension(['год', 'года', 'лет']);

            var years = (context.monthsAsBankClient/12 >> 0);
            var month = context.monthsAsBankClient - 12*years;

            if (month == 0 && years == 0)  {
                context.timeWithBank_val  = 1;
                context.timeWithBank_desc = decl_months(1);
            } else if (month == 0) {
                //only years
                context.timeWithBank_val  = years;
                context.timeWithBank_desc = decl_years(years);
            } else if (years == 0) {
                // only months
                context.timeWithBank_val  = month;
                context.timeWithBank_desc = decl_months(month);
            } else {
                context.timeWithBank_val  = ''.concat(years, ' ', decl_years(years));
                context.timeWithBank_desc = 'и '.concat(month, ' ', decl_months(month));
            }
        }

        context.imgmod             = (userdata.sex == 'F') ? '-girl' : '';
        context.verbsuffix         = (userdata.sex == 'F') ? 'а' : '';

        return template(context);
    }

}
