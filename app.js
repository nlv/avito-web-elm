(function(scope){
'use strict';

function F(arity, fun, wrapper) {
  wrapper.a = arity;
  wrapper.f = fun;
  return wrapper;
}

function F2(fun) {
  return F(2, fun, function(a) { return function(b) { return fun(a,b); }; })
}
function F3(fun) {
  return F(3, fun, function(a) {
    return function(b) { return function(c) { return fun(a, b, c); }; };
  });
}
function F4(fun) {
  return F(4, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return fun(a, b, c, d); }; }; };
  });
}
function F5(fun) {
  return F(5, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return fun(a, b, c, d, e); }; }; }; };
  });
}
function F6(fun) {
  return F(6, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return fun(a, b, c, d, e, f); }; }; }; }; };
  });
}
function F7(fun) {
  return F(7, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return fun(a, b, c, d, e, f, g); }; }; }; }; }; };
  });
}
function F8(fun) {
  return F(8, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) {
    return fun(a, b, c, d, e, f, g, h); }; }; }; }; }; }; };
  });
}
function F9(fun) {
  return F(9, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) { return function(i) {
    return fun(a, b, c, d, e, f, g, h, i); }; }; }; }; }; }; }; };
  });
}

function A2(fun, a, b) {
  return fun.a === 2 ? fun.f(a, b) : fun(a)(b);
}
function A3(fun, a, b, c) {
  return fun.a === 3 ? fun.f(a, b, c) : fun(a)(b)(c);
}
function A4(fun, a, b, c, d) {
  return fun.a === 4 ? fun.f(a, b, c, d) : fun(a)(b)(c)(d);
}
function A5(fun, a, b, c, d, e) {
  return fun.a === 5 ? fun.f(a, b, c, d, e) : fun(a)(b)(c)(d)(e);
}
function A6(fun, a, b, c, d, e, f) {
  return fun.a === 6 ? fun.f(a, b, c, d, e, f) : fun(a)(b)(c)(d)(e)(f);
}
function A7(fun, a, b, c, d, e, f, g) {
  return fun.a === 7 ? fun.f(a, b, c, d, e, f, g) : fun(a)(b)(c)(d)(e)(f)(g);
}
function A8(fun, a, b, c, d, e, f, g, h) {
  return fun.a === 8 ? fun.f(a, b, c, d, e, f, g, h) : fun(a)(b)(c)(d)(e)(f)(g)(h);
}
function A9(fun, a, b, c, d, e, f, g, h, i) {
  return fun.a === 9 ? fun.f(a, b, c, d, e, f, g, h, i) : fun(a)(b)(c)(d)(e)(f)(g)(h)(i);
}

console.warn('Compiled in DEV mode. Follow the advice at https://elm-lang.org/0.19.1/optimize for better performance and smaller assets.');


var _List_Nil_UNUSED = { $: 0 };
var _List_Nil = { $: '[]' };

function _List_Cons_UNUSED(hd, tl) { return { $: 1, a: hd, b: tl }; }
function _List_Cons(hd, tl) { return { $: '::', a: hd, b: tl }; }


var _List_cons = F2(_List_Cons);

function _List_fromArray(arr)
{
	var out = _List_Nil;
	for (var i = arr.length; i--; )
	{
		out = _List_Cons(arr[i], out);
	}
	return out;
}

function _List_toArray(xs)
{
	for (var out = []; xs.b; xs = xs.b) // WHILE_CONS
	{
		out.push(xs.a);
	}
	return out;
}

var _List_map2 = F3(function(f, xs, ys)
{
	for (var arr = []; xs.b && ys.b; xs = xs.b, ys = ys.b) // WHILE_CONSES
	{
		arr.push(A2(f, xs.a, ys.a));
	}
	return _List_fromArray(arr);
});

var _List_map3 = F4(function(f, xs, ys, zs)
{
	for (var arr = []; xs.b && ys.b && zs.b; xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A3(f, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map4 = F5(function(f, ws, xs, ys, zs)
{
	for (var arr = []; ws.b && xs.b && ys.b && zs.b; ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A4(f, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map5 = F6(function(f, vs, ws, xs, ys, zs)
{
	for (var arr = []; vs.b && ws.b && xs.b && ys.b && zs.b; vs = vs.b, ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A5(f, vs.a, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_sortBy = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		return _Utils_cmp(f(a), f(b));
	}));
});

var _List_sortWith = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		var ord = A2(f, a, b);
		return ord === $elm$core$Basics$EQ ? 0 : ord === $elm$core$Basics$LT ? -1 : 1;
	}));
});



var _JsArray_empty = [];

function _JsArray_singleton(value)
{
    return [value];
}

function _JsArray_length(array)
{
    return array.length;
}

var _JsArray_initialize = F3(function(size, offset, func)
{
    var result = new Array(size);

    for (var i = 0; i < size; i++)
    {
        result[i] = func(offset + i);
    }

    return result;
});

var _JsArray_initializeFromList = F2(function (max, ls)
{
    var result = new Array(max);

    for (var i = 0; i < max && ls.b; i++)
    {
        result[i] = ls.a;
        ls = ls.b;
    }

    result.length = i;
    return _Utils_Tuple2(result, ls);
});

var _JsArray_unsafeGet = F2(function(index, array)
{
    return array[index];
});

var _JsArray_unsafeSet = F3(function(index, value, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[index] = value;
    return result;
});

var _JsArray_push = F2(function(value, array)
{
    var length = array.length;
    var result = new Array(length + 1);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[length] = value;
    return result;
});

var _JsArray_foldl = F3(function(func, acc, array)
{
    var length = array.length;

    for (var i = 0; i < length; i++)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_foldr = F3(function(func, acc, array)
{
    for (var i = array.length - 1; i >= 0; i--)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_map = F2(function(func, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = func(array[i]);
    }

    return result;
});

var _JsArray_indexedMap = F3(function(func, offset, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = A2(func, offset + i, array[i]);
    }

    return result;
});

var _JsArray_slice = F3(function(from, to, array)
{
    return array.slice(from, to);
});

var _JsArray_appendN = F3(function(n, dest, source)
{
    var destLen = dest.length;
    var itemsToCopy = n - destLen;

    if (itemsToCopy > source.length)
    {
        itemsToCopy = source.length;
    }

    var size = destLen + itemsToCopy;
    var result = new Array(size);

    for (var i = 0; i < destLen; i++)
    {
        result[i] = dest[i];
    }

    for (var i = 0; i < itemsToCopy; i++)
    {
        result[i + destLen] = source[i];
    }

    return result;
});



// LOG

var _Debug_log_UNUSED = F2(function(tag, value)
{
	return value;
});

var _Debug_log = F2(function(tag, value)
{
	console.log(tag + ': ' + _Debug_toString(value));
	return value;
});


// TODOS

function _Debug_todo(moduleName, region)
{
	return function(message) {
		_Debug_crash(8, moduleName, region, message);
	};
}

function _Debug_todoCase(moduleName, region, value)
{
	return function(message) {
		_Debug_crash(9, moduleName, region, value, message);
	};
}


// TO STRING

function _Debug_toString_UNUSED(value)
{
	return '<internals>';
}

function _Debug_toString(value)
{
	return _Debug_toAnsiString(false, value);
}

function _Debug_toAnsiString(ansi, value)
{
	if (typeof value === 'function')
	{
		return _Debug_internalColor(ansi, '<function>');
	}

	if (typeof value === 'boolean')
	{
		return _Debug_ctorColor(ansi, value ? 'True' : 'False');
	}

	if (typeof value === 'number')
	{
		return _Debug_numberColor(ansi, value + '');
	}

	if (value instanceof String)
	{
		return _Debug_charColor(ansi, "'" + _Debug_addSlashes(value, true) + "'");
	}

	if (typeof value === 'string')
	{
		return _Debug_stringColor(ansi, '"' + _Debug_addSlashes(value, false) + '"');
	}

	if (typeof value === 'object' && '$' in value)
	{
		var tag = value.$;

		if (typeof tag === 'number')
		{
			return _Debug_internalColor(ansi, '<internals>');
		}

		if (tag[0] === '#')
		{
			var output = [];
			for (var k in value)
			{
				if (k === '$') continue;
				output.push(_Debug_toAnsiString(ansi, value[k]));
			}
			return '(' + output.join(',') + ')';
		}

		if (tag === 'Set_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Set')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Set$toList(value));
		}

		if (tag === 'RBNode_elm_builtin' || tag === 'RBEmpty_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Dict')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Dict$toList(value));
		}

		if (tag === 'Array_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Array')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Array$toList(value));
		}

		if (tag === '::' || tag === '[]')
		{
			var output = '[';

			value.b && (output += _Debug_toAnsiString(ansi, value.a), value = value.b)

			for (; value.b; value = value.b) // WHILE_CONS
			{
				output += ',' + _Debug_toAnsiString(ansi, value.a);
			}
			return output + ']';
		}

		var output = '';
		for (var i in value)
		{
			if (i === '$') continue;
			var str = _Debug_toAnsiString(ansi, value[i]);
			var c0 = str[0];
			var parenless = c0 === '{' || c0 === '(' || c0 === '[' || c0 === '<' || c0 === '"' || str.indexOf(' ') < 0;
			output += ' ' + (parenless ? str : '(' + str + ')');
		}
		return _Debug_ctorColor(ansi, tag) + output;
	}

	if (typeof DataView === 'function' && value instanceof DataView)
	{
		return _Debug_stringColor(ansi, '<' + value.byteLength + ' bytes>');
	}

	if (typeof File !== 'undefined' && value instanceof File)
	{
		return _Debug_internalColor(ansi, '<' + value.name + '>');
	}

	if (typeof value === 'object')
	{
		var output = [];
		for (var key in value)
		{
			var field = key[0] === '_' ? key.slice(1) : key;
			output.push(_Debug_fadeColor(ansi, field) + ' = ' + _Debug_toAnsiString(ansi, value[key]));
		}
		if (output.length === 0)
		{
			return '{}';
		}
		return '{ ' + output.join(', ') + ' }';
	}

	return _Debug_internalColor(ansi, '<internals>');
}

function _Debug_addSlashes(str, isChar)
{
	var s = str
		.replace(/\\/g, '\\\\')
		.replace(/\n/g, '\\n')
		.replace(/\t/g, '\\t')
		.replace(/\r/g, '\\r')
		.replace(/\v/g, '\\v')
		.replace(/\0/g, '\\0');

	if (isChar)
	{
		return s.replace(/\'/g, '\\\'');
	}
	else
	{
		return s.replace(/\"/g, '\\"');
	}
}

function _Debug_ctorColor(ansi, string)
{
	return ansi ? '\x1b[96m' + string + '\x1b[0m' : string;
}

function _Debug_numberColor(ansi, string)
{
	return ansi ? '\x1b[95m' + string + '\x1b[0m' : string;
}

function _Debug_stringColor(ansi, string)
{
	return ansi ? '\x1b[93m' + string + '\x1b[0m' : string;
}

function _Debug_charColor(ansi, string)
{
	return ansi ? '\x1b[92m' + string + '\x1b[0m' : string;
}

function _Debug_fadeColor(ansi, string)
{
	return ansi ? '\x1b[37m' + string + '\x1b[0m' : string;
}

function _Debug_internalColor(ansi, string)
{
	return ansi ? '\x1b[36m' + string + '\x1b[0m' : string;
}

function _Debug_toHexDigit(n)
{
	return String.fromCharCode(n < 10 ? 48 + n : 55 + n);
}


// CRASH


function _Debug_crash_UNUSED(identifier)
{
	throw new Error('https://github.com/elm/core/blob/1.0.0/hints/' + identifier + '.md');
}


function _Debug_crash(identifier, fact1, fact2, fact3, fact4)
{
	switch(identifier)
	{
		case 0:
			throw new Error('What node should I take over? In JavaScript I need something like:\n\n    Elm.Main.init({\n        node: document.getElementById("elm-node")\n    })\n\nYou need to do this with any Browser.sandbox or Browser.element program.');

		case 1:
			throw new Error('Browser.application programs cannot handle URLs like this:\n\n    ' + document.location.href + '\n\nWhat is the root? The root of your file system? Try looking at this program with `elm reactor` or some other server.');

		case 2:
			var jsonErrorString = fact1;
			throw new Error('Problem with the flags given to your Elm program on initialization.\n\n' + jsonErrorString);

		case 3:
			var portName = fact1;
			throw new Error('There can only be one port named `' + portName + '`, but your program has multiple.');

		case 4:
			var portName = fact1;
			var problem = fact2;
			throw new Error('Trying to send an unexpected type of value through port `' + portName + '`:\n' + problem);

		case 5:
			throw new Error('Trying to use `(==)` on functions.\nThere is no way to know if functions are "the same" in the Elm sense.\nRead more about this at https://package.elm-lang.org/packages/elm/core/latest/Basics#== which describes why it is this way and what the better version will look like.');

		case 6:
			var moduleName = fact1;
			throw new Error('Your page is loading multiple Elm scripts with a module named ' + moduleName + '. Maybe a duplicate script is getting loaded accidentally? If not, rename one of them so I know which is which!');

		case 8:
			var moduleName = fact1;
			var region = fact2;
			var message = fact3;
			throw new Error('TODO in module `' + moduleName + '` ' + _Debug_regionToString(region) + '\n\n' + message);

		case 9:
			var moduleName = fact1;
			var region = fact2;
			var value = fact3;
			var message = fact4;
			throw new Error(
				'TODO in module `' + moduleName + '` from the `case` expression '
				+ _Debug_regionToString(region) + '\n\nIt received the following value:\n\n    '
				+ _Debug_toString(value).replace('\n', '\n    ')
				+ '\n\nBut the branch that handles it says:\n\n    ' + message.replace('\n', '\n    ')
			);

		case 10:
			throw new Error('Bug in https://github.com/elm/virtual-dom/issues');

		case 11:
			throw new Error('Cannot perform mod 0. Division by zero error.');
	}
}

function _Debug_regionToString(region)
{
	if (region.start.line === region.end.line)
	{
		return 'on line ' + region.start.line;
	}
	return 'on lines ' + region.start.line + ' through ' + region.end.line;
}



// EQUALITY

function _Utils_eq(x, y)
{
	for (
		var pair, stack = [], isEqual = _Utils_eqHelp(x, y, 0, stack);
		isEqual && (pair = stack.pop());
		isEqual = _Utils_eqHelp(pair.a, pair.b, 0, stack)
		)
	{}

	return isEqual;
}

function _Utils_eqHelp(x, y, depth, stack)
{
	if (x === y)
	{
		return true;
	}

	if (typeof x !== 'object' || x === null || y === null)
	{
		typeof x === 'function' && _Debug_crash(5);
		return false;
	}

	if (depth > 100)
	{
		stack.push(_Utils_Tuple2(x,y));
		return true;
	}

	/**/
	if (x.$ === 'Set_elm_builtin')
	{
		x = $elm$core$Set$toList(x);
		y = $elm$core$Set$toList(y);
	}
	if (x.$ === 'RBNode_elm_builtin' || x.$ === 'RBEmpty_elm_builtin')
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	/**_UNUSED/
	if (x.$ < 0)
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	for (var key in x)
	{
		if (!_Utils_eqHelp(x[key], y[key], depth + 1, stack))
		{
			return false;
		}
	}
	return true;
}

var _Utils_equal = F2(_Utils_eq);
var _Utils_notEqual = F2(function(a, b) { return !_Utils_eq(a,b); });



// COMPARISONS

// Code in Generate/JavaScript.hs, Basics.js, and List.js depends on
// the particular integer values assigned to LT, EQ, and GT.

function _Utils_cmp(x, y, ord)
{
	if (typeof x !== 'object')
	{
		return x === y ? /*EQ*/ 0 : x < y ? /*LT*/ -1 : /*GT*/ 1;
	}

	/**/
	if (x instanceof String)
	{
		var a = x.valueOf();
		var b = y.valueOf();
		return a === b ? 0 : a < b ? -1 : 1;
	}
	//*/

	/**_UNUSED/
	if (typeof x.$ === 'undefined')
	//*/
	/**/
	if (x.$[0] === '#')
	//*/
	{
		return (ord = _Utils_cmp(x.a, y.a))
			? ord
			: (ord = _Utils_cmp(x.b, y.b))
				? ord
				: _Utils_cmp(x.c, y.c);
	}

	// traverse conses until end of a list or a mismatch
	for (; x.b && y.b && !(ord = _Utils_cmp(x.a, y.a)); x = x.b, y = y.b) {} // WHILE_CONSES
	return ord || (x.b ? /*GT*/ 1 : y.b ? /*LT*/ -1 : /*EQ*/ 0);
}

var _Utils_lt = F2(function(a, b) { return _Utils_cmp(a, b) < 0; });
var _Utils_le = F2(function(a, b) { return _Utils_cmp(a, b) < 1; });
var _Utils_gt = F2(function(a, b) { return _Utils_cmp(a, b) > 0; });
var _Utils_ge = F2(function(a, b) { return _Utils_cmp(a, b) >= 0; });

var _Utils_compare = F2(function(x, y)
{
	var n = _Utils_cmp(x, y);
	return n < 0 ? $elm$core$Basics$LT : n ? $elm$core$Basics$GT : $elm$core$Basics$EQ;
});


// COMMON VALUES

var _Utils_Tuple0_UNUSED = 0;
var _Utils_Tuple0 = { $: '#0' };

function _Utils_Tuple2_UNUSED(a, b) { return { a: a, b: b }; }
function _Utils_Tuple2(a, b) { return { $: '#2', a: a, b: b }; }

function _Utils_Tuple3_UNUSED(a, b, c) { return { a: a, b: b, c: c }; }
function _Utils_Tuple3(a, b, c) { return { $: '#3', a: a, b: b, c: c }; }

function _Utils_chr_UNUSED(c) { return c; }
function _Utils_chr(c) { return new String(c); }


// RECORDS

function _Utils_update(oldRecord, updatedFields)
{
	var newRecord = {};

	for (var key in oldRecord)
	{
		newRecord[key] = oldRecord[key];
	}

	for (var key in updatedFields)
	{
		newRecord[key] = updatedFields[key];
	}

	return newRecord;
}


// APPEND

var _Utils_append = F2(_Utils_ap);

function _Utils_ap(xs, ys)
{
	// append Strings
	if (typeof xs === 'string')
	{
		return xs + ys;
	}

	// append Lists
	if (!xs.b)
	{
		return ys;
	}
	var root = _List_Cons(xs.a, ys);
	xs = xs.b
	for (var curr = root; xs.b; xs = xs.b) // WHILE_CONS
	{
		curr = curr.b = _List_Cons(xs.a, ys);
	}
	return root;
}



// MATH

var _Basics_add = F2(function(a, b) { return a + b; });
var _Basics_sub = F2(function(a, b) { return a - b; });
var _Basics_mul = F2(function(a, b) { return a * b; });
var _Basics_fdiv = F2(function(a, b) { return a / b; });
var _Basics_idiv = F2(function(a, b) { return (a / b) | 0; });
var _Basics_pow = F2(Math.pow);

var _Basics_remainderBy = F2(function(b, a) { return a % b; });

// https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/divmodnote-letter.pdf
var _Basics_modBy = F2(function(modulus, x)
{
	var answer = x % modulus;
	return modulus === 0
		? _Debug_crash(11)
		:
	((answer > 0 && modulus < 0) || (answer < 0 && modulus > 0))
		? answer + modulus
		: answer;
});


// TRIGONOMETRY

var _Basics_pi = Math.PI;
var _Basics_e = Math.E;
var _Basics_cos = Math.cos;
var _Basics_sin = Math.sin;
var _Basics_tan = Math.tan;
var _Basics_acos = Math.acos;
var _Basics_asin = Math.asin;
var _Basics_atan = Math.atan;
var _Basics_atan2 = F2(Math.atan2);


// MORE MATH

function _Basics_toFloat(x) { return x; }
function _Basics_truncate(n) { return n | 0; }
function _Basics_isInfinite(n) { return n === Infinity || n === -Infinity; }

var _Basics_ceiling = Math.ceil;
var _Basics_floor = Math.floor;
var _Basics_round = Math.round;
var _Basics_sqrt = Math.sqrt;
var _Basics_log = Math.log;
var _Basics_isNaN = isNaN;


// BOOLEANS

function _Basics_not(bool) { return !bool; }
var _Basics_and = F2(function(a, b) { return a && b; });
var _Basics_or  = F2(function(a, b) { return a || b; });
var _Basics_xor = F2(function(a, b) { return a !== b; });



var _String_cons = F2(function(chr, str)
{
	return chr + str;
});

function _String_uncons(string)
{
	var word = string.charCodeAt(0);
	return !isNaN(word)
		? $elm$core$Maybe$Just(
			0xD800 <= word && word <= 0xDBFF
				? _Utils_Tuple2(_Utils_chr(string[0] + string[1]), string.slice(2))
				: _Utils_Tuple2(_Utils_chr(string[0]), string.slice(1))
		)
		: $elm$core$Maybe$Nothing;
}

var _String_append = F2(function(a, b)
{
	return a + b;
});

function _String_length(str)
{
	return str.length;
}

var _String_map = F2(function(func, string)
{
	var len = string.length;
	var array = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = string.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			array[i] = func(_Utils_chr(string[i] + string[i+1]));
			i += 2;
			continue;
		}
		array[i] = func(_Utils_chr(string[i]));
		i++;
	}
	return array.join('');
});

var _String_filter = F2(function(isGood, str)
{
	var arr = [];
	var len = str.length;
	var i = 0;
	while (i < len)
	{
		var char = str[i];
		var word = str.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += str[i];
			i++;
		}

		if (isGood(_Utils_chr(char)))
		{
			arr.push(char);
		}
	}
	return arr.join('');
});

function _String_reverse(str)
{
	var len = str.length;
	var arr = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = str.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			arr[len - i] = str[i + 1];
			i++;
			arr[len - i] = str[i - 1];
			i++;
		}
		else
		{
			arr[len - i] = str[i];
			i++;
		}
	}
	return arr.join('');
}

var _String_foldl = F3(function(func, state, string)
{
	var len = string.length;
	var i = 0;
	while (i < len)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += string[i];
			i++;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_foldr = F3(function(func, state, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_split = F2(function(sep, str)
{
	return str.split(sep);
});

var _String_join = F2(function(sep, strs)
{
	return strs.join(sep);
});

var _String_slice = F3(function(start, end, str) {
	return str.slice(start, end);
});

function _String_trim(str)
{
	return str.trim();
}

function _String_trimLeft(str)
{
	return str.replace(/^\s+/, '');
}

function _String_trimRight(str)
{
	return str.replace(/\s+$/, '');
}

function _String_words(str)
{
	return _List_fromArray(str.trim().split(/\s+/g));
}

function _String_lines(str)
{
	return _List_fromArray(str.split(/\r\n|\r|\n/g));
}

function _String_toUpper(str)
{
	return str.toUpperCase();
}

function _String_toLower(str)
{
	return str.toLowerCase();
}

var _String_any = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (isGood(_Utils_chr(char)))
		{
			return true;
		}
	}
	return false;
});

var _String_all = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (!isGood(_Utils_chr(char)))
		{
			return false;
		}
	}
	return true;
});

var _String_contains = F2(function(sub, str)
{
	return str.indexOf(sub) > -1;
});

var _String_startsWith = F2(function(sub, str)
{
	return str.indexOf(sub) === 0;
});

var _String_endsWith = F2(function(sub, str)
{
	return str.length >= sub.length &&
		str.lastIndexOf(sub) === str.length - sub.length;
});

var _String_indexes = F2(function(sub, str)
{
	var subLen = sub.length;

	if (subLen < 1)
	{
		return _List_Nil;
	}

	var i = 0;
	var is = [];

	while ((i = str.indexOf(sub, i)) > -1)
	{
		is.push(i);
		i = i + subLen;
	}

	return _List_fromArray(is);
});


// TO STRING

function _String_fromNumber(number)
{
	return number + '';
}


// INT CONVERSIONS

function _String_toInt(str)
{
	var total = 0;
	var code0 = str.charCodeAt(0);
	var start = code0 == 0x2B /* + */ || code0 == 0x2D /* - */ ? 1 : 0;

	for (var i = start; i < str.length; ++i)
	{
		var code = str.charCodeAt(i);
		if (code < 0x30 || 0x39 < code)
		{
			return $elm$core$Maybe$Nothing;
		}
		total = 10 * total + code - 0x30;
	}

	return i == start
		? $elm$core$Maybe$Nothing
		: $elm$core$Maybe$Just(code0 == 0x2D ? -total : total);
}


// FLOAT CONVERSIONS

function _String_toFloat(s)
{
	// check if it is a hex, octal, or binary number
	if (s.length === 0 || /[\sxbo]/.test(s))
	{
		return $elm$core$Maybe$Nothing;
	}
	var n = +s;
	// faster isNaN check
	return n === n ? $elm$core$Maybe$Just(n) : $elm$core$Maybe$Nothing;
}

function _String_fromList(chars)
{
	return _List_toArray(chars).join('');
}




function _Char_toCode(char)
{
	var code = char.charCodeAt(0);
	if (0xD800 <= code && code <= 0xDBFF)
	{
		return (code - 0xD800) * 0x400 + char.charCodeAt(1) - 0xDC00 + 0x10000
	}
	return code;
}

function _Char_fromCode(code)
{
	return _Utils_chr(
		(code < 0 || 0x10FFFF < code)
			? '\uFFFD'
			:
		(code <= 0xFFFF)
			? String.fromCharCode(code)
			:
		(code -= 0x10000,
			String.fromCharCode(Math.floor(code / 0x400) + 0xD800, code % 0x400 + 0xDC00)
		)
	);
}

function _Char_toUpper(char)
{
	return _Utils_chr(char.toUpperCase());
}

function _Char_toLower(char)
{
	return _Utils_chr(char.toLowerCase());
}

function _Char_toLocaleUpper(char)
{
	return _Utils_chr(char.toLocaleUpperCase());
}

function _Char_toLocaleLower(char)
{
	return _Utils_chr(char.toLocaleLowerCase());
}



/**/
function _Json_errorToString(error)
{
	return $elm$json$Json$Decode$errorToString(error);
}
//*/


// CORE DECODERS

function _Json_succeed(msg)
{
	return {
		$: 0,
		a: msg
	};
}

function _Json_fail(msg)
{
	return {
		$: 1,
		a: msg
	};
}

function _Json_decodePrim(decoder)
{
	return { $: 2, b: decoder };
}

var _Json_decodeInt = _Json_decodePrim(function(value) {
	return (typeof value !== 'number')
		? _Json_expecting('an INT', value)
		:
	(-2147483647 < value && value < 2147483647 && (value | 0) === value)
		? $elm$core$Result$Ok(value)
		:
	(isFinite(value) && !(value % 1))
		? $elm$core$Result$Ok(value)
		: _Json_expecting('an INT', value);
});

var _Json_decodeBool = _Json_decodePrim(function(value) {
	return (typeof value === 'boolean')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a BOOL', value);
});

var _Json_decodeFloat = _Json_decodePrim(function(value) {
	return (typeof value === 'number')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a FLOAT', value);
});

var _Json_decodeValue = _Json_decodePrim(function(value) {
	return $elm$core$Result$Ok(_Json_wrap(value));
});

var _Json_decodeString = _Json_decodePrim(function(value) {
	return (typeof value === 'string')
		? $elm$core$Result$Ok(value)
		: (value instanceof String)
			? $elm$core$Result$Ok(value + '')
			: _Json_expecting('a STRING', value);
});

function _Json_decodeList(decoder) { return { $: 3, b: decoder }; }
function _Json_decodeArray(decoder) { return { $: 4, b: decoder }; }

function _Json_decodeNull(value) { return { $: 5, c: value }; }

var _Json_decodeField = F2(function(field, decoder)
{
	return {
		$: 6,
		d: field,
		b: decoder
	};
});

var _Json_decodeIndex = F2(function(index, decoder)
{
	return {
		$: 7,
		e: index,
		b: decoder
	};
});

function _Json_decodeKeyValuePairs(decoder)
{
	return {
		$: 8,
		b: decoder
	};
}

function _Json_mapMany(f, decoders)
{
	return {
		$: 9,
		f: f,
		g: decoders
	};
}

var _Json_andThen = F2(function(callback, decoder)
{
	return {
		$: 10,
		b: decoder,
		h: callback
	};
});

function _Json_oneOf(decoders)
{
	return {
		$: 11,
		g: decoders
	};
}


// DECODING OBJECTS

var _Json_map1 = F2(function(f, d1)
{
	return _Json_mapMany(f, [d1]);
});

var _Json_map2 = F3(function(f, d1, d2)
{
	return _Json_mapMany(f, [d1, d2]);
});

var _Json_map3 = F4(function(f, d1, d2, d3)
{
	return _Json_mapMany(f, [d1, d2, d3]);
});

var _Json_map4 = F5(function(f, d1, d2, d3, d4)
{
	return _Json_mapMany(f, [d1, d2, d3, d4]);
});

var _Json_map5 = F6(function(f, d1, d2, d3, d4, d5)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5]);
});

var _Json_map6 = F7(function(f, d1, d2, d3, d4, d5, d6)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6]);
});

var _Json_map7 = F8(function(f, d1, d2, d3, d4, d5, d6, d7)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7]);
});

var _Json_map8 = F9(function(f, d1, d2, d3, d4, d5, d6, d7, d8)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7, d8]);
});


// DECODE

var _Json_runOnString = F2(function(decoder, string)
{
	try
	{
		var value = JSON.parse(string);
		return _Json_runHelp(decoder, value);
	}
	catch (e)
	{
		return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'This is not valid JSON! ' + e.message, _Json_wrap(string)));
	}
});

var _Json_run = F2(function(decoder, value)
{
	return _Json_runHelp(decoder, _Json_unwrap(value));
});

function _Json_runHelp(decoder, value)
{
	switch (decoder.$)
	{
		case 2:
			return decoder.b(value);

		case 5:
			return (value === null)
				? $elm$core$Result$Ok(decoder.c)
				: _Json_expecting('null', value);

		case 3:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('a LIST', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _List_fromArray);

		case 4:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _Json_toElmArray);

		case 6:
			var field = decoder.d;
			if (typeof value !== 'object' || value === null || !(field in value))
			{
				return _Json_expecting('an OBJECT with a field named `' + field + '`', value);
			}
			var result = _Json_runHelp(decoder.b, value[field]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, field, result.a));

		case 7:
			var index = decoder.e;
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			if (index >= value.length)
			{
				return _Json_expecting('a LONGER array. Need index ' + index + ' but only see ' + value.length + ' entries', value);
			}
			var result = _Json_runHelp(decoder.b, value[index]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, index, result.a));

		case 8:
			if (typeof value !== 'object' || value === null || _Json_isArray(value))
			{
				return _Json_expecting('an OBJECT', value);
			}

			var keyValuePairs = _List_Nil;
			// TODO test perf of Object.keys and switch when support is good enough
			for (var key in value)
			{
				if (value.hasOwnProperty(key))
				{
					var result = _Json_runHelp(decoder.b, value[key]);
					if (!$elm$core$Result$isOk(result))
					{
						return $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, key, result.a));
					}
					keyValuePairs = _List_Cons(_Utils_Tuple2(key, result.a), keyValuePairs);
				}
			}
			return $elm$core$Result$Ok($elm$core$List$reverse(keyValuePairs));

		case 9:
			var answer = decoder.f;
			var decoders = decoder.g;
			for (var i = 0; i < decoders.length; i++)
			{
				var result = _Json_runHelp(decoders[i], value);
				if (!$elm$core$Result$isOk(result))
				{
					return result;
				}
				answer = answer(result.a);
			}
			return $elm$core$Result$Ok(answer);

		case 10:
			var result = _Json_runHelp(decoder.b, value);
			return (!$elm$core$Result$isOk(result))
				? result
				: _Json_runHelp(decoder.h(result.a), value);

		case 11:
			var errors = _List_Nil;
			for (var temp = decoder.g; temp.b; temp = temp.b) // WHILE_CONS
			{
				var result = _Json_runHelp(temp.a, value);
				if ($elm$core$Result$isOk(result))
				{
					return result;
				}
				errors = _List_Cons(result.a, errors);
			}
			return $elm$core$Result$Err($elm$json$Json$Decode$OneOf($elm$core$List$reverse(errors)));

		case 1:
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, decoder.a, _Json_wrap(value)));

		case 0:
			return $elm$core$Result$Ok(decoder.a);
	}
}

function _Json_runArrayDecoder(decoder, value, toElmValue)
{
	var len = value.length;
	var array = new Array(len);
	for (var i = 0; i < len; i++)
	{
		var result = _Json_runHelp(decoder, value[i]);
		if (!$elm$core$Result$isOk(result))
		{
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, i, result.a));
		}
		array[i] = result.a;
	}
	return $elm$core$Result$Ok(toElmValue(array));
}

function _Json_isArray(value)
{
	return Array.isArray(value) || (typeof FileList !== 'undefined' && value instanceof FileList);
}

function _Json_toElmArray(array)
{
	return A2($elm$core$Array$initialize, array.length, function(i) { return array[i]; });
}

function _Json_expecting(type, value)
{
	return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'Expecting ' + type, _Json_wrap(value)));
}


// EQUALITY

function _Json_equality(x, y)
{
	if (x === y)
	{
		return true;
	}

	if (x.$ !== y.$)
	{
		return false;
	}

	switch (x.$)
	{
		case 0:
		case 1:
			return x.a === y.a;

		case 2:
			return x.b === y.b;

		case 5:
			return x.c === y.c;

		case 3:
		case 4:
		case 8:
			return _Json_equality(x.b, y.b);

		case 6:
			return x.d === y.d && _Json_equality(x.b, y.b);

		case 7:
			return x.e === y.e && _Json_equality(x.b, y.b);

		case 9:
			return x.f === y.f && _Json_listEquality(x.g, y.g);

		case 10:
			return x.h === y.h && _Json_equality(x.b, y.b);

		case 11:
			return _Json_listEquality(x.g, y.g);
	}
}

function _Json_listEquality(aDecoders, bDecoders)
{
	var len = aDecoders.length;
	if (len !== bDecoders.length)
	{
		return false;
	}
	for (var i = 0; i < len; i++)
	{
		if (!_Json_equality(aDecoders[i], bDecoders[i]))
		{
			return false;
		}
	}
	return true;
}


// ENCODE

var _Json_encode = F2(function(indentLevel, value)
{
	return JSON.stringify(_Json_unwrap(value), null, indentLevel) + '';
});

function _Json_wrap(value) { return { $: 0, a: value }; }
function _Json_unwrap(value) { return value.a; }

function _Json_wrap_UNUSED(value) { return value; }
function _Json_unwrap_UNUSED(value) { return value; }

function _Json_emptyArray() { return []; }
function _Json_emptyObject() { return {}; }

var _Json_addField = F3(function(key, value, object)
{
	object[key] = _Json_unwrap(value);
	return object;
});

function _Json_addEntry(func)
{
	return F2(function(entry, array)
	{
		array.push(_Json_unwrap(func(entry)));
		return array;
	});
}

var _Json_encodeNull = _Json_wrap(null);



// TASKS

function _Scheduler_succeed(value)
{
	return {
		$: 0,
		a: value
	};
}

function _Scheduler_fail(error)
{
	return {
		$: 1,
		a: error
	};
}

function _Scheduler_binding(callback)
{
	return {
		$: 2,
		b: callback,
		c: null
	};
}

var _Scheduler_andThen = F2(function(callback, task)
{
	return {
		$: 3,
		b: callback,
		d: task
	};
});

var _Scheduler_onError = F2(function(callback, task)
{
	return {
		$: 4,
		b: callback,
		d: task
	};
});

function _Scheduler_receive(callback)
{
	return {
		$: 5,
		b: callback
	};
}


// PROCESSES

var _Scheduler_guid = 0;

function _Scheduler_rawSpawn(task)
{
	var proc = {
		$: 0,
		e: _Scheduler_guid++,
		f: task,
		g: null,
		h: []
	};

	_Scheduler_enqueue(proc);

	return proc;
}

function _Scheduler_spawn(task)
{
	return _Scheduler_binding(function(callback) {
		callback(_Scheduler_succeed(_Scheduler_rawSpawn(task)));
	});
}

function _Scheduler_rawSend(proc, msg)
{
	proc.h.push(msg);
	_Scheduler_enqueue(proc);
}

var _Scheduler_send = F2(function(proc, msg)
{
	return _Scheduler_binding(function(callback) {
		_Scheduler_rawSend(proc, msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});

function _Scheduler_kill(proc)
{
	return _Scheduler_binding(function(callback) {
		var task = proc.f;
		if (task.$ === 2 && task.c)
		{
			task.c();
		}

		proc.f = null;

		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
}


/* STEP PROCESSES

type alias Process =
  { $ : tag
  , id : unique_id
  , root : Task
  , stack : null | { $: SUCCEED | FAIL, a: callback, b: stack }
  , mailbox : [msg]
  }

*/


var _Scheduler_working = false;
var _Scheduler_queue = [];


function _Scheduler_enqueue(proc)
{
	_Scheduler_queue.push(proc);
	if (_Scheduler_working)
	{
		return;
	}
	_Scheduler_working = true;
	while (proc = _Scheduler_queue.shift())
	{
		_Scheduler_step(proc);
	}
	_Scheduler_working = false;
}


function _Scheduler_step(proc)
{
	while (proc.f)
	{
		var rootTag = proc.f.$;
		if (rootTag === 0 || rootTag === 1)
		{
			while (proc.g && proc.g.$ !== rootTag)
			{
				proc.g = proc.g.i;
			}
			if (!proc.g)
			{
				return;
			}
			proc.f = proc.g.b(proc.f.a);
			proc.g = proc.g.i;
		}
		else if (rootTag === 2)
		{
			proc.f.c = proc.f.b(function(newRoot) {
				proc.f = newRoot;
				_Scheduler_enqueue(proc);
			});
			return;
		}
		else if (rootTag === 5)
		{
			if (proc.h.length === 0)
			{
				return;
			}
			proc.f = proc.f.b(proc.h.shift());
		}
		else // if (rootTag === 3 || rootTag === 4)
		{
			proc.g = {
				$: rootTag === 3 ? 0 : 1,
				b: proc.f.b,
				i: proc.g
			};
			proc.f = proc.f.d;
		}
	}
}



function _Process_sleep(time)
{
	return _Scheduler_binding(function(callback) {
		var id = setTimeout(function() {
			callback(_Scheduler_succeed(_Utils_Tuple0));
		}, time);

		return function() { clearTimeout(id); };
	});
}




// PROGRAMS


var _Platform_worker = F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function() { return function() {} }
	);
});



// INITIALIZE A PROGRAM


function _Platform_initialize(flagDecoder, args, init, update, subscriptions, stepperBuilder)
{
	var result = A2(_Json_run, flagDecoder, _Json_wrap(args ? args['flags'] : undefined));
	$elm$core$Result$isOk(result) || _Debug_crash(2 /**/, _Json_errorToString(result.a) /**/);
	var managers = {};
	var initPair = init(result.a);
	var model = initPair.a;
	var stepper = stepperBuilder(sendToApp, model);
	var ports = _Platform_setupEffects(managers, sendToApp);

	function sendToApp(msg, viewMetadata)
	{
		var pair = A2(update, msg, model);
		stepper(model = pair.a, viewMetadata);
		_Platform_enqueueEffects(managers, pair.b, subscriptions(model));
	}

	_Platform_enqueueEffects(managers, initPair.b, subscriptions(model));

	return ports ? { ports: ports } : {};
}



// TRACK PRELOADS
//
// This is used by code in elm/browser and elm/http
// to register any HTTP requests that are triggered by init.
//


var _Platform_preload;


function _Platform_registerPreload(url)
{
	_Platform_preload.add(url);
}



// EFFECT MANAGERS


var _Platform_effectManagers = {};


function _Platform_setupEffects(managers, sendToApp)
{
	var ports;

	// setup all necessary effect managers
	for (var key in _Platform_effectManagers)
	{
		var manager = _Platform_effectManagers[key];

		if (manager.a)
		{
			ports = ports || {};
			ports[key] = manager.a(key, sendToApp);
		}

		managers[key] = _Platform_instantiateManager(manager, sendToApp);
	}

	return ports;
}


function _Platform_createManager(init, onEffects, onSelfMsg, cmdMap, subMap)
{
	return {
		b: init,
		c: onEffects,
		d: onSelfMsg,
		e: cmdMap,
		f: subMap
	};
}


function _Platform_instantiateManager(info, sendToApp)
{
	var router = {
		g: sendToApp,
		h: undefined
	};

	var onEffects = info.c;
	var onSelfMsg = info.d;
	var cmdMap = info.e;
	var subMap = info.f;

	function loop(state)
	{
		return A2(_Scheduler_andThen, loop, _Scheduler_receive(function(msg)
		{
			var value = msg.a;

			if (msg.$ === 0)
			{
				return A3(onSelfMsg, router, value, state);
			}

			return cmdMap && subMap
				? A4(onEffects, router, value.i, value.j, state)
				: A3(onEffects, router, cmdMap ? value.i : value.j, state);
		}));
	}

	return router.h = _Scheduler_rawSpawn(A2(_Scheduler_andThen, loop, info.b));
}



// ROUTING


var _Platform_sendToApp = F2(function(router, msg)
{
	return _Scheduler_binding(function(callback)
	{
		router.g(msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});


var _Platform_sendToSelf = F2(function(router, msg)
{
	return A2(_Scheduler_send, router.h, {
		$: 0,
		a: msg
	});
});



// BAGS


function _Platform_leaf(home)
{
	return function(value)
	{
		return {
			$: 1,
			k: home,
			l: value
		};
	};
}


function _Platform_batch(list)
{
	return {
		$: 2,
		m: list
	};
}


var _Platform_map = F2(function(tagger, bag)
{
	return {
		$: 3,
		n: tagger,
		o: bag
	}
});



// PIPE BAGS INTO EFFECT MANAGERS
//
// Effects must be queued!
//
// Say your init contains a synchronous command, like Time.now or Time.here
//
//   - This will produce a batch of effects (FX_1)
//   - The synchronous task triggers the subsequent `update` call
//   - This will produce a batch of effects (FX_2)
//
// If we just start dispatching FX_2, subscriptions from FX_2 can be processed
// before subscriptions from FX_1. No good! Earlier versions of this code had
// this problem, leading to these reports:
//
//   https://github.com/elm/core/issues/980
//   https://github.com/elm/core/pull/981
//   https://github.com/elm/compiler/issues/1776
//
// The queue is necessary to avoid ordering issues for synchronous commands.


// Why use true/false here? Why not just check the length of the queue?
// The goal is to detect "are we currently dispatching effects?" If we
// are, we need to bail and let the ongoing while loop handle things.
//
// Now say the queue has 1 element. When we dequeue the final element,
// the queue will be empty, but we are still actively dispatching effects.
// So you could get queue jumping in a really tricky category of cases.
//
var _Platform_effectsQueue = [];
var _Platform_effectsActive = false;


function _Platform_enqueueEffects(managers, cmdBag, subBag)
{
	_Platform_effectsQueue.push({ p: managers, q: cmdBag, r: subBag });

	if (_Platform_effectsActive) return;

	_Platform_effectsActive = true;
	for (var fx; fx = _Platform_effectsQueue.shift(); )
	{
		_Platform_dispatchEffects(fx.p, fx.q, fx.r);
	}
	_Platform_effectsActive = false;
}


function _Platform_dispatchEffects(managers, cmdBag, subBag)
{
	var effectsDict = {};
	_Platform_gatherEffects(true, cmdBag, effectsDict, null);
	_Platform_gatherEffects(false, subBag, effectsDict, null);

	for (var home in managers)
	{
		_Scheduler_rawSend(managers[home], {
			$: 'fx',
			a: effectsDict[home] || { i: _List_Nil, j: _List_Nil }
		});
	}
}


function _Platform_gatherEffects(isCmd, bag, effectsDict, taggers)
{
	switch (bag.$)
	{
		case 1:
			var home = bag.k;
			var effect = _Platform_toEffect(isCmd, home, taggers, bag.l);
			effectsDict[home] = _Platform_insert(isCmd, effect, effectsDict[home]);
			return;

		case 2:
			for (var list = bag.m; list.b; list = list.b) // WHILE_CONS
			{
				_Platform_gatherEffects(isCmd, list.a, effectsDict, taggers);
			}
			return;

		case 3:
			_Platform_gatherEffects(isCmd, bag.o, effectsDict, {
				s: bag.n,
				t: taggers
			});
			return;
	}
}


function _Platform_toEffect(isCmd, home, taggers, value)
{
	function applyTaggers(x)
	{
		for (var temp = taggers; temp; temp = temp.t)
		{
			x = temp.s(x);
		}
		return x;
	}

	var map = isCmd
		? _Platform_effectManagers[home].e
		: _Platform_effectManagers[home].f;

	return A2(map, applyTaggers, value)
}


function _Platform_insert(isCmd, newEffect, effects)
{
	effects = effects || { i: _List_Nil, j: _List_Nil };

	isCmd
		? (effects.i = _List_Cons(newEffect, effects.i))
		: (effects.j = _List_Cons(newEffect, effects.j));

	return effects;
}



// PORTS


function _Platform_checkPortName(name)
{
	if (_Platform_effectManagers[name])
	{
		_Debug_crash(3, name)
	}
}



// OUTGOING PORTS


function _Platform_outgoingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		e: _Platform_outgoingPortMap,
		u: converter,
		a: _Platform_setupOutgoingPort
	};
	return _Platform_leaf(name);
}


var _Platform_outgoingPortMap = F2(function(tagger, value) { return value; });


function _Platform_setupOutgoingPort(name)
{
	var subs = [];
	var converter = _Platform_effectManagers[name].u;

	// CREATE MANAGER

	var init = _Process_sleep(0);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, cmdList, state)
	{
		for ( ; cmdList.b; cmdList = cmdList.b) // WHILE_CONS
		{
			// grab a separate reference to subs in case unsubscribe is called
			var currentSubs = subs;
			var value = _Json_unwrap(converter(cmdList.a));
			for (var i = 0; i < currentSubs.length; i++)
			{
				currentSubs[i](value);
			}
		}
		return init;
	});

	// PUBLIC API

	function subscribe(callback)
	{
		subs.push(callback);
	}

	function unsubscribe(callback)
	{
		// copy subs into a new array in case unsubscribe is called within a
		// subscribed callback
		subs = subs.slice();
		var index = subs.indexOf(callback);
		if (index >= 0)
		{
			subs.splice(index, 1);
		}
	}

	return {
		subscribe: subscribe,
		unsubscribe: unsubscribe
	};
}



// INCOMING PORTS


function _Platform_incomingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		f: _Platform_incomingPortMap,
		u: converter,
		a: _Platform_setupIncomingPort
	};
	return _Platform_leaf(name);
}


var _Platform_incomingPortMap = F2(function(tagger, finalTagger)
{
	return function(value)
	{
		return tagger(finalTagger(value));
	};
});


function _Platform_setupIncomingPort(name, sendToApp)
{
	var subs = _List_Nil;
	var converter = _Platform_effectManagers[name].u;

	// CREATE MANAGER

	var init = _Scheduler_succeed(null);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, subList, state)
	{
		subs = subList;
		return init;
	});

	// PUBLIC API

	function send(incomingValue)
	{
		var result = A2(_Json_run, converter, _Json_wrap(incomingValue));

		$elm$core$Result$isOk(result) || _Debug_crash(4, name, result.a);

		var value = result.a;
		for (var temp = subs; temp.b; temp = temp.b) // WHILE_CONS
		{
			sendToApp(temp.a(value));
		}
	}

	return { send: send };
}



// EXPORT ELM MODULES
//
// Have DEBUG and PROD versions so that we can (1) give nicer errors in
// debug mode and (2) not pay for the bits needed for that in prod mode.
//


function _Platform_export_UNUSED(exports)
{
	scope['Elm']
		? _Platform_mergeExportsProd(scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsProd(obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6)
				: _Platform_mergeExportsProd(obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}


function _Platform_export(exports)
{
	scope['Elm']
		? _Platform_mergeExportsDebug('Elm', scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsDebug(moduleName, obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6, moduleName)
				: _Platform_mergeExportsDebug(moduleName + '.' + name, obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}




// HELPERS


var _VirtualDom_divertHrefToApp;

var _VirtualDom_doc = typeof document !== 'undefined' ? document : {};


function _VirtualDom_appendChild(parent, child)
{
	parent.appendChild(child);
}

var _VirtualDom_init = F4(function(virtualNode, flagDecoder, debugMetadata, args)
{
	// NOTE: this function needs _Platform_export available to work

	/**_UNUSED/
	var node = args['node'];
	//*/
	/**/
	var node = args && args['node'] ? args['node'] : _Debug_crash(0);
	//*/

	node.parentNode.replaceChild(
		_VirtualDom_render(virtualNode, function() {}),
		node
	);

	return {};
});



// TEXT


function _VirtualDom_text(string)
{
	return {
		$: 0,
		a: string
	};
}



// NODE


var _VirtualDom_nodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 1,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_node = _VirtualDom_nodeNS(undefined);



// KEYED NODE


var _VirtualDom_keyedNodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 2,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_keyedNode = _VirtualDom_keyedNodeNS(undefined);



// CUSTOM


function _VirtualDom_custom(factList, model, render, diff)
{
	return {
		$: 3,
		d: _VirtualDom_organizeFacts(factList),
		g: model,
		h: render,
		i: diff
	};
}



// MAP


var _VirtualDom_map = F2(function(tagger, node)
{
	return {
		$: 4,
		j: tagger,
		k: node,
		b: 1 + (node.b || 0)
	};
});



// LAZY


function _VirtualDom_thunk(refs, thunk)
{
	return {
		$: 5,
		l: refs,
		m: thunk,
		k: undefined
	};
}

var _VirtualDom_lazy = F2(function(func, a)
{
	return _VirtualDom_thunk([func, a], function() {
		return func(a);
	});
});

var _VirtualDom_lazy2 = F3(function(func, a, b)
{
	return _VirtualDom_thunk([func, a, b], function() {
		return A2(func, a, b);
	});
});

var _VirtualDom_lazy3 = F4(function(func, a, b, c)
{
	return _VirtualDom_thunk([func, a, b, c], function() {
		return A3(func, a, b, c);
	});
});

var _VirtualDom_lazy4 = F5(function(func, a, b, c, d)
{
	return _VirtualDom_thunk([func, a, b, c, d], function() {
		return A4(func, a, b, c, d);
	});
});

var _VirtualDom_lazy5 = F6(function(func, a, b, c, d, e)
{
	return _VirtualDom_thunk([func, a, b, c, d, e], function() {
		return A5(func, a, b, c, d, e);
	});
});

var _VirtualDom_lazy6 = F7(function(func, a, b, c, d, e, f)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f], function() {
		return A6(func, a, b, c, d, e, f);
	});
});

var _VirtualDom_lazy7 = F8(function(func, a, b, c, d, e, f, g)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g], function() {
		return A7(func, a, b, c, d, e, f, g);
	});
});

var _VirtualDom_lazy8 = F9(function(func, a, b, c, d, e, f, g, h)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g, h], function() {
		return A8(func, a, b, c, d, e, f, g, h);
	});
});



// FACTS


var _VirtualDom_on = F2(function(key, handler)
{
	return {
		$: 'a0',
		n: key,
		o: handler
	};
});
var _VirtualDom_style = F2(function(key, value)
{
	return {
		$: 'a1',
		n: key,
		o: value
	};
});
var _VirtualDom_property = F2(function(key, value)
{
	return {
		$: 'a2',
		n: key,
		o: value
	};
});
var _VirtualDom_attribute = F2(function(key, value)
{
	return {
		$: 'a3',
		n: key,
		o: value
	};
});
var _VirtualDom_attributeNS = F3(function(namespace, key, value)
{
	return {
		$: 'a4',
		n: key,
		o: { f: namespace, o: value }
	};
});



// XSS ATTACK VECTOR CHECKS


function _VirtualDom_noScript(tag)
{
	return tag == 'script' ? 'p' : tag;
}

function _VirtualDom_noOnOrFormAction(key)
{
	return /^(on|formAction$)/i.test(key) ? 'data-' + key : key;
}

function _VirtualDom_noInnerHtmlOrFormAction(key)
{
	return key == 'innerHTML' || key == 'formAction' ? 'data-' + key : key;
}

function _VirtualDom_noJavaScriptUri_UNUSED(value)
{
	return /^javascript:/i.test(value.replace(/\s/g,'')) ? '' : value;
}

function _VirtualDom_noJavaScriptUri(value)
{
	return /^javascript:/i.test(value.replace(/\s/g,''))
		? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
		: value;
}

function _VirtualDom_noJavaScriptOrHtmlUri_UNUSED(value)
{
	return /^\s*(javascript:|data:text\/html)/i.test(value) ? '' : value;
}

function _VirtualDom_noJavaScriptOrHtmlUri(value)
{
	return /^\s*(javascript:|data:text\/html)/i.test(value)
		? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
		: value;
}



// MAP FACTS


var _VirtualDom_mapAttribute = F2(function(func, attr)
{
	return (attr.$ === 'a0')
		? A2(_VirtualDom_on, attr.n, _VirtualDom_mapHandler(func, attr.o))
		: attr;
});

function _VirtualDom_mapHandler(func, handler)
{
	var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);

	// 0 = Normal
	// 1 = MayStopPropagation
	// 2 = MayPreventDefault
	// 3 = Custom

	return {
		$: handler.$,
		a:
			!tag
				? A2($elm$json$Json$Decode$map, func, handler.a)
				:
			A3($elm$json$Json$Decode$map2,
				tag < 3
					? _VirtualDom_mapEventTuple
					: _VirtualDom_mapEventRecord,
				$elm$json$Json$Decode$succeed(func),
				handler.a
			)
	};
}

var _VirtualDom_mapEventTuple = F2(function(func, tuple)
{
	return _Utils_Tuple2(func(tuple.a), tuple.b);
});

var _VirtualDom_mapEventRecord = F2(function(func, record)
{
	return {
		message: func(record.message),
		stopPropagation: record.stopPropagation,
		preventDefault: record.preventDefault
	}
});



// ORGANIZE FACTS


function _VirtualDom_organizeFacts(factList)
{
	for (var facts = {}; factList.b; factList = factList.b) // WHILE_CONS
	{
		var entry = factList.a;

		var tag = entry.$;
		var key = entry.n;
		var value = entry.o;

		if (tag === 'a2')
		{
			(key === 'className')
				? _VirtualDom_addClass(facts, key, _Json_unwrap(value))
				: facts[key] = _Json_unwrap(value);

			continue;
		}

		var subFacts = facts[tag] || (facts[tag] = {});
		(tag === 'a3' && key === 'class')
			? _VirtualDom_addClass(subFacts, key, value)
			: subFacts[key] = value;
	}

	return facts;
}

function _VirtualDom_addClass(object, key, newClass)
{
	var classes = object[key];
	object[key] = classes ? classes + ' ' + newClass : newClass;
}



// RENDER


function _VirtualDom_render(vNode, eventNode)
{
	var tag = vNode.$;

	if (tag === 5)
	{
		return _VirtualDom_render(vNode.k || (vNode.k = vNode.m()), eventNode);
	}

	if (tag === 0)
	{
		return _VirtualDom_doc.createTextNode(vNode.a);
	}

	if (tag === 4)
	{
		var subNode = vNode.k;
		var tagger = vNode.j;

		while (subNode.$ === 4)
		{
			typeof tagger !== 'object'
				? tagger = [tagger, subNode.j]
				: tagger.push(subNode.j);

			subNode = subNode.k;
		}

		var subEventRoot = { j: tagger, p: eventNode };
		var domNode = _VirtualDom_render(subNode, subEventRoot);
		domNode.elm_event_node_ref = subEventRoot;
		return domNode;
	}

	if (tag === 3)
	{
		var domNode = vNode.h(vNode.g);
		_VirtualDom_applyFacts(domNode, eventNode, vNode.d);
		return domNode;
	}

	// at this point `tag` must be 1 or 2

	var domNode = vNode.f
		? _VirtualDom_doc.createElementNS(vNode.f, vNode.c)
		: _VirtualDom_doc.createElement(vNode.c);

	if (_VirtualDom_divertHrefToApp && vNode.c == 'a')
	{
		domNode.addEventListener('click', _VirtualDom_divertHrefToApp(domNode));
	}

	_VirtualDom_applyFacts(domNode, eventNode, vNode.d);

	for (var kids = vNode.e, i = 0; i < kids.length; i++)
	{
		_VirtualDom_appendChild(domNode, _VirtualDom_render(tag === 1 ? kids[i] : kids[i].b, eventNode));
	}

	return domNode;
}



// APPLY FACTS


function _VirtualDom_applyFacts(domNode, eventNode, facts)
{
	for (var key in facts)
	{
		var value = facts[key];

		key === 'a1'
			? _VirtualDom_applyStyles(domNode, value)
			:
		key === 'a0'
			? _VirtualDom_applyEvents(domNode, eventNode, value)
			:
		key === 'a3'
			? _VirtualDom_applyAttrs(domNode, value)
			:
		key === 'a4'
			? _VirtualDom_applyAttrsNS(domNode, value)
			:
		((key !== 'value' && key !== 'checked') || domNode[key] !== value) && (domNode[key] = value);
	}
}



// APPLY STYLES


function _VirtualDom_applyStyles(domNode, styles)
{
	var domNodeStyle = domNode.style;

	for (var key in styles)
	{
		domNodeStyle[key] = styles[key];
	}
}



// APPLY ATTRS


function _VirtualDom_applyAttrs(domNode, attrs)
{
	for (var key in attrs)
	{
		var value = attrs[key];
		typeof value !== 'undefined'
			? domNode.setAttribute(key, value)
			: domNode.removeAttribute(key);
	}
}



// APPLY NAMESPACED ATTRS


function _VirtualDom_applyAttrsNS(domNode, nsAttrs)
{
	for (var key in nsAttrs)
	{
		var pair = nsAttrs[key];
		var namespace = pair.f;
		var value = pair.o;

		typeof value !== 'undefined'
			? domNode.setAttributeNS(namespace, key, value)
			: domNode.removeAttributeNS(namespace, key);
	}
}



// APPLY EVENTS


function _VirtualDom_applyEvents(domNode, eventNode, events)
{
	var allCallbacks = domNode.elmFs || (domNode.elmFs = {});

	for (var key in events)
	{
		var newHandler = events[key];
		var oldCallback = allCallbacks[key];

		if (!newHandler)
		{
			domNode.removeEventListener(key, oldCallback);
			allCallbacks[key] = undefined;
			continue;
		}

		if (oldCallback)
		{
			var oldHandler = oldCallback.q;
			if (oldHandler.$ === newHandler.$)
			{
				oldCallback.q = newHandler;
				continue;
			}
			domNode.removeEventListener(key, oldCallback);
		}

		oldCallback = _VirtualDom_makeCallback(eventNode, newHandler);
		domNode.addEventListener(key, oldCallback,
			_VirtualDom_passiveSupported
			&& { passive: $elm$virtual_dom$VirtualDom$toHandlerInt(newHandler) < 2 }
		);
		allCallbacks[key] = oldCallback;
	}
}



// PASSIVE EVENTS


var _VirtualDom_passiveSupported;

try
{
	window.addEventListener('t', null, Object.defineProperty({}, 'passive', {
		get: function() { _VirtualDom_passiveSupported = true; }
	}));
}
catch(e) {}



// EVENT HANDLERS


function _VirtualDom_makeCallback(eventNode, initialHandler)
{
	function callback(event)
	{
		var handler = callback.q;
		var result = _Json_runHelp(handler.a, event);

		if (!$elm$core$Result$isOk(result))
		{
			return;
		}

		var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);

		// 0 = Normal
		// 1 = MayStopPropagation
		// 2 = MayPreventDefault
		// 3 = Custom

		var value = result.a;
		var message = !tag ? value : tag < 3 ? value.a : value.message;
		var stopPropagation = tag == 1 ? value.b : tag == 3 && value.stopPropagation;
		var currentEventNode = (
			stopPropagation && event.stopPropagation(),
			(tag == 2 ? value.b : tag == 3 && value.preventDefault) && event.preventDefault(),
			eventNode
		);
		var tagger;
		var i;
		while (tagger = currentEventNode.j)
		{
			if (typeof tagger == 'function')
			{
				message = tagger(message);
			}
			else
			{
				for (var i = tagger.length; i--; )
				{
					message = tagger[i](message);
				}
			}
			currentEventNode = currentEventNode.p;
		}
		currentEventNode(message, stopPropagation); // stopPropagation implies isSync
	}

	callback.q = initialHandler;

	return callback;
}

function _VirtualDom_equalEvents(x, y)
{
	return x.$ == y.$ && _Json_equality(x.a, y.a);
}



// DIFF


// TODO: Should we do patches like in iOS?
//
// type Patch
//   = At Int Patch
//   | Batch (List Patch)
//   | Change ...
//
// How could it not be better?
//
function _VirtualDom_diff(x, y)
{
	var patches = [];
	_VirtualDom_diffHelp(x, y, patches, 0);
	return patches;
}


function _VirtualDom_pushPatch(patches, type, index, data)
{
	var patch = {
		$: type,
		r: index,
		s: data,
		t: undefined,
		u: undefined
	};
	patches.push(patch);
	return patch;
}


function _VirtualDom_diffHelp(x, y, patches, index)
{
	if (x === y)
	{
		return;
	}

	var xType = x.$;
	var yType = y.$;

	// Bail if you run into different types of nodes. Implies that the
	// structure has changed significantly and it's not worth a diff.
	if (xType !== yType)
	{
		if (xType === 1 && yType === 2)
		{
			y = _VirtualDom_dekey(y);
			yType = 1;
		}
		else
		{
			_VirtualDom_pushPatch(patches, 0, index, y);
			return;
		}
	}

	// Now we know that both nodes are the same $.
	switch (yType)
	{
		case 5:
			var xRefs = x.l;
			var yRefs = y.l;
			var i = xRefs.length;
			var same = i === yRefs.length;
			while (same && i--)
			{
				same = xRefs[i] === yRefs[i];
			}
			if (same)
			{
				y.k = x.k;
				return;
			}
			y.k = y.m();
			var subPatches = [];
			_VirtualDom_diffHelp(x.k, y.k, subPatches, 0);
			subPatches.length > 0 && _VirtualDom_pushPatch(patches, 1, index, subPatches);
			return;

		case 4:
			// gather nested taggers
			var xTaggers = x.j;
			var yTaggers = y.j;
			var nesting = false;

			var xSubNode = x.k;
			while (xSubNode.$ === 4)
			{
				nesting = true;

				typeof xTaggers !== 'object'
					? xTaggers = [xTaggers, xSubNode.j]
					: xTaggers.push(xSubNode.j);

				xSubNode = xSubNode.k;
			}

			var ySubNode = y.k;
			while (ySubNode.$ === 4)
			{
				nesting = true;

				typeof yTaggers !== 'object'
					? yTaggers = [yTaggers, ySubNode.j]
					: yTaggers.push(ySubNode.j);

				ySubNode = ySubNode.k;
			}

			// Just bail if different numbers of taggers. This implies the
			// structure of the virtual DOM has changed.
			if (nesting && xTaggers.length !== yTaggers.length)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			// check if taggers are "the same"
			if (nesting ? !_VirtualDom_pairwiseRefEqual(xTaggers, yTaggers) : xTaggers !== yTaggers)
			{
				_VirtualDom_pushPatch(patches, 2, index, yTaggers);
			}

			// diff everything below the taggers
			_VirtualDom_diffHelp(xSubNode, ySubNode, patches, index + 1);
			return;

		case 0:
			if (x.a !== y.a)
			{
				_VirtualDom_pushPatch(patches, 3, index, y.a);
			}
			return;

		case 1:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKids);
			return;

		case 2:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKeyedKids);
			return;

		case 3:
			if (x.h !== y.h)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
			factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

			var patch = y.i(x.g, y.g);
			patch && _VirtualDom_pushPatch(patches, 5, index, patch);

			return;
	}
}

// assumes the incoming arrays are the same length
function _VirtualDom_pairwiseRefEqual(as, bs)
{
	for (var i = 0; i < as.length; i++)
	{
		if (as[i] !== bs[i])
		{
			return false;
		}
	}

	return true;
}

function _VirtualDom_diffNodes(x, y, patches, index, diffKids)
{
	// Bail if obvious indicators have changed. Implies more serious
	// structural changes such that it's not worth it to diff.
	if (x.c !== y.c || x.f !== y.f)
	{
		_VirtualDom_pushPatch(patches, 0, index, y);
		return;
	}

	var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
	factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

	diffKids(x, y, patches, index);
}



// DIFF FACTS


// TODO Instead of creating a new diff object, it's possible to just test if
// there *is* a diff. During the actual patch, do the diff again and make the
// modifications directly. This way, there's no new allocations. Worth it?
function _VirtualDom_diffFacts(x, y, category)
{
	var diff;

	// look for changes and removals
	for (var xKey in x)
	{
		if (xKey === 'a1' || xKey === 'a0' || xKey === 'a3' || xKey === 'a4')
		{
			var subDiff = _VirtualDom_diffFacts(x[xKey], y[xKey] || {}, xKey);
			if (subDiff)
			{
				diff = diff || {};
				diff[xKey] = subDiff;
			}
			continue;
		}

		// remove if not in the new facts
		if (!(xKey in y))
		{
			diff = diff || {};
			diff[xKey] =
				!category
					? (typeof x[xKey] === 'string' ? '' : null)
					:
				(category === 'a1')
					? ''
					:
				(category === 'a0' || category === 'a3')
					? undefined
					:
				{ f: x[xKey].f, o: undefined };

			continue;
		}

		var xValue = x[xKey];
		var yValue = y[xKey];

		// reference equal, so don't worry about it
		if (xValue === yValue && xKey !== 'value' && xKey !== 'checked'
			|| category === 'a0' && _VirtualDom_equalEvents(xValue, yValue))
		{
			continue;
		}

		diff = diff || {};
		diff[xKey] = yValue;
	}

	// add new stuff
	for (var yKey in y)
	{
		if (!(yKey in x))
		{
			diff = diff || {};
			diff[yKey] = y[yKey];
		}
	}

	return diff;
}



// DIFF KIDS


function _VirtualDom_diffKids(xParent, yParent, patches, index)
{
	var xKids = xParent.e;
	var yKids = yParent.e;

	var xLen = xKids.length;
	var yLen = yKids.length;

	// FIGURE OUT IF THERE ARE INSERTS OR REMOVALS

	if (xLen > yLen)
	{
		_VirtualDom_pushPatch(patches, 6, index, {
			v: yLen,
			i: xLen - yLen
		});
	}
	else if (xLen < yLen)
	{
		_VirtualDom_pushPatch(patches, 7, index, {
			v: xLen,
			e: yKids
		});
	}

	// PAIRWISE DIFF EVERYTHING ELSE

	for (var minLen = xLen < yLen ? xLen : yLen, i = 0; i < minLen; i++)
	{
		var xKid = xKids[i];
		_VirtualDom_diffHelp(xKid, yKids[i], patches, ++index);
		index += xKid.b || 0;
	}
}



// KEYED DIFF


function _VirtualDom_diffKeyedKids(xParent, yParent, patches, rootIndex)
{
	var localPatches = [];

	var changes = {}; // Dict String Entry
	var inserts = []; // Array { index : Int, entry : Entry }
	// type Entry = { tag : String, vnode : VNode, index : Int, data : _ }

	var xKids = xParent.e;
	var yKids = yParent.e;
	var xLen = xKids.length;
	var yLen = yKids.length;
	var xIndex = 0;
	var yIndex = 0;

	var index = rootIndex;

	while (xIndex < xLen && yIndex < yLen)
	{
		var x = xKids[xIndex];
		var y = yKids[yIndex];

		var xKey = x.a;
		var yKey = y.a;
		var xNode = x.b;
		var yNode = y.b;

		var newMatch = undefined;
		var oldMatch = undefined;

		// check if keys match

		if (xKey === yKey)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNode, localPatches, index);
			index += xNode.b || 0;

			xIndex++;
			yIndex++;
			continue;
		}

		// look ahead 1 to detect insertions and removals.

		var xNext = xKids[xIndex + 1];
		var yNext = yKids[yIndex + 1];

		if (xNext)
		{
			var xNextKey = xNext.a;
			var xNextNode = xNext.b;
			oldMatch = yKey === xNextKey;
		}

		if (yNext)
		{
			var yNextKey = yNext.a;
			var yNextNode = yNext.b;
			newMatch = xKey === yNextKey;
		}


		// swap x and y
		if (newMatch && oldMatch)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			_VirtualDom_insertNode(changes, localPatches, xKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNextNode, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		// insert y
		if (newMatch)
		{
			index++;
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			index += xNode.b || 0;

			xIndex += 1;
			yIndex += 2;
			continue;
		}

		// remove x
		if (oldMatch)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 1;
			continue;
		}

		// remove x, insert y
		if (xNext && xNextKey === yNextKey)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNextNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		break;
	}

	// eat up any remaining nodes with removeNode and insertNode

	while (xIndex < xLen)
	{
		index++;
		var x = xKids[xIndex];
		var xNode = x.b;
		_VirtualDom_removeNode(changes, localPatches, x.a, xNode, index);
		index += xNode.b || 0;
		xIndex++;
	}

	while (yIndex < yLen)
	{
		var endInserts = endInserts || [];
		var y = yKids[yIndex];
		_VirtualDom_insertNode(changes, localPatches, y.a, y.b, undefined, endInserts);
		yIndex++;
	}

	if (localPatches.length > 0 || inserts.length > 0 || endInserts)
	{
		_VirtualDom_pushPatch(patches, 8, rootIndex, {
			w: localPatches,
			x: inserts,
			y: endInserts
		});
	}
}



// CHANGES FROM KEYED DIFF


var _VirtualDom_POSTFIX = '_elmW6BL';


function _VirtualDom_insertNode(changes, localPatches, key, vnode, yIndex, inserts)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		entry = {
			c: 0,
			z: vnode,
			r: yIndex,
			s: undefined
		};

		inserts.push({ r: yIndex, A: entry });
		changes[key] = entry;

		return;
	}

	// this key was removed earlier, a match!
	if (entry.c === 1)
	{
		inserts.push({ r: yIndex, A: entry });

		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(entry.z, vnode, subPatches, entry.r);
		entry.r = yIndex;
		entry.s.s = {
			w: subPatches,
			A: entry
		};

		return;
	}

	// this key has already been inserted or moved, a duplicate!
	_VirtualDom_insertNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, yIndex, inserts);
}


function _VirtualDom_removeNode(changes, localPatches, key, vnode, index)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		var patch = _VirtualDom_pushPatch(localPatches, 9, index, undefined);

		changes[key] = {
			c: 1,
			z: vnode,
			r: index,
			s: patch
		};

		return;
	}

	// this key was inserted earlier, a match!
	if (entry.c === 0)
	{
		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(vnode, entry.z, subPatches, index);

		_VirtualDom_pushPatch(localPatches, 9, index, {
			w: subPatches,
			A: entry
		});

		return;
	}

	// this key has already been removed or moved, a duplicate!
	_VirtualDom_removeNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, index);
}



// ADD DOM NODES
//
// Each DOM node has an "index" assigned in order of traversal. It is important
// to minimize our crawl over the actual DOM, so these indexes (along with the
// descendantsCount of virtual nodes) let us skip touching entire subtrees of
// the DOM if we know there are no patches there.


function _VirtualDom_addDomNodes(domNode, vNode, patches, eventNode)
{
	_VirtualDom_addDomNodesHelp(domNode, vNode, patches, 0, 0, vNode.b, eventNode);
}


// assumes `patches` is non-empty and indexes increase monotonically.
function _VirtualDom_addDomNodesHelp(domNode, vNode, patches, i, low, high, eventNode)
{
	var patch = patches[i];
	var index = patch.r;

	while (index === low)
	{
		var patchType = patch.$;

		if (patchType === 1)
		{
			_VirtualDom_addDomNodes(domNode, vNode.k, patch.s, eventNode);
		}
		else if (patchType === 8)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var subPatches = patch.s.w;
			if (subPatches.length > 0)
			{
				_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
			}
		}
		else if (patchType === 9)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var data = patch.s;
			if (data)
			{
				data.A.s = domNode;
				var subPatches = data.w;
				if (subPatches.length > 0)
				{
					_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
				}
			}
		}
		else
		{
			patch.t = domNode;
			patch.u = eventNode;
		}

		i++;

		if (!(patch = patches[i]) || (index = patch.r) > high)
		{
			return i;
		}
	}

	var tag = vNode.$;

	if (tag === 4)
	{
		var subNode = vNode.k;

		while (subNode.$ === 4)
		{
			subNode = subNode.k;
		}

		return _VirtualDom_addDomNodesHelp(domNode, subNode, patches, i, low + 1, high, domNode.elm_event_node_ref);
	}

	// tag must be 1 or 2 at this point

	var vKids = vNode.e;
	var childNodes = domNode.childNodes;
	for (var j = 0; j < vKids.length; j++)
	{
		low++;
		var vKid = tag === 1 ? vKids[j] : vKids[j].b;
		var nextLow = low + (vKid.b || 0);
		if (low <= index && index <= nextLow)
		{
			i = _VirtualDom_addDomNodesHelp(childNodes[j], vKid, patches, i, low, nextLow, eventNode);
			if (!(patch = patches[i]) || (index = patch.r) > high)
			{
				return i;
			}
		}
		low = nextLow;
	}
	return i;
}



// APPLY PATCHES


function _VirtualDom_applyPatches(rootDomNode, oldVirtualNode, patches, eventNode)
{
	if (patches.length === 0)
	{
		return rootDomNode;
	}

	_VirtualDom_addDomNodes(rootDomNode, oldVirtualNode, patches, eventNode);
	return _VirtualDom_applyPatchesHelp(rootDomNode, patches);
}

function _VirtualDom_applyPatchesHelp(rootDomNode, patches)
{
	for (var i = 0; i < patches.length; i++)
	{
		var patch = patches[i];
		var localDomNode = patch.t
		var newNode = _VirtualDom_applyPatch(localDomNode, patch);
		if (localDomNode === rootDomNode)
		{
			rootDomNode = newNode;
		}
	}
	return rootDomNode;
}

function _VirtualDom_applyPatch(domNode, patch)
{
	switch (patch.$)
	{
		case 0:
			return _VirtualDom_applyPatchRedraw(domNode, patch.s, patch.u);

		case 4:
			_VirtualDom_applyFacts(domNode, patch.u, patch.s);
			return domNode;

		case 3:
			domNode.replaceData(0, domNode.length, patch.s);
			return domNode;

		case 1:
			return _VirtualDom_applyPatchesHelp(domNode, patch.s);

		case 2:
			if (domNode.elm_event_node_ref)
			{
				domNode.elm_event_node_ref.j = patch.s;
			}
			else
			{
				domNode.elm_event_node_ref = { j: patch.s, p: patch.u };
			}
			return domNode;

		case 6:
			var data = patch.s;
			for (var i = 0; i < data.i; i++)
			{
				domNode.removeChild(domNode.childNodes[data.v]);
			}
			return domNode;

		case 7:
			var data = patch.s;
			var kids = data.e;
			var i = data.v;
			var theEnd = domNode.childNodes[i];
			for (; i < kids.length; i++)
			{
				domNode.insertBefore(_VirtualDom_render(kids[i], patch.u), theEnd);
			}
			return domNode;

		case 9:
			var data = patch.s;
			if (!data)
			{
				domNode.parentNode.removeChild(domNode);
				return domNode;
			}
			var entry = data.A;
			if (typeof entry.r !== 'undefined')
			{
				domNode.parentNode.removeChild(domNode);
			}
			entry.s = _VirtualDom_applyPatchesHelp(domNode, data.w);
			return domNode;

		case 8:
			return _VirtualDom_applyPatchReorder(domNode, patch);

		case 5:
			return patch.s(domNode);

		default:
			_Debug_crash(10); // 'Ran into an unknown patch!'
	}
}


function _VirtualDom_applyPatchRedraw(domNode, vNode, eventNode)
{
	var parentNode = domNode.parentNode;
	var newNode = _VirtualDom_render(vNode, eventNode);

	if (!newNode.elm_event_node_ref)
	{
		newNode.elm_event_node_ref = domNode.elm_event_node_ref;
	}

	if (parentNode && newNode !== domNode)
	{
		parentNode.replaceChild(newNode, domNode);
	}
	return newNode;
}


function _VirtualDom_applyPatchReorder(domNode, patch)
{
	var data = patch.s;

	// remove end inserts
	var frag = _VirtualDom_applyPatchReorderEndInsertsHelp(data.y, patch);

	// removals
	domNode = _VirtualDom_applyPatchesHelp(domNode, data.w);

	// inserts
	var inserts = data.x;
	for (var i = 0; i < inserts.length; i++)
	{
		var insert = inserts[i];
		var entry = insert.A;
		var node = entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u);
		domNode.insertBefore(node, domNode.childNodes[insert.r]);
	}

	// add end inserts
	if (frag)
	{
		_VirtualDom_appendChild(domNode, frag);
	}

	return domNode;
}


function _VirtualDom_applyPatchReorderEndInsertsHelp(endInserts, patch)
{
	if (!endInserts)
	{
		return;
	}

	var frag = _VirtualDom_doc.createDocumentFragment();
	for (var i = 0; i < endInserts.length; i++)
	{
		var insert = endInserts[i];
		var entry = insert.A;
		_VirtualDom_appendChild(frag, entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u)
		);
	}
	return frag;
}


function _VirtualDom_virtualize(node)
{
	// TEXT NODES

	if (node.nodeType === 3)
	{
		return _VirtualDom_text(node.textContent);
	}


	// WEIRD NODES

	if (node.nodeType !== 1)
	{
		return _VirtualDom_text('');
	}


	// ELEMENT NODES

	var attrList = _List_Nil;
	var attrs = node.attributes;
	for (var i = attrs.length; i--; )
	{
		var attr = attrs[i];
		var name = attr.name;
		var value = attr.value;
		attrList = _List_Cons( A2(_VirtualDom_attribute, name, value), attrList );
	}

	var tag = node.tagName.toLowerCase();
	var kidList = _List_Nil;
	var kids = node.childNodes;

	for (var i = kids.length; i--; )
	{
		kidList = _List_Cons(_VirtualDom_virtualize(kids[i]), kidList);
	}
	return A3(_VirtualDom_node, tag, attrList, kidList);
}

function _VirtualDom_dekey(keyedNode)
{
	var keyedKids = keyedNode.e;
	var len = keyedKids.length;
	var kids = new Array(len);
	for (var i = 0; i < len; i++)
	{
		kids[i] = keyedKids[i].b;
	}

	return {
		$: 1,
		c: keyedNode.c,
		d: keyedNode.d,
		e: kids,
		f: keyedNode.f,
		b: keyedNode.b
	};
}




// ELEMENT


var _Debugger_element;

var _Browser_element = _Debugger_element || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function(sendToApp, initialModel) {
			var view = impl.view;
			/**_UNUSED/
			var domNode = args['node'];
			//*/
			/**/
			var domNode = args && args['node'] ? args['node'] : _Debug_crash(0);
			//*/
			var currNode = _VirtualDom_virtualize(domNode);

			return _Browser_makeAnimator(initialModel, function(model)
			{
				var nextNode = view(model);
				var patches = _VirtualDom_diff(currNode, nextNode);
				domNode = _VirtualDom_applyPatches(domNode, currNode, patches, sendToApp);
				currNode = nextNode;
			});
		}
	);
});



// DOCUMENT


var _Debugger_document;

var _Browser_document = _Debugger_document || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function(sendToApp, initialModel) {
			var divertHrefToApp = impl.setup && impl.setup(sendToApp)
			var view = impl.view;
			var title = _VirtualDom_doc.title;
			var bodyNode = _VirtualDom_doc.body;
			var currNode = _VirtualDom_virtualize(bodyNode);
			return _Browser_makeAnimator(initialModel, function(model)
			{
				_VirtualDom_divertHrefToApp = divertHrefToApp;
				var doc = view(model);
				var nextNode = _VirtualDom_node('body')(_List_Nil)(doc.body);
				var patches = _VirtualDom_diff(currNode, nextNode);
				bodyNode = _VirtualDom_applyPatches(bodyNode, currNode, patches, sendToApp);
				currNode = nextNode;
				_VirtualDom_divertHrefToApp = 0;
				(title !== doc.title) && (_VirtualDom_doc.title = title = doc.title);
			});
		}
	);
});



// ANIMATION


var _Browser_cancelAnimationFrame =
	typeof cancelAnimationFrame !== 'undefined'
		? cancelAnimationFrame
		: function(id) { clearTimeout(id); };

var _Browser_requestAnimationFrame =
	typeof requestAnimationFrame !== 'undefined'
		? requestAnimationFrame
		: function(callback) { return setTimeout(callback, 1000 / 60); };


function _Browser_makeAnimator(model, draw)
{
	draw(model);

	var state = 0;

	function updateIfNeeded()
	{
		state = state === 1
			? 0
			: ( _Browser_requestAnimationFrame(updateIfNeeded), draw(model), 1 );
	}

	return function(nextModel, isSync)
	{
		model = nextModel;

		isSync
			? ( draw(model),
				state === 2 && (state = 1)
				)
			: ( state === 0 && _Browser_requestAnimationFrame(updateIfNeeded),
				state = 2
				);
	};
}



// APPLICATION


function _Browser_application(impl)
{
	var onUrlChange = impl.onUrlChange;
	var onUrlRequest = impl.onUrlRequest;
	var key = function() { key.a(onUrlChange(_Browser_getUrl())); };

	return _Browser_document({
		setup: function(sendToApp)
		{
			key.a = sendToApp;
			_Browser_window.addEventListener('popstate', key);
			_Browser_window.navigator.userAgent.indexOf('Trident') < 0 || _Browser_window.addEventListener('hashchange', key);

			return F2(function(domNode, event)
			{
				if (!event.ctrlKey && !event.metaKey && !event.shiftKey && event.button < 1 && !domNode.target && !domNode.hasAttribute('download'))
				{
					event.preventDefault();
					var href = domNode.href;
					var curr = _Browser_getUrl();
					var next = $elm$url$Url$fromString(href).a;
					sendToApp(onUrlRequest(
						(next
							&& curr.protocol === next.protocol
							&& curr.host === next.host
							&& curr.port_.a === next.port_.a
						)
							? $elm$browser$Browser$Internal(next)
							: $elm$browser$Browser$External(href)
					));
				}
			});
		},
		init: function(flags)
		{
			return A3(impl.init, flags, _Browser_getUrl(), key);
		},
		view: impl.view,
		update: impl.update,
		subscriptions: impl.subscriptions
	});
}

function _Browser_getUrl()
{
	return $elm$url$Url$fromString(_VirtualDom_doc.location.href).a || _Debug_crash(1);
}

var _Browser_go = F2(function(key, n)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		n && history.go(n);
		key();
	}));
});

var _Browser_pushUrl = F2(function(key, url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		history.pushState({}, '', url);
		key();
	}));
});

var _Browser_replaceUrl = F2(function(key, url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		history.replaceState({}, '', url);
		key();
	}));
});



// GLOBAL EVENTS


var _Browser_fakeNode = { addEventListener: function() {}, removeEventListener: function() {} };
var _Browser_doc = typeof document !== 'undefined' ? document : _Browser_fakeNode;
var _Browser_window = typeof window !== 'undefined' ? window : _Browser_fakeNode;

var _Browser_on = F3(function(node, eventName, sendToSelf)
{
	return _Scheduler_spawn(_Scheduler_binding(function(callback)
	{
		function handler(event)	{ _Scheduler_rawSpawn(sendToSelf(event)); }
		node.addEventListener(eventName, handler, _VirtualDom_passiveSupported && { passive: true });
		return function() { node.removeEventListener(eventName, handler); };
	}));
});

var _Browser_decodeEvent = F2(function(decoder, event)
{
	var result = _Json_runHelp(decoder, event);
	return $elm$core$Result$isOk(result) ? $elm$core$Maybe$Just(result.a) : $elm$core$Maybe$Nothing;
});



// PAGE VISIBILITY


function _Browser_visibilityInfo()
{
	return (typeof _VirtualDom_doc.hidden !== 'undefined')
		? { hidden: 'hidden', change: 'visibilitychange' }
		:
	(typeof _VirtualDom_doc.mozHidden !== 'undefined')
		? { hidden: 'mozHidden', change: 'mozvisibilitychange' }
		:
	(typeof _VirtualDom_doc.msHidden !== 'undefined')
		? { hidden: 'msHidden', change: 'msvisibilitychange' }
		:
	(typeof _VirtualDom_doc.webkitHidden !== 'undefined')
		? { hidden: 'webkitHidden', change: 'webkitvisibilitychange' }
		: { hidden: 'hidden', change: 'visibilitychange' };
}



// ANIMATION FRAMES


function _Browser_rAF()
{
	return _Scheduler_binding(function(callback)
	{
		var id = _Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(Date.now()));
		});

		return function() {
			_Browser_cancelAnimationFrame(id);
		};
	});
}


function _Browser_now()
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(Date.now()));
	});
}



// DOM STUFF


function _Browser_withNode(id, doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			var node = document.getElementById(id);
			callback(node
				? _Scheduler_succeed(doStuff(node))
				: _Scheduler_fail($elm$browser$Browser$Dom$NotFound(id))
			);
		});
	});
}


function _Browser_withWindow(doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(doStuff()));
		});
	});
}


// FOCUS and BLUR


var _Browser_call = F2(function(functionName, id)
{
	return _Browser_withNode(id, function(node) {
		node[functionName]();
		return _Utils_Tuple0;
	});
});



// WINDOW VIEWPORT


function _Browser_getViewport()
{
	return {
		scene: _Browser_getScene(),
		viewport: {
			x: _Browser_window.pageXOffset,
			y: _Browser_window.pageYOffset,
			width: _Browser_doc.documentElement.clientWidth,
			height: _Browser_doc.documentElement.clientHeight
		}
	};
}

function _Browser_getScene()
{
	var body = _Browser_doc.body;
	var elem = _Browser_doc.documentElement;
	return {
		width: Math.max(body.scrollWidth, body.offsetWidth, elem.scrollWidth, elem.offsetWidth, elem.clientWidth),
		height: Math.max(body.scrollHeight, body.offsetHeight, elem.scrollHeight, elem.offsetHeight, elem.clientHeight)
	};
}

var _Browser_setViewport = F2(function(x, y)
{
	return _Browser_withWindow(function()
	{
		_Browser_window.scroll(x, y);
		return _Utils_Tuple0;
	});
});



// ELEMENT VIEWPORT


function _Browser_getViewportOf(id)
{
	return _Browser_withNode(id, function(node)
	{
		return {
			scene: {
				width: node.scrollWidth,
				height: node.scrollHeight
			},
			viewport: {
				x: node.scrollLeft,
				y: node.scrollTop,
				width: node.clientWidth,
				height: node.clientHeight
			}
		};
	});
}


var _Browser_setViewportOf = F3(function(id, x, y)
{
	return _Browser_withNode(id, function(node)
	{
		node.scrollLeft = x;
		node.scrollTop = y;
		return _Utils_Tuple0;
	});
});



// ELEMENT


function _Browser_getElement(id)
{
	return _Browser_withNode(id, function(node)
	{
		var rect = node.getBoundingClientRect();
		var x = _Browser_window.pageXOffset;
		var y = _Browser_window.pageYOffset;
		return {
			scene: _Browser_getScene(),
			viewport: {
				x: x,
				y: y,
				width: _Browser_doc.documentElement.clientWidth,
				height: _Browser_doc.documentElement.clientHeight
			},
			element: {
				x: x + rect.left,
				y: y + rect.top,
				width: rect.width,
				height: rect.height
			}
		};
	});
}



// LOAD and RELOAD


function _Browser_reload(skipCache)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		_VirtualDom_doc.location.reload(skipCache);
	}));
}

function _Browser_load(url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		try
		{
			_Browser_window.location = url;
		}
		catch(err)
		{
			// Only Firefox can throw a NS_ERROR_MALFORMED_URI exception here.
			// Other browsers reload the page, so let's be consistent about that.
			_VirtualDom_doc.location.reload(false);
		}
	}));
}



// SEND REQUEST

var _Http_toTask = F3(function(router, toTask, request)
{
	return _Scheduler_binding(function(callback)
	{
		function done(response) {
			callback(toTask(request.expect.a(response)));
		}

		var xhr = new XMLHttpRequest();
		xhr.addEventListener('error', function() { done($elm$http$Http$NetworkError_); });
		xhr.addEventListener('timeout', function() { done($elm$http$Http$Timeout_); });
		xhr.addEventListener('load', function() { done(_Http_toResponse(request.expect.b, xhr)); });
		$elm$core$Maybe$isJust(request.tracker) && _Http_track(router, xhr, request.tracker.a);

		try {
			xhr.open(request.method, request.url, true);
		} catch (e) {
			return done($elm$http$Http$BadUrl_(request.url));
		}

		_Http_configureRequest(xhr, request);

		request.body.a && xhr.setRequestHeader('Content-Type', request.body.a);
		xhr.send(request.body.b);

		return function() { xhr.c = true; xhr.abort(); };
	});
});


// CONFIGURE

function _Http_configureRequest(xhr, request)
{
	for (var headers = request.headers; headers.b; headers = headers.b) // WHILE_CONS
	{
		xhr.setRequestHeader(headers.a.a, headers.a.b);
	}
	xhr.timeout = request.timeout.a || 0;
	xhr.responseType = request.expect.d;
	xhr.withCredentials = request.allowCookiesFromOtherDomains;
}


// RESPONSES

function _Http_toResponse(toBody, xhr)
{
	return A2(
		200 <= xhr.status && xhr.status < 300 ? $elm$http$Http$GoodStatus_ : $elm$http$Http$BadStatus_,
		_Http_toMetadata(xhr),
		toBody(xhr.response)
	);
}


// METADATA

function _Http_toMetadata(xhr)
{
	return {
		url: xhr.responseURL,
		statusCode: xhr.status,
		statusText: xhr.statusText,
		headers: _Http_parseHeaders(xhr.getAllResponseHeaders())
	};
}


// HEADERS

function _Http_parseHeaders(rawHeaders)
{
	if (!rawHeaders)
	{
		return $elm$core$Dict$empty;
	}

	var headers = $elm$core$Dict$empty;
	var headerPairs = rawHeaders.split('\r\n');
	for (var i = headerPairs.length; i--; )
	{
		var headerPair = headerPairs[i];
		var index = headerPair.indexOf(': ');
		if (index > 0)
		{
			var key = headerPair.substring(0, index);
			var value = headerPair.substring(index + 2);

			headers = A3($elm$core$Dict$update, key, function(oldValue) {
				return $elm$core$Maybe$Just($elm$core$Maybe$isJust(oldValue)
					? value + ', ' + oldValue.a
					: value
				);
			}, headers);
		}
	}
	return headers;
}


// EXPECT

var _Http_expect = F3(function(type, toBody, toValue)
{
	return {
		$: 0,
		d: type,
		b: toBody,
		a: toValue
	};
});

var _Http_mapExpect = F2(function(func, expect)
{
	return {
		$: 0,
		d: expect.d,
		b: expect.b,
		a: function(x) { return func(expect.a(x)); }
	};
});

function _Http_toDataView(arrayBuffer)
{
	return new DataView(arrayBuffer);
}


// BODY and PARTS

var _Http_emptyBody = { $: 0 };
var _Http_pair = F2(function(a, b) { return { $: 0, a: a, b: b }; });

function _Http_toFormData(parts)
{
	for (var formData = new FormData(); parts.b; parts = parts.b) // WHILE_CONS
	{
		var part = parts.a;
		formData.append(part.a, part.b);
	}
	return formData;
}

var _Http_bytesToBlob = F2(function(mime, bytes)
{
	return new Blob([bytes], { type: mime });
});


// PROGRESS

function _Http_track(router, xhr, tracker)
{
	// TODO check out lengthComputable on loadstart event

	xhr.upload.addEventListener('progress', function(event) {
		if (xhr.c) { return; }
		_Scheduler_rawSpawn(A2($elm$core$Platform$sendToSelf, router, _Utils_Tuple2(tracker, $elm$http$Http$Sending({
			sent: event.loaded,
			size: event.total
		}))));
	});
	xhr.addEventListener('progress', function(event) {
		if (xhr.c) { return; }
		_Scheduler_rawSpawn(A2($elm$core$Platform$sendToSelf, router, _Utils_Tuple2(tracker, $elm$http$Http$Receiving({
			received: event.loaded,
			size: event.lengthComputable ? $elm$core$Maybe$Just(event.total) : $elm$core$Maybe$Nothing
		}))));
	});
}


var _Bitwise_and = F2(function(a, b)
{
	return a & b;
});

var _Bitwise_or = F2(function(a, b)
{
	return a | b;
});

var _Bitwise_xor = F2(function(a, b)
{
	return a ^ b;
});

function _Bitwise_complement(a)
{
	return ~a;
};

var _Bitwise_shiftLeftBy = F2(function(offset, a)
{
	return a << offset;
});

var _Bitwise_shiftRightBy = F2(function(offset, a)
{
	return a >> offset;
});

var _Bitwise_shiftRightZfBy = F2(function(offset, a)
{
	return a >>> offset;
});



function _Time_now(millisToPosix)
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(millisToPosix(Date.now())));
	});
}

var _Time_setInterval = F2(function(interval, task)
{
	return _Scheduler_binding(function(callback)
	{
		var id = setInterval(function() { _Scheduler_rawSpawn(task); }, interval);
		return function() { clearInterval(id); };
	});
});

function _Time_here()
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(
			A2($elm$time$Time$customZone, -(new Date().getTimezoneOffset()), _List_Nil)
		));
	});
}


function _Time_getZoneName()
{
	return _Scheduler_binding(function(callback)
	{
		try
		{
			var name = $elm$time$Time$Name(Intl.DateTimeFormat().resolvedOptions().timeZone);
		}
		catch (e)
		{
			var name = $elm$time$Time$Offset(new Date().getTimezoneOffset());
		}
		callback(_Scheduler_succeed(name));
	});
}



// DECODER

var _File_decoder = _Json_decodePrim(function(value) {
	// NOTE: checks if `File` exists in case this is run on node
	return (typeof File !== 'undefined' && value instanceof File)
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a FILE', value);
});


// METADATA

function _File_name(file) { return file.name; }
function _File_mime(file) { return file.type; }
function _File_size(file) { return file.size; }

function _File_lastModified(file)
{
	return $elm$time$Time$millisToPosix(file.lastModified);
}


// DOWNLOAD

var _File_downloadNode;

function _File_getDownloadNode()
{
	return _File_downloadNode || (_File_downloadNode = document.createElement('a'));
}

var _File_download = F3(function(name, mime, content)
{
	return _Scheduler_binding(function(callback)
	{
		var blob = new Blob([content], {type: mime});

		// for IE10+
		if (navigator.msSaveOrOpenBlob)
		{
			navigator.msSaveOrOpenBlob(blob, name);
			return;
		}

		// for HTML5
		var node = _File_getDownloadNode();
		var objectUrl = URL.createObjectURL(blob);
		node.href = objectUrl;
		node.download = name;
		_File_click(node);
		URL.revokeObjectURL(objectUrl);
	});
});

function _File_downloadUrl(href)
{
	return _Scheduler_binding(function(callback)
	{
		var node = _File_getDownloadNode();
		node.href = href;
		node.download = '';
		node.origin === location.origin || (node.target = '_blank');
		_File_click(node);
	});
}


// IE COMPATIBILITY

function _File_makeBytesSafeForInternetExplorer(bytes)
{
	// only needed by IE10 and IE11 to fix https://github.com/elm/file/issues/10
	// all other browsers can just run `new Blob([bytes])` directly with no problem
	//
	return new Uint8Array(bytes.buffer, bytes.byteOffset, bytes.byteLength);
}

function _File_click(node)
{
	// only needed by IE10 and IE11 to fix https://github.com/elm/file/issues/11
	// all other browsers have MouseEvent and do not need this conditional stuff
	//
	if (typeof MouseEvent === 'function')
	{
		node.dispatchEvent(new MouseEvent('click'));
	}
	else
	{
		var event = document.createEvent('MouseEvents');
		event.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
		document.body.appendChild(node);
		node.dispatchEvent(event);
		document.body.removeChild(node);
	}
}


// UPLOAD

var _File_node;

function _File_uploadOne(mimes)
{
	return _Scheduler_binding(function(callback)
	{
		_File_node = document.createElement('input');
		_File_node.type = 'file';
		_File_node.accept = A2($elm$core$String$join, ',', mimes);
		_File_node.addEventListener('change', function(event)
		{
			callback(_Scheduler_succeed(event.target.files[0]));
		});
		_File_click(_File_node);
	});
}

function _File_uploadOneOrMore(mimes)
{
	return _Scheduler_binding(function(callback)
	{
		_File_node = document.createElement('input');
		_File_node.type = 'file';
		_File_node.multiple = true;
		_File_node.accept = A2($elm$core$String$join, ',', mimes);
		_File_node.addEventListener('change', function(event)
		{
			var elmFiles = _List_fromArray(event.target.files);
			callback(_Scheduler_succeed(_Utils_Tuple2(elmFiles.a, elmFiles.b)));
		});
		_File_click(_File_node);
	});
}


// CONTENT

function _File_toString(blob)
{
	return _Scheduler_binding(function(callback)
	{
		var reader = new FileReader();
		reader.addEventListener('loadend', function() {
			callback(_Scheduler_succeed(reader.result));
		});
		reader.readAsText(blob);
		return function() { reader.abort(); };
	});
}

function _File_toBytes(blob)
{
	return _Scheduler_binding(function(callback)
	{
		var reader = new FileReader();
		reader.addEventListener('loadend', function() {
			callback(_Scheduler_succeed(new DataView(reader.result)));
		});
		reader.readAsArrayBuffer(blob);
		return function() { reader.abort(); };
	});
}

function _File_toUrl(blob)
{
	return _Scheduler_binding(function(callback)
	{
		var reader = new FileReader();
		reader.addEventListener('loadend', function() {
			callback(_Scheduler_succeed(reader.result));
		});
		reader.readAsDataURL(blob);
		return function() { reader.abort(); };
	});
}

var $elm$core$Basics$EQ = {$: 'EQ'};
var $elm$core$Basics$LT = {$: 'LT'};
var $elm$core$List$cons = _List_cons;
var $elm$core$Elm$JsArray$foldr = _JsArray_foldr;
var $elm$core$Array$foldr = F3(
	function (func, baseCase, _v0) {
		var tree = _v0.c;
		var tail = _v0.d;
		var helper = F2(
			function (node, acc) {
				if (node.$ === 'SubTree') {
					var subTree = node.a;
					return A3($elm$core$Elm$JsArray$foldr, helper, acc, subTree);
				} else {
					var values = node.a;
					return A3($elm$core$Elm$JsArray$foldr, func, acc, values);
				}
			});
		return A3(
			$elm$core$Elm$JsArray$foldr,
			helper,
			A3($elm$core$Elm$JsArray$foldr, func, baseCase, tail),
			tree);
	});
var $elm$core$Array$toList = function (array) {
	return A3($elm$core$Array$foldr, $elm$core$List$cons, _List_Nil, array);
};
var $elm$core$Dict$foldr = F3(
	function (func, acc, t) {
		foldr:
		while (true) {
			if (t.$ === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var key = t.b;
				var value = t.c;
				var left = t.d;
				var right = t.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3($elm$core$Dict$foldr, func, acc, right)),
					$temp$t = left;
				func = $temp$func;
				acc = $temp$acc;
				t = $temp$t;
				continue foldr;
			}
		}
	});
var $elm$core$Dict$toList = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, list) {
				return A2(
					$elm$core$List$cons,
					_Utils_Tuple2(key, value),
					list);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Dict$keys = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, keyList) {
				return A2($elm$core$List$cons, key, keyList);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Set$toList = function (_v0) {
	var dict = _v0.a;
	return $elm$core$Dict$keys(dict);
};
var $elm$core$Basics$GT = {$: 'GT'};
var $author$project$AvitoApp$AvitoTable = function (a) {
	return {$: 'AvitoTable', a: a};
};
var $elm$core$Result$Err = function (a) {
	return {$: 'Err', a: a};
};
var $elm$json$Json$Decode$Failure = F2(
	function (a, b) {
		return {$: 'Failure', a: a, b: b};
	});
var $elm$json$Json$Decode$Field = F2(
	function (a, b) {
		return {$: 'Field', a: a, b: b};
	});
var $elm$json$Json$Decode$Index = F2(
	function (a, b) {
		return {$: 'Index', a: a, b: b};
	});
var $elm$core$Result$Ok = function (a) {
	return {$: 'Ok', a: a};
};
var $elm$json$Json$Decode$OneOf = function (a) {
	return {$: 'OneOf', a: a};
};
var $elm$core$Basics$False = {$: 'False'};
var $elm$core$Basics$add = _Basics_add;
var $elm$core$Maybe$Just = function (a) {
	return {$: 'Just', a: a};
};
var $elm$core$Maybe$Nothing = {$: 'Nothing'};
var $elm$core$String$all = _String_all;
var $elm$core$Basics$and = _Basics_and;
var $elm$core$Basics$append = _Utils_append;
var $elm$json$Json$Encode$encode = _Json_encode;
var $elm$core$String$fromInt = _String_fromNumber;
var $elm$core$String$join = F2(
	function (sep, chunks) {
		return A2(
			_String_join,
			sep,
			_List_toArray(chunks));
	});
var $elm$core$String$split = F2(
	function (sep, string) {
		return _List_fromArray(
			A2(_String_split, sep, string));
	});
var $elm$json$Json$Decode$indent = function (str) {
	return A2(
		$elm$core$String$join,
		'\n    ',
		A2($elm$core$String$split, '\n', str));
};
var $elm$core$List$foldl = F3(
	function (func, acc, list) {
		foldl:
		while (true) {
			if (!list.b) {
				return acc;
			} else {
				var x = list.a;
				var xs = list.b;
				var $temp$func = func,
					$temp$acc = A2(func, x, acc),
					$temp$list = xs;
				func = $temp$func;
				acc = $temp$acc;
				list = $temp$list;
				continue foldl;
			}
		}
	});
var $elm$core$List$length = function (xs) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (_v0, i) {
				return i + 1;
			}),
		0,
		xs);
};
var $elm$core$List$map2 = _List_map2;
var $elm$core$Basics$le = _Utils_le;
var $elm$core$Basics$sub = _Basics_sub;
var $elm$core$List$rangeHelp = F3(
	function (lo, hi, list) {
		rangeHelp:
		while (true) {
			if (_Utils_cmp(lo, hi) < 1) {
				var $temp$lo = lo,
					$temp$hi = hi - 1,
					$temp$list = A2($elm$core$List$cons, hi, list);
				lo = $temp$lo;
				hi = $temp$hi;
				list = $temp$list;
				continue rangeHelp;
			} else {
				return list;
			}
		}
	});
var $elm$core$List$range = F2(
	function (lo, hi) {
		return A3($elm$core$List$rangeHelp, lo, hi, _List_Nil);
	});
var $elm$core$List$indexedMap = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$map2,
			f,
			A2(
				$elm$core$List$range,
				0,
				$elm$core$List$length(xs) - 1),
			xs);
	});
var $elm$core$Char$toCode = _Char_toCode;
var $elm$core$Char$isLower = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (97 <= code) && (code <= 122);
};
var $elm$core$Char$isUpper = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 90) && (65 <= code);
};
var $elm$core$Basics$or = _Basics_or;
var $elm$core$Char$isAlpha = function (_char) {
	return $elm$core$Char$isLower(_char) || $elm$core$Char$isUpper(_char);
};
var $elm$core$Char$isDigit = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 57) && (48 <= code);
};
var $elm$core$Char$isAlphaNum = function (_char) {
	return $elm$core$Char$isLower(_char) || ($elm$core$Char$isUpper(_char) || $elm$core$Char$isDigit(_char));
};
var $elm$core$List$reverse = function (list) {
	return A3($elm$core$List$foldl, $elm$core$List$cons, _List_Nil, list);
};
var $elm$core$String$uncons = _String_uncons;
var $elm$json$Json$Decode$errorOneOf = F2(
	function (i, error) {
		return '\n\n(' + ($elm$core$String$fromInt(i + 1) + (') ' + $elm$json$Json$Decode$indent(
			$elm$json$Json$Decode$errorToString(error))));
	});
var $elm$json$Json$Decode$errorToString = function (error) {
	return A2($elm$json$Json$Decode$errorToStringHelp, error, _List_Nil);
};
var $elm$json$Json$Decode$errorToStringHelp = F2(
	function (error, context) {
		errorToStringHelp:
		while (true) {
			switch (error.$) {
				case 'Field':
					var f = error.a;
					var err = error.b;
					var isSimple = function () {
						var _v1 = $elm$core$String$uncons(f);
						if (_v1.$ === 'Nothing') {
							return false;
						} else {
							var _v2 = _v1.a;
							var _char = _v2.a;
							var rest = _v2.b;
							return $elm$core$Char$isAlpha(_char) && A2($elm$core$String$all, $elm$core$Char$isAlphaNum, rest);
						}
					}();
					var fieldName = isSimple ? ('.' + f) : ('[\'' + (f + '\']'));
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, fieldName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 'Index':
					var i = error.a;
					var err = error.b;
					var indexName = '[' + ($elm$core$String$fromInt(i) + ']');
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, indexName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 'OneOf':
					var errors = error.a;
					if (!errors.b) {
						return 'Ran into a Json.Decode.oneOf with no possibilities' + function () {
							if (!context.b) {
								return '!';
							} else {
								return ' at json' + A2(
									$elm$core$String$join,
									'',
									$elm$core$List$reverse(context));
							}
						}();
					} else {
						if (!errors.b.b) {
							var err = errors.a;
							var $temp$error = err,
								$temp$context = context;
							error = $temp$error;
							context = $temp$context;
							continue errorToStringHelp;
						} else {
							var starter = function () {
								if (!context.b) {
									return 'Json.Decode.oneOf';
								} else {
									return 'The Json.Decode.oneOf at json' + A2(
										$elm$core$String$join,
										'',
										$elm$core$List$reverse(context));
								}
							}();
							var introduction = starter + (' failed in the following ' + ($elm$core$String$fromInt(
								$elm$core$List$length(errors)) + ' ways:'));
							return A2(
								$elm$core$String$join,
								'\n\n',
								A2(
									$elm$core$List$cons,
									introduction,
									A2($elm$core$List$indexedMap, $elm$json$Json$Decode$errorOneOf, errors)));
						}
					}
				default:
					var msg = error.a;
					var json = error.b;
					var introduction = function () {
						if (!context.b) {
							return 'Problem with the given value:\n\n';
						} else {
							return 'Problem with the value at json' + (A2(
								$elm$core$String$join,
								'',
								$elm$core$List$reverse(context)) + ':\n\n    ');
						}
					}();
					return introduction + ($elm$json$Json$Decode$indent(
						A2($elm$json$Json$Encode$encode, 4, json)) + ('\n\n' + msg));
			}
		}
	});
var $elm$core$Array$branchFactor = 32;
var $elm$core$Array$Array_elm_builtin = F4(
	function (a, b, c, d) {
		return {$: 'Array_elm_builtin', a: a, b: b, c: c, d: d};
	});
var $elm$core$Elm$JsArray$empty = _JsArray_empty;
var $elm$core$Basics$ceiling = _Basics_ceiling;
var $elm$core$Basics$fdiv = _Basics_fdiv;
var $elm$core$Basics$logBase = F2(
	function (base, number) {
		return _Basics_log(number) / _Basics_log(base);
	});
var $elm$core$Basics$toFloat = _Basics_toFloat;
var $elm$core$Array$shiftStep = $elm$core$Basics$ceiling(
	A2($elm$core$Basics$logBase, 2, $elm$core$Array$branchFactor));
var $elm$core$Array$empty = A4($elm$core$Array$Array_elm_builtin, 0, $elm$core$Array$shiftStep, $elm$core$Elm$JsArray$empty, $elm$core$Elm$JsArray$empty);
var $elm$core$Elm$JsArray$initialize = _JsArray_initialize;
var $elm$core$Array$Leaf = function (a) {
	return {$: 'Leaf', a: a};
};
var $elm$core$Basics$apL = F2(
	function (f, x) {
		return f(x);
	});
var $elm$core$Basics$apR = F2(
	function (x, f) {
		return f(x);
	});
var $elm$core$Basics$eq = _Utils_equal;
var $elm$core$Basics$floor = _Basics_floor;
var $elm$core$Elm$JsArray$length = _JsArray_length;
var $elm$core$Basics$gt = _Utils_gt;
var $elm$core$Basics$max = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) > 0) ? x : y;
	});
var $elm$core$Basics$mul = _Basics_mul;
var $elm$core$Array$SubTree = function (a) {
	return {$: 'SubTree', a: a};
};
var $elm$core$Elm$JsArray$initializeFromList = _JsArray_initializeFromList;
var $elm$core$Array$compressNodes = F2(
	function (nodes, acc) {
		compressNodes:
		while (true) {
			var _v0 = A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodes);
			var node = _v0.a;
			var remainingNodes = _v0.b;
			var newAcc = A2(
				$elm$core$List$cons,
				$elm$core$Array$SubTree(node),
				acc);
			if (!remainingNodes.b) {
				return $elm$core$List$reverse(newAcc);
			} else {
				var $temp$nodes = remainingNodes,
					$temp$acc = newAcc;
				nodes = $temp$nodes;
				acc = $temp$acc;
				continue compressNodes;
			}
		}
	});
var $elm$core$Tuple$first = function (_v0) {
	var x = _v0.a;
	return x;
};
var $elm$core$Array$treeFromBuilder = F2(
	function (nodeList, nodeListSize) {
		treeFromBuilder:
		while (true) {
			var newNodeSize = $elm$core$Basics$ceiling(nodeListSize / $elm$core$Array$branchFactor);
			if (newNodeSize === 1) {
				return A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodeList).a;
			} else {
				var $temp$nodeList = A2($elm$core$Array$compressNodes, nodeList, _List_Nil),
					$temp$nodeListSize = newNodeSize;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue treeFromBuilder;
			}
		}
	});
var $elm$core$Array$builderToArray = F2(
	function (reverseNodeList, builder) {
		if (!builder.nodeListSize) {
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.tail),
				$elm$core$Array$shiftStep,
				$elm$core$Elm$JsArray$empty,
				builder.tail);
		} else {
			var treeLen = builder.nodeListSize * $elm$core$Array$branchFactor;
			var depth = $elm$core$Basics$floor(
				A2($elm$core$Basics$logBase, $elm$core$Array$branchFactor, treeLen - 1));
			var correctNodeList = reverseNodeList ? $elm$core$List$reverse(builder.nodeList) : builder.nodeList;
			var tree = A2($elm$core$Array$treeFromBuilder, correctNodeList, builder.nodeListSize);
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.tail) + treeLen,
				A2($elm$core$Basics$max, 5, depth * $elm$core$Array$shiftStep),
				tree,
				builder.tail);
		}
	});
var $elm$core$Basics$idiv = _Basics_idiv;
var $elm$core$Basics$lt = _Utils_lt;
var $elm$core$Array$initializeHelp = F5(
	function (fn, fromIndex, len, nodeList, tail) {
		initializeHelp:
		while (true) {
			if (fromIndex < 0) {
				return A2(
					$elm$core$Array$builderToArray,
					false,
					{nodeList: nodeList, nodeListSize: (len / $elm$core$Array$branchFactor) | 0, tail: tail});
			} else {
				var leaf = $elm$core$Array$Leaf(
					A3($elm$core$Elm$JsArray$initialize, $elm$core$Array$branchFactor, fromIndex, fn));
				var $temp$fn = fn,
					$temp$fromIndex = fromIndex - $elm$core$Array$branchFactor,
					$temp$len = len,
					$temp$nodeList = A2($elm$core$List$cons, leaf, nodeList),
					$temp$tail = tail;
				fn = $temp$fn;
				fromIndex = $temp$fromIndex;
				len = $temp$len;
				nodeList = $temp$nodeList;
				tail = $temp$tail;
				continue initializeHelp;
			}
		}
	});
var $elm$core$Basics$remainderBy = _Basics_remainderBy;
var $elm$core$Array$initialize = F2(
	function (len, fn) {
		if (len <= 0) {
			return $elm$core$Array$empty;
		} else {
			var tailLen = len % $elm$core$Array$branchFactor;
			var tail = A3($elm$core$Elm$JsArray$initialize, tailLen, len - tailLen, fn);
			var initialFromIndex = (len - tailLen) - $elm$core$Array$branchFactor;
			return A5($elm$core$Array$initializeHelp, fn, initialFromIndex, len, _List_Nil, tail);
		}
	});
var $elm$core$Basics$True = {$: 'True'};
var $elm$core$Result$isOk = function (result) {
	if (result.$ === 'Ok') {
		return true;
	} else {
		return false;
	}
};
var $elm$json$Json$Decode$map = _Json_map1;
var $elm$json$Json$Decode$map2 = _Json_map2;
var $elm$json$Json$Decode$succeed = _Json_succeed;
var $elm$virtual_dom$VirtualDom$toHandlerInt = function (handler) {
	switch (handler.$) {
		case 'Normal':
			return 0;
		case 'MayStopPropagation':
			return 1;
		case 'MayPreventDefault':
			return 2;
		default:
			return 3;
	}
};
var $elm$browser$Browser$External = function (a) {
	return {$: 'External', a: a};
};
var $elm$browser$Browser$Internal = function (a) {
	return {$: 'Internal', a: a};
};
var $elm$core$Basics$identity = function (x) {
	return x;
};
var $elm$browser$Browser$Dom$NotFound = function (a) {
	return {$: 'NotFound', a: a};
};
var $elm$url$Url$Http = {$: 'Http'};
var $elm$url$Url$Https = {$: 'Https'};
var $elm$url$Url$Url = F6(
	function (protocol, host, port_, path, query, fragment) {
		return {fragment: fragment, host: host, path: path, port_: port_, protocol: protocol, query: query};
	});
var $elm$core$String$contains = _String_contains;
var $elm$core$String$length = _String_length;
var $elm$core$String$slice = _String_slice;
var $elm$core$String$dropLeft = F2(
	function (n, string) {
		return (n < 1) ? string : A3(
			$elm$core$String$slice,
			n,
			$elm$core$String$length(string),
			string);
	});
var $elm$core$String$indexes = _String_indexes;
var $elm$core$String$isEmpty = function (string) {
	return string === '';
};
var $elm$core$String$left = F2(
	function (n, string) {
		return (n < 1) ? '' : A3($elm$core$String$slice, 0, n, string);
	});
var $elm$core$String$toInt = _String_toInt;
var $elm$url$Url$chompBeforePath = F5(
	function (protocol, path, params, frag, str) {
		if ($elm$core$String$isEmpty(str) || A2($elm$core$String$contains, '@', str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, ':', str);
			if (!_v0.b) {
				return $elm$core$Maybe$Just(
					A6($elm$url$Url$Url, protocol, str, $elm$core$Maybe$Nothing, path, params, frag));
			} else {
				if (!_v0.b.b) {
					var i = _v0.a;
					var _v1 = $elm$core$String$toInt(
						A2($elm$core$String$dropLeft, i + 1, str));
					if (_v1.$ === 'Nothing') {
						return $elm$core$Maybe$Nothing;
					} else {
						var port_ = _v1;
						return $elm$core$Maybe$Just(
							A6(
								$elm$url$Url$Url,
								protocol,
								A2($elm$core$String$left, i, str),
								port_,
								path,
								params,
								frag));
					}
				} else {
					return $elm$core$Maybe$Nothing;
				}
			}
		}
	});
var $elm$url$Url$chompBeforeQuery = F4(
	function (protocol, params, frag, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '/', str);
			if (!_v0.b) {
				return A5($elm$url$Url$chompBeforePath, protocol, '/', params, frag, str);
			} else {
				var i = _v0.a;
				return A5(
					$elm$url$Url$chompBeforePath,
					protocol,
					A2($elm$core$String$dropLeft, i, str),
					params,
					frag,
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$chompBeforeFragment = F3(
	function (protocol, frag, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '?', str);
			if (!_v0.b) {
				return A4($elm$url$Url$chompBeforeQuery, protocol, $elm$core$Maybe$Nothing, frag, str);
			} else {
				var i = _v0.a;
				return A4(
					$elm$url$Url$chompBeforeQuery,
					protocol,
					$elm$core$Maybe$Just(
						A2($elm$core$String$dropLeft, i + 1, str)),
					frag,
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$chompAfterProtocol = F2(
	function (protocol, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '#', str);
			if (!_v0.b) {
				return A3($elm$url$Url$chompBeforeFragment, protocol, $elm$core$Maybe$Nothing, str);
			} else {
				var i = _v0.a;
				return A3(
					$elm$url$Url$chompBeforeFragment,
					protocol,
					$elm$core$Maybe$Just(
						A2($elm$core$String$dropLeft, i + 1, str)),
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$core$String$startsWith = _String_startsWith;
var $elm$url$Url$fromString = function (str) {
	return A2($elm$core$String$startsWith, 'http://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		$elm$url$Url$Http,
		A2($elm$core$String$dropLeft, 7, str)) : (A2($elm$core$String$startsWith, 'https://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		$elm$url$Url$Https,
		A2($elm$core$String$dropLeft, 8, str)) : $elm$core$Maybe$Nothing);
};
var $elm$core$Basics$never = function (_v0) {
	never:
	while (true) {
		var nvr = _v0.a;
		var $temp$_v0 = nvr;
		_v0 = $temp$_v0;
		continue never;
	}
};
var $elm$core$Task$Perform = function (a) {
	return {$: 'Perform', a: a};
};
var $elm$core$Task$succeed = _Scheduler_succeed;
var $elm$core$Task$init = $elm$core$Task$succeed(_Utils_Tuple0);
var $elm$core$List$foldrHelper = F4(
	function (fn, acc, ctr, ls) {
		if (!ls.b) {
			return acc;
		} else {
			var a = ls.a;
			var r1 = ls.b;
			if (!r1.b) {
				return A2(fn, a, acc);
			} else {
				var b = r1.a;
				var r2 = r1.b;
				if (!r2.b) {
					return A2(
						fn,
						a,
						A2(fn, b, acc));
				} else {
					var c = r2.a;
					var r3 = r2.b;
					if (!r3.b) {
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(fn, c, acc)));
					} else {
						var d = r3.a;
						var r4 = r3.b;
						var res = (ctr > 500) ? A3(
							$elm$core$List$foldl,
							fn,
							acc,
							$elm$core$List$reverse(r4)) : A4($elm$core$List$foldrHelper, fn, acc, ctr + 1, r4);
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(
									fn,
									c,
									A2(fn, d, res))));
					}
				}
			}
		}
	});
var $elm$core$List$foldr = F3(
	function (fn, acc, ls) {
		return A4($elm$core$List$foldrHelper, fn, acc, 0, ls);
	});
var $elm$core$List$map = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, acc) {
					return A2(
						$elm$core$List$cons,
						f(x),
						acc);
				}),
			_List_Nil,
			xs);
	});
var $elm$core$Task$andThen = _Scheduler_andThen;
var $elm$core$Task$map = F2(
	function (func, taskA) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return $elm$core$Task$succeed(
					func(a));
			},
			taskA);
	});
var $elm$core$Task$map2 = F3(
	function (func, taskA, taskB) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return A2(
					$elm$core$Task$andThen,
					function (b) {
						return $elm$core$Task$succeed(
							A2(func, a, b));
					},
					taskB);
			},
			taskA);
	});
var $elm$core$Task$sequence = function (tasks) {
	return A3(
		$elm$core$List$foldr,
		$elm$core$Task$map2($elm$core$List$cons),
		$elm$core$Task$succeed(_List_Nil),
		tasks);
};
var $elm$core$Platform$sendToApp = _Platform_sendToApp;
var $elm$core$Task$spawnCmd = F2(
	function (router, _v0) {
		var task = _v0.a;
		return _Scheduler_spawn(
			A2(
				$elm$core$Task$andThen,
				$elm$core$Platform$sendToApp(router),
				task));
	});
var $elm$core$Task$onEffects = F3(
	function (router, commands, state) {
		return A2(
			$elm$core$Task$map,
			function (_v0) {
				return _Utils_Tuple0;
			},
			$elm$core$Task$sequence(
				A2(
					$elm$core$List$map,
					$elm$core$Task$spawnCmd(router),
					commands)));
	});
var $elm$core$Task$onSelfMsg = F3(
	function (_v0, _v1, _v2) {
		return $elm$core$Task$succeed(_Utils_Tuple0);
	});
var $elm$core$Task$cmdMap = F2(
	function (tagger, _v0) {
		var task = _v0.a;
		return $elm$core$Task$Perform(
			A2($elm$core$Task$map, tagger, task));
	});
_Platform_effectManagers['Task'] = _Platform_createManager($elm$core$Task$init, $elm$core$Task$onEffects, $elm$core$Task$onSelfMsg, $elm$core$Task$cmdMap);
var $elm$core$Task$command = _Platform_leaf('Task');
var $elm$core$Task$perform = F2(
	function (toMessage, task) {
		return $elm$core$Task$command(
			$elm$core$Task$Perform(
				A2($elm$core$Task$map, toMessage, task)));
	});
var $elm$browser$Browser$element = _Browser_element;
var $author$project$AvitoApp$GotMeta = function (a) {
	return {$: 'GotMeta', a: a};
};
var $elm$json$Json$Decode$array = _Json_decodeArray;
var $author$project$AvitoApp$EnumType = function (a) {
	return {$: 'EnumType', a: a};
};
var $author$project$AvitoApp$NumberType = {$: 'NumberType'};
var $author$project$AvitoApp$TextType = {$: 'TextType'};
var $elm$json$Json$Decode$andThen = _Json_andThen;
var $elm$json$Json$Decode$field = _Json_decodeField;
var $elm$json$Json$Decode$at = F2(
	function (fields, decoder) {
		return A3($elm$core$List$foldr, $elm$json$Json$Decode$field, decoder, fields);
	});
var $elm$json$Json$Decode$fail = _Json_fail;
var $elm$json$Json$Decode$index = _Json_decodeIndex;
var $elm$json$Json$Decode$list = _Json_decodeList;
var $elm$json$Json$Decode$map3 = _Json_map3;
var $elm$json$Json$Decode$string = _Json_decodeString;
var $author$project$AvitoApp$decodeFieldMeta = function () {
	var fTypeDecode = function (ftype) {
		switch (ftype) {
			case 'TextFieldType':
				return $elm$json$Json$Decode$succeed($author$project$AvitoApp$TextType);
			case 'NumberFieldType':
				return $elm$json$Json$Decode$succeed($author$project$AvitoApp$NumberType);
			case 'EnumFieldType':
				return A2(
					$elm$json$Json$Decode$map,
					$author$project$AvitoApp$EnumType,
					A2(
						$elm$json$Json$Decode$at,
						_List_fromArray(
							['_mfType', 'contents']),
						$elm$json$Json$Decode$list(
							A3(
								$elm$json$Json$Decode$map2,
								F2(
									function (a, b) {
										return _Utils_Tuple2(a, b);
									}),
								A2($elm$json$Json$Decode$index, 0, $elm$json$Json$Decode$string),
								A2($elm$json$Json$Decode$index, 1, $elm$json$Json$Decode$string)))));
			default:
				return $elm$json$Json$Decode$fail('Не известный тип поля');
		}
	};
	return A4(
		$elm$json$Json$Decode$map3,
		F3(
			function (n, l, t) {
				return {ftype: t, label: l, name: n};
			}),
		A2($elm$json$Json$Decode$field, '_mfName', $elm$json$Json$Decode$string),
		A2($elm$json$Json$Decode$field, '_mfLabel', $elm$json$Json$Decode$string),
		A2(
			$elm$json$Json$Decode$andThen,
			fTypeDecode,
			A2(
				$elm$json$Json$Decode$at,
				_List_fromArray(
					['_mfType', 'tag']),
				$elm$json$Json$Decode$string)));
}();
var $author$project$AvitoApp$decodeMeta = function () {
	var row = $elm$json$Json$Decode$list(
		A3(
			$elm$json$Json$Decode$map2,
			F2(
				function (n, fs) {
					return {fields: fs, name: n};
				}),
			A2($elm$json$Json$Decode$field, '_metaName', $elm$json$Json$Decode$string),
			A2(
				$elm$json$Json$Decode$field,
				'_metaFields',
				$elm$json$Json$Decode$array($author$project$AvitoApp$decodeFieldMeta))));
	return row;
}();
var $elm$json$Json$Decode$decodeString = _Json_runOnString;
var $elm$http$Http$BadStatus_ = F2(
	function (a, b) {
		return {$: 'BadStatus_', a: a, b: b};
	});
var $elm$http$Http$BadUrl_ = function (a) {
	return {$: 'BadUrl_', a: a};
};
var $elm$http$Http$GoodStatus_ = F2(
	function (a, b) {
		return {$: 'GoodStatus_', a: a, b: b};
	});
var $elm$http$Http$NetworkError_ = {$: 'NetworkError_'};
var $elm$http$Http$Receiving = function (a) {
	return {$: 'Receiving', a: a};
};
var $elm$http$Http$Sending = function (a) {
	return {$: 'Sending', a: a};
};
var $elm$http$Http$Timeout_ = {$: 'Timeout_'};
var $elm$core$Dict$RBEmpty_elm_builtin = {$: 'RBEmpty_elm_builtin'};
var $elm$core$Dict$empty = $elm$core$Dict$RBEmpty_elm_builtin;
var $elm$core$Maybe$isJust = function (maybe) {
	if (maybe.$ === 'Just') {
		return true;
	} else {
		return false;
	}
};
var $elm$core$Platform$sendToSelf = _Platform_sendToSelf;
var $elm$core$Basics$compare = _Utils_compare;
var $elm$core$Dict$get = F2(
	function (targetKey, dict) {
		get:
		while (true) {
			if (dict.$ === 'RBEmpty_elm_builtin') {
				return $elm$core$Maybe$Nothing;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var _v1 = A2($elm$core$Basics$compare, targetKey, key);
				switch (_v1.$) {
					case 'LT':
						var $temp$targetKey = targetKey,
							$temp$dict = left;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
					case 'EQ':
						return $elm$core$Maybe$Just(value);
					default:
						var $temp$targetKey = targetKey,
							$temp$dict = right;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
				}
			}
		}
	});
var $elm$core$Dict$Black = {$: 'Black'};
var $elm$core$Dict$RBNode_elm_builtin = F5(
	function (a, b, c, d, e) {
		return {$: 'RBNode_elm_builtin', a: a, b: b, c: c, d: d, e: e};
	});
var $elm$core$Dict$Red = {$: 'Red'};
var $elm$core$Dict$balance = F5(
	function (color, key, value, left, right) {
		if ((right.$ === 'RBNode_elm_builtin') && (right.a.$ === 'Red')) {
			var _v1 = right.a;
			var rK = right.b;
			var rV = right.c;
			var rLeft = right.d;
			var rRight = right.e;
			if ((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) {
				var _v3 = left.a;
				var lK = left.b;
				var lV = left.c;
				var lLeft = left.d;
				var lRight = left.e;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Red,
					key,
					value,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					color,
					rK,
					rV,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, key, value, left, rLeft),
					rRight);
			}
		} else {
			if ((((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) && (left.d.$ === 'RBNode_elm_builtin')) && (left.d.a.$ === 'Red')) {
				var _v5 = left.a;
				var lK = left.b;
				var lV = left.c;
				var _v6 = left.d;
				var _v7 = _v6.a;
				var llK = _v6.b;
				var llV = _v6.c;
				var llLeft = _v6.d;
				var llRight = _v6.e;
				var lRight = left.e;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Red,
					lK,
					lV,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, llK, llV, llLeft, llRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, key, value, lRight, right));
			} else {
				return A5($elm$core$Dict$RBNode_elm_builtin, color, key, value, left, right);
			}
		}
	});
var $elm$core$Dict$insertHelp = F3(
	function (key, value, dict) {
		if (dict.$ === 'RBEmpty_elm_builtin') {
			return A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, key, value, $elm$core$Dict$RBEmpty_elm_builtin, $elm$core$Dict$RBEmpty_elm_builtin);
		} else {
			var nColor = dict.a;
			var nKey = dict.b;
			var nValue = dict.c;
			var nLeft = dict.d;
			var nRight = dict.e;
			var _v1 = A2($elm$core$Basics$compare, key, nKey);
			switch (_v1.$) {
				case 'LT':
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						A3($elm$core$Dict$insertHelp, key, value, nLeft),
						nRight);
				case 'EQ':
					return A5($elm$core$Dict$RBNode_elm_builtin, nColor, nKey, value, nLeft, nRight);
				default:
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						nLeft,
						A3($elm$core$Dict$insertHelp, key, value, nRight));
			}
		}
	});
var $elm$core$Dict$insert = F3(
	function (key, value, dict) {
		var _v0 = A3($elm$core$Dict$insertHelp, key, value, dict);
		if ((_v0.$ === 'RBNode_elm_builtin') && (_v0.a.$ === 'Red')) {
			var _v1 = _v0.a;
			var k = _v0.b;
			var v = _v0.c;
			var l = _v0.d;
			var r = _v0.e;
			return A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, k, v, l, r);
		} else {
			var x = _v0;
			return x;
		}
	});
var $elm$core$Dict$getMin = function (dict) {
	getMin:
	while (true) {
		if ((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) {
			var left = dict.d;
			var $temp$dict = left;
			dict = $temp$dict;
			continue getMin;
		} else {
			return dict;
		}
	}
};
var $elm$core$Dict$moveRedLeft = function (dict) {
	if (((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) && (dict.e.$ === 'RBNode_elm_builtin')) {
		if ((dict.e.d.$ === 'RBNode_elm_builtin') && (dict.e.d.a.$ === 'Red')) {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v1 = dict.d;
			var lClr = _v1.a;
			var lK = _v1.b;
			var lV = _v1.c;
			var lLeft = _v1.d;
			var lRight = _v1.e;
			var _v2 = dict.e;
			var rClr = _v2.a;
			var rK = _v2.b;
			var rV = _v2.c;
			var rLeft = _v2.d;
			var _v3 = rLeft.a;
			var rlK = rLeft.b;
			var rlV = rLeft.c;
			var rlL = rLeft.d;
			var rlR = rLeft.e;
			var rRight = _v2.e;
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				$elm$core$Dict$Red,
				rlK,
				rlV,
				A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, lK, lV, lLeft, lRight),
					rlL),
				A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, rK, rV, rlR, rRight));
		} else {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v4 = dict.d;
			var lClr = _v4.a;
			var lK = _v4.b;
			var lV = _v4.c;
			var lLeft = _v4.d;
			var lRight = _v4.e;
			var _v5 = dict.e;
			var rClr = _v5.a;
			var rK = _v5.b;
			var rV = _v5.c;
			var rLeft = _v5.d;
			var rRight = _v5.e;
			if (clr.$ === 'Black') {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, rK, rV, rLeft, rRight));
			}
		}
	} else {
		return dict;
	}
};
var $elm$core$Dict$moveRedRight = function (dict) {
	if (((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) && (dict.e.$ === 'RBNode_elm_builtin')) {
		if ((dict.d.d.$ === 'RBNode_elm_builtin') && (dict.d.d.a.$ === 'Red')) {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v1 = dict.d;
			var lClr = _v1.a;
			var lK = _v1.b;
			var lV = _v1.c;
			var _v2 = _v1.d;
			var _v3 = _v2.a;
			var llK = _v2.b;
			var llV = _v2.c;
			var llLeft = _v2.d;
			var llRight = _v2.e;
			var lRight = _v1.e;
			var _v4 = dict.e;
			var rClr = _v4.a;
			var rK = _v4.b;
			var rV = _v4.c;
			var rLeft = _v4.d;
			var rRight = _v4.e;
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				$elm$core$Dict$Red,
				lK,
				lV,
				A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, llK, llV, llLeft, llRight),
				A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					lRight,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, rK, rV, rLeft, rRight)));
		} else {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v5 = dict.d;
			var lClr = _v5.a;
			var lK = _v5.b;
			var lV = _v5.c;
			var lLeft = _v5.d;
			var lRight = _v5.e;
			var _v6 = dict.e;
			var rClr = _v6.a;
			var rK = _v6.b;
			var rV = _v6.c;
			var rLeft = _v6.d;
			var rRight = _v6.e;
			if (clr.$ === 'Black') {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, rK, rV, rLeft, rRight));
			}
		}
	} else {
		return dict;
	}
};
var $elm$core$Dict$removeHelpPrepEQGT = F7(
	function (targetKey, dict, color, key, value, left, right) {
		if ((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) {
			var _v1 = left.a;
			var lK = left.b;
			var lV = left.c;
			var lLeft = left.d;
			var lRight = left.e;
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				color,
				lK,
				lV,
				lLeft,
				A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, key, value, lRight, right));
		} else {
			_v2$2:
			while (true) {
				if ((right.$ === 'RBNode_elm_builtin') && (right.a.$ === 'Black')) {
					if (right.d.$ === 'RBNode_elm_builtin') {
						if (right.d.a.$ === 'Black') {
							var _v3 = right.a;
							var _v4 = right.d;
							var _v5 = _v4.a;
							return $elm$core$Dict$moveRedRight(dict);
						} else {
							break _v2$2;
						}
					} else {
						var _v6 = right.a;
						var _v7 = right.d;
						return $elm$core$Dict$moveRedRight(dict);
					}
				} else {
					break _v2$2;
				}
			}
			return dict;
		}
	});
var $elm$core$Dict$removeMin = function (dict) {
	if ((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) {
		var color = dict.a;
		var key = dict.b;
		var value = dict.c;
		var left = dict.d;
		var lColor = left.a;
		var lLeft = left.d;
		var right = dict.e;
		if (lColor.$ === 'Black') {
			if ((lLeft.$ === 'RBNode_elm_builtin') && (lLeft.a.$ === 'Red')) {
				var _v3 = lLeft.a;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					color,
					key,
					value,
					$elm$core$Dict$removeMin(left),
					right);
			} else {
				var _v4 = $elm$core$Dict$moveRedLeft(dict);
				if (_v4.$ === 'RBNode_elm_builtin') {
					var nColor = _v4.a;
					var nKey = _v4.b;
					var nValue = _v4.c;
					var nLeft = _v4.d;
					var nRight = _v4.e;
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						$elm$core$Dict$removeMin(nLeft),
						nRight);
				} else {
					return $elm$core$Dict$RBEmpty_elm_builtin;
				}
			}
		} else {
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				color,
				key,
				value,
				$elm$core$Dict$removeMin(left),
				right);
		}
	} else {
		return $elm$core$Dict$RBEmpty_elm_builtin;
	}
};
var $elm$core$Dict$removeHelp = F2(
	function (targetKey, dict) {
		if (dict.$ === 'RBEmpty_elm_builtin') {
			return $elm$core$Dict$RBEmpty_elm_builtin;
		} else {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			if (_Utils_cmp(targetKey, key) < 0) {
				if ((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Black')) {
					var _v4 = left.a;
					var lLeft = left.d;
					if ((lLeft.$ === 'RBNode_elm_builtin') && (lLeft.a.$ === 'Red')) {
						var _v6 = lLeft.a;
						return A5(
							$elm$core$Dict$RBNode_elm_builtin,
							color,
							key,
							value,
							A2($elm$core$Dict$removeHelp, targetKey, left),
							right);
					} else {
						var _v7 = $elm$core$Dict$moveRedLeft(dict);
						if (_v7.$ === 'RBNode_elm_builtin') {
							var nColor = _v7.a;
							var nKey = _v7.b;
							var nValue = _v7.c;
							var nLeft = _v7.d;
							var nRight = _v7.e;
							return A5(
								$elm$core$Dict$balance,
								nColor,
								nKey,
								nValue,
								A2($elm$core$Dict$removeHelp, targetKey, nLeft),
								nRight);
						} else {
							return $elm$core$Dict$RBEmpty_elm_builtin;
						}
					}
				} else {
					return A5(
						$elm$core$Dict$RBNode_elm_builtin,
						color,
						key,
						value,
						A2($elm$core$Dict$removeHelp, targetKey, left),
						right);
				}
			} else {
				return A2(
					$elm$core$Dict$removeHelpEQGT,
					targetKey,
					A7($elm$core$Dict$removeHelpPrepEQGT, targetKey, dict, color, key, value, left, right));
			}
		}
	});
var $elm$core$Dict$removeHelpEQGT = F2(
	function (targetKey, dict) {
		if (dict.$ === 'RBNode_elm_builtin') {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			if (_Utils_eq(targetKey, key)) {
				var _v1 = $elm$core$Dict$getMin(right);
				if (_v1.$ === 'RBNode_elm_builtin') {
					var minKey = _v1.b;
					var minValue = _v1.c;
					return A5(
						$elm$core$Dict$balance,
						color,
						minKey,
						minValue,
						left,
						$elm$core$Dict$removeMin(right));
				} else {
					return $elm$core$Dict$RBEmpty_elm_builtin;
				}
			} else {
				return A5(
					$elm$core$Dict$balance,
					color,
					key,
					value,
					left,
					A2($elm$core$Dict$removeHelp, targetKey, right));
			}
		} else {
			return $elm$core$Dict$RBEmpty_elm_builtin;
		}
	});
var $elm$core$Dict$remove = F2(
	function (key, dict) {
		var _v0 = A2($elm$core$Dict$removeHelp, key, dict);
		if ((_v0.$ === 'RBNode_elm_builtin') && (_v0.a.$ === 'Red')) {
			var _v1 = _v0.a;
			var k = _v0.b;
			var v = _v0.c;
			var l = _v0.d;
			var r = _v0.e;
			return A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, k, v, l, r);
		} else {
			var x = _v0;
			return x;
		}
	});
var $elm$core$Dict$update = F3(
	function (targetKey, alter, dictionary) {
		var _v0 = alter(
			A2($elm$core$Dict$get, targetKey, dictionary));
		if (_v0.$ === 'Just') {
			var value = _v0.a;
			return A3($elm$core$Dict$insert, targetKey, value, dictionary);
		} else {
			return A2($elm$core$Dict$remove, targetKey, dictionary);
		}
	});
var $elm$core$Basics$composeR = F3(
	function (f, g, x) {
		return g(
			f(x));
	});
var $elm$http$Http$expectStringResponse = F2(
	function (toMsg, toResult) {
		return A3(
			_Http_expect,
			'',
			$elm$core$Basics$identity,
			A2($elm$core$Basics$composeR, toResult, toMsg));
	});
var $elm$core$Result$mapError = F2(
	function (f, result) {
		if (result.$ === 'Ok') {
			var v = result.a;
			return $elm$core$Result$Ok(v);
		} else {
			var e = result.a;
			return $elm$core$Result$Err(
				f(e));
		}
	});
var $elm$http$Http$BadBody = function (a) {
	return {$: 'BadBody', a: a};
};
var $elm$http$Http$BadStatus = function (a) {
	return {$: 'BadStatus', a: a};
};
var $elm$http$Http$BadUrl = function (a) {
	return {$: 'BadUrl', a: a};
};
var $elm$http$Http$NetworkError = {$: 'NetworkError'};
var $elm$http$Http$Timeout = {$: 'Timeout'};
var $elm$http$Http$resolve = F2(
	function (toResult, response) {
		switch (response.$) {
			case 'BadUrl_':
				var url = response.a;
				return $elm$core$Result$Err(
					$elm$http$Http$BadUrl(url));
			case 'Timeout_':
				return $elm$core$Result$Err($elm$http$Http$Timeout);
			case 'NetworkError_':
				return $elm$core$Result$Err($elm$http$Http$NetworkError);
			case 'BadStatus_':
				var metadata = response.a;
				return $elm$core$Result$Err(
					$elm$http$Http$BadStatus(metadata.statusCode));
			default:
				var body = response.b;
				return A2(
					$elm$core$Result$mapError,
					$elm$http$Http$BadBody,
					toResult(body));
		}
	});
var $elm$http$Http$expectJson = F2(
	function (toMsg, decoder) {
		return A2(
			$elm$http$Http$expectStringResponse,
			toMsg,
			$elm$http$Http$resolve(
				function (string) {
					return A2(
						$elm$core$Result$mapError,
						$elm$json$Json$Decode$errorToString,
						A2($elm$json$Json$Decode$decodeString, decoder, string));
				}));
	});
var $elm$http$Http$emptyBody = _Http_emptyBody;
var $elm$http$Http$Request = function (a) {
	return {$: 'Request', a: a};
};
var $elm$http$Http$State = F2(
	function (reqs, subs) {
		return {reqs: reqs, subs: subs};
	});
var $elm$http$Http$init = $elm$core$Task$succeed(
	A2($elm$http$Http$State, $elm$core$Dict$empty, _List_Nil));
var $elm$core$Process$kill = _Scheduler_kill;
var $elm$core$Process$spawn = _Scheduler_spawn;
var $elm$http$Http$updateReqs = F3(
	function (router, cmds, reqs) {
		updateReqs:
		while (true) {
			if (!cmds.b) {
				return $elm$core$Task$succeed(reqs);
			} else {
				var cmd = cmds.a;
				var otherCmds = cmds.b;
				if (cmd.$ === 'Cancel') {
					var tracker = cmd.a;
					var _v2 = A2($elm$core$Dict$get, tracker, reqs);
					if (_v2.$ === 'Nothing') {
						var $temp$router = router,
							$temp$cmds = otherCmds,
							$temp$reqs = reqs;
						router = $temp$router;
						cmds = $temp$cmds;
						reqs = $temp$reqs;
						continue updateReqs;
					} else {
						var pid = _v2.a;
						return A2(
							$elm$core$Task$andThen,
							function (_v3) {
								return A3(
									$elm$http$Http$updateReqs,
									router,
									otherCmds,
									A2($elm$core$Dict$remove, tracker, reqs));
							},
							$elm$core$Process$kill(pid));
					}
				} else {
					var req = cmd.a;
					return A2(
						$elm$core$Task$andThen,
						function (pid) {
							var _v4 = req.tracker;
							if (_v4.$ === 'Nothing') {
								return A3($elm$http$Http$updateReqs, router, otherCmds, reqs);
							} else {
								var tracker = _v4.a;
								return A3(
									$elm$http$Http$updateReqs,
									router,
									otherCmds,
									A3($elm$core$Dict$insert, tracker, pid, reqs));
							}
						},
						$elm$core$Process$spawn(
							A3(
								_Http_toTask,
								router,
								$elm$core$Platform$sendToApp(router),
								req)));
				}
			}
		}
	});
var $elm$http$Http$onEffects = F4(
	function (router, cmds, subs, state) {
		return A2(
			$elm$core$Task$andThen,
			function (reqs) {
				return $elm$core$Task$succeed(
					A2($elm$http$Http$State, reqs, subs));
			},
			A3($elm$http$Http$updateReqs, router, cmds, state.reqs));
	});
var $elm$core$List$maybeCons = F3(
	function (f, mx, xs) {
		var _v0 = f(mx);
		if (_v0.$ === 'Just') {
			var x = _v0.a;
			return A2($elm$core$List$cons, x, xs);
		} else {
			return xs;
		}
	});
var $elm$core$List$filterMap = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$foldr,
			$elm$core$List$maybeCons(f),
			_List_Nil,
			xs);
	});
var $elm$http$Http$maybeSend = F4(
	function (router, desiredTracker, progress, _v0) {
		var actualTracker = _v0.a;
		var toMsg = _v0.b;
		return _Utils_eq(desiredTracker, actualTracker) ? $elm$core$Maybe$Just(
			A2(
				$elm$core$Platform$sendToApp,
				router,
				toMsg(progress))) : $elm$core$Maybe$Nothing;
	});
var $elm$http$Http$onSelfMsg = F3(
	function (router, _v0, state) {
		var tracker = _v0.a;
		var progress = _v0.b;
		return A2(
			$elm$core$Task$andThen,
			function (_v1) {
				return $elm$core$Task$succeed(state);
			},
			$elm$core$Task$sequence(
				A2(
					$elm$core$List$filterMap,
					A3($elm$http$Http$maybeSend, router, tracker, progress),
					state.subs)));
	});
var $elm$http$Http$Cancel = function (a) {
	return {$: 'Cancel', a: a};
};
var $elm$http$Http$cmdMap = F2(
	function (func, cmd) {
		if (cmd.$ === 'Cancel') {
			var tracker = cmd.a;
			return $elm$http$Http$Cancel(tracker);
		} else {
			var r = cmd.a;
			return $elm$http$Http$Request(
				{
					allowCookiesFromOtherDomains: r.allowCookiesFromOtherDomains,
					body: r.body,
					expect: A2(_Http_mapExpect, func, r.expect),
					headers: r.headers,
					method: r.method,
					timeout: r.timeout,
					tracker: r.tracker,
					url: r.url
				});
		}
	});
var $elm$http$Http$MySub = F2(
	function (a, b) {
		return {$: 'MySub', a: a, b: b};
	});
var $elm$http$Http$subMap = F2(
	function (func, _v0) {
		var tracker = _v0.a;
		var toMsg = _v0.b;
		return A2(
			$elm$http$Http$MySub,
			tracker,
			A2($elm$core$Basics$composeR, toMsg, func));
	});
_Platform_effectManagers['Http'] = _Platform_createManager($elm$http$Http$init, $elm$http$Http$onEffects, $elm$http$Http$onSelfMsg, $elm$http$Http$cmdMap, $elm$http$Http$subMap);
var $elm$http$Http$command = _Platform_leaf('Http');
var $elm$http$Http$subscription = _Platform_leaf('Http');
var $elm$http$Http$request = function (r) {
	return $elm$http$Http$command(
		$elm$http$Http$Request(
			{allowCookiesFromOtherDomains: false, body: r.body, expect: r.expect, headers: r.headers, method: r.method, timeout: r.timeout, tracker: r.tracker, url: r.url}));
};
var $elm$http$Http$get = function (r) {
	return $elm$http$Http$request(
		{body: $elm$http$Http$emptyBody, expect: r.expect, headers: _List_Nil, method: 'GET', timeout: $elm$core$Maybe$Nothing, tracker: $elm$core$Maybe$Nothing, url: r.url});
};
var $author$project$AvitoApp$getMeta = $elm$http$Http$get(
	{
		expect: A2($elm$http$Http$expectJson, $author$project$AvitoApp$GotMeta, $author$project$AvitoApp$decodeMeta),
		url: '/api/meta'
	});
var $author$project$AvitoApp$Loading = function (a) {
	return {$: 'Loading', a: a};
};
var $brian_watkins$elm_procedure$Procedure$Program$Model = function (a) {
	return {$: 'Model', a: a};
};
var $brian_watkins$elm_procedure$Procedure$Program$init = $brian_watkins$elm_procedure$Procedure$Program$Model(
	{nextId: 0, procedures: $elm$core$Dict$empty});
var $author$project$AvitoApp$initModel = {
	httpStatus: $author$project$AvitoApp$Loading('Получаем данные'),
	mData: $elm$core$Maybe$Nothing,
	mMeta: $elm$core$Maybe$Nothing,
	mName: $elm$core$Maybe$Nothing,
	procModel: $brian_watkins$elm_procedure$Procedure$Program$init,
	randText: $elm$core$Array$empty
};
var $elm$core$Elm$JsArray$appendN = _JsArray_appendN;
var $elm$core$Elm$JsArray$slice = _JsArray_slice;
var $elm$core$Array$appendHelpBuilder = F2(
	function (tail, builder) {
		var tailLen = $elm$core$Elm$JsArray$length(tail);
		var notAppended = ($elm$core$Array$branchFactor - $elm$core$Elm$JsArray$length(builder.tail)) - tailLen;
		var appended = A3($elm$core$Elm$JsArray$appendN, $elm$core$Array$branchFactor, builder.tail, tail);
		return (notAppended < 0) ? {
			nodeList: A2(
				$elm$core$List$cons,
				$elm$core$Array$Leaf(appended),
				builder.nodeList),
			nodeListSize: builder.nodeListSize + 1,
			tail: A3($elm$core$Elm$JsArray$slice, notAppended, tailLen, tail)
		} : ((!notAppended) ? {
			nodeList: A2(
				$elm$core$List$cons,
				$elm$core$Array$Leaf(appended),
				builder.nodeList),
			nodeListSize: builder.nodeListSize + 1,
			tail: $elm$core$Elm$JsArray$empty
		} : {nodeList: builder.nodeList, nodeListSize: builder.nodeListSize, tail: appended});
	});
var $elm$core$Bitwise$and = _Bitwise_and;
var $elm$core$Bitwise$shiftRightZfBy = _Bitwise_shiftRightZfBy;
var $elm$core$Array$bitMask = 4294967295 >>> (32 - $elm$core$Array$shiftStep);
var $elm$core$Basics$ge = _Utils_ge;
var $elm$core$Elm$JsArray$push = _JsArray_push;
var $elm$core$Elm$JsArray$singleton = _JsArray_singleton;
var $elm$core$Elm$JsArray$unsafeGet = _JsArray_unsafeGet;
var $elm$core$Elm$JsArray$unsafeSet = _JsArray_unsafeSet;
var $elm$core$Array$insertTailInTree = F4(
	function (shift, index, tail, tree) {
		var pos = $elm$core$Array$bitMask & (index >>> shift);
		if (_Utils_cmp(
			pos,
			$elm$core$Elm$JsArray$length(tree)) > -1) {
			if (shift === 5) {
				return A2(
					$elm$core$Elm$JsArray$push,
					$elm$core$Array$Leaf(tail),
					tree);
			} else {
				var newSub = $elm$core$Array$SubTree(
					A4($elm$core$Array$insertTailInTree, shift - $elm$core$Array$shiftStep, index, tail, $elm$core$Elm$JsArray$empty));
				return A2($elm$core$Elm$JsArray$push, newSub, tree);
			}
		} else {
			var value = A2($elm$core$Elm$JsArray$unsafeGet, pos, tree);
			if (value.$ === 'SubTree') {
				var subTree = value.a;
				var newSub = $elm$core$Array$SubTree(
					A4($elm$core$Array$insertTailInTree, shift - $elm$core$Array$shiftStep, index, tail, subTree));
				return A3($elm$core$Elm$JsArray$unsafeSet, pos, newSub, tree);
			} else {
				var newSub = $elm$core$Array$SubTree(
					A4(
						$elm$core$Array$insertTailInTree,
						shift - $elm$core$Array$shiftStep,
						index,
						tail,
						$elm$core$Elm$JsArray$singleton(value)));
				return A3($elm$core$Elm$JsArray$unsafeSet, pos, newSub, tree);
			}
		}
	});
var $elm$core$Bitwise$shiftLeftBy = _Bitwise_shiftLeftBy;
var $elm$core$Array$unsafeReplaceTail = F2(
	function (newTail, _v0) {
		var len = _v0.a;
		var startShift = _v0.b;
		var tree = _v0.c;
		var tail = _v0.d;
		var originalTailLen = $elm$core$Elm$JsArray$length(tail);
		var newTailLen = $elm$core$Elm$JsArray$length(newTail);
		var newArrayLen = len + (newTailLen - originalTailLen);
		if (_Utils_eq(newTailLen, $elm$core$Array$branchFactor)) {
			var overflow = _Utils_cmp(newArrayLen >>> $elm$core$Array$shiftStep, 1 << startShift) > 0;
			if (overflow) {
				var newShift = startShift + $elm$core$Array$shiftStep;
				var newTree = A4(
					$elm$core$Array$insertTailInTree,
					newShift,
					len,
					newTail,
					$elm$core$Elm$JsArray$singleton(
						$elm$core$Array$SubTree(tree)));
				return A4($elm$core$Array$Array_elm_builtin, newArrayLen, newShift, newTree, $elm$core$Elm$JsArray$empty);
			} else {
				return A4(
					$elm$core$Array$Array_elm_builtin,
					newArrayLen,
					startShift,
					A4($elm$core$Array$insertTailInTree, startShift, len, newTail, tree),
					$elm$core$Elm$JsArray$empty);
			}
		} else {
			return A4($elm$core$Array$Array_elm_builtin, newArrayLen, startShift, tree, newTail);
		}
	});
var $elm$core$Array$appendHelpTree = F2(
	function (toAppend, array) {
		var len = array.a;
		var tree = array.c;
		var tail = array.d;
		var itemsToAppend = $elm$core$Elm$JsArray$length(toAppend);
		var notAppended = ($elm$core$Array$branchFactor - $elm$core$Elm$JsArray$length(tail)) - itemsToAppend;
		var appended = A3($elm$core$Elm$JsArray$appendN, $elm$core$Array$branchFactor, tail, toAppend);
		var newArray = A2($elm$core$Array$unsafeReplaceTail, appended, array);
		if (notAppended < 0) {
			var nextTail = A3($elm$core$Elm$JsArray$slice, notAppended, itemsToAppend, toAppend);
			return A2($elm$core$Array$unsafeReplaceTail, nextTail, newArray);
		} else {
			return newArray;
		}
	});
var $elm$core$Elm$JsArray$foldl = _JsArray_foldl;
var $elm$core$Array$builderFromArray = function (_v0) {
	var len = _v0.a;
	var tree = _v0.c;
	var tail = _v0.d;
	var helper = F2(
		function (node, acc) {
			if (node.$ === 'SubTree') {
				var subTree = node.a;
				return A3($elm$core$Elm$JsArray$foldl, helper, acc, subTree);
			} else {
				return A2($elm$core$List$cons, node, acc);
			}
		});
	return {
		nodeList: A3($elm$core$Elm$JsArray$foldl, helper, _List_Nil, tree),
		nodeListSize: (len / $elm$core$Array$branchFactor) | 0,
		tail: tail
	};
};
var $elm$core$Array$append = F2(
	function (a, _v0) {
		var aTail = a.d;
		var bLen = _v0.a;
		var bTree = _v0.c;
		var bTail = _v0.d;
		if (_Utils_cmp(bLen, $elm$core$Array$branchFactor * 4) < 1) {
			var foldHelper = F2(
				function (node, array) {
					if (node.$ === 'SubTree') {
						var tree = node.a;
						return A3($elm$core$Elm$JsArray$foldl, foldHelper, array, tree);
					} else {
						var leaf = node.a;
						return A2($elm$core$Array$appendHelpTree, leaf, array);
					}
				});
			return A2(
				$elm$core$Array$appendHelpTree,
				bTail,
				A3($elm$core$Elm$JsArray$foldl, foldHelper, a, bTree));
		} else {
			var foldHelper = F2(
				function (node, builder) {
					if (node.$ === 'SubTree') {
						var tree = node.a;
						return A3($elm$core$Elm$JsArray$foldl, foldHelper, builder, tree);
					} else {
						var leaf = node.a;
						return A2($elm$core$Array$appendHelpBuilder, leaf, builder);
					}
				});
			return A2(
				$elm$core$Array$builderToArray,
				true,
				A2(
					$elm$core$Array$appendHelpBuilder,
					bTail,
					A3(
						$elm$core$Elm$JsArray$foldl,
						foldHelper,
						$elm$core$Array$builderFromArray(a),
						bTree)));
		}
	});
var $elm$core$Array$length = function (_v0) {
	var len = _v0.a;
	return len;
};
var $elm$core$Array$repeat = F2(
	function (n, e) {
		return A2(
			$elm$core$Array$initialize,
			n,
			function (_v0) {
				return e;
			});
	});
var $elm$core$List$drop = F2(
	function (n, list) {
		drop:
		while (true) {
			if (n <= 0) {
				return list;
			} else {
				if (!list.b) {
					return list;
				} else {
					var x = list.a;
					var xs = list.b;
					var $temp$n = n - 1,
						$temp$list = xs;
					n = $temp$n;
					list = $temp$list;
					continue drop;
				}
			}
		}
	});
var $elm$core$Array$tailIndex = function (len) {
	return (len >>> 5) << 5;
};
var $elm$core$Array$sliceLeft = F2(
	function (from, array) {
		var len = array.a;
		var tree = array.c;
		var tail = array.d;
		if (!from) {
			return array;
		} else {
			if (_Utils_cmp(
				from,
				$elm$core$Array$tailIndex(len)) > -1) {
				return A4(
					$elm$core$Array$Array_elm_builtin,
					len - from,
					$elm$core$Array$shiftStep,
					$elm$core$Elm$JsArray$empty,
					A3(
						$elm$core$Elm$JsArray$slice,
						from - $elm$core$Array$tailIndex(len),
						$elm$core$Elm$JsArray$length(tail),
						tail));
			} else {
				var skipNodes = (from / $elm$core$Array$branchFactor) | 0;
				var helper = F2(
					function (node, acc) {
						if (node.$ === 'SubTree') {
							var subTree = node.a;
							return A3($elm$core$Elm$JsArray$foldr, helper, acc, subTree);
						} else {
							var leaf = node.a;
							return A2($elm$core$List$cons, leaf, acc);
						}
					});
				var leafNodes = A3(
					$elm$core$Elm$JsArray$foldr,
					helper,
					_List_fromArray(
						[tail]),
					tree);
				var nodesToInsert = A2($elm$core$List$drop, skipNodes, leafNodes);
				if (!nodesToInsert.b) {
					return $elm$core$Array$empty;
				} else {
					var head = nodesToInsert.a;
					var rest = nodesToInsert.b;
					var firstSlice = from - (skipNodes * $elm$core$Array$branchFactor);
					var initialBuilder = {
						nodeList: _List_Nil,
						nodeListSize: 0,
						tail: A3(
							$elm$core$Elm$JsArray$slice,
							firstSlice,
							$elm$core$Elm$JsArray$length(head),
							head)
					};
					return A2(
						$elm$core$Array$builderToArray,
						true,
						A3($elm$core$List$foldl, $elm$core$Array$appendHelpBuilder, initialBuilder, rest));
				}
			}
		}
	});
var $elm$core$Array$fetchNewTail = F4(
	function (shift, end, treeEnd, tree) {
		fetchNewTail:
		while (true) {
			var pos = $elm$core$Array$bitMask & (treeEnd >>> shift);
			var _v0 = A2($elm$core$Elm$JsArray$unsafeGet, pos, tree);
			if (_v0.$ === 'SubTree') {
				var sub = _v0.a;
				var $temp$shift = shift - $elm$core$Array$shiftStep,
					$temp$end = end,
					$temp$treeEnd = treeEnd,
					$temp$tree = sub;
				shift = $temp$shift;
				end = $temp$end;
				treeEnd = $temp$treeEnd;
				tree = $temp$tree;
				continue fetchNewTail;
			} else {
				var values = _v0.a;
				return A3($elm$core$Elm$JsArray$slice, 0, $elm$core$Array$bitMask & end, values);
			}
		}
	});
var $elm$core$Array$hoistTree = F3(
	function (oldShift, newShift, tree) {
		hoistTree:
		while (true) {
			if ((_Utils_cmp(oldShift, newShift) < 1) || (!$elm$core$Elm$JsArray$length(tree))) {
				return tree;
			} else {
				var _v0 = A2($elm$core$Elm$JsArray$unsafeGet, 0, tree);
				if (_v0.$ === 'SubTree') {
					var sub = _v0.a;
					var $temp$oldShift = oldShift - $elm$core$Array$shiftStep,
						$temp$newShift = newShift,
						$temp$tree = sub;
					oldShift = $temp$oldShift;
					newShift = $temp$newShift;
					tree = $temp$tree;
					continue hoistTree;
				} else {
					return tree;
				}
			}
		}
	});
var $elm$core$Array$sliceTree = F3(
	function (shift, endIdx, tree) {
		var lastPos = $elm$core$Array$bitMask & (endIdx >>> shift);
		var _v0 = A2($elm$core$Elm$JsArray$unsafeGet, lastPos, tree);
		if (_v0.$ === 'SubTree') {
			var sub = _v0.a;
			var newSub = A3($elm$core$Array$sliceTree, shift - $elm$core$Array$shiftStep, endIdx, sub);
			return (!$elm$core$Elm$JsArray$length(newSub)) ? A3($elm$core$Elm$JsArray$slice, 0, lastPos, tree) : A3(
				$elm$core$Elm$JsArray$unsafeSet,
				lastPos,
				$elm$core$Array$SubTree(newSub),
				A3($elm$core$Elm$JsArray$slice, 0, lastPos + 1, tree));
		} else {
			return A3($elm$core$Elm$JsArray$slice, 0, lastPos, tree);
		}
	});
var $elm$core$Array$sliceRight = F2(
	function (end, array) {
		var len = array.a;
		var startShift = array.b;
		var tree = array.c;
		var tail = array.d;
		if (_Utils_eq(end, len)) {
			return array;
		} else {
			if (_Utils_cmp(
				end,
				$elm$core$Array$tailIndex(len)) > -1) {
				return A4(
					$elm$core$Array$Array_elm_builtin,
					end,
					startShift,
					tree,
					A3($elm$core$Elm$JsArray$slice, 0, $elm$core$Array$bitMask & end, tail));
			} else {
				var endIdx = $elm$core$Array$tailIndex(end);
				var depth = $elm$core$Basics$floor(
					A2(
						$elm$core$Basics$logBase,
						$elm$core$Array$branchFactor,
						A2($elm$core$Basics$max, 1, endIdx - 1)));
				var newShift = A2($elm$core$Basics$max, 5, depth * $elm$core$Array$shiftStep);
				return A4(
					$elm$core$Array$Array_elm_builtin,
					end,
					newShift,
					A3(
						$elm$core$Array$hoistTree,
						startShift,
						newShift,
						A3($elm$core$Array$sliceTree, startShift, endIdx, tree)),
					A4($elm$core$Array$fetchNewTail, startShift, end, endIdx, tree));
			}
		}
	});
var $elm$core$Array$translateIndex = F2(
	function (index, _v0) {
		var len = _v0.a;
		var posIndex = (index < 0) ? (len + index) : index;
		return (posIndex < 0) ? 0 : ((_Utils_cmp(posIndex, len) > 0) ? len : posIndex);
	});
var $elm$core$Array$slice = F3(
	function (from, to, array) {
		var correctTo = A2($elm$core$Array$translateIndex, to, array);
		var correctFrom = A2($elm$core$Array$translateIndex, from, array);
		return (_Utils_cmp(correctFrom, correctTo) > 0) ? $elm$core$Array$empty : A2(
			$elm$core$Array$sliceLeft,
			correctFrom,
			A2($elm$core$Array$sliceRight, correctTo, array));
	});
var $tortus$elm_array_2d$Array2D$ArrayHelpers$normalize = F3(
	function (length, filler, input) {
		var inputLength = $elm$core$Array$length(input);
		return (_Utils_cmp(inputLength, length) > 0) ? A3($elm$core$Array$slice, 0, length, input) : ((_Utils_cmp(inputLength, length) < 0) ? A2(
			$elm$core$Array$append,
			input,
			A2($elm$core$Array$repeat, length - inputLength, filler)) : input);
	});
var $elm$core$Array$push = F2(
	function (a, array) {
		var tail = array.d;
		return A2(
			$elm$core$Array$unsafeReplaceTail,
			A2($elm$core$Elm$JsArray$push, a, tail),
			array);
	});
var $tortus$elm_array_2d$Array2D$appendRow = F3(
	function (row, filler, array2d) {
		var normalizedRow = A3($tortus$elm_array_2d$Array2D$ArrayHelpers$normalize, array2d.columns, filler, row);
		var newRows = A2($elm$core$Array$push, normalizedRow, array2d.data);
		return _Utils_update(
			array2d,
			{data: newRows});
	});
var $elm$core$Array$foldl = F3(
	function (func, baseCase, _v0) {
		var tree = _v0.c;
		var tail = _v0.d;
		var helper = F2(
			function (node, acc) {
				if (node.$ === 'SubTree') {
					var subTree = node.a;
					return A3($elm$core$Elm$JsArray$foldl, helper, acc, subTree);
				} else {
					var values = node.a;
					return A3($elm$core$Elm$JsArray$foldl, func, acc, values);
				}
			});
		return A3(
			$elm$core$Elm$JsArray$foldl,
			func,
			A3($elm$core$Elm$JsArray$foldl, helper, baseCase, tree),
			tail);
	});
var $elm$core$Array$isEmpty = function (_v0) {
	var len = _v0.a;
	return !len;
};
var $elm$core$Basics$negate = function (n) {
	return -n;
};
var $tortus$elm_array_2d$Array2D$ArrayHelpers$minRowLength = function (array) {
	return $elm$core$Array$isEmpty(array) ? 0 : A3(
		$elm$core$Array$foldl,
		F2(
			function (row, min) {
				var rowLen = $elm$core$Array$length(row);
				return _Utils_eq(min, -1) ? rowLen : ((_Utils_cmp(rowLen, min) < 0) ? rowLen : min);
			}),
		-1,
		array);
};
var $elm$core$Elm$JsArray$map = _JsArray_map;
var $elm$core$Array$map = F2(
	function (func, _v0) {
		var len = _v0.a;
		var startShift = _v0.b;
		var tree = _v0.c;
		var tail = _v0.d;
		var helper = function (node) {
			if (node.$ === 'SubTree') {
				var subTree = node.a;
				return $elm$core$Array$SubTree(
					A2($elm$core$Elm$JsArray$map, helper, subTree));
			} else {
				var values = node.a;
				return $elm$core$Array$Leaf(
					A2($elm$core$Elm$JsArray$map, func, values));
			}
		};
		return A4(
			$elm$core$Array$Array_elm_builtin,
			len,
			startShift,
			A2($elm$core$Elm$JsArray$map, helper, tree),
			A2($elm$core$Elm$JsArray$map, func, tail));
	});
var $tortus$elm_array_2d$Array2D$ArrayHelpers$truncateRows = F2(
	function (columns, array) {
		return A2(
			$elm$core$Array$map,
			function (row) {
				return (_Utils_cmp(
					$elm$core$Array$length(row),
					columns) > 0) ? A3($elm$core$Array$slice, 0, columns, row) : row;
			},
			array);
	});
var $tortus$elm_array_2d$Array2D$ArrayHelpers$getMinColumnsAndTruncateRows = function (array) {
	var columns = $tortus$elm_array_2d$Array2D$ArrayHelpers$minRowLength(array);
	var normalizedData = A2($tortus$elm_array_2d$Array2D$ArrayHelpers$truncateRows, columns, array);
	return _Utils_Tuple2(columns, normalizedData);
};
var $tortus$elm_array_2d$Array2D$fromArray = function (array) {
	var _v0 = $tortus$elm_array_2d$Array2D$ArrayHelpers$getMinColumnsAndTruncateRows(array);
	var initialColumns = _v0.a;
	var normalizedData = _v0.b;
	return {columns: initialColumns, data: normalizedData};
};
var $elm$core$Array$fromListHelp = F3(
	function (list, nodeList, nodeListSize) {
		fromListHelp:
		while (true) {
			var _v0 = A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, list);
			var jsArray = _v0.a;
			var remainingItems = _v0.b;
			if (_Utils_cmp(
				$elm$core$Elm$JsArray$length(jsArray),
				$elm$core$Array$branchFactor) < 0) {
				return A2(
					$elm$core$Array$builderToArray,
					true,
					{nodeList: nodeList, nodeListSize: nodeListSize, tail: jsArray});
			} else {
				var $temp$list = remainingItems,
					$temp$nodeList = A2(
					$elm$core$List$cons,
					$elm$core$Array$Leaf(jsArray),
					nodeList),
					$temp$nodeListSize = nodeListSize + 1;
				list = $temp$list;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue fromListHelp;
			}
		}
	});
var $elm$core$Array$fromList = function (list) {
	if (!list.b) {
		return $elm$core$Array$empty;
	} else {
		return A3($elm$core$Array$fromListHelp, list, _List_Nil, 0);
	}
};
var $tortus$elm_array_2d$Array2D$rows = function (array2d) {
	return $elm$core$Array$length(array2d.data);
};
var $author$project$Utils$appendRow = F3(
	function (row, _default, data) {
		return (!$tortus$elm_array_2d$Array2D$rows(data)) ? $tortus$elm_array_2d$Array2D$fromArray(
			$elm$core$Array$fromList(
				_List_fromArray(
					[row]))) : A3($tortus$elm_array_2d$Array2D$appendRow, row, _default, data);
	});
var $elm$core$Array$getHelp = F3(
	function (shift, index, tree) {
		getHelp:
		while (true) {
			var pos = $elm$core$Array$bitMask & (index >>> shift);
			var _v0 = A2($elm$core$Elm$JsArray$unsafeGet, pos, tree);
			if (_v0.$ === 'SubTree') {
				var subTree = _v0.a;
				var $temp$shift = shift - $elm$core$Array$shiftStep,
					$temp$index = index,
					$temp$tree = subTree;
				shift = $temp$shift;
				index = $temp$index;
				tree = $temp$tree;
				continue getHelp;
			} else {
				var values = _v0.a;
				return A2($elm$core$Elm$JsArray$unsafeGet, $elm$core$Array$bitMask & index, values);
			}
		}
	});
var $elm$core$Array$get = F2(
	function (index, _v0) {
		var len = _v0.a;
		var startShift = _v0.b;
		var tree = _v0.c;
		var tail = _v0.d;
		return ((index < 0) || (_Utils_cmp(index, len) > -1)) ? $elm$core$Maybe$Nothing : ((_Utils_cmp(
			index,
			$elm$core$Array$tailIndex(len)) > -1) ? $elm$core$Maybe$Just(
			A2($elm$core$Elm$JsArray$unsafeGet, $elm$core$Array$bitMask & index, tail)) : $elm$core$Maybe$Just(
			A3($elm$core$Array$getHelp, startShift, index, tree)));
	});
var $elm$core$Elm$JsArray$indexedMap = _JsArray_indexedMap;
var $elm$core$Array$indexedMap = F2(
	function (func, _v0) {
		var len = _v0.a;
		var tree = _v0.c;
		var tail = _v0.d;
		var initialBuilder = {
			nodeList: _List_Nil,
			nodeListSize: 0,
			tail: A3(
				$elm$core$Elm$JsArray$indexedMap,
				func,
				$elm$core$Array$tailIndex(len),
				tail)
		};
		var helper = F2(
			function (node, builder) {
				if (node.$ === 'SubTree') {
					var subTree = node.a;
					return A3($elm$core$Elm$JsArray$foldl, helper, builder, subTree);
				} else {
					var leaf = node.a;
					var offset = builder.nodeListSize * $elm$core$Array$branchFactor;
					var mappedLeaf = $elm$core$Array$Leaf(
						A3($elm$core$Elm$JsArray$indexedMap, func, offset, leaf));
					return {
						nodeList: A2($elm$core$List$cons, mappedLeaf, builder.nodeList),
						nodeListSize: builder.nodeListSize + 1,
						tail: builder.tail
					};
				}
			});
		return A2(
			$elm$core$Array$builderToArray,
			true,
			A3($elm$core$Elm$JsArray$foldl, helper, initialBuilder, tree));
	});
var $tortus$elm_array_2d$Array2D$indexedMap = F2(
	function (func, array2d) {
		var mappedData = A2(
			$elm$core$Array$indexedMap,
			F2(
				function (row, rowAry) {
					return A2(
						$elm$core$Array$indexedMap,
						F2(
							function (col, value) {
								return A3(func, row, col, value);
							}),
						rowAry);
				}),
			array2d.data);
		return {columns: array2d.columns, data: mappedData};
	});
var $elm$core$Maybe$map = F2(
	function (f, maybe) {
		if (maybe.$ === 'Just') {
			var value = maybe.a;
			return $elm$core$Maybe$Just(
				f(value));
		} else {
			return $elm$core$Maybe$Nothing;
		}
	});
var $elm$core$Maybe$withDefault = F2(
	function (_default, maybe) {
		if (maybe.$ === 'Just') {
			var value = maybe.a;
			return value;
		} else {
			return _default;
		}
	});
var $author$project$AvitoTable$dataToCells = F3(
	function (defaultMkModel, info, data) {
		return A2(
			$tortus$elm_array_2d$Array2D$indexedMap,
			F3(
				function (_v0, j, val) {
					return A2(
						$elm$core$Maybe$withDefault,
						defaultMkModel,
						A2(
							$elm$core$Maybe$map,
							function ($) {
								return $.mkModel;
							},
							A2($elm$core$Array$get, j, info)))(val);
				}),
			data);
	});
var $author$project$AvitoCell$Input = function (a) {
	return {$: 'Input', a: a};
};
var $author$project$AvitoCell$Normal = {$: 'Normal'};
var $elm$json$Json$Encode$string = _Json_wrap;
var $elm$html$Html$Attributes$stringProperty = F2(
	function (key, string) {
		return A2(
			_VirtualDom_property,
			key,
			$elm$json$Json$Encode$string(string));
	});
var $elm$html$Html$Attributes$id = $elm$html$Html$Attributes$stringProperty('id');
var $elm$html$Html$input = _VirtualDom_node('input');
var $elm$html$Html$Events$alwaysStop = function (x) {
	return _Utils_Tuple2(x, true);
};
var $elm$virtual_dom$VirtualDom$MayStopPropagation = function (a) {
	return {$: 'MayStopPropagation', a: a};
};
var $elm$virtual_dom$VirtualDom$on = _VirtualDom_on;
var $elm$html$Html$Events$stopPropagationOn = F2(
	function (event, decoder) {
		return A2(
			$elm$virtual_dom$VirtualDom$on,
			event,
			$elm$virtual_dom$VirtualDom$MayStopPropagation(decoder));
	});
var $elm$html$Html$Events$targetValue = A2(
	$elm$json$Json$Decode$at,
	_List_fromArray(
		['target', 'value']),
	$elm$json$Json$Decode$string);
var $elm$html$Html$Events$onInput = function (tagger) {
	return A2(
		$elm$html$Html$Events$stopPropagationOn,
		'input',
		A2(
			$elm$json$Json$Decode$map,
			$elm$html$Html$Events$alwaysStop,
			A2($elm$json$Json$Decode$map, tagger, $elm$html$Html$Events$targetValue)));
};
var $elm$html$Html$span = _VirtualDom_node('span');
var $elm$virtual_dom$VirtualDom$style = _VirtualDom_style;
var $elm$html$Html$Attributes$style = $elm$virtual_dom$VirtualDom$style;
var $elm$html$Html$Attributes$tabindex = function (n) {
	return A2(
		_VirtualDom_attribute,
		'tabIndex',
		$elm$core$String$fromInt(n));
};
var $elm$virtual_dom$VirtualDom$text = _VirtualDom_text;
var $elm$html$Html$text = $elm$virtual_dom$VirtualDom$text;
var $elm$html$Html$Attributes$value = $elm$html$Html$Attributes$stringProperty('value');
var $author$project$AvitoCell$text = function (val0) {
	var focusId = function (key) {
		return 'cell-editable-input-' + key;
	};
	return {
		edit: F2(
			function (key, val) {
				return _List_fromArray(
					[
						A2(
						$elm$html$Html$input,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$id(
								focusId(key)),
								$elm$html$Html$Attributes$value(val),
								$elm$html$Html$Attributes$tabindex(-1),
								$elm$html$Html$Events$onInput($author$project$AvitoCell$Input),
								A2($elm$html$Html$Attributes$style, 'width', '580px'),
								A2($elm$html$Html$Attributes$style, 'border', '1px blue solid')
							]),
						_List_Nil)
					]);
			}),
		focusId: focusId,
		normal: F2(
			function (_v0, val) {
				return _List_fromArray(
					[
						A2(
						$elm$html$Html$span,
						_List_fromArray(
							[
								A2($elm$html$Html$Attributes$style, 'width', '600px')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text(val)
							]))
					]);
			}),
		status: $author$project$AvitoCell$Normal,
		value: val0
	};
};
var $author$project$AvitoTable$initModel = F2(
	function (hs, ds) {
		var ids1 = A2(
			$elm$core$Array$map,
			function (_v2) {
				var i = _v2.a;
				return $elm$core$Maybe$Just(i);
			},
			ds);
		var ids2 = A2($elm$core$Array$push, $elm$core$Maybe$Nothing, ids1);
		var ds1 = A2(
			$elm$core$Array$map,
			function (_v1) {
				var j = _v1.b;
				return j;
			},
			ds);
		var colsCnt = $elm$core$Array$length(hs);
		var ds2 = A3(
			$author$project$Utils$appendRow,
			A2($elm$core$Array$repeat, colsCnt, ''),
			'',
			$tortus$elm_array_2d$Array2D$fromArray(ds1));
		var cellsInfo = A2(
			$elm$core$Array$map,
			function (_v0) {
				var name = _v0.a;
				var mkModel = _v0.b;
				return {mkModel: mkModel, name: name};
			},
			hs);
		return {
			cells: A3($author$project$AvitoTable$dataToCells, $author$project$AvitoCell$text, cellsInfo, ds2),
			cellsInfo: cellsInfo,
			colsCnt: colsCnt,
			current: $elm$core$Maybe$Nothing,
			ids: ids2,
			rowsCnt: $elm$core$Array$length(ds) + 1
		};
	});
var $elm$core$Platform$Sub$map = _Platform_map;
var $author$project$AvitoTable$Paste = function (a) {
	return {$: 'Paste', a: a};
};
var $author$project$AvitoTable$pasteReceiver = _Platform_incomingPort('pasteReceiver', $elm$json$Json$Decode$string);
var $author$project$AvitoTable$subscriptions = function (_v0) {
	return $author$project$AvitoTable$pasteReceiver($author$project$AvitoTable$Paste);
};
var $author$project$AvitoApp$Failure = function (a) {
	return {$: 'Failure', a: a};
};
var $author$project$AvitoApp$Success = {$: 'Success'};
var $elm$core$Maybe$andThen = F2(
	function (callback, maybeValue) {
		if (maybeValue.$ === 'Just') {
			var value = maybeValue.a;
			return callback(value);
		} else {
			return $elm$core$Maybe$Nothing;
		}
	});
var $author$project$AvitoApp$Post = function (id) {
	return function (oid) {
		return function (category) {
			return function (title) {
				return function (description) {
					return function (price) {
						return function (imageUrl) {
							return function (videoUrl) {
								return function (addrRegion) {
									return function (addrCity) {
										return function (addrPoint) {
											return function (addrStreet) {
												return function (addrHouse) {
													return function (contactPhone) {
														return function (fields) {
															return {addrCity: addrCity, addrHouse: addrHouse, addrPoint: addrPoint, addrRegion: addrRegion, addrStreet: addrStreet, category: category, contactPhone: contactPhone, description: description, fields: fields, id: id, imageUrl: imageUrl, oid: oid, price: price, title: title, videoUrl: videoUrl};
														};
													};
												};
											};
										};
									};
								};
							};
						};
					};
				};
			};
		};
	};
};
var $elm$core$Maybe$map2 = F3(
	function (func, ma, mb) {
		if (ma.$ === 'Nothing') {
			return $elm$core$Maybe$Nothing;
		} else {
			var a = ma.a;
			if (mb.$ === 'Nothing') {
				return $elm$core$Maybe$Nothing;
			} else {
				var b = mb.a;
				return $elm$core$Maybe$Just(
					A2(func, a, b));
			}
		}
	});
var $elm_community$maybe_extra$Maybe$Extra$andMap = $elm$core$Maybe$map2($elm$core$Basics$apR);
var $author$project$AvitoApp$arrayToPost = F3(
	function (id, oid, ds) {
		return A2(
			$elm_community$maybe_extra$Maybe$Extra$andMap,
			$elm$core$Maybe$Just(
				A3(
					$elm$core$Array$slice,
					10,
					$elm$core$Array$length(ds) - 1,
					ds)),
			A2(
				$elm_community$maybe_extra$Maybe$Extra$andMap,
				A2($elm$core$Array$get, 10, ds),
				A2(
					$elm_community$maybe_extra$Maybe$Extra$andMap,
					A2($elm$core$Array$get, 9, ds),
					A2(
						$elm_community$maybe_extra$Maybe$Extra$andMap,
						A2($elm$core$Array$get, 8, ds),
						A2(
							$elm_community$maybe_extra$Maybe$Extra$andMap,
							A2($elm$core$Array$get, 7, ds),
							A2(
								$elm_community$maybe_extra$Maybe$Extra$andMap,
								A2($elm$core$Array$get, 6, ds),
								A2(
									$elm_community$maybe_extra$Maybe$Extra$andMap,
									A2($elm$core$Array$get, 5, ds),
									A2(
										$elm_community$maybe_extra$Maybe$Extra$andMap,
										A2($elm$core$Array$get, 4, ds),
										A2(
											$elm_community$maybe_extra$Maybe$Extra$andMap,
											$elm$core$Maybe$Just(_List_Nil),
											A2(
												$elm_community$maybe_extra$Maybe$Extra$andMap,
												A2($elm$core$Array$get, 3, ds),
												A2(
													$elm_community$maybe_extra$Maybe$Extra$andMap,
													A2($elm$core$Array$get, 2, ds),
													A2(
														$elm_community$maybe_extra$Maybe$Extra$andMap,
														A2($elm$core$Array$get, 1, ds),
														A2(
															$elm_community$maybe_extra$Maybe$Extra$andMap,
															A2($elm$core$Array$get, 0, ds),
															$elm$core$Maybe$Just(
																A2(
																	$author$project$AvitoApp$Post,
																	id,
																	A2($elm$core$Maybe$withDefault, '', oid))))))))))))))));
	});
var $elm$core$Platform$Cmd$batch = _Platform_batch;
var $elm_community$maybe_extra$Maybe$Extra$combine = A2(
	$elm$core$List$foldr,
	$elm$core$Maybe$map2($elm$core$List$cons),
	$elm$core$Maybe$Just(_List_Nil));
var $elm$core$Dict$fromList = function (assocs) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (_v0, dict) {
				var key = _v0.a;
				var value = _v0.b;
				return A3($elm$core$Dict$insert, key, value, dict);
			}),
		$elm$core$Dict$empty,
		assocs);
};
var $author$project$AvitoApp$GotInitialData = function (a) {
	return {$: 'GotInitialData', a: a};
};
var $author$project$AvitoApp$Image = F2(
	function (name, url) {
		return {name: name, url: url};
	});
var $elm_community$json_extra$Json$Decode$Extra$andMap = $elm$json$Json$Decode$map2($elm$core$Basics$apR);
var $elm_community$maybe_extra$Maybe$Extra$combineArray = A2(
	$elm$core$Array$foldl,
	$elm$core$Maybe$map2($elm$core$Array$push),
	$elm$core$Maybe$Just($elm$core$Array$empty));
var $elm$json$Json$Decode$keyValuePairs = _Json_decodeKeyValuePairs;
var $elm$json$Json$Decode$dict = function (decoder) {
	return A2(
		$elm$json$Json$Decode$map,
		$elm$core$Dict$fromList,
		$elm$json$Json$Decode$keyValuePairs(decoder));
};
var $author$project$AvitoApp$decodePostPost = function (meta) {
	var dict2array = function (d) {
		return A2(
			$elm$core$Maybe$withDefault,
			$elm$core$Array$empty,
			$elm_community$maybe_extra$Maybe$Extra$combineArray(
				A2(
					$elm$core$Array$map,
					function (f) {
						return A2($elm$core$Dict$get, f.name, d);
					},
					meta.fields)));
	};
	return A2(
		$elm$json$Json$Decode$map,
		dict2array,
		$elm$json$Json$Decode$dict($elm$json$Json$Decode$string));
};
var $elm$json$Json$Decode$int = _Json_decodeInt;
var $author$project$AvitoApp$decodePostList = function (meta) {
	return $elm$json$Json$Decode$list(
		A2(
			$elm_community$json_extra$Json$Decode$Extra$andMap,
			A2(
				$elm$json$Json$Decode$field,
				'_postPost',
				$author$project$AvitoApp$decodePostPost(meta)),
			A2(
				$elm_community$json_extra$Json$Decode$Extra$andMap,
				A2($elm$json$Json$Decode$field, '_postContactPhone', $elm$json$Json$Decode$string),
				A2(
					$elm_community$json_extra$Json$Decode$Extra$andMap,
					A2($elm$json$Json$Decode$field, '_postAddrHouse', $elm$json$Json$Decode$string),
					A2(
						$elm_community$json_extra$Json$Decode$Extra$andMap,
						A2($elm$json$Json$Decode$field, '_postAddrStreet', $elm$json$Json$Decode$string),
						A2(
							$elm_community$json_extra$Json$Decode$Extra$andMap,
							A2($elm$json$Json$Decode$field, '_postAddrPoint', $elm$json$Json$Decode$string),
							A2(
								$elm_community$json_extra$Json$Decode$Extra$andMap,
								A2($elm$json$Json$Decode$field, '_postAddrCity', $elm$json$Json$Decode$string),
								A2(
									$elm_community$json_extra$Json$Decode$Extra$andMap,
									A2($elm$json$Json$Decode$field, '_postAddrRegion', $elm$json$Json$Decode$string),
									A2(
										$elm_community$json_extra$Json$Decode$Extra$andMap,
										A2($elm$json$Json$Decode$field, '_postVideoUrl', $elm$json$Json$Decode$string),
										A2(
											$elm_community$json_extra$Json$Decode$Extra$andMap,
											A2(
												$elm$json$Json$Decode$field,
												'_postImageUrl',
												$elm$json$Json$Decode$list(
													A3(
														$elm$json$Json$Decode$map2,
														F2(
															function (a, b) {
																return A2($author$project$AvitoApp$Image, a, b);
															}),
														A2($elm$json$Json$Decode$index, 0, $elm$json$Json$Decode$string),
														A2($elm$json$Json$Decode$index, 1, $elm$json$Json$Decode$string)))),
											A2(
												$elm_community$json_extra$Json$Decode$Extra$andMap,
												A2($elm$json$Json$Decode$field, '_postPrice', $elm$json$Json$Decode$string),
												A2(
													$elm_community$json_extra$Json$Decode$Extra$andMap,
													A2($elm$json$Json$Decode$field, '_postDescription', $elm$json$Json$Decode$string),
													A2(
														$elm_community$json_extra$Json$Decode$Extra$andMap,
														A2($elm$json$Json$Decode$field, '_postTitle', $elm$json$Json$Decode$string),
														A2(
															$elm_community$json_extra$Json$Decode$Extra$andMap,
															A2($elm$json$Json$Decode$field, '_postCategory', $elm$json$Json$Decode$string),
															A2(
																$elm_community$json_extra$Json$Decode$Extra$andMap,
																A2($elm$json$Json$Decode$field, '_postOid', $elm$json$Json$Decode$string),
																A2(
																	$elm_community$json_extra$Json$Decode$Extra$andMap,
																	A2($elm$json$Json$Decode$field, '_postId', $elm$json$Json$Decode$int),
																	$elm$json$Json$Decode$succeed($author$project$AvitoApp$Post)))))))))))))))));
};
var $author$project$AvitoApp$getData = function (meta) {
	return $elm$http$Http$get(
		{
			expect: A2(
				$elm$http$Http$expectJson,
				$author$project$AvitoApp$GotInitialData,
				$author$project$AvitoApp$decodePostList(meta)),
			url: 'api/data/for_house'
		});
};
var $author$project$AvitoApp$GotRandText = F2(
	function (a, b) {
		return {$: 'GotRandText', a: a, b: b};
	});
var $elm$json$Json$Encode$int = _Json_wrap;
var $elm$http$Http$jsonBody = function (value) {
	return A2(
		_Http_pair,
		'application/json',
		A2($elm$json$Json$Encode$encode, 0, value));
};
var $elm$json$Json$Encode$object = function (pairs) {
	return _Json_wrap(
		A3(
			$elm$core$List$foldl,
			F2(
				function (_v0, obj) {
					var k = _v0.a;
					var v = _v0.b;
					return A3(_Json_addField, k, v, obj);
				}),
			_Json_emptyObject(_Utils_Tuple0),
			pairs));
};
var $author$project$AvitoApp$getRandText = F3(
	function (count, i, str) {
		return $elm$http$Http$request(
			{
				body: $elm$http$Http$jsonBody(
					$elm$json$Json$Encode$object(
						_List_fromArray(
							[
								_Utils_Tuple2(
								'text',
								$elm$json$Json$Encode$string(str)),
								_Utils_Tuple2(
								'count',
								$elm$json$Json$Encode$int(count))
							]))),
				expect: A2(
					$elm$http$Http$expectJson,
					$author$project$AvitoApp$GotRandText(i),
					$elm$json$Json$Decode$list($elm$json$Json$Decode$string)),
				headers: _List_Nil,
				method: 'POST',
				timeout: $elm$core$Maybe$Nothing,
				tracker: $elm$core$Maybe$Nothing,
				url: '/randtext/'
			});
	});
var $elm$core$List$head = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return $elm$core$Maybe$Just(x);
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $elm$core$Debug$log = _Debug_log;
var $elm$core$Platform$Cmd$map = _Platform_map;
var $elm$core$Tuple$mapFirst = F2(
	function (func, _v0) {
		var x = _v0.a;
		var y = _v0.b;
		return _Utils_Tuple2(
			func(x),
			y);
	});
var $elm$core$Platform$Cmd$none = $elm$core$Platform$Cmd$batch(_List_Nil);
var $author$project$AvitoApp$postToArray = function (row) {
	var l1 = $elm$core$Array$fromList(
		_List_fromArray(
			[row.category, row.title, row.description, row.price, row.videoUrl, row.addrRegion, row.addrCity, row.addrPoint, row.addrStreet, row.addrHouse, row.contactPhone]));
	return A2($elm$core$Array$append, l1, row.fields);
};
var $author$project$AvitoApp$RemovedImage = function (a) {
	return {$: 'RemovedImage', a: a};
};
var $elm$http$Http$expectBytesResponse = F2(
	function (toMsg, toResult) {
		return A3(
			_Http_expect,
			'arraybuffer',
			_Http_toDataView,
			A2($elm$core$Basics$composeR, toResult, toMsg));
	});
var $elm$http$Http$expectWhatever = function (toMsg) {
	return A2(
		$elm$http$Http$expectBytesResponse,
		toMsg,
		$elm$http$Http$resolve(
			function (_v0) {
				return $elm$core$Result$Ok(_Utils_Tuple0);
			}));
};
var $author$project$AvitoApp$removeImage = F2(
	function (bucket, name) {
		return $elm$http$Http$request(
			{
				body: $elm$http$Http$emptyBody,
				expect: $elm$http$Http$expectWhatever($author$project$AvitoApp$RemovedImage),
				headers: _List_Nil,
				method: 'DELETE',
				timeout: $elm$core$Maybe$Nothing,
				tracker: $elm$core$Maybe$Nothing,
				url: '/api/images/' + (bucket + ('/' + name))
			});
	});
var $TSFoster$elm_uuid$UUID$Compact = {$: 'Compact'};
var $author$project$AvitoApp$DataPosted = function (a) {
	return {$: 'DataPosted', a: a};
};
var $author$project$AvitoApp$ProcedureMsg = function (a) {
	return {$: 'ProcedureMsg', a: a};
};
var $elm$core$Basics$composeL = F3(
	function (g, f, x) {
		return g(
			f(x));
	});
var $elm$core$Task$fail = _Scheduler_fail;
var $brian_watkins$elm_procedure$Procedure$Internal$Procedure = function (a) {
	return {$: 'Procedure', a: a};
};
var $elm$core$Task$onError = _Scheduler_onError;
var $elm$core$Task$attempt = F2(
	function (resultToMessage, task) {
		return $elm$core$Task$command(
			$elm$core$Task$Perform(
				A2(
					$elm$core$Task$onError,
					A2(
						$elm$core$Basics$composeL,
						A2($elm$core$Basics$composeL, $elm$core$Task$succeed, resultToMessage),
						$elm$core$Result$Err),
					A2(
						$elm$core$Task$andThen,
						A2(
							$elm$core$Basics$composeL,
							A2($elm$core$Basics$composeL, $elm$core$Task$succeed, resultToMessage),
							$elm$core$Result$Ok),
						task))));
	});
var $brian_watkins$elm_procedure$Procedure$fromTask = function (task) {
	return $brian_watkins$elm_procedure$Procedure$Internal$Procedure(
		F3(
			function (procId, msgTagger, resultTagger) {
				return A2($elm$core$Task$attempt, resultTagger, task);
			}));
};
var $brian_watkins$elm_procedure$Procedure$break = A2($elm$core$Basics$composeL, $brian_watkins$elm_procedure$Procedure$fromTask, $elm$core$Task$fail);
var $brian_watkins$elm_procedure$Procedure$Internal$Execute = F2(
	function (a, b) {
		return {$: 'Execute', a: a, b: b};
	});
var $brian_watkins$elm_procedure$Procedure$next = F2(
	function (_v0, resultMapper) {
		var procedure = _v0.a;
		return $brian_watkins$elm_procedure$Procedure$Internal$Procedure(
			F3(
				function (procId, msgTagger, tagger) {
					return A3(
						procedure,
						procId,
						msgTagger,
						function (aResult) {
							var _v1 = resultMapper(aResult);
							var nextProcedure = _v1.a;
							return A3(
								$elm$core$Basics$composeL,
								msgTagger,
								$brian_watkins$elm_procedure$Procedure$Internal$Execute(procId),
								A3(nextProcedure, procId, msgTagger, tagger));
						});
				}));
	});
var $brian_watkins$elm_procedure$Procedure$andThen = F2(
	function (generator, procedure) {
		return A2(
			$brian_watkins$elm_procedure$Procedure$next,
			procedure,
			function (aResult) {
				if (aResult.$ === 'Ok') {
					var aData = aResult.a;
					return generator(aData);
				} else {
					var eData = aResult.a;
					return $brian_watkins$elm_procedure$Procedure$break(eData);
				}
			});
	});
var $elm$random$Random$Generator = function (a) {
	return {$: 'Generator', a: a};
};
var $elm$random$Random$andThen = F2(
	function (callback, _v0) {
		var genA = _v0.a;
		return $elm$random$Random$Generator(
			function (seed) {
				var _v1 = genA(seed);
				var result = _v1.a;
				var newSeed = _v1.b;
				var _v2 = callback(result);
				var genB = _v2.a;
				return genB(newSeed);
			});
	});
var $elm$random$Random$constant = function (value) {
	return $elm$random$Random$Generator(
		function (seed) {
			return _Utils_Tuple2(value, seed);
		});
};
var $brian_watkins$elm_procedure$Procedure$fetch = function (generator) {
	return $brian_watkins$elm_procedure$Procedure$Internal$Procedure(
		F3(
			function (_v0, _v1, tagger) {
				return generator(
					A2($elm$core$Basics$composeL, tagger, $elm$core$Result$Ok));
			}));
};
var $brian_watkins$elm_procedure$Procedure$fetchResult = function (generator) {
	return $brian_watkins$elm_procedure$Procedure$Internal$Procedure(
		F3(
			function (_v0, _v1, tagger) {
				return generator(tagger);
			}));
};
var $elm$random$Random$Generate = function (a) {
	return {$: 'Generate', a: a};
};
var $elm$random$Random$Seed = F2(
	function (a, b) {
		return {$: 'Seed', a: a, b: b};
	});
var $elm$random$Random$next = function (_v0) {
	var state0 = _v0.a;
	var incr = _v0.b;
	return A2($elm$random$Random$Seed, ((state0 * 1664525) + incr) >>> 0, incr);
};
var $elm$random$Random$initialSeed = function (x) {
	var _v0 = $elm$random$Random$next(
		A2($elm$random$Random$Seed, 0, 1013904223));
	var state1 = _v0.a;
	var incr = _v0.b;
	var state2 = (state1 + x) >>> 0;
	return $elm$random$Random$next(
		A2($elm$random$Random$Seed, state2, incr));
};
var $elm$time$Time$Name = function (a) {
	return {$: 'Name', a: a};
};
var $elm$time$Time$Offset = function (a) {
	return {$: 'Offset', a: a};
};
var $elm$time$Time$Zone = F2(
	function (a, b) {
		return {$: 'Zone', a: a, b: b};
	});
var $elm$time$Time$customZone = $elm$time$Time$Zone;
var $elm$time$Time$Posix = function (a) {
	return {$: 'Posix', a: a};
};
var $elm$time$Time$millisToPosix = $elm$time$Time$Posix;
var $elm$time$Time$now = _Time_now($elm$time$Time$millisToPosix);
var $elm$time$Time$posixToMillis = function (_v0) {
	var millis = _v0.a;
	return millis;
};
var $elm$random$Random$init = A2(
	$elm$core$Task$andThen,
	function (time) {
		return $elm$core$Task$succeed(
			$elm$random$Random$initialSeed(
				$elm$time$Time$posixToMillis(time)));
	},
	$elm$time$Time$now);
var $elm$random$Random$step = F2(
	function (_v0, seed) {
		var generator = _v0.a;
		return generator(seed);
	});
var $elm$random$Random$onEffects = F3(
	function (router, commands, seed) {
		if (!commands.b) {
			return $elm$core$Task$succeed(seed);
		} else {
			var generator = commands.a.a;
			var rest = commands.b;
			var _v1 = A2($elm$random$Random$step, generator, seed);
			var value = _v1.a;
			var newSeed = _v1.b;
			return A2(
				$elm$core$Task$andThen,
				function (_v2) {
					return A3($elm$random$Random$onEffects, router, rest, newSeed);
				},
				A2($elm$core$Platform$sendToApp, router, value));
		}
	});
var $elm$random$Random$onSelfMsg = F3(
	function (_v0, _v1, seed) {
		return $elm$core$Task$succeed(seed);
	});
var $elm$random$Random$map = F2(
	function (func, _v0) {
		var genA = _v0.a;
		return $elm$random$Random$Generator(
			function (seed0) {
				var _v1 = genA(seed0);
				var a = _v1.a;
				var seed1 = _v1.b;
				return _Utils_Tuple2(
					func(a),
					seed1);
			});
	});
var $elm$random$Random$cmdMap = F2(
	function (func, _v0) {
		var generator = _v0.a;
		return $elm$random$Random$Generate(
			A2($elm$random$Random$map, func, generator));
	});
_Platform_effectManagers['Random'] = _Platform_createManager($elm$random$Random$init, $elm$random$Random$onEffects, $elm$random$Random$onSelfMsg, $elm$random$Random$cmdMap);
var $elm$random$Random$command = _Platform_leaf('Random');
var $elm$random$Random$generate = F2(
	function (tagger, generator) {
		return $elm$random$Random$command(
			$elm$random$Random$Generate(
				A2($elm$random$Random$map, tagger, generator)));
	});
var $TSFoster$elm_uuid$UUID$UUID = F4(
	function (a, b, c, d) {
		return {$: 'UUID', a: a, b: b, c: c, d: d};
	});
var $elm$random$Random$map4 = F5(
	function (func, _v0, _v1, _v2, _v3) {
		var genA = _v0.a;
		var genB = _v1.a;
		var genC = _v2.a;
		var genD = _v3.a;
		return $elm$random$Random$Generator(
			function (seed0) {
				var _v4 = genA(seed0);
				var a = _v4.a;
				var seed1 = _v4.b;
				var _v5 = genB(seed1);
				var b = _v5.a;
				var seed2 = _v5.b;
				var _v6 = genC(seed2);
				var c = _v6.a;
				var seed3 = _v6.b;
				var _v7 = genD(seed3);
				var d = _v7.a;
				var seed4 = _v7.b;
				return _Utils_Tuple2(
					A4(func, a, b, c, d),
					seed4);
			});
	});
var $TSFoster$elm_uuid$UUID$forceUnsigned = $elm$core$Bitwise$shiftRightZfBy(0);
var $elm$core$Bitwise$xor = _Bitwise_xor;
var $elm$random$Random$peel = function (_v0) {
	var state = _v0.a;
	var word = (state ^ (state >>> ((state >>> 28) + 4))) * 277803737;
	return ((word >>> 22) ^ word) >>> 0;
};
var $elm$random$Random$int = F2(
	function (a, b) {
		return $elm$random$Random$Generator(
			function (seed0) {
				var _v0 = (_Utils_cmp(a, b) < 0) ? _Utils_Tuple2(a, b) : _Utils_Tuple2(b, a);
				var lo = _v0.a;
				var hi = _v0.b;
				var range = (hi - lo) + 1;
				if (!((range - 1) & range)) {
					return _Utils_Tuple2(
						(((range - 1) & $elm$random$Random$peel(seed0)) >>> 0) + lo,
						$elm$random$Random$next(seed0));
				} else {
					var threshhold = (((-range) >>> 0) % range) >>> 0;
					var accountForBias = function (seed) {
						accountForBias:
						while (true) {
							var x = $elm$random$Random$peel(seed);
							var seedN = $elm$random$Random$next(seed);
							if (_Utils_cmp(x, threshhold) < 0) {
								var $temp$seed = seedN;
								seed = $temp$seed;
								continue accountForBias;
							} else {
								return _Utils_Tuple2((x % range) + lo, seedN);
							}
						}
					};
					return accountForBias(seed0);
				}
			});
	});
var $elm$random$Random$maxInt = 2147483647;
var $elm$random$Random$minInt = -2147483648;
var $TSFoster$elm_uuid$UUID$randomU32 = A2(
	$elm$random$Random$map,
	$TSFoster$elm_uuid$UUID$forceUnsigned,
	A2($elm$random$Random$int, $elm$random$Random$minInt, $elm$random$Random$maxInt));
var $elm$core$Bitwise$or = _Bitwise_or;
var $TSFoster$elm_uuid$UUID$toVariant1 = function (_v0) {
	var a = _v0.a;
	var b = _v0.b;
	var c = _v0.c;
	var d = _v0.d;
	return A4(
		$TSFoster$elm_uuid$UUID$UUID,
		a,
		b,
		$TSFoster$elm_uuid$UUID$forceUnsigned(2147483648 | (1073741823 & c)),
		d);
};
var $TSFoster$elm_uuid$UUID$toVersion = F2(
	function (v, _v0) {
		var a = _v0.a;
		var b = _v0.b;
		var c = _v0.c;
		var d = _v0.d;
		return A4(
			$TSFoster$elm_uuid$UUID$UUID,
			a,
			$TSFoster$elm_uuid$UUID$forceUnsigned((v << 12) | (4294905855 & b)),
			c,
			d);
	});
var $TSFoster$elm_uuid$UUID$generator = A2(
	$elm$random$Random$map,
	A2(
		$elm$core$Basics$composeR,
		$TSFoster$elm_uuid$UUID$toVersion(4),
		$TSFoster$elm_uuid$UUID$toVariant1),
	A5($elm$random$Random$map4, $TSFoster$elm_uuid$UUID$UUID, $TSFoster$elm_uuid$UUID$randomU32, $TSFoster$elm_uuid$UUID$randomU32, $TSFoster$elm_uuid$UUID$randomU32, $TSFoster$elm_uuid$UUID$randomU32));
var $elm$json$Json$Encode$list = F2(
	function (func, entries) {
		return _Json_wrap(
			A3(
				$elm$core$List$foldl,
				_Json_addEntry(func),
				_Json_emptyArray(_Utils_Tuple0),
				entries));
	});
var $elm$http$Http$post = function (r) {
	return $elm$http$Http$request(
		{body: r.body, expect: r.expect, headers: _List_Nil, method: 'POST', timeout: $elm$core$Maybe$Nothing, tracker: $elm$core$Maybe$Nothing, url: r.url});
};
var $elm_community$array_extra$Array$Extra$map2 = F3(
	function (combineAb, aArray, bArray) {
		return $elm$core$Array$fromList(
			A3(
				$elm$core$List$map2,
				combineAb,
				$elm$core$Array$toList(aArray),
				$elm$core$Array$toList(bArray)));
	});
var $elm$core$Tuple$pair = F2(
	function (a, b) {
		return _Utils_Tuple2(a, b);
	});
var $elm_community$array_extra$Array$Extra$zip = $elm_community$array_extra$Array$Extra$map2($elm$core$Tuple$pair);
var $author$project$AvitoApp$postToValue = F2(
	function (meta, row) {
		var fields = $elm$core$Array$toList(
			A2(
				$elm_community$array_extra$Array$Extra$zip,
				A2(
					$elm$core$Array$map,
					function ($) {
						return $.name;
					},
					meta.fields),
				A2(
					$elm$core$Array$map,
					function (s) {
						return $elm$json$Json$Encode$string(s);
					},
					row.fields)));
		return $elm$json$Json$Encode$object(
			_List_fromArray(
				[
					_Utils_Tuple2(
					'_postId',
					$elm$json$Json$Encode$int(row.id)),
					_Utils_Tuple2(
					'_postOid',
					$elm$json$Json$Encode$string(row.oid)),
					_Utils_Tuple2(
					'_postCategory',
					$elm$json$Json$Encode$string(row.category)),
					_Utils_Tuple2(
					'_postTitle',
					$elm$json$Json$Encode$string(row.title)),
					_Utils_Tuple2(
					'_postDescription',
					$elm$json$Json$Encode$string(row.description)),
					_Utils_Tuple2(
					'_postPrice',
					$elm$json$Json$Encode$string(row.price)),
					_Utils_Tuple2(
					'_postImageUrl',
					A2(
						$elm$json$Json$Encode$list,
						function (x) {
							return A2(
								$elm$json$Json$Encode$list,
								$elm$json$Json$Encode$string,
								_List_fromArray(
									[x.name, x.url]));
						},
						row.imageUrl)),
					_Utils_Tuple2(
					'_postVideoUrl',
					$elm$json$Json$Encode$string(row.videoUrl)),
					_Utils_Tuple2(
					'_postAddrRegion',
					$elm$json$Json$Encode$string(row.addrRegion)),
					_Utils_Tuple2(
					'_postAddrCity',
					$elm$json$Json$Encode$string(row.addrCity)),
					_Utils_Tuple2(
					'_postAddrPoint',
					$elm$json$Json$Encode$string(row.addrPoint)),
					_Utils_Tuple2(
					'_postAddrStreet',
					$elm$json$Json$Encode$string(row.addrStreet)),
					_Utils_Tuple2(
					'_postAddrHouse',
					$elm$json$Json$Encode$string(row.addrHouse)),
					_Utils_Tuple2(
					'_postContactPhone',
					$elm$json$Json$Encode$string(row.contactPhone)),
					_Utils_Tuple2(
					'_postPost',
					$elm$json$Json$Encode$object(fields))
				]));
	});
var $elm$core$String$cons = _String_cons;
var $elm$core$String$fromChar = function (_char) {
	return A2($elm$core$String$cons, _char, '');
};
var $elm$core$Bitwise$shiftRightBy = _Bitwise_shiftRightBy;
var $elm$core$String$repeatHelp = F3(
	function (n, chunk, result) {
		return (n <= 0) ? result : A3(
			$elm$core$String$repeatHelp,
			n >> 1,
			_Utils_ap(chunk, chunk),
			(!(n & 1)) ? result : _Utils_ap(result, chunk));
	});
var $elm$core$String$repeat = F2(
	function (n, chunk) {
		return A3($elm$core$String$repeatHelp, n, chunk, '');
	});
var $elm$core$String$padLeft = F3(
	function (n, _char, string) {
		return _Utils_ap(
			A2(
				$elm$core$String$repeat,
				n - $elm$core$String$length(string),
				$elm$core$String$fromChar(_char)),
			string);
	});
var $elm$core$String$fromList = _String_fromList;
var $TSFoster$elm_uuid$UUID$toHex = F2(
	function (acc, _int) {
		toHex:
		while (true) {
			if (!_int) {
				return $elm$core$String$fromList(acc);
			} else {
				var _char = function () {
					var _v0 = 15 & _int;
					switch (_v0) {
						case 0:
							return _Utils_chr('0');
						case 1:
							return _Utils_chr('1');
						case 2:
							return _Utils_chr('2');
						case 3:
							return _Utils_chr('3');
						case 4:
							return _Utils_chr('4');
						case 5:
							return _Utils_chr('5');
						case 6:
							return _Utils_chr('6');
						case 7:
							return _Utils_chr('7');
						case 8:
							return _Utils_chr('8');
						case 9:
							return _Utils_chr('9');
						case 10:
							return _Utils_chr('a');
						case 11:
							return _Utils_chr('b');
						case 12:
							return _Utils_chr('c');
						case 13:
							return _Utils_chr('d');
						case 14:
							return _Utils_chr('e');
						default:
							return _Utils_chr('f');
					}
				}();
				var $temp$acc = A2($elm$core$List$cons, _char, acc),
					$temp$int = _int >>> 4;
				acc = $temp$acc;
				_int = $temp$int;
				continue toHex;
			}
		}
	});
var $TSFoster$elm_uuid$UUID$toStringWith = F2(
	function (sep, _v0) {
		var a = _v0.a;
		var b = _v0.b;
		var c = _v0.c;
		var d = _v0.d;
		return _Utils_ap(
			A3(
				$elm$core$String$padLeft,
				8,
				_Utils_chr('0'),
				A2($TSFoster$elm_uuid$UUID$toHex, _List_Nil, a)),
			_Utils_ap(
				sep,
				_Utils_ap(
					A3(
						$elm$core$String$padLeft,
						4,
						_Utils_chr('0'),
						A2($TSFoster$elm_uuid$UUID$toHex, _List_Nil, b >>> 16)),
					_Utils_ap(
						sep,
						_Utils_ap(
							A3(
								$elm$core$String$padLeft,
								4,
								_Utils_chr('0'),
								A2($TSFoster$elm_uuid$UUID$toHex, _List_Nil, 65535 & b)),
							_Utils_ap(
								sep,
								_Utils_ap(
									A3(
										$elm$core$String$padLeft,
										4,
										_Utils_chr('0'),
										A2($TSFoster$elm_uuid$UUID$toHex, _List_Nil, c >>> 16)),
									_Utils_ap(
										sep,
										_Utils_ap(
											A3(
												$elm$core$String$padLeft,
												4,
												_Utils_chr('0'),
												A2($TSFoster$elm_uuid$UUID$toHex, _List_Nil, 65535 & c)),
											A3(
												$elm$core$String$padLeft,
												8,
												_Utils_chr('0'),
												A2($TSFoster$elm_uuid$UUID$toHex, _List_Nil, d)))))))))));
	});
var $TSFoster$elm_uuid$UUID$toString = $TSFoster$elm_uuid$UUID$toStringWith('-');
var $TSFoster$elm_uuid$UUID$toRepresentation = F2(
	function (representation, uuid) {
		switch (representation.$) {
			case 'Canonical':
				return $TSFoster$elm_uuid$UUID$toString(uuid);
			case 'Urn':
				return 'urn:uuid:' + $TSFoster$elm_uuid$UUID$toString(uuid);
			case 'Guid':
				return '{' + ($TSFoster$elm_uuid$UUID$toString(uuid) + '}');
			default:
				return A2($TSFoster$elm_uuid$UUID$toStringWith, '', uuid);
		}
	});
var $brian_watkins$elm_procedure$Procedure$Internal$Initiate = function (a) {
	return {$: 'Initiate', a: a};
};
var $brian_watkins$elm_procedure$Procedure$try = F3(
	function (msgTagger, tagger, _v0) {
		var procedure = _v0.a;
		return A2(
			$elm$core$Task$perform,
			A2($elm$core$Basics$composeL, msgTagger, $brian_watkins$elm_procedure$Procedure$Internal$Initiate),
			$elm$core$Task$succeed(
				function (procId) {
					return A3(procedure, procId, msgTagger, tagger);
				}));
	});
var $author$project$AvitoApp$saveData = F2(
	function (meta, data) {
		var o3 = F2(
			function (u, gs) {
				return A2(
					$elm$random$Random$andThen,
					function (us) {
						return $elm$random$Random$constant(
							A2($elm$core$List$cons, u, us));
					},
					gs);
			});
		var o = F2(
			function (g, gs) {
				return A2(
					$elm$random$Random$andThen,
					function (u) {
						return A2(o3, u, gs);
					},
					g);
			});
		var goid = function (oid) {
			return (oid === '') ? A2(
				$elm$random$Random$map,
				$TSFoster$elm_uuid$UUID$toRepresentation($TSFoster$elm_uuid$UUID$Compact),
				$TSFoster$elm_uuid$UUID$generator) : $elm$random$Random$constant(oid);
		};
		var goids = A2(
			$elm$core$List$map,
			goid,
			A2(
				$elm$core$List$map,
				function ($) {
					return $.oid;
				},
				data));
		var gls = function (gs) {
			return A3(
				$elm$core$List$foldr,
				o,
				$elm$random$Random$constant(_List_Nil),
				gs);
		};
		var data2 = A2(
			$elm$random$Random$map,
			function (hs) {
				return A3(
					$elm$core$List$map2,
					F2(
						function (s, h) {
							return _Utils_update(
								h,
								{oid: s});
						}),
					hs,
					data);
			},
			gls(goids));
		return A3(
			$brian_watkins$elm_procedure$Procedure$try,
			$author$project$AvitoApp$ProcedureMsg,
			$author$project$AvitoApp$DataPosted,
			A2(
				$brian_watkins$elm_procedure$Procedure$andThen,
				function (data3) {
					return $brian_watkins$elm_procedure$Procedure$fetchResult(
						function (tagger) {
							return $elm$http$Http$post(
								{
									body: $elm$http$Http$jsonBody(
										A2(
											$elm$json$Json$Encode$list,
											$author$project$AvitoApp$postToValue(meta),
											data3)),
									expect: A2(
										$elm$http$Http$expectJson,
										tagger,
										$author$project$AvitoApp$decodePostList(meta)),
									url: '/api/data/' + meta.name
								});
						});
				},
				$brian_watkins$elm_procedure$Procedure$fetch(
					function (tagger) {
						return A2($elm$random$Random$generate, tagger, data2);
					})));
	});
var $author$project$AvitoCell$Editable = function (a) {
	return {$: 'Editable', a: a};
};
var $author$project$AvitoCell$focusIn = function (model) {
	var newStatus = function () {
		var _v0 = model.status;
		if (_v0.$ === 'Normal') {
			return $author$project$AvitoCell$Editable(model.value);
		} else {
			var str = _v0.a;
			return $author$project$AvitoCell$Editable(str);
		}
	}();
	return _Utils_update(
		model,
		{status: newStatus});
};
var $tortus$elm_array_2d$Array2D$getRow = F2(
	function (row, array2d) {
		return A2($elm$core$Array$get, row, array2d.data);
	});
var $tortus$elm_array_2d$Array2D$get = F3(
	function (row, col, array2d) {
		return A2(
			$elm$core$Maybe$andThen,
			$elm$core$Array$get(col),
			A2($tortus$elm_array_2d$Array2D$getRow, row, array2d));
	});
var $elm$core$Array$setHelp = F4(
	function (shift, index, value, tree) {
		var pos = $elm$core$Array$bitMask & (index >>> shift);
		var _v0 = A2($elm$core$Elm$JsArray$unsafeGet, pos, tree);
		if (_v0.$ === 'SubTree') {
			var subTree = _v0.a;
			var newSub = A4($elm$core$Array$setHelp, shift - $elm$core$Array$shiftStep, index, value, subTree);
			return A3(
				$elm$core$Elm$JsArray$unsafeSet,
				pos,
				$elm$core$Array$SubTree(newSub),
				tree);
		} else {
			var values = _v0.a;
			var newLeaf = A3($elm$core$Elm$JsArray$unsafeSet, $elm$core$Array$bitMask & index, value, values);
			return A3(
				$elm$core$Elm$JsArray$unsafeSet,
				pos,
				$elm$core$Array$Leaf(newLeaf),
				tree);
		}
	});
var $elm$core$Array$set = F3(
	function (index, value, array) {
		var len = array.a;
		var startShift = array.b;
		var tree = array.c;
		var tail = array.d;
		return ((index < 0) || (_Utils_cmp(index, len) > -1)) ? array : ((_Utils_cmp(
			index,
			$elm$core$Array$tailIndex(len)) > -1) ? A4(
			$elm$core$Array$Array_elm_builtin,
			len,
			startShift,
			tree,
			A3($elm$core$Elm$JsArray$unsafeSet, $elm$core$Array$bitMask & index, value, tail)) : A4(
			$elm$core$Array$Array_elm_builtin,
			len,
			startShift,
			A4($elm$core$Array$setHelp, startShift, index, value, tree),
			tail));
	});
var $tortus$elm_array_2d$Array2D$set = F4(
	function (row, col, newValue, array2d) {
		return A2(
			$elm$core$Maybe$withDefault,
			array2d,
			A2(
				$elm$core$Maybe$map,
				function (rowAry) {
					return _Utils_update(
						array2d,
						{
							data: A3(
								$elm$core$Array$set,
								row,
								A3($elm$core$Array$set, col, newValue, rowAry),
								array2d.data)
						});
				},
				A2($tortus$elm_array_2d$Array2D$getRow, row, array2d)));
	});
var $author$project$Utils$updateArray2D = F4(
	function (i, j, f, ds) {
		return A2(
			$elm$core$Maybe$withDefault,
			ds,
			A2(
				$elm$core$Maybe$map,
				function (d) {
					return A4($tortus$elm_array_2d$Array2D$set, i, j, d, ds);
				},
				A2(
					$elm$core$Maybe$map,
					f,
					A3($tortus$elm_array_2d$Array2D$get, i, j, ds))));
	});
var $author$project$AvitoTable$setData = F2(
	function (model, ds) {
		var setFocus = function (newModel) {
			var _v0 = model.current;
			if ((_v0.$ === 'Just') && (_v0.a.$ === 'Focused')) {
				var _v1 = _v0.a;
				var i = _v1.a;
				var j = _v1.b;
				return _Utils_update(
					newModel,
					{
						cells: A4($author$project$Utils$updateArray2D, i, j, $author$project$AvitoCell$focusIn, newModel.cells),
						current: model.current
					});
			} else {
				return _Utils_update(
					newModel,
					{current: model.current});
			}
		};
		return setFocus(
			A2(
				$author$project$AvitoTable$initModel,
				A2(
					$elm$core$Array$map,
					function (i) {
						return _Utils_Tuple2(i.name, i.mkModel);
					},
					model.cellsInfo),
				ds));
	});
var $ohanhi$keyboard$Keyboard$ArrowDown = {$: 'ArrowDown'};
var $ohanhi$keyboard$Keyboard$ArrowLeft = {$: 'ArrowLeft'};
var $ohanhi$keyboard$Keyboard$ArrowRight = {$: 'ArrowRight'};
var $ohanhi$keyboard$Keyboard$ArrowUp = {$: 'ArrowUp'};
var $robinheghan$keyboard_events$Keyboard$Events$Keydown = {$: 'Keydown'};
var $author$project$AvitoCell$None = {$: 'None'};
var $elm$virtual_dom$VirtualDom$Custom = function (a) {
	return {$: 'Custom', a: a};
};
var $elm$html$Html$Events$custom = F2(
	function (event, decoder) {
		return A2(
			$elm$virtual_dom$VirtualDom$on,
			event,
			$elm$virtual_dom$VirtualDom$Custom(decoder));
	});
var $robinheghan$keyboard_events$Keyboard$Events$eventToString = function (event) {
	switch (event.$) {
		case 'Keydown':
			return 'keydown';
		case 'Keyup':
			return 'keyup';
		default:
			return 'keypress';
	}
};
var $ohanhi$keyboard$Keyboard$Backspace = {$: 'Backspace'};
var $ohanhi$keyboard$Keyboard$Clear = {$: 'Clear'};
var $ohanhi$keyboard$Keyboard$Copy = {$: 'Copy'};
var $ohanhi$keyboard$Keyboard$CrSel = {$: 'CrSel'};
var $ohanhi$keyboard$Keyboard$Cut = {$: 'Cut'};
var $ohanhi$keyboard$Keyboard$Delete = {$: 'Delete'};
var $ohanhi$keyboard$Keyboard$EraseEof = {$: 'EraseEof'};
var $ohanhi$keyboard$Keyboard$ExSel = {$: 'ExSel'};
var $ohanhi$keyboard$Keyboard$Insert = {$: 'Insert'};
var $ohanhi$keyboard$Keyboard$Paste = {$: 'Paste'};
var $ohanhi$keyboard$Keyboard$Redo = {$: 'Redo'};
var $ohanhi$keyboard$Keyboard$Undo = {$: 'Undo'};
var $ohanhi$keyboard$Keyboard$editingKey = function (_v0) {
	var value = _v0.a;
	switch (value) {
		case 'Backspace':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$Backspace);
		case 'Clear':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$Clear);
		case 'Copy':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$Copy);
		case 'CrSel':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$CrSel);
		case 'Cut':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$Cut);
		case 'Delete':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$Delete);
		case 'EraseEof':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$EraseEof);
		case 'ExSel':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$ExSel);
		case 'Insert':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$Insert);
		case 'Paste':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$Paste);
		case 'Redo':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$Redo);
		case 'Undo':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$Undo);
		default:
			return $elm$core$Maybe$Nothing;
	}
};
var $ohanhi$keyboard$Keyboard$F1 = {$: 'F1'};
var $ohanhi$keyboard$Keyboard$F10 = {$: 'F10'};
var $ohanhi$keyboard$Keyboard$F11 = {$: 'F11'};
var $ohanhi$keyboard$Keyboard$F12 = {$: 'F12'};
var $ohanhi$keyboard$Keyboard$F13 = {$: 'F13'};
var $ohanhi$keyboard$Keyboard$F14 = {$: 'F14'};
var $ohanhi$keyboard$Keyboard$F15 = {$: 'F15'};
var $ohanhi$keyboard$Keyboard$F16 = {$: 'F16'};
var $ohanhi$keyboard$Keyboard$F17 = {$: 'F17'};
var $ohanhi$keyboard$Keyboard$F18 = {$: 'F18'};
var $ohanhi$keyboard$Keyboard$F19 = {$: 'F19'};
var $ohanhi$keyboard$Keyboard$F2 = {$: 'F2'};
var $ohanhi$keyboard$Keyboard$F20 = {$: 'F20'};
var $ohanhi$keyboard$Keyboard$F3 = {$: 'F3'};
var $ohanhi$keyboard$Keyboard$F4 = {$: 'F4'};
var $ohanhi$keyboard$Keyboard$F5 = {$: 'F5'};
var $ohanhi$keyboard$Keyboard$F6 = {$: 'F6'};
var $ohanhi$keyboard$Keyboard$F7 = {$: 'F7'};
var $ohanhi$keyboard$Keyboard$F8 = {$: 'F8'};
var $ohanhi$keyboard$Keyboard$F9 = {$: 'F9'};
var $ohanhi$keyboard$Keyboard$functionKey = function (_v0) {
	var value = _v0.a;
	switch (value) {
		case 'F1':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$F1);
		case 'F2':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$F2);
		case 'F3':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$F3);
		case 'F4':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$F4);
		case 'F5':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$F5);
		case 'F6':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$F6);
		case 'F7':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$F7);
		case 'F8':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$F8);
		case 'F9':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$F9);
		case 'F10':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$F10);
		case 'F11':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$F11);
		case 'F12':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$F12);
		case 'F13':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$F13);
		case 'F14':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$F14);
		case 'F15':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$F15);
		case 'F16':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$F16);
		case 'F17':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$F17);
		case 'F18':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$F18);
		case 'F19':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$F19);
		case 'F20':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$F20);
		default:
			return $elm$core$Maybe$Nothing;
	}
};
var $ohanhi$keyboard$Keyboard$ChannelDown = {$: 'ChannelDown'};
var $ohanhi$keyboard$Keyboard$ChannelUp = {$: 'ChannelUp'};
var $ohanhi$keyboard$Keyboard$MediaFastForward = {$: 'MediaFastForward'};
var $ohanhi$keyboard$Keyboard$MediaPause = {$: 'MediaPause'};
var $ohanhi$keyboard$Keyboard$MediaPlay = {$: 'MediaPlay'};
var $ohanhi$keyboard$Keyboard$MediaPlayPause = {$: 'MediaPlayPause'};
var $ohanhi$keyboard$Keyboard$MediaRecord = {$: 'MediaRecord'};
var $ohanhi$keyboard$Keyboard$MediaRewind = {$: 'MediaRewind'};
var $ohanhi$keyboard$Keyboard$MediaStop = {$: 'MediaStop'};
var $ohanhi$keyboard$Keyboard$MediaTrackNext = {$: 'MediaTrackNext'};
var $ohanhi$keyboard$Keyboard$MediaTrackPrevious = {$: 'MediaTrackPrevious'};
var $ohanhi$keyboard$Keyboard$mediaKey = function (_v0) {
	var value = _v0.a;
	switch (value) {
		case 'ChannelDown':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$ChannelDown);
		case 'ChannelUp':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$ChannelUp);
		case 'MediaFastForward':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$MediaFastForward);
		case 'MediaPause':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$MediaPause);
		case 'MediaPlay':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$MediaPlay);
		case 'MediaPlayPause':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$MediaPlayPause);
		case 'MediaRecord':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$MediaRecord);
		case 'MediaRewind':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$MediaRewind);
		case 'MediaStop':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$MediaStop);
		case 'MediaTrackNext':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$MediaTrackNext);
		case 'MediaTrackPrevious':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$MediaTrackPrevious);
		default:
			return $elm$core$Maybe$Nothing;
	}
};
var $ohanhi$keyboard$Keyboard$Alt = {$: 'Alt'};
var $ohanhi$keyboard$Keyboard$AltGraph = {$: 'AltGraph'};
var $ohanhi$keyboard$Keyboard$CapsLock = {$: 'CapsLock'};
var $ohanhi$keyboard$Keyboard$Control = {$: 'Control'};
var $ohanhi$keyboard$Keyboard$Fn = {$: 'Fn'};
var $ohanhi$keyboard$Keyboard$FnLock = {$: 'FnLock'};
var $ohanhi$keyboard$Keyboard$Hyper = {$: 'Hyper'};
var $ohanhi$keyboard$Keyboard$Meta = {$: 'Meta'};
var $ohanhi$keyboard$Keyboard$NumLock = {$: 'NumLock'};
var $ohanhi$keyboard$Keyboard$ScrollLock = {$: 'ScrollLock'};
var $ohanhi$keyboard$Keyboard$Shift = {$: 'Shift'};
var $ohanhi$keyboard$Keyboard$Super = {$: 'Super'};
var $ohanhi$keyboard$Keyboard$Symbol = {$: 'Symbol'};
var $ohanhi$keyboard$Keyboard$SymbolLock = {$: 'SymbolLock'};
var $ohanhi$keyboard$Keyboard$modifierKey = function (_v0) {
	var value = _v0.a;
	switch (value) {
		case 'Alt':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$Alt);
		case 'AltGraph':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$AltGraph);
		case 'CapsLock':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$CapsLock);
		case 'Control':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$Control);
		case 'Fn':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$Fn);
		case 'FnLock':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$FnLock);
		case 'Hyper':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$Hyper);
		case 'Meta':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$Meta);
		case 'NumLock':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$NumLock);
		case 'ScrollLock':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$ScrollLock);
		case 'Shift':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$Shift);
		case 'Super':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$Super);
		case 'OS':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$Super);
		case 'Symbol':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$Symbol);
		case 'SymbolLock':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$SymbolLock);
		default:
			return $elm$core$Maybe$Nothing;
	}
};
var $ohanhi$keyboard$Keyboard$End = {$: 'End'};
var $ohanhi$keyboard$Keyboard$Home = {$: 'Home'};
var $ohanhi$keyboard$Keyboard$PageDown = {$: 'PageDown'};
var $ohanhi$keyboard$Keyboard$PageUp = {$: 'PageUp'};
var $ohanhi$keyboard$Keyboard$navigationKey = function (_v0) {
	var value = _v0.a;
	switch (value) {
		case 'ArrowDown':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$ArrowDown);
		case 'ArrowLeft':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$ArrowLeft);
		case 'ArrowRight':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$ArrowRight);
		case 'ArrowUp':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$ArrowUp);
		case 'Down':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$ArrowDown);
		case 'Left':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$ArrowLeft);
		case 'Right':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$ArrowRight);
		case 'Up':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$ArrowUp);
		case 'End':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$End);
		case 'Home':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$Home);
		case 'PageDown':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$PageDown);
		case 'PageUp':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$PageUp);
		default:
			return $elm$core$Maybe$Nothing;
	}
};
var $ohanhi$keyboard$Keyboard$oneOf = F2(
	function (fns, key) {
		oneOf:
		while (true) {
			if (!fns.b) {
				return $elm$core$Maybe$Nothing;
			} else {
				var fn = fns.a;
				var rest = fns.b;
				var _v1 = fn(key);
				if (_v1.$ === 'Just') {
					var a = _v1.a;
					return $elm$core$Maybe$Just(a);
				} else {
					var $temp$fns = rest,
						$temp$key = key;
					fns = $temp$fns;
					key = $temp$key;
					continue oneOf;
				}
			}
		}
	});
var $ohanhi$keyboard$Keyboard$AppSwitch = {$: 'AppSwitch'};
var $ohanhi$keyboard$Keyboard$Call = {$: 'Call'};
var $ohanhi$keyboard$Keyboard$Camera = {$: 'Camera'};
var $ohanhi$keyboard$Keyboard$CameraFocus = {$: 'CameraFocus'};
var $ohanhi$keyboard$Keyboard$EndCall = {$: 'EndCall'};
var $ohanhi$keyboard$Keyboard$GoBack = {$: 'GoBack'};
var $ohanhi$keyboard$Keyboard$GoHome = {$: 'GoHome'};
var $ohanhi$keyboard$Keyboard$HeadsetHook = {$: 'HeadsetHook'};
var $ohanhi$keyboard$Keyboard$LastNumberRedial = {$: 'LastNumberRedial'};
var $ohanhi$keyboard$Keyboard$MannerMode = {$: 'MannerMode'};
var $ohanhi$keyboard$Keyboard$Notification = {$: 'Notification'};
var $ohanhi$keyboard$Keyboard$VoiceDial = {$: 'VoiceDial'};
var $ohanhi$keyboard$Keyboard$phoneKey = function (_v0) {
	var value = _v0.a;
	switch (value) {
		case 'AppSwitch':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$AppSwitch);
		case 'Call':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$Call);
		case 'Camera':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$Camera);
		case 'CameraFocus':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$CameraFocus);
		case 'EndCall':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$EndCall);
		case 'GoBack':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$GoBack);
		case 'GoHome':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$GoHome);
		case 'HeadsetHook':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$HeadsetHook);
		case 'LastNumberRedial':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$LastNumberRedial);
		case 'Notification':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$Notification);
		case 'MannerMode':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$MannerMode);
		case 'VoiceDial':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$VoiceDial);
		default:
			return $elm$core$Maybe$Nothing;
	}
};
var $ohanhi$keyboard$Keyboard$Again = {$: 'Again'};
var $ohanhi$keyboard$Keyboard$Attn = {$: 'Attn'};
var $ohanhi$keyboard$Keyboard$Cancel = {$: 'Cancel'};
var $ohanhi$keyboard$Keyboard$ContextMenu = {$: 'ContextMenu'};
var $ohanhi$keyboard$Keyboard$Escape = {$: 'Escape'};
var $ohanhi$keyboard$Keyboard$Execute = {$: 'Execute'};
var $ohanhi$keyboard$Keyboard$Find = {$: 'Find'};
var $ohanhi$keyboard$Keyboard$Finish = {$: 'Finish'};
var $ohanhi$keyboard$Keyboard$Help = {$: 'Help'};
var $ohanhi$keyboard$Keyboard$Pause = {$: 'Pause'};
var $ohanhi$keyboard$Keyboard$Play = {$: 'Play'};
var $ohanhi$keyboard$Keyboard$Props = {$: 'Props'};
var $ohanhi$keyboard$Keyboard$Select = {$: 'Select'};
var $ohanhi$keyboard$Keyboard$ZoomIn = {$: 'ZoomIn'};
var $ohanhi$keyboard$Keyboard$ZoomOut = {$: 'ZoomOut'};
var $ohanhi$keyboard$Keyboard$uiKey = function (_v0) {
	var value = _v0.a;
	switch (value) {
		case 'Again':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$Again);
		case 'Attn':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$Attn);
		case 'Cancel':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$Cancel);
		case 'ContextMenu':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$ContextMenu);
		case 'Escape':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$Escape);
		case 'Execute':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$Execute);
		case 'Find':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$Find);
		case 'Finish':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$Finish);
		case 'Help':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$Help);
		case 'Pause':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$Pause);
		case 'Play':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$Play);
		case 'Props':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$Props);
		case 'Select':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$Select);
		case 'ZoomIn':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$ZoomIn);
		case 'ZoomOut':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$ZoomOut);
		default:
			return $elm$core$Maybe$Nothing;
	}
};
var $ohanhi$keyboard$Keyboard$Enter = {$: 'Enter'};
var $ohanhi$keyboard$Keyboard$Spacebar = {$: 'Spacebar'};
var $ohanhi$keyboard$Keyboard$Tab = {$: 'Tab'};
var $ohanhi$keyboard$Keyboard$whitespaceKey = function (_v0) {
	var value = _v0.a;
	switch (value) {
		case 'Enter':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$Enter);
		case 'Tab':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$Tab);
		case 'Spacebar':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$Spacebar);
		case ' ':
			return $elm$core$Maybe$Just($ohanhi$keyboard$Keyboard$Spacebar);
		default:
			return $elm$core$Maybe$Nothing;
	}
};
var $ohanhi$keyboard$Keyboard$anyKeyWith = function (charParser) {
	return $ohanhi$keyboard$Keyboard$oneOf(
		_List_fromArray(
			[$ohanhi$keyboard$Keyboard$whitespaceKey, charParser, $ohanhi$keyboard$Keyboard$modifierKey, $ohanhi$keyboard$Keyboard$navigationKey, $ohanhi$keyboard$Keyboard$editingKey, $ohanhi$keyboard$Keyboard$functionKey, $ohanhi$keyboard$Keyboard$uiKey, $ohanhi$keyboard$Keyboard$phoneKey, $ohanhi$keyboard$Keyboard$mediaKey]));
};
var $ohanhi$keyboard$Keyboard$Character = function (a) {
	return {$: 'Character', a: a};
};
var $elm$core$String$toUpper = _String_toUpper;
var $ohanhi$keyboard$Keyboard$characterKeyUpper = function (_v0) {
	var value = _v0.a;
	return ($elm$core$String$length(value) === 1) ? $elm$core$Maybe$Just(
		$ohanhi$keyboard$Keyboard$Character(
			$elm$core$String$toUpper(value))) : $elm$core$Maybe$Nothing;
};
var $ohanhi$keyboard$Keyboard$anyKeyUpper = $ohanhi$keyboard$Keyboard$anyKeyWith($ohanhi$keyboard$Keyboard$characterKeyUpper);
var $ohanhi$keyboard$Keyboard$RawKey = function (a) {
	return {$: 'RawKey', a: a};
};
var $ohanhi$keyboard$Keyboard$eventKeyDecoder = A2(
	$elm$json$Json$Decode$field,
	'key',
	A2($elm$json$Json$Decode$map, $ohanhi$keyboard$Keyboard$RawKey, $elm$json$Json$Decode$string));
var $elm$core$List$filter = F2(
	function (isGood, list) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, xs) {
					return isGood(x) ? A2($elm$core$List$cons, x, xs) : xs;
				}),
			_List_Nil,
			list);
	});
var $elm$core$Tuple$second = function (_v0) {
	var y = _v0.b;
	return y;
};
var $robinheghan$keyboard_events$Keyboard$Events$messageSelector = function (decisionMap) {
	var helper = function (maybeKey) {
		if (maybeKey.$ === 'Nothing') {
			return $elm$json$Json$Decode$fail('No key we\'re interested in');
		} else {
			var key = maybeKey.a;
			return A2(
				$elm$core$Maybe$withDefault,
				$elm$json$Json$Decode$fail('No key we\'re interested in'),
				A2(
					$elm$core$Maybe$map,
					$elm$json$Json$Decode$succeed,
					A2(
						$elm$core$Maybe$map,
						$elm$core$Tuple$second,
						$elm$core$List$head(
							A2(
								$elm$core$List$filter,
								function (_v1) {
									var k = _v1.a;
									return _Utils_eq(k, key);
								},
								decisionMap)))));
		}
	};
	return A2(
		$elm$json$Json$Decode$andThen,
		helper,
		A2($elm$json$Json$Decode$map, $ohanhi$keyboard$Keyboard$anyKeyUpper, $ohanhi$keyboard$Keyboard$eventKeyDecoder));
};
var $robinheghan$keyboard_events$Keyboard$Events$custom = F3(
	function (event, options, decisionMap) {
		var alteredDecisionMap = A2(
			$elm$core$List$map,
			function (_v0) {
				var key = _v0.a;
				var msg = _v0.b;
				return _Utils_Tuple2(
					key,
					{message: msg, preventDefault: options.preventDefault, stopPropagation: options.stopPropagation});
			},
			decisionMap);
		return A2(
			$elm$html$Html$Events$custom,
			$robinheghan$keyboard_events$Keyboard$Events$eventToString(event),
			$robinheghan$keyboard_events$Keyboard$Events$messageSelector(alteredDecisionMap));
	});
var $elm$html$Html$option = _VirtualDom_node('option');
var $elm$html$Html$select = _VirtualDom_node('select');
var $elm$json$Json$Encode$bool = _Json_wrap;
var $elm$html$Html$Attributes$boolProperty = F2(
	function (key, bool) {
		return A2(
			_VirtualDom_property,
			key,
			$elm$json$Json$Encode$bool(bool));
	});
var $elm$html$Html$Attributes$selected = $elm$html$Html$Attributes$boolProperty('selected');
var $author$project$AvitoCell$select = F2(
	function (options, val0) {
		var tableKeys = A3(
			$robinheghan$keyboard_events$Keyboard$Events$custom,
			$robinheghan$keyboard_events$Keyboard$Events$Keydown,
			{preventDefault: true, stopPropagation: true},
			_List_fromArray(
				[
					_Utils_Tuple2($ohanhi$keyboard$Keyboard$ArrowRight, $author$project$AvitoCell$None),
					_Utils_Tuple2($ohanhi$keyboard$Keyboard$ArrowDown, $author$project$AvitoCell$None),
					_Utils_Tuple2($ohanhi$keyboard$Keyboard$ArrowLeft, $author$project$AvitoCell$None),
					_Utils_Tuple2($ohanhi$keyboard$Keyboard$ArrowUp, $author$project$AvitoCell$None)
				]));
		var focusId = function (key) {
			return 'cell-editable-input-' + key;
		};
		return {
			edit: F2(
				function (key, val) {
					return _List_fromArray(
						[
							A2(
							$elm$html$Html$select,
							_List_fromArray(
								[
									tableKeys,
									$elm$html$Html$Attributes$id(
									focusId(key)),
									$elm$html$Html$Attributes$value(val),
									$elm$html$Html$Attributes$tabindex(-1),
									A2($elm$html$Html$Attributes$style, 'width', '580px'),
									A2($elm$html$Html$Attributes$style, 'border', '1px blue solid'),
									$elm$html$Html$Events$onInput($author$project$AvitoCell$Input)
								]),
							A2(
								$elm$core$List$map,
								function (_v0) {
									var v = _v0.a;
									var n = _v0.b;
									return A2(
										$elm$html$Html$option,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$value(v),
												$elm$html$Html$Attributes$selected(
												_Utils_eq(v, val0) ? true : false)
											]),
										_List_fromArray(
											[
												$elm$html$Html$text(n)
											]));
								},
								options))
						]);
				}),
			focusId: focusId,
			normal: F2(
				function (_v1, val) {
					return _List_fromArray(
						[
							A2(
							$elm$html$Html$span,
							_List_fromArray(
								[
									A2($elm$html$Html$Attributes$style, 'width', '600px')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text(val)
								]))
						]);
				}),
			status: $author$project$AvitoCell$Normal,
			value: val0
		};
	});
var $author$project$AvitoApp$tableInfo0 = function () {
	var toPair = $elm$core$List$map(
		function (i) {
			return _Utils_Tuple2(i, i);
		});
	var regions = toPair(
		_List_fromArray(
			['Москва', 'Омская обл.', 'Новосибирская обл.']));
	var cities = toPair(
		_List_fromArray(
			['Москва', 'Омск', 'Новосибирск']));
	var categories = toPair(
		_List_fromArray(
			['Бытовая техника', 'Мебель и интерьер', 'Посуда и товары для кухни', 'Продукты питания', 'Ремонт и строительство', 'Растения']));
	return $elm$core$Array$fromList(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'Категория',
				$author$project$AvitoCell$select(categories)),
				_Utils_Tuple2('Заголовок', $author$project$AvitoCell$text),
				_Utils_Tuple2('Описание', $author$project$AvitoCell$text),
				_Utils_Tuple2('Цена', $author$project$AvitoCell$text),
				_Utils_Tuple2('Ссылка на видео', $author$project$AvitoCell$text),
				_Utils_Tuple2(
				'Регион РФ',
				$author$project$AvitoCell$select(regions)),
				_Utils_Tuple2(
				'Город',
				$author$project$AvitoCell$select(cities)),
				_Utils_Tuple2('Район населенного пункт', $author$project$AvitoCell$text),
				_Utils_Tuple2('Улица', $author$project$AvitoCell$text),
				_Utils_Tuple2('Номер дома', $author$project$AvitoCell$text),
				_Utils_Tuple2('Контактный телефон', $author$project$AvitoCell$text)
			]));
}();
var $author$project$AvitoApp$tableInfo = function (meta) {
	var fn = function (ftype) {
		switch (ftype.$) {
			case 'TextType':
				return $author$project$AvitoCell$text;
			case 'NumberType':
				return $author$project$AvitoCell$text;
			default:
				var opts = ftype.a;
				return $author$project$AvitoCell$select(opts);
		}
	};
	return A2(
		$elm$core$Array$append,
		$author$project$AvitoApp$tableInfo0,
		A2(
			$elm$core$Array$map,
			function (f) {
				return _Utils_Tuple2(
					f.label,
					fn(f.ftype));
			},
			meta.fields));
};
var $elm_community$array_extra$Array$Extra$update = F3(
	function (index, alter, array) {
		var _v0 = A2($elm$core$Array$get, index, array);
		if (_v0.$ === 'Nothing') {
			return array;
		} else {
			var element = _v0.a;
			return A3(
				$elm$core$Array$set,
				index,
				alter(element),
				array);
		}
	});
var $author$project$AvitoTable$CellMsg = F3(
	function (a, b, c) {
		return {$: 'CellMsg', a: a, b: b, c: c};
	});
var $author$project$AvitoTable$Down = {$: 'Down'};
var $author$project$AvitoTable$FocusResult = function (a) {
	return {$: 'FocusResult', a: a};
};
var $author$project$AvitoTable$Focused = F2(
	function (a, b) {
		return {$: 'Focused', a: a, b: b};
	});
var $author$project$AvitoTable$Left = {$: 'Left'};
var $author$project$AvitoTable$NotFocused = F2(
	function (a, b) {
		return {$: 'NotFocused', a: a, b: b};
	});
var $author$project$AvitoTable$Right = {$: 'Right'};
var $author$project$AvitoTable$Up = {$: 'Up'};
var $author$project$AvitoTable$emptyCellsRow = function (info) {
	return A2(
		$elm$core$Array$map,
		function (a) {
			return a.mkModel('');
		},
		info);
};
var $author$project$AvitoTable$appendEmptyCellsRow = F3(
	function (i, info, data) {
		return A3(
			$author$project$Utils$appendRow,
			$author$project$AvitoTable$emptyCellsRow(info),
			$author$project$AvitoCell$text(''),
			data);
	});
var $author$project$AvitoCell$cancelingFocusOut = function (model) {
	var newValue = function () {
		var _v0 = model.status;
		if (_v0.$ === 'Normal') {
			return model.value;
		} else {
			var str = _v0.a;
			return str;
		}
	}();
	return _Utils_update(
		model,
		{status: $author$project$AvitoCell$Normal, value: newValue});
};
var $tortus$elm_array_2d$Array2D$columns = function (array2d) {
	return array2d.columns;
};
var $tortus$elm_array_2d$Array2D$ArrayHelpers$deleteArrayElt = F2(
	function (index, array) {
		var lastIndex = $elm$core$Array$length(array) - 1;
		var last = A3(
			$elm$core$Array$slice,
			index + 1,
			$elm$core$Array$length(array),
			array);
		var first = A3($elm$core$Array$slice, 0, index, array);
		return ((_Utils_cmp(index, lastIndex) > 0) || (index < 0)) ? array : A2($elm$core$Array$append, first, last);
	});
var $tortus$elm_array_2d$Array2D$deleteRow = F2(
	function (index, array2d) {
		return _Utils_update(
			array2d,
			{
				data: A2($tortus$elm_array_2d$Array2D$ArrayHelpers$deleteArrayElt, index, array2d.data)
			});
	});
var $elm$browser$Browser$Dom$focus = _Browser_call('focus');
var $tortus$elm_array_2d$Array2D$map = F2(
	function (fn, array2d) {
		return A2(
			$tortus$elm_array_2d$Array2D$indexedMap,
			F3(
				function (_v0, _v1, val) {
					return fn(val);
				}),
			array2d);
	});
var $author$project$Utils$toArrayOfArrays = function (a) {
	return $elm$core$Array$fromList(
		A2(
			$elm$core$List$map,
			function (i) {
				return A2(
					$elm$core$Maybe$withDefault,
					$elm$core$Array$empty,
					A2($tortus$elm_array_2d$Array2D$getRow, i, a));
			},
			A2(
				$elm$core$List$range,
				0,
				$tortus$elm_array_2d$Array2D$rows(a) - 1)));
};
var $author$project$AvitoTable$getData = function (model) {
	return A2(
		$elm_community$array_extra$Array$Extra$zip,
		model.ids,
		$author$project$Utils$toArrayOfArrays(
			A2(
				$tortus$elm_array_2d$Array2D$map,
				function ($) {
					return $.value;
				},
				A2($tortus$elm_array_2d$Array2D$deleteRow, model.rowsCnt - 1, model.cells))));
};
var $elm_community$array_extra$Array$Extra$insertAt = F3(
	function (index, val, values) {
		var length = $elm$core$Array$length(values);
		if ((index >= 0) && (_Utils_cmp(index, length) < 1)) {
			var before = A3($elm$core$Array$slice, 0, index, values);
			var after = A3($elm$core$Array$slice, index, length, values);
			return A2(
				$elm$core$Array$append,
				A2($elm$core$Array$push, val, before),
				after);
		} else {
			return values;
		}
	});
var $author$project$Utils$insertRow = F3(
	function (i, ds, d) {
		var rows = $author$project$Utils$toArrayOfArrays(ds);
		return $tortus$elm_array_2d$Array2D$fromArray(
			function (rs) {
				return A2(
					$elm$core$Array$append,
					A2(
						$elm$core$Array$push,
						d,
						A3($elm$core$Array$slice, 0, i, rows)),
					rs);
			}(
				A3(
					$elm$core$Array$slice,
					i,
					$elm$core$Array$length(rows),
					rows)));
	});
var $author$project$AvitoTable$mkCellKey = F2(
	function (i, j) {
		return $elm$core$String$fromInt(i) + ('-' + $elm$core$String$fromInt(j));
	});
var $author$project$AvitoTable$newFocusIJ = F4(
	function (move, model, i, j) {
		switch (move.$) {
			case 'Right':
				var newJ = _Utils_eq(j, model.colsCnt - 1) ? 0 : (j + 1);
				var newI = _Utils_eq(j, model.colsCnt - 1) ? (_Utils_eq(i, model.rowsCnt - 1) ? 0 : (i + 1)) : i;
				return _Utils_Tuple2(newI, newJ);
			case 'Left':
				var newJ = (!j) ? (model.colsCnt - 1) : (j - 1);
				var newI = (!j) ? ((!i) ? (model.rowsCnt - 1) : (i - 1)) : i;
				return _Utils_Tuple2(newI, newJ);
			case 'Down':
				var newJ = _Utils_eq(i, model.rowsCnt - 1) ? (_Utils_eq(j, model.colsCnt - 1) ? 0 : (j + 1)) : j;
				var newI = _Utils_eq(i, model.rowsCnt - 1) ? 0 : (i + 1);
				return _Utils_Tuple2(newI, newJ);
			default:
				var newJ = (!i) ? ((!j) ? (model.colsCnt - 1) : (j - 1)) : j;
				var newI = (!i) ? (model.rowsCnt - 1) : (i - 1);
				return _Utils_Tuple2(newI, newJ);
		}
	});
var $author$project$AvitoCell$savingFocusOut = function (model) {
	return _Utils_update(
		model,
		{status: $author$project$AvitoCell$Normal});
};
var $author$project$AvitoTable$moveFocus = F2(
	function (move, model) {
		var _v0 = model.current;
		if (_v0.$ === 'Just') {
			if (_v0.a.$ === 'NotFocused') {
				var _v1 = _v0.a;
				var iF = _v1.a;
				var jF = _v1.b;
				var _v2 = A4($author$project$AvitoTable$newFocusIJ, move, model, iF, jF);
				var newIF = _v2.a;
				var newJF = _v2.b;
				var newModel = _Utils_update(
					model,
					{
						current: $elm$core$Maybe$Just(
							A2($author$project$AvitoTable$NotFocused, newIF, newJF))
					});
				return _Utils_Tuple3(newModel, $elm$core$Platform$Cmd$none, $elm$core$Maybe$Nothing);
			} else {
				var _v3 = _v0.a;
				var iF = _v3.a;
				var jF = _v3.b;
				var _v4 = A4($author$project$AvitoTable$newFocusIJ, move, model, iF, jF);
				var newIF = _v4.a;
				var newJF = _v4.b;
				var newCells = A4(
					$author$project$Utils$updateArray2D,
					iF,
					jF,
					$author$project$AvitoCell$savingFocusOut,
					A4($author$project$Utils$updateArray2D, newIF, newJF, $author$project$AvitoCell$focusIn, model.cells));
				var newTask = A2(
					$elm$core$Maybe$withDefault,
					$elm$core$Platform$Cmd$none,
					A2(
						$elm$core$Maybe$map,
						function (c) {
							return A2(
								$elm$core$Task$attempt,
								$author$project$AvitoTable$FocusResult,
								$elm$browser$Browser$Dom$focus(
									c.focusId(
										A2($author$project$AvitoTable$mkCellKey, newIF, newJF))));
						},
						A3($tortus$elm_array_2d$Array2D$get, newIF, newJF, newCells)));
				var newcurrent = $elm$core$Maybe$Just(
					A2($author$project$AvitoTable$Focused, newIF, newJF));
				var newModel = _Utils_update(
					model,
					{cells: newCells, current: newcurrent});
				return _Utils_Tuple3(
					newModel,
					newTask,
					$elm$core$Maybe$Just(
						$author$project$AvitoTable$getData(newModel)));
			}
		} else {
			return _Utils_Tuple3(model, $elm$core$Platform$Cmd$none, $elm$core$Maybe$Nothing);
		}
	});
var $author$project$Utils$appendRows = F4(
	function (n, row, _default, data) {
		appendRows:
		while (true) {
			if (n > 0) {
				var $temp$n = n - 1,
					$temp$row = row,
					$temp$default = _default,
					$temp$data = A3($author$project$Utils$appendRow, row, _default, data);
				n = $temp$n;
				row = $temp$row;
				_default = $temp$default;
				data = $temp$data;
				continue appendRows;
			} else {
				return data;
			}
		}
	});
var $elm$core$List$append = F2(
	function (xs, ys) {
		if (!ys.b) {
			return xs;
		} else {
			return A3($elm$core$List$foldr, $elm$core$List$cons, ys, xs);
		}
	});
var $elm$core$List$concat = function (lists) {
	return A3($elm$core$List$foldr, $elm$core$List$append, _List_Nil, lists);
};
var $elm$core$String$lines = _String_lines;
var $author$project$AvitoCell$setValue = F2(
	function (model, val) {
		return _Utils_update(
			model,
			{value: val});
	});
var $elm$core$List$takeReverse = F3(
	function (n, list, kept) {
		takeReverse:
		while (true) {
			if (n <= 0) {
				return kept;
			} else {
				if (!list.b) {
					return kept;
				} else {
					var x = list.a;
					var xs = list.b;
					var $temp$n = n - 1,
						$temp$list = xs,
						$temp$kept = A2($elm$core$List$cons, x, kept);
					n = $temp$n;
					list = $temp$list;
					kept = $temp$kept;
					continue takeReverse;
				}
			}
		}
	});
var $elm$core$List$takeTailRec = F2(
	function (n, list) {
		return $elm$core$List$reverse(
			A3($elm$core$List$takeReverse, n, list, _List_Nil));
	});
var $elm$core$List$takeFast = F3(
	function (ctr, n, list) {
		if (n <= 0) {
			return _List_Nil;
		} else {
			var _v0 = _Utils_Tuple2(n, list);
			_v0$1:
			while (true) {
				_v0$5:
				while (true) {
					if (!_v0.b.b) {
						return list;
					} else {
						if (_v0.b.b.b) {
							switch (_v0.a) {
								case 1:
									break _v0$1;
								case 2:
									var _v2 = _v0.b;
									var x = _v2.a;
									var _v3 = _v2.b;
									var y = _v3.a;
									return _List_fromArray(
										[x, y]);
								case 3:
									if (_v0.b.b.b.b) {
										var _v4 = _v0.b;
										var x = _v4.a;
										var _v5 = _v4.b;
										var y = _v5.a;
										var _v6 = _v5.b;
										var z = _v6.a;
										return _List_fromArray(
											[x, y, z]);
									} else {
										break _v0$5;
									}
								default:
									if (_v0.b.b.b.b && _v0.b.b.b.b.b) {
										var _v7 = _v0.b;
										var x = _v7.a;
										var _v8 = _v7.b;
										var y = _v8.a;
										var _v9 = _v8.b;
										var z = _v9.a;
										var _v10 = _v9.b;
										var w = _v10.a;
										var tl = _v10.b;
										return (ctr > 1000) ? A2(
											$elm$core$List$cons,
											x,
											A2(
												$elm$core$List$cons,
												y,
												A2(
													$elm$core$List$cons,
													z,
													A2(
														$elm$core$List$cons,
														w,
														A2($elm$core$List$takeTailRec, n - 4, tl))))) : A2(
											$elm$core$List$cons,
											x,
											A2(
												$elm$core$List$cons,
												y,
												A2(
													$elm$core$List$cons,
													z,
													A2(
														$elm$core$List$cons,
														w,
														A3($elm$core$List$takeFast, ctr + 1, n - 4, tl)))));
									} else {
										break _v0$5;
									}
							}
						} else {
							if (_v0.a === 1) {
								break _v0$1;
							} else {
								break _v0$5;
							}
						}
					}
				}
				return list;
			}
			var _v1 = _v0.b;
			var x = _v1.a;
			return _List_fromArray(
				[x]);
		}
	});
var $elm$core$List$take = F2(
	function (n, list) {
		return A3($elm$core$List$takeFast, 0, n, list);
	});
var $author$project$AvitoTable$pasteData = F5(
	function (str, _default, cells, iF, jF) {
		var colsCnt = ($tortus$elm_array_2d$Array2D$columns(cells) - jF) + 1;
		var newVals = A2(
			$elm$core$List$map,
			function (s) {
				return A2(
					$elm$core$List$take,
					colsCnt,
					A2($elm$core$String$split, '\t', s));
			},
			$elm$core$String$lines(str));
		var newRowsCnt = ((iF + $elm$core$List$length(newVals)) - $tortus$elm_array_2d$Array2D$rows(cells)) - 1;
		var newCells = (newRowsCnt > 0) ? A4(
			$author$project$Utils$appendRows,
			newRowsCnt,
			_default,
			$author$project$AvitoCell$text(''),
			cells) : cells;
		var newVals2 = $elm$core$List$concat(
			A3(
				$elm$core$List$map2,
				F2(
					function (i, row) {
						return A3(
							$elm$core$List$map2,
							F2(
								function (j, col) {
									return _Utils_Tuple3(col, i, j);
								}),
							A2(
								$elm$core$List$range,
								jF,
								$tortus$elm_array_2d$Array2D$columns(cells) - 1),
							row);
					}),
				A2(
					$elm$core$List$range,
					iF,
					(iF + $elm$core$List$length(newVals)) - 2),
				newVals));
		return A3(
			$elm$core$List$foldr,
			F2(
				function (_v0, cs) {
					var v = _v0.a;
					var i = _v0.b;
					var j = _v0.c;
					return A4(
						$author$project$Utils$updateArray2D,
						i,
						j,
						function (cell) {
							return A2($author$project$AvitoCell$setValue, cell, v);
						},
						cs);
				}),
			newCells,
			newVals2);
	});
var $elm_community$array_extra$Array$Extra$sliceFrom = F2(
	function (lengthDropped, array) {
		return A3(
			$elm$core$Array$slice,
			lengthDropped,
			$elm$core$Array$length(array),
			array);
	});
var $elm_community$array_extra$Array$Extra$sliceUntil = F2(
	function (newLength, array) {
		return A3(
			$elm$core$Array$slice,
			0,
			(newLength >= 0) ? newLength : ($elm$core$Array$length(array) + newLength),
			array);
	});
var $elm_community$array_extra$Array$Extra$splitAt = F2(
	function (index, array) {
		return (index > 0) ? _Utils_Tuple2(
			A2($elm_community$array_extra$Array$Extra$sliceUntil, index, array),
			A2($elm_community$array_extra$Array$Extra$sliceFrom, index, array)) : _Utils_Tuple2($elm$core$Array$empty, array);
	});
var $elm_community$array_extra$Array$Extra$removeAt = F2(
	function (index, array) {
		if (index >= 0) {
			var _v0 = A2($elm_community$array_extra$Array$Extra$splitAt, index, array);
			var beforeIndex = _v0.a;
			var startingAtIndex = _v0.b;
			var lengthStartingAtIndex = $elm$core$Array$length(startingAtIndex);
			return (!lengthStartingAtIndex) ? beforeIndex : A2(
				$elm$core$Array$append,
				beforeIndex,
				A3($elm$core$Array$slice, 1, lengthStartingAtIndex, startingAtIndex));
		} else {
			return array;
		}
	});
var $author$project$AvitoCell$update = F2(
	function (action, model) {
		if (action.$ === 'Input') {
			var str = action.a;
			return _Utils_Tuple3(
				_Utils_update(
					model,
					{value: str}),
				$elm$core$Platform$Cmd$none,
				false);
		} else {
			return _Utils_Tuple3(model, $elm$core$Platform$Cmd$none, false);
		}
	});
var $author$project$AvitoTable$update = F2(
	function (action, model) {
		switch (action.$) {
			case 'CellClick':
				var i = action.a;
				var j = action.b;
				var newTask = $elm$core$Platform$Cmd$none;
				var newCells = function () {
					var _v4 = model.current;
					if ((_v4.$ === 'Just') && (_v4.a.$ === 'Focused')) {
						var _v5 = _v4.a;
						var iF = _v5.a;
						var jF = _v5.b;
						return A4($author$project$Utils$updateArray2D, iF, jF, $author$project$AvitoCell$savingFocusOut, model.cells);
					} else {
						return model.cells;
					}
				}();
				var newModel = _Utils_update(
					model,
					{
						cells: newCells,
						current: $elm$core$Maybe$Just(
							A2($author$project$AvitoTable$NotFocused, i, j))
					});
				var updating = function () {
					var _v1 = model.current;
					if (_v1.$ === 'Just') {
						if (_v1.a.$ === 'Focused') {
							var _v2 = _v1.a;
							return $elm$core$Maybe$Just(
								$author$project$AvitoTable$getData(newModel));
						} else {
							var _v3 = _v1.a;
							return $elm$core$Maybe$Nothing;
						}
					} else {
						return $elm$core$Maybe$Nothing;
					}
				}();
				return _Utils_Tuple3(newModel, newTask, updating);
			case 'DoubleCellClick':
				var i = action.a;
				var j = action.b;
				var newCells = function () {
					var _v9 = model.current;
					if (_v9.$ === 'Just') {
						if (_v9.a.$ === 'Focused') {
							var _v10 = _v9.a;
							var iF = _v10.a;
							var jF = _v10.b;
							return A4(
								$author$project$Utils$updateArray2D,
								i,
								j,
								$author$project$AvitoCell$focusIn,
								A4($author$project$Utils$updateArray2D, iF, jF, $author$project$AvitoCell$savingFocusOut, model.cells));
						} else {
							var _v11 = _v9.a;
							return A4($author$project$Utils$updateArray2D, i, j, $author$project$AvitoCell$focusIn, model.cells);
						}
					} else {
						return A4($author$project$Utils$updateArray2D, i, j, $author$project$AvitoCell$focusIn, model.cells);
					}
				}();
				var newModel = _Utils_update(
					model,
					{
						cells: newCells,
						current: $elm$core$Maybe$Just(
							A2($author$project$AvitoTable$Focused, i, j))
					});
				var updating = function () {
					var _v6 = model.current;
					if (_v6.$ === 'Just') {
						if (_v6.a.$ === 'Focused') {
							var _v7 = _v6.a;
							return $elm$core$Maybe$Just(
								$author$project$AvitoTable$getData(newModel));
						} else {
							var _v8 = _v6.a;
							return $elm$core$Maybe$Nothing;
						}
					} else {
						return $elm$core$Maybe$Nothing;
					}
				}();
				var newTask = A2(
					$elm$core$Maybe$withDefault,
					$elm$core$Platform$Cmd$none,
					A2(
						$elm$core$Maybe$map,
						function (c) {
							return A2(
								$elm$core$Task$attempt,
								$author$project$AvitoTable$FocusResult,
								$elm$browser$Browser$Dom$focus(
									c.focusId(
										A2($author$project$AvitoTable$mkCellKey, i, j))));
						},
						A3($tortus$elm_array_2d$Array2D$get, i, j, newCells)));
				return _Utils_Tuple3(newModel, newTask, updating);
			case 'CellMsg':
				var i = action.a;
				var j = action.b;
				var msg = action.c;
				var res = A2(
					$elm$core$Maybe$map,
					$author$project$AvitoCell$update(msg),
					A3($tortus$elm_array_2d$Array2D$get, i, j, model.cells));
				if (res.$ === 'Just') {
					var _v13 = res.a;
					var cellModel = _v13.a;
					var cellCmd = _v13.b;
					var updatedValue = _v13.c;
					var newCells0 = A4(
						$author$project$Utils$updateArray2D,
						i,
						j,
						function (_v15) {
							return cellModel;
						},
						model.cells);
					var _v14 = _Utils_eq(model.rowsCnt, i + 1) ? _Utils_Tuple2(
						A3($author$project$AvitoTable$appendEmptyCellsRow, i + 1, model.cellsInfo, newCells0),
						A3($elm_community$array_extra$Array$Extra$insertAt, i + 1, $elm$core$Maybe$Nothing, model.ids)) : _Utils_Tuple2(newCells0, model.ids);
					var newCells = _v14.a;
					var newIds = _v14.b;
					var newRowsCnt = $tortus$elm_array_2d$Array2D$rows(newCells);
					var newModel = _Utils_update(
						model,
						{
							cells: newCells,
							current: $elm$core$Maybe$Just(
								A2($author$project$AvitoTable$Focused, i, j)),
							ids: newIds,
							rowsCnt: newRowsCnt
						});
					return _Utils_Tuple3(
						newModel,
						A2(
							$elm$core$Platform$Cmd$map,
							A2($author$project$AvitoTable$CellMsg, i, j),
							cellCmd),
						updatedValue ? $elm$core$Maybe$Just(
							$author$project$AvitoTable$getData(newModel)) : $elm$core$Maybe$Nothing);
				} else {
					return _Utils_Tuple3(model, $elm$core$Platform$Cmd$none, $elm$core$Maybe$Nothing);
				}
			case 'InsertRow':
				var i = action.a;
				var newcurrent = function () {
					var _v18 = model.current;
					if (_v18.$ === 'Just') {
						if (_v18.a.$ === 'Focused') {
							var _v19 = _v18.a;
							var iF = _v19.a;
							var jF = _v19.b;
							return _Utils_eq(iF, i) ? $elm$core$Maybe$Just(
								A2($author$project$AvitoTable$Focused, iF + 1, jF)) : $elm$core$Maybe$Just(
								A2($author$project$AvitoTable$Focused, iF, jF));
						} else {
							var _v20 = _v18.a;
							var iF = _v20.a;
							var jF = _v20.b;
							return _Utils_eq(iF, i) ? $elm$core$Maybe$Just(
								A2($author$project$AvitoTable$NotFocused, iF + 1, jF)) : $elm$core$Maybe$Just(
								A2($author$project$AvitoTable$NotFocused, iF, jF));
						}
					} else {
						return $elm$core$Maybe$Nothing;
					}
				}();
				var newIds = A3($elm_community$array_extra$Array$Extra$insertAt, i, $elm$core$Maybe$Nothing, model.ids);
				var newCells = A3(
					$author$project$Utils$insertRow,
					i,
					model.cells,
					$author$project$AvitoTable$emptyCellsRow(model.cellsInfo));
				var newModel = _Utils_update(
					model,
					{cells: newCells, current: newcurrent, ids: newIds, rowsCnt: model.rowsCnt + 1});
				var newTask = function () {
					if ((newcurrent.$ === 'Just') && (newcurrent.a.$ === 'Focused')) {
						var _v17 = newcurrent.a;
						var iF = _v17.a;
						var jF = _v17.b;
						return A2(
							$elm$core$Maybe$withDefault,
							$elm$core$Platform$Cmd$none,
							A2(
								$elm$core$Maybe$map,
								function (c) {
									return A2(
										$elm$core$Task$attempt,
										$author$project$AvitoTable$FocusResult,
										$elm$browser$Browser$Dom$focus(
											c.focusId(
												A2($author$project$AvitoTable$mkCellKey, iF, jF))));
								},
								A3($tortus$elm_array_2d$Array2D$get, iF, jF, newCells)));
					} else {
						return $elm$core$Platform$Cmd$none;
					}
				}();
				return _Utils_Tuple3(
					newModel,
					newTask,
					$elm$core$Maybe$Just(
						$author$project$AvitoTable$getData(newModel)));
			case 'InsertCurrentRow':
				var _v21 = model.current;
				if (_v21.$ === 'Just') {
					if (_v21.a.$ === 'Focused') {
						var _v22 = _v21.a;
						var iF = _v22.a;
						var jF = _v22.b;
						var newIds = A3($elm_community$array_extra$Array$Extra$insertAt, iF, $elm$core$Maybe$Nothing, model.ids);
						var newCells = A3(
							$author$project$Utils$insertRow,
							iF,
							model.cells,
							$author$project$AvitoTable$emptyCellsRow(model.cellsInfo));
						var _v23 = _Utils_Tuple2(iF, jF);
						var newIF = _v23.a;
						var newJF = _v23.b;
						var newModel = _Utils_update(
							model,
							{
								cells: newCells,
								current: $elm$core$Maybe$Just(
									A2($author$project$AvitoTable$Focused, newIF, newJF)),
								ids: newIds,
								rowsCnt: model.rowsCnt + 1
							});
						var newTask = A2(
							$elm$core$Maybe$withDefault,
							$elm$core$Platform$Cmd$none,
							A2(
								$elm$core$Maybe$map,
								function (c) {
									return A2(
										$elm$core$Task$attempt,
										$author$project$AvitoTable$FocusResult,
										$elm$browser$Browser$Dom$focus(
											c.focusId(
												A2($author$project$AvitoTable$mkCellKey, newIF, newJF))));
								},
								A3($tortus$elm_array_2d$Array2D$get, newIF, newJF, newCells)));
						return _Utils_Tuple3(
							newModel,
							newTask,
							$elm$core$Maybe$Just(
								$author$project$AvitoTable$getData(newModel)));
					} else {
						var _v24 = _v21.a;
						var iF = _v24.a;
						var jF = _v24.b;
						var newIds = A3($elm_community$array_extra$Array$Extra$insertAt, iF, $elm$core$Maybe$Nothing, model.ids);
						var newCells = A3(
							$author$project$Utils$insertRow,
							iF,
							model.cells,
							$author$project$AvitoTable$emptyCellsRow(model.cellsInfo));
						var _v25 = _Utils_Tuple2(iF + 1, jF);
						var newIF = _v25.a;
						var newJF = _v25.b;
						var newModel = _Utils_update(
							model,
							{
								cells: newCells,
								current: $elm$core$Maybe$Just(
									A2($author$project$AvitoTable$NotFocused, newIF, newJF)),
								ids: newIds,
								rowsCnt: model.rowsCnt + 1
							});
						return _Utils_Tuple3(
							newModel,
							$elm$core$Platform$Cmd$none,
							$elm$core$Maybe$Just(
								$author$project$AvitoTable$getData(newModel)));
					}
				} else {
					return _Utils_Tuple3(model, $elm$core$Platform$Cmd$none, $elm$core$Maybe$Nothing);
				}
			case 'DeleteRow':
				var i = action.a;
				if (_Utils_eq(i, model.rowsCnt - 1)) {
					return _Utils_Tuple3(model, $elm$core$Platform$Cmd$none, $elm$core$Maybe$Nothing);
				} else {
					var newIds = A2($elm_community$array_extra$Array$Extra$removeAt, i, model.ids);
					var newCells = A2($tortus$elm_array_2d$Array2D$deleteRow, i, model.cells);
					var newCells2 = function () {
						var _v28 = model.current;
						if ((_v28.$ === 'Just') && (_v28.a.$ === 'Focused')) {
							var _v29 = _v28.a;
							var iF = _v29.a;
							var jF = _v29.b;
							return _Utils_eq(iF, i) ? A4($author$project$Utils$updateArray2D, iF, jF, $author$project$AvitoCell$focusIn, newCells) : newCells;
						} else {
							return newCells;
						}
					}();
					var newModel = _Utils_update(
						model,
						{cells: newCells2, ids: newIds, rowsCnt: model.rowsCnt - 1});
					var newTask = function () {
						var _v26 = model.current;
						if ((_v26.$ === 'Just') && (_v26.a.$ === 'Focused')) {
							var _v27 = _v26.a;
							var iF = _v27.a;
							var jF = _v27.b;
							return A2(
								$elm$core$Maybe$withDefault,
								$elm$core$Platform$Cmd$none,
								A2(
									$elm$core$Maybe$map,
									function (c) {
										return A2(
											$elm$core$Task$attempt,
											$author$project$AvitoTable$FocusResult,
											$elm$browser$Browser$Dom$focus(
												c.focusId(
													A2($author$project$AvitoTable$mkCellKey, iF, jF))));
									},
									A3($tortus$elm_array_2d$Array2D$get, iF, jF, newCells)));
						} else {
							return $elm$core$Platform$Cmd$none;
						}
					}();
					return _Utils_Tuple3(
						newModel,
						newTask,
						$elm$core$Maybe$Just(
							$author$project$AvitoTable$getData(newModel)));
				}
			case 'DeleteCurrentRow':
				var _v30 = model.current;
				if (_v30.$ === 'Just') {
					if (_v30.a.$ === 'Focused') {
						var _v31 = _v30.a;
						var iF = _v31.a;
						var jF = _v31.b;
						if (_Utils_eq(iF, model.rowsCnt - 1)) {
							return _Utils_Tuple3(model, $elm$core$Platform$Cmd$none, $elm$core$Maybe$Nothing);
						} else {
							var newIds = A2($elm_community$array_extra$Array$Extra$removeAt, iF, model.ids);
							var newCells = A2($tortus$elm_array_2d$Array2D$deleteRow, iF, model.cells);
							var newCells2 = A4($author$project$Utils$updateArray2D, iF, jF, $author$project$AvitoCell$focusIn, newCells);
							var newModel = _Utils_update(
								model,
								{cells: newCells2, ids: newIds, rowsCnt: model.rowsCnt - 1});
							var newTask = A2(
								$elm$core$Maybe$withDefault,
								$elm$core$Platform$Cmd$none,
								A2(
									$elm$core$Maybe$map,
									function (c) {
										return A2(
											$elm$core$Task$attempt,
											$author$project$AvitoTable$FocusResult,
											$elm$browser$Browser$Dom$focus(
												c.focusId(
													A2($author$project$AvitoTable$mkCellKey, iF, jF))));
									},
									A3($tortus$elm_array_2d$Array2D$get, iF, jF, newCells)));
							return _Utils_Tuple3(
								newModel,
								newTask,
								$elm$core$Maybe$Just(
									$author$project$AvitoTable$getData(newModel)));
						}
					} else {
						var _v32 = _v30.a;
						var iF = _v32.a;
						if (_Utils_eq(iF, model.rowsCnt - 1)) {
							return _Utils_Tuple3(model, $elm$core$Platform$Cmd$none, $elm$core$Maybe$Nothing);
						} else {
							var newIds = A2($elm_community$array_extra$Array$Extra$removeAt, iF, model.ids);
							var newCells = A2($tortus$elm_array_2d$Array2D$deleteRow, iF, model.cells);
							var newModel = _Utils_update(
								model,
								{cells: newCells, ids: newIds, rowsCnt: model.rowsCnt - 1});
							return _Utils_Tuple3(
								newModel,
								$elm$core$Platform$Cmd$none,
								$elm$core$Maybe$Just(
									$author$project$AvitoTable$getData(newModel)));
						}
					}
				} else {
					return _Utils_Tuple3(model, $elm$core$Platform$Cmd$none, $elm$core$Maybe$Nothing);
				}
			case 'HandleKeyboardEvent':
				var event = action.a;
				var _v33 = model.current;
				if (_v33.$ === 'Just') {
					if (_v33.a.$ === 'NotFocused') {
						var _v34 = _v33.a;
						var _v35 = event.keyCode;
						switch (_v35.$) {
							case 'Enter':
								return A2($author$project$AvitoTable$moveFocus, $author$project$AvitoTable$Right, model);
							case 'Right':
								return A2($author$project$AvitoTable$moveFocus, $author$project$AvitoTable$Right, model);
							case 'Tab':
								return A2($author$project$AvitoTable$moveFocus, $author$project$AvitoTable$Right, model);
							case 'Left':
								return A2($author$project$AvitoTable$moveFocus, $author$project$AvitoTable$Left, model);
							case 'Up':
								return A2($author$project$AvitoTable$moveFocus, $author$project$AvitoTable$Up, model);
							case 'Down':
								return A2($author$project$AvitoTable$moveFocus, $author$project$AvitoTable$Down, model);
							default:
								return _Utils_Tuple3(model, $elm$core$Platform$Cmd$none, $elm$core$Maybe$Nothing);
						}
					} else {
						var _v36 = _v33.a;
						var iF = _v36.a;
						var jF = _v36.b;
						var _v37 = event.keyCode;
						switch (_v37.$) {
							case 'Escape':
								var newCells = A4($author$project$Utils$updateArray2D, iF, jF, $author$project$AvitoCell$savingFocusOut, model.cells);
								return _Utils_Tuple3(
									_Utils_update(
										model,
										{
											cells: newCells,
											current: $elm$core$Maybe$Just(
												A2($author$project$AvitoTable$NotFocused, iF, jF))
										}),
									$elm$core$Platform$Cmd$none,
									$elm$core$Maybe$Nothing);
							case 'Tab':
								return A2($author$project$AvitoTable$moveFocus, $author$project$AvitoTable$Right, model);
							default:
								return _Utils_Tuple3(model, $elm$core$Platform$Cmd$none, $elm$core$Maybe$Nothing);
						}
					}
				} else {
					return _Utils_Tuple3(model, $elm$core$Platform$Cmd$none, $elm$core$Maybe$Nothing);
				}
			case 'MoveRight':
				return A2($author$project$AvitoTable$moveFocus, $author$project$AvitoTable$Right, model);
			case 'MoveDown':
				return A2($author$project$AvitoTable$moveFocus, $author$project$AvitoTable$Down, model);
			case 'MoveLeft':
				return A2($author$project$AvitoTable$moveFocus, $author$project$AvitoTable$Left, model);
			case 'MoveUp':
				return A2($author$project$AvitoTable$moveFocus, $author$project$AvitoTable$Up, model);
			case 'Paste':
				var str = action.a;
				var _v38 = model.current;
				if (_v38.$ === 'Just') {
					if (_v38.a.$ === 'Focused') {
						var _v39 = _v38.a;
						var iF = _v39.a;
						var jF = _v39.b;
						var newCells = A5(
							$author$project$AvitoTable$pasteData,
							str,
							$author$project$AvitoTable$emptyCellsRow(model.cellsInfo),
							model.cells,
							iF,
							jF);
						var newColsCnt = $tortus$elm_array_2d$Array2D$columns(newCells);
						var newRowsCnt = $tortus$elm_array_2d$Array2D$rows(newCells);
						return _Utils_Tuple3(
							_Utils_update(
								model,
								{cells: newCells, colsCnt: newColsCnt, rowsCnt: newRowsCnt}),
							$elm$core$Platform$Cmd$none,
							$elm$core$Maybe$Nothing);
					} else {
						var _v40 = _v38.a;
						var iF = _v40.a;
						var jF = _v40.b;
						var newCells = A5(
							$author$project$AvitoTable$pasteData,
							str,
							$author$project$AvitoTable$emptyCellsRow(model.cellsInfo),
							model.cells,
							iF,
							jF);
						var newColsCnt = $tortus$elm_array_2d$Array2D$columns(newCells);
						var newRowsCnt = $tortus$elm_array_2d$Array2D$rows(newCells);
						var newModel = _Utils_update(
							model,
							{cells: newCells, colsCnt: newColsCnt, rowsCnt: newRowsCnt});
						return _Utils_Tuple3(
							newModel,
							$elm$core$Platform$Cmd$none,
							$elm$core$Maybe$Just(
								$author$project$AvitoTable$getData(newModel)));
					}
				} else {
					return _Utils_Tuple3(model, $elm$core$Platform$Cmd$none, $elm$core$Maybe$Nothing);
				}
			case 'Unfocus':
				var _v41 = model.current;
				if ((_v41.$ === 'Just') && (_v41.a.$ === 'Focused')) {
					var _v42 = _v41.a;
					var iF = _v42.a;
					var jF = _v42.b;
					var newCells = A4($author$project$Utils$updateArray2D, iF, jF, $author$project$AvitoCell$cancelingFocusOut, model.cells);
					var newModel = _Utils_update(
						model,
						{
							cells: newCells,
							current: $elm$core$Maybe$Just(
								A2($author$project$AvitoTable$NotFocused, iF, jF))
						});
					return _Utils_Tuple3(newModel, $elm$core$Platform$Cmd$none, $elm$core$Maybe$Nothing);
				} else {
					return _Utils_Tuple3(model, $elm$core$Platform$Cmd$none, $elm$core$Maybe$Nothing);
				}
			default:
				var result = action.a;
				if (result.$ === 'Err') {
					return _Utils_Tuple3(model, $elm$core$Platform$Cmd$none, $elm$core$Maybe$Nothing);
				} else {
					return _Utils_Tuple3(model, $elm$core$Platform$Cmd$none, $elm$core$Maybe$Nothing);
				}
		}
	});
var $brian_watkins$elm_procedure$Procedure$Program$addChannel = F2(
	function (subGenerator, procModel) {
		return _Utils_update(
			procModel,
			{
				channels: A3(
					$elm$core$Dict$insert,
					procModel.nextId,
					subGenerator(procModel.nextId),
					procModel.channels),
				nextId: procModel.nextId + 1
			});
	});
var $brian_watkins$elm_procedure$Procedure$Program$deleteChannel = F2(
	function (channelId, procModel) {
		return _Utils_update(
			procModel,
			{
				channels: A2($elm$core$Dict$remove, channelId, procModel.channels)
			});
	});
var $brian_watkins$elm_procedure$Procedure$Program$defaultProcedureModel = {channels: $elm$core$Dict$empty, nextId: 0};
var $brian_watkins$elm_procedure$Procedure$Program$nextChannelIdForProcedure = F2(
	function (procedureId, registry) {
		return A2(
			$elm$core$Maybe$withDefault,
			$brian_watkins$elm_procedure$Procedure$Program$defaultProcedureModel,
			A2($elm$core$Dict$get, procedureId, registry.procedures)).nextId;
	});
var $elm$core$Basics$always = F2(
	function (a, _v0) {
		return a;
	});
var $brian_watkins$elm_procedure$Procedure$Program$sendMessage = function (msg) {
	return A2(
		$elm$core$Task$perform,
		$elm$core$Basics$always(msg),
		$elm$core$Task$succeed(_Utils_Tuple0));
};
var $brian_watkins$elm_procedure$Procedure$Program$updateProcedureModel = F3(
	function (procedureId, registry, mapper) {
		var procModel = mapper(
			A2(
				$elm$core$Maybe$withDefault,
				$brian_watkins$elm_procedure$Procedure$Program$defaultProcedureModel,
				A2($elm$core$Dict$get, procedureId, registry.procedures)));
		return _Utils_update(
			registry,
			{
				procedures: A3($elm$core$Dict$insert, procedureId, procModel, registry.procedures)
			});
	});
var $brian_watkins$elm_procedure$Procedure$Program$updateProcedures = F2(
	function (msg, registry) {
		switch (msg.$) {
			case 'Initiate':
				var generator = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						registry,
						{nextId: registry.nextId + 1}),
					generator(registry.nextId));
			case 'Execute':
				var procedureId = msg.a;
				var cmd = msg.b;
				return _Utils_Tuple2(registry, cmd);
			case 'Subscribe':
				var procedureId = msg.a;
				var messageGenerator = msg.b;
				var subGenerator = msg.c;
				return _Utils_Tuple2(
					A3(
						$brian_watkins$elm_procedure$Procedure$Program$updateProcedureModel,
						procedureId,
						registry,
						$brian_watkins$elm_procedure$Procedure$Program$addChannel(subGenerator)),
					$brian_watkins$elm_procedure$Procedure$Program$sendMessage(
						messageGenerator(
							A2($brian_watkins$elm_procedure$Procedure$Program$nextChannelIdForProcedure, procedureId, registry))));
			case 'Unsubscribe':
				var procedureId = msg.a;
				var channelId = msg.b;
				var nextMessage = msg.c;
				return _Utils_Tuple2(
					A3(
						$brian_watkins$elm_procedure$Procedure$Program$updateProcedureModel,
						procedureId,
						registry,
						$brian_watkins$elm_procedure$Procedure$Program$deleteChannel(channelId)),
					$brian_watkins$elm_procedure$Procedure$Program$sendMessage(nextMessage));
			default:
				return _Utils_Tuple2(registry, $elm$core$Platform$Cmd$none);
		}
	});
var $brian_watkins$elm_procedure$Procedure$Program$update = F2(
	function (msg, _v0) {
		var registry = _v0.a;
		return A2(
			$elm$core$Tuple$mapFirst,
			$brian_watkins$elm_procedure$Procedure$Program$Model,
			A2($brian_watkins$elm_procedure$Procedure$Program$updateProcedures, msg, registry));
	});
var $author$project$AvitoApp$updateColumn = F3(
	function (i, data, ts) {
		var zip2 = F2(
			function (a, b) {
				var _v0 = _Utils_Tuple2(a, b);
				if (_v0.a.b) {
					if (_v0.b.b) {
						var _v1 = _v0.a;
						var x = _v1.a;
						var xs = _v1.b;
						var _v2 = _v0.b;
						var y = _v2.a;
						var ys = _v2.b;
						return A2(
							$elm$core$List$cons,
							_Utils_Tuple2(
								x,
								$elm$core$Maybe$Just(y)),
							A2(zip2, xs, ys));
					} else {
						var _v3 = _v0.a;
						var x = _v3.a;
						var xs = _v3.b;
						return A2(
							$elm$core$List$cons,
							_Utils_Tuple2(x, $elm$core$Maybe$Nothing),
							A2(zip2, xs, _List_Nil));
					}
				} else {
					return _List_Nil;
				}
			});
		return A2(
			$elm$core$List$map,
			function (_v6) {
				var a = _v6.a;
				var c = _v6.b;
				return A2(
					$elm$core$Maybe$withDefault,
					c,
					A3(
						$author$project$AvitoApp$arrayToPost,
						c.id,
						$elm$core$Maybe$Just(c.oid),
						a));
			},
			A2(
				$elm$core$List$map,
				function (_v5) {
					var a = _v5.a;
					var b = _v5.b;
					var c = _v5.c;
					return _Utils_Tuple2(
						A2(
							$elm$core$Maybe$withDefault,
							a,
							A2(
								$elm$core$Maybe$map,
								function (x) {
									return A3($elm$core$Array$set, i, x, a);
								},
								b)),
						c);
				},
				A2(
					$elm$core$List$map,
					function (_v4) {
						var a = _v4.a;
						var b = _v4.b;
						return _Utils_Tuple3(
							$author$project$AvitoApp$postToArray(a),
							b,
							a);
					},
					A2(zip2, data, ts))));
	});
var $author$project$AvitoApp$UploadedImage = function (a) {
	return {$: 'UploadedImage', a: a};
};
var $elm$http$Http$filePart = _Http_pair;
var $elm$http$Http$multipartBody = function (parts) {
	return A2(
		_Http_pair,
		'',
		_Http_toFormData(parts));
};
var $author$project$AvitoApp$uploadImage = F2(
	function (bucket, file) {
		return $elm$http$Http$request(
			{
				body: $elm$http$Http$multipartBody(
					_List_fromArray(
						[
							A2($elm$http$Http$filePart, 'image', file)
						])),
				expect: $elm$http$Http$expectWhatever($author$project$AvitoApp$UploadedImage),
				headers: _List_Nil,
				method: 'POST',
				timeout: $elm$core$Maybe$Nothing,
				tracker: $elm$core$Maybe$Nothing,
				url: '/api/images/' + bucket
			});
	});
var $author$project$AvitoApp$update = F2(
	function (action, model) {
		switch (action.$) {
			case 'AvitoTable':
				var msg = action.a;
				var _v1 = model.mData;
				if (_v1.$ === 'Just') {
					var mData = _v1.a;
					var _v2 = A2($author$project$AvitoTable$update, msg, mData.avitoTable);
					var t = _v2.a;
					var cmd = _v2.b;
					var i = _v2.c;
					if (i.$ === 'Just') {
						var ds = i.a;
						var newData = A2(
							$elm$core$Maybe$withDefault,
							mData.data,
							A2(
								$elm$core$Maybe$map,
								$elm$core$Array$fromList,
								$elm_community$maybe_extra$Maybe$Extra$combine(
									$elm$core$Array$toList(
										A2(
											$elm$core$Array$indexedMap,
											F2(
												function (j, _v4) {
													var id = _v4.a;
													var a = _v4.b;
													return A3($author$project$AvitoApp$arrayToPost, j, id, a);
												}),
											ds)))));
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									httpStatus: $author$project$AvitoApp$Loading('Сохраняем данные'),
									mData: $elm$core$Maybe$Just(
										_Utils_update(
											mData,
											{avitoTable: t, data: newData}))
								}),
							$elm$core$Platform$Cmd$batch(
								_List_fromArray(
									[
										A2($elm$core$Platform$Cmd$map, $author$project$AvitoApp$AvitoTable, cmd),
										A2(
										$author$project$AvitoApp$saveData,
										mData.meta,
										$elm$core$Array$toList(newData))
									])));
					} else {
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									mData: $elm$core$Maybe$Just(
										_Utils_update(
											mData,
											{avitoTable: t}))
								}),
							A2($elm$core$Platform$Cmd$map, $author$project$AvitoApp$AvitoTable, cmd));
					}
				} else {
					return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				}
			case 'GotInitialData':
				var result = action.a;
				var _v5 = A3($elm$core$Maybe$map2, $elm$core$Dict$get, model.mName, model.mMeta);
				if ((_v5.$ === 'Just') && (_v5.a.$ === 'Just')) {
					var meta = _v5.a.a;
					if (result.$ === 'Ok') {
						var rows = result.a;
						var data = $elm$core$Array$fromList(rows);
						var avitoTable = A2(
							$elm$core$Maybe$withDefault,
							A2(
								$author$project$AvitoTable$initModel,
								$author$project$AvitoApp$tableInfo(meta),
								$elm$core$Array$empty),
							A2(
								$elm$core$Maybe$andThen,
								function (md) {
									return $elm$core$Maybe$Just(md.avitoTable);
								},
								model.mData));
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									httpStatus: $author$project$AvitoApp$Success,
									mData: $elm$core$Maybe$Just(
										{
											avitoTable: A2(
												$author$project$AvitoTable$setData,
												avitoTable,
												A2(
													$elm_community$array_extra$Array$Extra$zip,
													A2(
														$elm$core$Array$map,
														function ($) {
															return $.oid;
														},
														data),
													$elm$core$Array$fromList(
														A2($elm$core$List$map, $author$project$AvitoApp$postToArray, rows)))),
											data: data,
											meta: meta
										}),
									randText: A2(
										$elm$core$Debug$log,
										'randText',
										A2(
											$elm$core$Array$repeat,
											$elm$core$Array$length(
												$author$project$AvitoApp$tableInfo(meta)),
											$elm$core$Maybe$Just('')))
								}),
							$elm$core$Platform$Cmd$none);
					} else {
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									httpStatus: $author$project$AvitoApp$Failure('Ошибка получения данных')
								}),
							$elm$core$Platform$Cmd$none);
					}
				} else {
					return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				}
			case 'GotMeta':
				var result = action.a;
				if (result.$ === 'Ok') {
					var meta = result.a;
					var _v8 = $elm$core$List$head(meta);
					if (_v8.$ === 'Just') {
						var m = _v8.a;
						var namedMeta = A2(
							$elm$core$List$map,
							function (n) {
								return _Utils_Tuple2(n.name, n);
							},
							meta);
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									httpStatus: $author$project$AvitoApp$Success,
									mData: $elm$core$Maybe$Nothing,
									mMeta: $elm$core$Maybe$Just(
										$elm$core$Dict$fromList(namedMeta)),
									mName: $elm$core$Maybe$Just(m.name),
									randText: $elm$core$Array$empty
								}),
							$author$project$AvitoApp$getData(m));
					} else {
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									httpStatus: $author$project$AvitoApp$Failure('Ошибка получения данных')
								}),
							$elm$core$Platform$Cmd$none);
					}
				} else {
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								httpStatus: $author$project$AvitoApp$Failure('Ошибка получения данных')
							}),
						$elm$core$Platform$Cmd$none);
				}
			case 'DataPosted':
				var result = action.a;
				var _v9 = A3($elm$core$Maybe$map2, $elm$core$Dict$get, model.mName, model.mMeta);
				if ((_v9.$ === 'Just') && (_v9.a.$ === 'Just')) {
					var meta = _v9.a.a;
					if (result.$ === 'Ok') {
						var rows = result.a;
						var data = $elm$core$Array$fromList(rows);
						var avitoTable = A2(
							$elm$core$Maybe$withDefault,
							A2(
								$author$project$AvitoTable$initModel,
								$author$project$AvitoApp$tableInfo(meta),
								$elm$core$Array$empty),
							A2(
								$elm$core$Maybe$andThen,
								function (md) {
									return $elm$core$Maybe$Just(md.avitoTable);
								},
								model.mData));
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									httpStatus: $author$project$AvitoApp$Success,
									mData: $elm$core$Maybe$Just(
										{
											avitoTable: A2(
												$author$project$AvitoTable$setData,
												avitoTable,
												A2(
													$elm_community$array_extra$Array$Extra$zip,
													A2(
														$elm$core$Array$map,
														function ($) {
															return $.oid;
														},
														data),
													$elm$core$Array$fromList(
														A2($elm$core$List$map, $author$project$AvitoApp$postToArray, rows)))),
											data: data,
											meta: meta
										})
								}),
							$elm$core$Platform$Cmd$none);
					} else {
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									httpStatus: $author$project$AvitoApp$Failure('Ошибка сохраннения данных')
								}),
							$elm$core$Platform$Cmd$none);
					}
				} else {
					return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				}
			case 'RefreshData':
				var _v11 = model.mData;
				if (_v11.$ === 'Just') {
					var mData = _v11.a;
					return _Utils_Tuple2(
						model,
						$author$project$AvitoApp$getData(mData.meta));
				} else {
					return _Utils_Tuple2(model, $author$project$AvitoApp$getMeta);
				}
			case 'RandText':
				var i = action.a;
				var _v12 = model.mData;
				if (_v12.$ === 'Just') {
					var mData = _v12.a;
					return _Utils_Tuple2(
						model,
						A2(
							$elm$core$Maybe$withDefault,
							$elm$core$Platform$Cmd$none,
							A2(
								$elm$core$Maybe$andThen,
								$elm$core$Maybe$map(
									A2(
										$author$project$AvitoApp$getRandText,
										$elm$core$Array$length(mData.data),
										i)),
								A2($elm$core$Array$get, i, model.randText))));
				} else {
					return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				}
			case 'GotRandText':
				var i = action.a;
				var result = action.b;
				var _v13 = model.mData;
				if (_v13.$ === 'Just') {
					var mData = _v13.a;
					if (result.$ === 'Ok') {
						var ts = result.a;
						var newData = A3(
							$author$project$AvitoApp$updateColumn,
							i,
							$elm$core$Array$toList(mData.data),
							ts);
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									mData: $elm$core$Maybe$Just(
										_Utils_update(
											mData,
											{
												avitoTable: A2(
													$author$project$AvitoTable$setData,
													mData.avitoTable,
													A2(
														$elm_community$array_extra$Array$Extra$zip,
														A2(
															$elm$core$Array$map,
															function ($) {
																return $.oid;
															},
															mData.data),
														$elm$core$Array$fromList(
															A2($elm$core$List$map, $author$project$AvitoApp$postToArray, newData)))),
												data: $elm$core$Array$fromList(newData)
											}))
								}),
							A2($author$project$AvitoApp$saveData, mData.meta, newData));
					} else {
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									httpStatus: $author$project$AvitoApp$Failure('Ошибка получения рандомизированного текста')
								}),
							$elm$core$Platform$Cmd$none);
					}
				} else {
					return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				}
			case 'InputRandText':
				var i = action.a;
				var str = action.b;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							randText: A3(
								$elm_community$array_extra$Array$Extra$update,
								i,
								$elm$core$Maybe$map(
									function (_v15) {
										return str;
									}),
								model.randText)
						}),
					$elm$core$Platform$Cmd$none);
			case 'ProcedureMsg':
				var procMsg = action.a;
				return A2(
					$elm$core$Tuple$mapFirst,
					function (updated) {
						return _Utils_update(
							model,
							{procModel: updated});
					},
					A2($brian_watkins$elm_procedure$Procedure$Program$update, procMsg, model.procModel));
			case 'GotImage':
				if (action.b.$ === 'Just') {
					var bucket = action.a;
					var file = action.b.a;
					return _Utils_Tuple2(
						model,
						A2($author$project$AvitoApp$uploadImage, bucket, file));
				} else {
					var _v16 = action.b;
					return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				}
			case 'RemoveImage':
				var bucket = action.a;
				var name = action.b;
				return _Utils_Tuple2(
					model,
					A2($author$project$AvitoApp$removeImage, bucket, name));
			case 'UploadedImage':
				var result = action.a;
				var _v17 = model.mData;
				if (_v17.$ === 'Just') {
					var mData = _v17.a;
					if (result.$ === 'Ok') {
						return _Utils_Tuple2(
							model,
							$author$project$AvitoApp$getData(mData.meta));
					} else {
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									httpStatus: $author$project$AvitoApp$Failure('Ошибка загрузки картинки')
								}),
							$elm$core$Platform$Cmd$none);
					}
				} else {
					return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				}
			default:
				var result = action.a;
				var _v19 = model.mData;
				if (_v19.$ === 'Just') {
					var mData = _v19.a;
					if (result.$ === 'Ok') {
						return _Utils_Tuple2(
							model,
							$author$project$AvitoApp$getData(mData.meta));
					} else {
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									httpStatus: $author$project$AvitoApp$Failure('Ошибка удаления картинки')
								}),
							$elm$core$Platform$Cmd$none);
					}
				} else {
					return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				}
		}
	});
var $elm$html$Html$div = _VirtualDom_node('div');
var $author$project$AvitoApp$InputRandText = F2(
	function (a, b) {
		return {$: 'InputRandText', a: a, b: b};
	});
var $author$project$AvitoApp$RandText = function (a) {
	return {$: 'RandText', a: a};
};
var $elm$html$Html$button = _VirtualDom_node('button');
var $elm$virtual_dom$VirtualDom$Normal = function (a) {
	return {$: 'Normal', a: a};
};
var $elm$html$Html$Events$on = F2(
	function (event, decoder) {
		return A2(
			$elm$virtual_dom$VirtualDom$on,
			event,
			$elm$virtual_dom$VirtualDom$Normal(decoder));
	});
var $elm$html$Html$Events$onClick = function (msg) {
	return A2(
		$elm$html$Html$Events$on,
		'click',
		$elm$json$Json$Decode$succeed(msg));
};
var $elm$html$Html$td = _VirtualDom_node('td');
var $elm$html$Html$tr = _VirtualDom_node('tr');
var $author$project$AvitoApp$hcontrols = function (model) {
	return A2(
		$elm$html$Html$tr,
		_List_Nil,
		A2(
			$elm$core$List$cons,
			A2($elm$html$Html$td, _List_Nil, _List_Nil),
			$elm$core$Array$toList(
				A2(
					$elm$core$Array$indexedMap,
					F2(
						function (i, v) {
							return A2(
								$elm$core$Maybe$withDefault,
								A2($elm$html$Html$td, _List_Nil, _List_Nil),
								A2(
									$elm$core$Maybe$map,
									function (w) {
										return A2(
											$elm$html$Html$td,
											_List_Nil,
											_List_fromArray(
												[
													A2(
													$elm$html$Html$input,
													_List_fromArray(
														[
															$elm$html$Html$Events$onInput(
															$author$project$AvitoApp$InputRandText(i)),
															$elm$html$Html$Attributes$value(w)
														]),
													_List_Nil),
													A2(
													$elm$html$Html$button,
													_List_fromArray(
														[
															$elm$html$Html$Events$onClick(
															$author$project$AvitoApp$RandText(i))
														]),
													_List_fromArray(
														[
															$elm$html$Html$text('X')
														]))
												]));
									},
									v));
						}),
					model.randText))));
};
var $elm$virtual_dom$VirtualDom$attribute = F2(
	function (key, value) {
		return A2(
			_VirtualDom_attribute,
			_VirtualDom_noOnOrFormAction(key),
			_VirtualDom_noJavaScriptOrHtmlUri(value));
	});
var $elm$html$Html$Attributes$attribute = $elm$virtual_dom$VirtualDom$attribute;
var $author$project$AvitoTable$CellClick = F2(
	function (a, b) {
		return {$: 'CellClick', a: a, b: b};
	});
var $author$project$AvitoTable$DoubleCellClick = F2(
	function (a, b) {
		return {$: 'DoubleCellClick', a: a, b: b};
	});
var $elm$html$Html$Attributes$autofocus = $elm$html$Html$Attributes$boolProperty('autofocus');
var $elm$virtual_dom$VirtualDom$map = _VirtualDom_map;
var $elm$html$Html$map = $elm$virtual_dom$VirtualDom$map;
var $author$project$AvitoTable$avitoLastRow = F4(
	function (i, t, trow, rowV) {
		return A2(
			$elm$html$Html$tr,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'height', '1.5em')
				]),
			A2(
				trow,
				i,
				A2(
					$elm$core$List$map,
					$elm$html$Html$map(t),
					rowV)));
	});
var $author$project$AvitoTable$avitoRow = F4(
	function (i, t, trow, rowV) {
		return A2(
			$elm$html$Html$tr,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'height', '1.5em')
				]),
			A2(
				trow,
				i,
				A2(
					$elm$core$List$map,
					$elm$html$Html$map(t),
					rowV)));
	});
var $elm$virtual_dom$VirtualDom$mapAttribute = _VirtualDom_mapAttribute;
var $elm$html$Html$Attributes$map = $elm$virtual_dom$VirtualDom$mapAttribute;
var $elm$html$Html$Events$onDoubleClick = function (msg) {
	return A2(
		$elm$html$Html$Events$on,
		'dblclick',
		$elm$json$Json$Decode$succeed(msg));
};
var $elm$html$Html$table = _VirtualDom_node('table');
var $elm$html$Html$tbody = _VirtualDom_node('tbody');
var $elm$html$Html$th = _VirtualDom_node('th');
var $elm$html$Html$thead = _VirtualDom_node('thead');
var $author$project$AvitoCell$view = F2(
	function (key, model) {
		var _v0 = model.status;
		if (_v0.$ === 'Normal') {
			return A2(model.normal, key, model.value);
		} else {
			return A2(model.edit, key, model.value);
		}
	});
var $author$project$AvitoTable$avitoTable = F5(
	function (model, t, hctl, _throw, trow) {
		var cellsV = A2(
			$tortus$elm_array_2d$Array2D$indexedMap,
			F3(
				function (i, j, c) {
					var attrs = function () {
						var _v0 = model.current;
						if (_v0.$ === 'Nothing') {
							return _List_fromArray(
								[
									A2($elm$html$Html$Attributes$style, 'border', 'solid 1px black'),
									A2($elm$html$Html$Attributes$style, 'width', '600px'),
									$elm$html$Html$Events$onClick(
									A2($author$project$AvitoTable$CellClick, i, j)),
									$elm$html$Html$Events$onDoubleClick(
									A2($author$project$AvitoTable$DoubleCellClick, i, j))
								]);
						} else {
							if (_v0.a.$ === 'NotFocused') {
								var _v1 = _v0.a;
								var iF = _v1.a;
								var jF = _v1.b;
								return (_Utils_eq(i, iF) && _Utils_eq(j, jF)) ? _List_fromArray(
									[
										A2($elm$html$Html$Attributes$style, 'border', 'solid 2px yellow'),
										A2($elm$html$Html$Attributes$style, 'width', '600px'),
										$elm$html$Html$Events$onDoubleClick(
										A2($author$project$AvitoTable$DoubleCellClick, i, j))
									]) : _List_fromArray(
									[
										A2($elm$html$Html$Attributes$style, 'border', 'solid 1px black'),
										A2($elm$html$Html$Attributes$style, 'width', '600px'),
										$elm$html$Html$Events$onClick(
										A2($author$project$AvitoTable$CellClick, i, j)),
										$elm$html$Html$Events$onDoubleClick(
										A2($author$project$AvitoTable$DoubleCellClick, i, j))
									]);
							} else {
								var _v2 = _v0.a;
								var iF = _v2.a;
								var jF = _v2.b;
								return (_Utils_eq(i, iF) && _Utils_eq(j, jF)) ? _List_fromArray(
									[
										A2($elm$html$Html$Attributes$style, 'border', 'solid 2px red'),
										A2($elm$html$Html$Attributes$style, 'width', '600px'),
										$elm$html$Html$Events$onDoubleClick(
										A2($author$project$AvitoTable$DoubleCellClick, i, j))
									]) : _List_fromArray(
									[
										A2($elm$html$Html$Attributes$style, 'border', 'solid 1px black'),
										A2($elm$html$Html$Attributes$style, 'width', '600px'),
										$elm$html$Html$Events$onClick(
										A2($author$project$AvitoTable$CellClick, i, j)),
										$elm$html$Html$Events$onDoubleClick(
										A2($author$project$AvitoTable$DoubleCellClick, i, j))
									]);
							}
						}
					}();
					return A2(
						$elm$html$Html$td,
						attrs,
						A2(
							$elm$core$List$map,
							$elm$html$Html$map(
								A2($author$project$AvitoTable$CellMsg, i, j)),
							A2(
								$author$project$AvitoCell$view,
								A2($author$project$AvitoTable$mkCellKey, i, j),
								c)));
				}),
			model.cells);
		var rows = A2(
			$elm$core$List$map,
			function (i) {
				return $elm$core$Array$toList(
					A2(
						$elm$core$Maybe$withDefault,
						$elm$core$Array$empty,
						A2($tortus$elm_array_2d$Array2D$getRow, i, cellsV)));
			},
			A2(
				$elm$core$List$range,
				0,
				$tortus$elm_array_2d$Array2D$rows(model.cells) - 1));
		var cellsInfoL = $elm$core$Array$toList(model.cellsInfo);
		var headP = A2(
			$elm$core$List$map,
			function (i) {
				return _List_fromArray(
					[
						$elm$html$Html$text(i.name)
					]);
			},
			cellsInfoL);
		return A2(
			$elm$html$Html$table,
			A2(
				$elm$core$List$map,
				$elm$html$Html$Attributes$map(t),
				_List_fromArray(
					[
						$elm$html$Html$Attributes$tabindex(1),
						$elm$html$Html$Attributes$autofocus(true)
					])),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$thead,
					_List_Nil,
					_throw(
						A2(
							$elm$core$List$map,
							$elm$html$Html$map(t),
							_Utils_ap(
								A2(
									$elm$core$List$map,
									$elm$html$Html$th(_List_Nil),
									headP),
								_List_fromArray(
									[
										A2($elm$html$Html$th, _List_Nil, _List_Nil)
									]))))),
					A2(
					$elm$html$Html$tbody,
					_List_Nil,
					A2(
						$elm$core$List$cons,
						hctl,
						A2(
							$elm$core$List$indexedMap,
							function (i) {
								return _Utils_eq(
									i + 1,
									$elm$core$List$length(rows)) ? A3($author$project$AvitoTable$avitoLastRow, i, t, trow) : A3($author$project$AvitoTable$avitoRow, i, t, trow);
							},
							rows)))
				]));
	});
var $author$project$AvitoTable$clipboardData = A2($elm$json$Json$Decode$field, 'clipbloardData', $elm$json$Json$Decode$string);
var $author$project$AvitoTable$onPaste = function (msg) {
	return A2(
		$elm$html$Html$Events$on,
		'paste',
		A2($elm$json$Json$Decode$map, msg, $author$project$AvitoTable$clipboardData));
};
var $author$project$AvitoTable$MoveDown = {$: 'MoveDown'};
var $author$project$AvitoTable$MoveLeft = {$: 'MoveLeft'};
var $author$project$AvitoTable$MoveRight = {$: 'MoveRight'};
var $author$project$AvitoTable$MoveUp = {$: 'MoveUp'};
var $author$project$AvitoTable$Unfocus = {$: 'Unfocus'};
var $author$project$AvitoTable$tableKeys = A3(
	$robinheghan$keyboard_events$Keyboard$Events$custom,
	$robinheghan$keyboard_events$Keyboard$Events$Keydown,
	{preventDefault: true, stopPropagation: true},
	_List_fromArray(
		[
			_Utils_Tuple2($ohanhi$keyboard$Keyboard$ArrowRight, $author$project$AvitoTable$MoveRight),
			_Utils_Tuple2($ohanhi$keyboard$Keyboard$Tab, $author$project$AvitoTable$MoveRight),
			_Utils_Tuple2($ohanhi$keyboard$Keyboard$Enter, $author$project$AvitoTable$MoveRight),
			_Utils_Tuple2($ohanhi$keyboard$Keyboard$ArrowDown, $author$project$AvitoTable$MoveDown),
			_Utils_Tuple2($ohanhi$keyboard$Keyboard$ArrowLeft, $author$project$AvitoTable$MoveLeft),
			_Utils_Tuple2($ohanhi$keyboard$Keyboard$ArrowUp, $author$project$AvitoTable$MoveUp),
			_Utils_Tuple2($ohanhi$keyboard$Keyboard$Escape, $author$project$AvitoTable$Unfocus)
		]));
var $author$project$AvitoTable$DeleteCurrentRow = {$: 'DeleteCurrentRow'};
var $author$project$AvitoTable$InsertCurrentRow = {$: 'InsertCurrentRow'};
var $author$project$AvitoTable$topButtons = function (_v0) {
	return A2(
		$elm$html$Html$div,
		_List_Nil,
		_List_fromArray(
			[
				A2(
				$elm$html$Html$button,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$tabindex(-1),
						$elm$html$Html$Events$onClick($author$project$AvitoTable$DeleteCurrentRow)
					]),
				_List_fromArray(
					[
						$elm$html$Html$text('Удалить')
					])),
				A2(
				$elm$html$Html$button,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$tabindex(-1),
						$elm$html$Html$Events$onClick($author$project$AvitoTable$InsertCurrentRow)
					]),
				_List_fromArray(
					[
						$elm$html$Html$text('Добавить')
					]))
			]));
};
var $author$project$AvitoTable$viewModel = F3(
	function (model, t, hcontrol) {
		var currentText = function () {
			var _v0 = model.current;
			if (_v0.$ === 'Just') {
				if (_v0.a.$ === 'Focused') {
					var _v1 = _v0.a;
					var iF = _v1.a;
					var jF = _v1.b;
					return 'Сфокусирована ячейка ' + ($elm$core$String$fromInt(iF) + (' ' + $elm$core$String$fromInt(jF)));
				} else {
					var _v2 = _v0.a;
					var iF = _v2.a;
					var jF = _v2.b;
					return 'Курсована ячейка ' + ($elm$core$String$fromInt(iF) + (' ' + $elm$core$String$fromInt(jF)));
				}
			} else {
				return 'Курсовонной ячейки нет';
			}
		}();
		return A2(
			$elm$core$List$map,
			$elm$html$Html$map(t),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_Nil,
					_List_fromArray(
						[
							$elm$html$Html$text(currentText)
						]))
				]));
	});
var $author$project$AvitoTable$view = F5(
	function (model, t, hctl, _throw, trow) {
		var attrs = A2(
			$elm$core$List$map,
			$elm$html$Html$Attributes$map(t),
			_List_fromArray(
				[
					$author$project$AvitoTable$tableKeys,
					$author$project$AvitoTable$onPaste($author$project$AvitoTable$Paste),
					A2($elm$html$Html$Attributes$attribute, 'contenteditable', 'false')
				]));
		return _List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				attrs,
				A2(
					$elm$core$List$cons,
					A2(
						$elm$html$Html$map,
						t,
						$author$project$AvitoTable$topButtons(model)),
					A2(
						$elm$core$List$cons,
						A5($author$project$AvitoTable$avitoTable, model, t, hctl, _throw, trow),
						A3($author$project$AvitoTable$viewModel, model, t, hctl))))
			]);
	});
var $author$project$AvitoApp$viewTableHRow = function (v) {
	return A2(
		$elm$core$List$cons,
		A2(
			$elm$html$Html$td,
			_List_Nil,
			_List_fromArray(
				[
					$elm$html$Html$text('')
				])),
		v);
};
var $author$project$AvitoApp$GotImage = F2(
	function (a, b) {
		return {$: 'GotImage', a: a, b: b};
	});
var $author$project$AvitoApp$RemoveImage = F2(
	function (a, b) {
		return {$: 'RemoveImage', a: a, b: b};
	});
var $elm$file$File$decoder = _File_decoder;
var $author$project$AvitoApp$fileDecoder = A2(
	$elm$json$Json$Decode$at,
	_List_fromArray(
		['target', 'files']),
	A2(
		$elm$json$Json$Decode$map,
		function (fs) {
			if (!fs.b) {
				return $elm$core$Maybe$Nothing;
			} else {
				var f = fs.a;
				return $elm$core$Maybe$Just(f);
			}
		},
		$elm$json$Json$Decode$list($elm$file$File$decoder)));
var $elm$html$Html$Attributes$height = function (n) {
	return A2(
		_VirtualDom_attribute,
		'height',
		$elm$core$String$fromInt(n));
};
var $elm$html$Html$img = _VirtualDom_node('img');
var $elm$html$Html$Attributes$multiple = $elm$html$Html$Attributes$boolProperty('multiple');
var $elm$html$Html$Attributes$name = $elm$html$Html$Attributes$stringProperty('name');
var $elm$html$Html$Attributes$src = function (url) {
	return A2(
		$elm$html$Html$Attributes$stringProperty,
		'src',
		_VirtualDom_noJavaScriptOrHtmlUri(url));
};
var $elm$html$Html$Attributes$type_ = $elm$html$Html$Attributes$stringProperty('type');
var $author$project$AvitoApp$viewTableRow = F3(
	function (data, i, v) {
		var upload = function (bucket) {
			return A2(
				$elm$html$Html$input,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$type_('file'),
						$elm$html$Html$Attributes$multiple(true),
						$elm$html$Html$Attributes$name('image'),
						A2(
						$elm$html$Html$Events$on,
						'change',
						A2(
							$elm$json$Json$Decode$map,
							$author$project$AvitoApp$GotImage(bucket),
							$author$project$AvitoApp$fileDecoder))
					]),
				_List_Nil);
		};
		var remove = F2(
			function (bucket, name) {
				return A2(
					$elm$html$Html$input,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$type_('button'),
							$elm$html$Html$Events$onClick(
							A2($author$project$AvitoApp$RemoveImage, bucket, name))
						]),
					_List_Nil);
			});
		var ww = function (d) {
			return A2(
				$elm$html$Html$td,
				_List_Nil,
				_Utils_ap(
					A2(
						$elm$core$List$cons,
						upload(d.oid),
						A2(
							$elm$core$List$map,
							function (u) {
								return A2(
									$elm$html$Html$span,
									_List_Nil,
									_List_fromArray(
										[
											A2(
											$elm$html$Html$img,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$src(u.url),
													$elm$html$Html$Attributes$height(50)
												]),
											_List_Nil),
											A2(remove, d.oid, u.name)
										]));
							},
							d.imageUrl)),
					_List_fromArray(
						[
							$elm$html$Html$text(d.oid)
						])));
		};
		var w = A2(
			$elm$core$Maybe$withDefault,
			A2(
				$elm$html$Html$td,
				_List_Nil,
				_List_fromArray(
					[
						$elm$html$Html$text('')
					])),
			A2(
				$elm$core$Maybe$map,
				ww,
				A2($elm$core$Array$get, i, data)));
		return A2($elm$core$List$cons, w, v);
	});
var $author$project$AvitoApp$viewAvitoTable = function (model) {
	var _v0 = model.mData;
	if (_v0.$ === 'Nothing') {
		return _List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_Nil,
				_List_fromArray(
					[
						$elm$html$Html$text('Грузится...')
					]))
			]);
	} else {
		var mData = _v0.a;
		return A5(
			$author$project$AvitoTable$view,
			mData.avitoTable,
			$author$project$AvitoApp$AvitoTable,
			$author$project$AvitoApp$hcontrols(model),
			$author$project$AvitoApp$viewTableHRow,
			$author$project$AvitoApp$viewTableRow(mData.data));
	}
};
var $author$project$AvitoApp$RefreshData = {$: 'RefreshData'};
var $author$project$AvitoApp$refreshButton = A2(
	$elm$html$Html$button,
	_List_fromArray(
		[
			$elm$html$Html$Events$onClick($author$project$AvitoApp$RefreshData)
		]),
	_List_fromArray(
		[
			$elm$html$Html$text('Обновить')
		]));
var $author$project$AvitoApp$viewHttpStatus = function (status) {
	switch (status.$) {
		case 'Success':
			return _List_fromArray(
				[
					$elm$html$Html$text('Норм')
				]);
		case 'Loading':
			var s = status.a;
			return _List_fromArray(
				[
					$elm$html$Html$text(s)
				]);
		default:
			var s = status.a;
			return _List_fromArray(
				[
					$elm$html$Html$text(s),
					$author$project$AvitoApp$refreshButton
				]);
	}
};
var $author$project$AvitoApp$view = function (model) {
	return A2(
		$elm$html$Html$div,
		_List_Nil,
		_Utils_ap(
			$author$project$AvitoApp$viewHttpStatus(model.httpStatus),
			$author$project$AvitoApp$viewAvitoTable(model)));
};
var $author$project$AvitoApp$main = $elm$browser$Browser$element(
	{
		init: function (_v0) {
			return _Utils_Tuple2($author$project$AvitoApp$initModel, $author$project$AvitoApp$getMeta);
		},
		subscriptions: function (model) {
			return A2(
				$elm$core$Platform$Sub$map,
				$author$project$AvitoApp$AvitoTable,
				$author$project$AvitoTable$subscriptions(
					A2($author$project$AvitoTable$initModel, $elm$core$Array$empty, $elm$core$Array$empty)));
		},
		update: $author$project$AvitoApp$update,
		view: $author$project$AvitoApp$view
	});
_Platform_export({'AvitoApp':{'init':$author$project$AvitoApp$main(
	$elm$json$Json$Decode$succeed(_Utils_Tuple0))(0)}});}(this));