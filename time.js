#!/usr/bin/env node

function getTime(ms)
{
	var strPrimary = function(unit)
	{
		if(values[unit] > 1)
			return values[unit] + ' ' + intervals[unit].txts;
		else
			return values[unit] + ' ' + intervals[unit].txt;
	}

	var strSecondary = function(unitBig, unitSmall)
	{
		var tmp = Math.floor(values[unitSmall] - (values[unitBig] * intervals[unitBig].multiple));

		if(tmp > 0)
		{
			if(tmp > 1)
				return ' ' + tmp + ' ' + intervals[unitSmall].txts;
			else
				return ' ' + tmp + ' ' + intervals[unitSmall].txt;
		}
		else
			return '';
	}

	var strHuman = function(unitBig, unitSmall)
	{
		if(unitSmall)
			return ''+strPrimary(unitBig)+strSecondary(unitBig, unitSmall);
		else
			return strPrimary(unitBig);
	}

	ms = Math.floor(ms);
	var values = {
			ms: ms,
			s: Math.floor(ms / 1000),
			m: Math.floor(ms / (1000*60)),
			h: Math.floor(ms / (1000*60*60)),
			d: Math.floor(ms / (1000*60*60*24)),
			w: Math.floor(ms / (1000*60*60*24*7)),
			mo: Math.floor(ms / (1000*60*60*24*30.4583)),
			y: Math.floor(ms / (1000*60*60*24*365.25)),
			de: Math.floor(ms / (1000*60*60*24*365.25*10)),
			ce: Math.floor(ms / (1000*60*60*24*365.25*10*10))
	};

	var intervals = {
		ce: { txt: 'century', txts: 'centuries', multiple: 10 },
		de: { txt: 'decade', txts: 'decades', multiple: 10 },
		y: { txt: 'year', txts: 'years', multiple: 12 },
		mo: { txt: 'month', txts: 'months', multiple: 4.351 },
		w: { txt: 'week', txts: 'weeks', multiple: 7 },
		d: { txt: 'day', txts: 'days', multiple: 24 },
		h: { txt: 'hour', txts: 'hours', multiple: 60 },
		m: { txt: 'minute', txts: 'minutes', multiple: 60 },
		s: { txt: 'second', txts: 'seconds', multiple: 1000 },
		ms: { txt: 'millisecond', txts: 'milliseconds', multiple: 1}
	};

	if(values.ce >= 1)
		values.human = strHuman('ce', 'de');
	else if(values.de >= 1)
		values.human = strHuman('de', 'y');
	else if(values.y >= 1)
		values.human = strHuman('y', 'mo');
	else if(values.mo >= 1)
		values.human = strHuman('mo', 'w');
	else if(values.w >= 1)
		values.human = strHuman('w', 'd');
	else if(values.d >= 1)
		values.human = strHuman('d', 'h');
	else if(values.h >= 1)
		values.human = strHuman('h', 'm');
	else if(values.m >= 1)
		values.human = strHuman('m', 's');
	else if(values.s >= 1)
		values.human = strHuman('s', 'ms');
	else
		values.human = strHuman('ms');

	return values;
}


for(var i = 0, tmp, calc, multiplier = 10; i < 13; i++)
{
	multiplier *= 10;
	tmp = Math.random()*Math.random()*multiplier;
	calc = getTime(tmp);
	console.log('%s ms is "%s"', tmp, calc.human);
}


