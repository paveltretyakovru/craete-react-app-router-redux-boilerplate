import Mustache from 'mustache';

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

    mustache_lambda: function (outsideRender) {
        return function () {
            return function (text, render) {
                return outsideRender(render(text));
            };
        };
    },

    render: function (template, userdata) {

        var context = jQuery.extend(true, {}, userdata);
        context.decl_operations  = this.mustache_lambda(this.numDeclension(['операцию', 'операции', 'операций']));
        context.decl_rouble      = this.mustache_lambda(this.numDeclension(['рубль', 'рубля', 'рублей']));
        context.decl_transaction = this.mustache_lambda(this.numDeclension(['транзакцию', 'транзакции', 'транзакций']));
        context.decl_visited     = this.mustache_lambda(this.numDeclension(['отправился', 'отправилось', 'отправились']));
        context.decl_visited     = this.mustache_lambda(this.numDeclension(['отправился', 'отправилось', 'отправились']));
        context.decl_bonus       = this.mustache_lambda(this.numDeclension(['балл', 'балла', 'баллов']));

        context.spaced_number    = this.mustache_lambda(this.numberWithSpaces);
        context.date_DnumMtxt    = this.mustache_lambda(this.date_DnumMtxt);
        context.timeWithBank_val  = context.timeWithBank.split(' ')[0];
        context.timeWithBank_unit = context.timeWithBank.split(' ')[1];

        context.imgmod             = (userdata.sex == 'F') ? '-girl' : '';
        context.verbsuffix         = (userdata.sex == 'F') ? 'а' : '';

        for (var i = 0; i < context.visitedCountries.length; i++) {
            var dest = context.visitedCountries[i];
            dest.otherClientsPercent = Number(dest.otherClientsPercent.replace('%', ''));
        }

        return Mustache.to_html(template, context);
    }

}
