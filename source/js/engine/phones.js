var phoneParser = function() {
	this.index = window.phonesIndex = {};
	this.number = '';
	this.recursions = 0;
	
	this.get = function(number, callback)
	{
		if(number) this.number = this.spliceNumber(number);
		if(callback) this.callback = callback;

		if(this.index[this.number.prefix])
		{
			this.test();
		}
		else
		{
			getScript('./phones/' + this.number.str.prefix + '.js', this.test, null, this, function(){
				this.callback();
			});
		}
	};
	
	this.test = function()
	{
	    if (!this.index[this.number.prefix]) return this.callback();
		this.recursions++;
	//console.debug('++ ', JSON.stringify(this.number));
		var result = this.findNearest(this.index, this.number.prefix)[1];
		if($isNoU(this.number.pre) && $isNoU(this.number.number)) return;
	
	//console.debug('?? ', result);
		var findResult = this.findNearest(result, this.number.pre);
		result = findResult[1];
		if($isNoU(result) || this.recursions > 500)
		{
			return this.callback();
		}
	//console.debug('!! ', result);
	
		var i = false;
		/*for(var range in result)
		{
			if(+range != range) continue;
			console.debug('-- ', range, +range == range);
			if(i === false || ( Math.abs(range - this.number.number) < Math.abs(i - this.number.number) )) i = range;
			console.debug(range, this.number.number, Math.abs(i - this.number.number));
		}*/
		
		for(var range in result)
		{
			var arr = result[range];
			if(arr._typeName == 'Array')
			{
				for(var j = 0, l = arr.length; j < l; j++)
				{
					//console.debug('-> ', arr[j]);
					if(arr[j][0] <= this.number.real && this.number.real <= arr[j][1]) i = arr[j];
				}
			}
		}

	//console.debug('i: ', i, $isNoU(i), '****', findResult);
		if($isNoU(i) || i === false)
		{
			this.number.number = 0;
			if(findResult[0] == -1)
			{
//				this.number.prefix--;
//				this.number.pre = 999;
                return this.callback();
			}
			else
			{
				this.number.pre = findResult[0];
			}
			//console.debug(this.number);
			this.get();
		}
		else
		{
			result = i;
	//console.debug(result);
			window.UIProvider = null;

			getScript('./config/' + result[2] + '.js', function(result){
			    if (UIProvider)
				    result.provider = UIProvider;
				else
				    result.provider = "false";
				this.callback(result);
			}, [{
				number: this.number,
				from: result[0],
				to: result[1],
				rid: result[4],
				region: regions[result[3]],
				provider: result[2]
			}], this, function(result){
				result.provider = "false";
				this.callback(result);
			});
			return;
		}
//		this.callback();
	};

	this.findNearest = function(arr, i)
	{
		//console.debug('need: ', i, 'in: ', arr);
		var result,
		    i = i;
		if(arr)
		{
			//console.debug('---');
			do
			{
			
				i = i.toString();
			//	console.debug(this.nulls(i, 3) + i);
				result = arr[this.nulls(i, 3) + i];
				i--;
			}
			while(!result && arr && i > -1);
			//console.debug('---');
		}
		//console.debug('fidned: ', result);
		return [i, result];
	};

	this.spliceNumber = function(number)
	{
		return {
			prefix: number.substr(0, 3),
			pre: +number.substr(3, 3),
			number: +number.substr(6, 4),
			str: {
				prefix: number.substr(0, 3),
				pre: number.substr(3, 3),
				number1: number.substr(6, 2),
				number2: number.substr(8, 2)
			},
			real: number
		};
	};
	
	this.nulls = function(s, m, g)
	{
		return (new Array((m + 1 - s.toString().length)) ).join(g || '0')
	};
};

var regions = [];
regions[1]='Белгородская область';
regions[2]='Кировская область';
regions[3]='Курганская область';
regions[4]='Республика Коми';
regions[5]='Ставропольский край';
regions[6]='Республика Хакасия';
regions[7]='Усть-Ордынский Бурятский АО';
regions[8]='Рязанская область';
regions[9]='Брянская область';
regions[10]='Архангельская область';
regions[11]='Новгородская область';
regions[12]='Свердловская область';
regions[13]='Республика Адыгея';
regions[14]='Республика Ингушетия';
regions[15]='Северо-Кавказский регион';
regions[16]='Омская область';
regions[17]='Приморский край';
regions[18]='Хабаровский край';
regions[19]='Костромская область';
regions[20]='Нижегородская область';
regions[21]='Курская область';
regions[22]='Орловская область';
regions[23]='Республика Калмыкия';
regions[24]='Калининградская область';
regions[25]='Алтайский край';
regions[26]='Красноярский край';
regions[27]='Амурская область';
regions[28]='Тамбовская область';
regions[29]='Тверская область';
regions[30]='Тульская область';
regions[31]='Ивановская область';
regions[32]='Вологодская область';
regions[33]='Мурманская область';
regions[34]='Республика Марий Эл';
regions[35]='Самарская область';
regions[36]='Оренбургская область';
regions[37]='Пермская область';
regions[38]='Ханты-Мансийский АО';
regions[39]='Карачаево-Черкесская Республика';
regions[40]='Республика Дагестан';
regions[41]='Новосибирская область';
regions[42]='Еврейская АО';
regions[43]='Чукотский АО';
regions[44]='Ярославская область';
regions[45]='Воронежская область';
regions[46]='Астраханская область';
regions[47]='Удмуртская Республика';
regions[48]='Кемеровская область';
regions[49]='Республика Алтай';
regions[50]='Томская область';
regions[51]='Иркутская область';
regions[52]='Читинская область';
regions[53]='Липецкая область';
regions[54]='Псковская область';
regions[55]='Санкт-Петербург и Ленинградская область';
regions[56]='Волгоградская область';
regions[57]='Ульяновская область';
regions[58]='Чувашская Республика';
regions[59]='Владимирская область';
regions[60]='Ямало-Ненецкий АО';
regions[61]='Ростовская область';
regions[62]='Республика Тыва';
regions[63]='Сахалинская область';
regions[64]='Камчатская область';
regions[65]='Агинский Бурятский АО';
regions[66]='Республика Бурятия';
regions[67]='Москва и Московская область';
regions[68]='Смоленская область';
regions[69]='Республика Карелия';
regions[70]='Пензенская область';
regions[71]='Республика Татарстан';
regions[72]='Челябинская область';
regions[73]='Кабардино-Балкарская Республика';
regions[74]='Республика Северная Осетия';
regions[75]='Таймырский (Долгано-Ненецкий) АО';
regions[76]='Республика Саха (Якутия)';
regions[77]='Магаданская область';
regions[78]='Читинская область и Агинский Бурятский АО';
regions[79]='Республика Башкортостан';
regions[80]='Саратовская область';
regions[81]='Республика Мордовия';
regions[82]='Калужская область';
regions[83]='Тюменская область';
regions[84]='Краснодарский край';
regions[85]='Корякский АО';
regions[86]='Казань';


