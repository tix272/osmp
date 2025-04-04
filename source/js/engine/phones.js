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
regions[1]='������������ �������';
regions[2]='��������� �������';
regions[3]='���������� �������';
regions[4]='���������� ����';
regions[5]='�������������� ����';
regions[6]='���������� �������';
regions[7]='����-��������� ��������� ��';
regions[8]='��������� �������';
regions[9]='�������� �������';
regions[10]='������������� �������';
regions[11]='������������ �������';
regions[12]='������������ �������';
regions[13]='���������� ������';
regions[14]='���������� ���������';
regions[15]='������-���������� ������';
regions[16]='������ �������';
regions[17]='���������� ����';
regions[18]='����������� ����';
regions[19]='����������� �������';
regions[20]='������������� �������';
regions[21]='������� �������';
regions[22]='��������� �������';
regions[23]='���������� ��������';
regions[24]='��������������� �������';
regions[25]='��������� ����';
regions[26]='������������ ����';
regions[27]='�������� �������';
regions[28]='���������� �������';
regions[29]='�������� �������';
regions[30]='�������� �������';
regions[31]='���������� �������';
regions[32]='����������� �������';
regions[33]='���������� �������';
regions[34]='���������� ����� ��';
regions[35]='��������� �������';
regions[36]='������������ �������';
regions[37]='�������� �������';
regions[38]='�����-���������� ��';
regions[39]='���������-���������� ����������';
regions[40]='���������� ��������';
regions[41]='������������� �������';
regions[42]='��������� ��';
regions[43]='��������� ��';
regions[44]='����������� �������';
regions[45]='����������� �������';
regions[46]='������������ �������';
regions[47]='���������� ����������';
regions[48]='����������� �������';
regions[49]='���������� �����';
regions[50]='������� �������';
regions[51]='��������� �������';
regions[52]='��������� �������';
regions[53]='�������� �������';
regions[54]='��������� �������';
regions[55]='�����-��������� � ������������� �������';
regions[56]='������������� �������';
regions[57]='����������� �������';
regions[58]='��������� ����������';
regions[59]='������������ �������';
regions[60]='�����-�������� ��';
regions[61]='���������� �������';
regions[62]='���������� ����';
regions[63]='����������� �������';
regions[64]='���������� �������';
regions[65]='�������� ��������� ��';
regions[66]='���������� �������';
regions[67]='������ � ���������� �������';
regions[68]='���������� �������';
regions[69]='���������� �������';
regions[70]='���������� �������';
regions[71]='���������� ���������';
regions[72]='����������� �������';
regions[73]='���������-���������� ����������';
regions[74]='���������� �������� ������';
regions[75]='���������� (�������-��������) ��';
regions[76]='���������� ���� (������)';
regions[77]='����������� �������';
regions[78]='��������� ������� � �������� ��������� ��';
regions[79]='���������� ������������';
regions[80]='����������� �������';
regions[81]='���������� ��������';
regions[82]='��������� �������';
regions[83]='��������� �������';
regions[84]='������������� ����';
regions[85]='��������� ��';
regions[86]='������';


