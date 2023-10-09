/* eslint-disable no-extend-native */
/* eslint no-global-assign:0 */

// eslint-disable-next-line no-undef
jQuery.fn.scrollTo = function(elem) {
	$(this).scrollTop($(this).scrollTop() - $(this).offset().top + $(elem).offset().top - 45);
	return this;
};
$(function() {
	// $(".ui.sidebar").sidebar("attach events", ".toc.item");
	$(".ui.pointing.dropdown.link.item").dropdown();
});

// eslint-disable-next-line no-unused-vars
var PHONE_VALIDATOR = /^[6-9]\d{9}$/;

document.addEventListener("visibilitychange", function() {

});

// eslint-disable-next-line no-unused-vars
function toggleFilterView() {
	$("#invoiceFilters").transition({animation: "slide down"});
}
function initLogout() {
	$(".logout-modal").modal("show");
}

// eslint-disable-next-line no-unused-vars
function initLogoutResponsive() {
	$(".dimmed").click();
	setTimeout(initLogout, 500);
}

var BASE_URL = window.location.origin+"/";

// eslint-disable-next-line no-undef
// var app = angular.module("app", ["ui.router", "ngAnimate", "toastr", "selectize"]);
var app = angular.module("app", ["ui.router", "ngAnimate", "toastr", "angularUtils.directives.dirPagination", "selectize"]);
app.factory("dataFactory", ["$http", "toastr", function($http, toastr) {
	var obj = {};
	obj.toastSuccess = function(data) {
		toastr.success(data, "");
	};
	obj.toastError = function(data) {
		toastr.error(data, "");
	};
	obj.toastInfo = function(data) {
		toastr.info(data, "");
	};
	obj.get = function(q) {
		return $http.get(BASE_URL + q).then(function(results) {
			return results.data;
		});
	};
	obj.post = function(q, object) {
		return $http.post(BASE_URL + q, object).then(function(results) {
			return results.data;
		});
	};
	obj.put = function(q, object) {
		return $http.put(BASE_URL + q, object).then(function(results) {
			return results.data;
		});
	};
	obj.delete = function(q) {
		return $http.delete(BASE_URL + q).then(function(results) {
			return results.data;
		});
	};
	return obj;
}]);
// run.$inject = ['$rootScope', '$state', '$location', '$window'];
app.run(["$rootScope", function($rootScope) {
	$rootScope.BASE_URL = BASE_URL;
}]);
app.config(["toastrConfig", function(toastrConfig) {
	// eslint-disable-next-line no-undef
	angular.extend(toastrConfig, {
		autoDismiss: false,
		closeButton: true,
		containerId: "toast-container",
		maxOpened: 0,
		newestOnTop: true,
		positionClass: "toast-bottom-right",
		preventDuplicates: false,
		preventOpenDuplicates: false,
		target: "body",
	});
}]);

app.config(["$locationProvider", function($locationProvider) {
	$locationProvider.hashPrefix(""); // by default '!'
	// $locationProvider.html5Mode(true);
}]);

app.config(["paginationTemplateProvider", function(paginationTemplateProvider) {
	paginationTemplateProvider.setPath("/templates/dirPagination.tpl.html");
}]);

app.filter("isoDateFormat", function() {
	return function(isoDateString, format) {
		try {
			if (!format) {
				format = "DD-MM-YYYY HH:mm";
			}
			return moment(isoDateString).format(format);
		} catch (ex) {
			return "";
		}
	};
});


var timeInMillsDate = new Date();
app.filter("timeInMills", function() {
	return function(mills) {
		if (!mills) {
			return "n/a";
		}
		timeInMillsDate.setTime(1488047400000 + mills);
		return moment(timeInMillsDate).format("hh:mm a");
	};
});

app.config(["$provide", function($provide) {
	$provide.decorator("$state", ["$delegate", "$rootScope", function($delegate, $rootScope) {
		$rootScope.$on("$stateChangeStart", function(event, state, params) {
			$delegate.next = state;
			$delegate.toParams = params;
		});
		return $delegate;
	}]);
}]);

var currImageId = "";
// eslint-disable-next-line no-unused-vars
var currUploadedFile = null;

// eslint-disable-next-line no-unused-vars
function processFileForUpload(e) {
	try {
		var files = e.target.files || e.dataTransfer.files || e.originalEvent.dataTransfer.files;
		var file = files[0];
		if (file) {
			var extention = file.name.toUpperCase().split(".");
			extention = extention[extention.length - 1];
			if (file.size > (512 * 1024)) {
				if (["JPG", "JPEG"].indexOf(extention)>=0) {
					new Compressor(file, {
						quality: 0.7,
						maxWidth: 1920,
						maxHeight: 1080,
						success: function(cResult) {
							var cfile = new File([cResult], file.name);
							$("#img-"+currImageId).attr("src", URL.createObjectURL(cResult));
							currUploadedFile = cfile;
						},
						error: function(err) {
							$("#proxy-err-msg").attr("data-msg", "Failed to process this file");
							$("#proxy-err-msg").click();
							return;
						},
					});
				} else {
					$("#proxy-err-msg").attr("data-msg", "Please use a file smaller than 512kb");
					$("#proxy-err-msg").click();
					return;
				}
			}
			var reader = new FileReader();
			reader.onload = function(e) {
				$("#img-"+currImageId).attr("src", e.target.result);
				currUploadedFile = file;
			};

			reader.readAsDataURL(file);
			document.getElementById("invoice-thumbnail-upload").value = "";
		}
		return;
	} catch (err) {
		//
	}
}

// eslint-disable-next-line no-unused-vars
function ExcelDateToJSDate(serial) {
	var utc_days = Math.floor(serial - 25569);
	var utc_value = utc_days * 86400;
	var date_info = new Date(utc_value * 1000);
	var fractional_day = serial - Math.floor(serial) + 0.0000001;
	var total_seconds = Math.floor(86400 * fractional_day);
	var seconds = total_seconds % 60;
	total_seconds -= seconds;
	var hours = Math.floor(total_seconds / (60 * 60));
	var minutes = Math.floor(total_seconds / 60) % 60;
	return new Date(date_info.getFullYear(), date_info.getMonth(), date_info.getDate(), hours, minutes, seconds);
}

Date.prototype.getTimezoneOffsetMills = function() {
	return this.getTimezoneOffset() * 60 * 1000;
};

Date.prototype.getUTCTime = function() {
	return this.getTime() + (this.getTimezoneOffsetMills());
};

Date.prototype.setUTCTime = function(timeInMills) {
	timeInMills = timeInMills - this.getTimezoneOffsetMills();
	this.setTime(timeInMills);
};

Date.prototype.daysInMonth = function() {
	var d = new Date(this.getFullYear(), this.getMonth() + 1, 0);
	return d.getDate();
};

Date.prototype.addDays = function(days) {
	this.setDate(this.getDate() + days);
};

Date.prototype.print = function() {
	var dd = this.getDate();
	var mm = this.getMonth() + 1;

	var yyyy = this.getFullYear();
	if (dd < 10) {
		dd = "0" + dd;
	}
	if (mm < 10) {
		mm = "0" + mm;
	}
	return dd + "/" + mm + "/" + yyyy;
};

Date.prototype.parse = function(dateStr) {
	this.setDate(1);
	try {
		dateStr = dateStr.trim();
		var arr = dateStr.split("/");
		if (arr[2].length!=4) {
			throw {};
		}
		if (isNaN(this.setFullYear(Number(arr[2])))) {
			throw {};
		}
		if (isNaN(this.setMonth(Number(arr[1]) - 1))) {
			throw {};
		}
		if (isNaN(this.setDate(Number(arr[0])))) {
			throw {};
		}
		this.setHours(0);
		this.setMinutes(0);
		this.setSeconds(0);
		this.setMilliseconds(0);
		return true;
	} catch (e) {
		return false;
	}
};

Date.prototype.parseDayEnd = function(dateStr) {
	this.setDate(1);
	try {
		dateStr = dateStr.trim();
		var arr = dateStr.split("/");
		if (arr[2].length!=4) {
			throw {};
		}
		if (isNaN(this.setFullYear(Number(arr[2])))) {
			throw {};
		}
		if (isNaN(this.setMonth(Number(arr[1]) - 1))) {
			throw {};
		}
		if (isNaN(this.setDate(Number(arr[0])))) {
			throw {};
		}
		this.setHours(23);
		this.setMinutes(59);
		this.setSeconds(59);
		this.setMilliseconds(999);
		return true;
	} catch (e) {
		return false;
	}
};

Date.prototype.getWeek = function() {
	var dt = new Date(this.getFullYear(), 0, 1);
	return Math.ceil((((this - dt) / 86400000) + dt.getDay()+1)/7);
};

// eslint-disable-next-line no-unused-vars
function getUrlVars() {
	var vars = []; var hash;
	var hashes = window.location.href.slice(window.location.href.indexOf("?") + 1).split("&");
	for (var i = 0; i < hashes.length; i++) {
		hash = hashes[i].split("=");
		vars.push(hash[0]);
		vars[hash[0]] = hash[1];
	}
	return vars;
}

// eslint-disable-next-line no-unused-vars
function toTitleCase(str) {
	return str.replace(
		/\w\S*/g,
		function(txt) {
			return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
		});
}

// eslint-disable-next-line no-unused-vars
function isValidDate(d) {
	return d instanceof Date && !isNaN(d);
}

// eslint-disable-next-line no-unused-vars
var getFlattenedArray = function(docs, keepUnique) {
	var _iterate = function(obj, pre, keys) {
		if (!keys) {
			keys = [];
		}
		try {
			Object.keys(obj).forEach(function(key) {
				var _key = key;
				if (pre) {
					_key = pre + "_" + key;
				}
				if (!obj[key]) {
					keys.push(_key);
					values[valuePos][_key] = "";
				} else if (Array.isArray(obj[key])) {
					for (var loop = 0, length = obj[key].length; loop < length; loop++) {
						if (loop>0) {
							values.push({});
							valuePos++;
						}
						if (typeof obj[key][loop] != "object") {
							keys.push(_key);
							values[valuePos][_key] = obj[key];
						} else {
							_iterate(obj[key][loop], _key, keys);
						}
					}
				} else if (typeof obj[key] === "object") {
					_iterate(obj[key], _key, keys);
				} else {
					keys.push(_key);
					values[valuePos][_key] = obj[key];
				}
			});
		} catch (err) {
			//
		}
	};
	var updateValues = function(values) {
		var prevValues = {};
		var loop=0;
		var length = 0;
		var innerLoop = 0;
		var innerlength = 0;
		var value = null;
		var key = null;
		var v = null;
		for (loop=0, length = values.length; loop<length; loop++) {
			value = values[loop];
			for (innerLoop=0, innerlength = keys.length; innerLoop<innerlength; innerLoop++) {
				key = keys[innerLoop];
				v = value[key];
				if (v != null) {
					prevValues[key] = v;
				} else if (prevValues[key]) {
					value[key] = prevValues[key];
				}
			}
		}
		prevValues = {};
		for (loop=values.length-1; loop>=0; loop--) {
			value = values[loop];
			for (innerLoop=0, innerlength = keys.length; innerLoop<innerlength; innerLoop++) {
				key = keys[innerLoop];
				v = value[key];
				if (v != null) {
					prevValues[key] = v;
				} else if (prevValues[key]) {
					value[key] = prevValues[key];
				}
			}
		}
	};
	var keys = [];
	var values = [];
	var valuePos = 0;
	var finalValues = [];
	for (var loop = 0, length = docs.length; loop < length; loop++) {
		var obj = docs[loop];
		values.push({});
		_iterate(obj, "", keys);
		keys = _.uniq(keys);
		if (values.length>1) {
			updateValues(values);
		}
		finalValues = finalValues.concat(values);
		valuePos = 0;
		values = [];
	}
	keys.sort();
	if (!keepUnique) {
		finalValues = _.uniqWith(finalValues, _.isEqual);
	}
	return {keys: keys, values: finalValues};
};

// eslint-disable-next-line no-unused-vars
var __round = function(input) {
	if (!input) {
		return 0;
	}
	return _.round(input, 3);
};

function datenum(v, date1904) {
	if (date1904) {
		v += 1462;
	}
	var offset = v.getTimezoneOffsetMills() * -1;
	var epoch = Date.parse(v);
	epoch += offset;
	return (epoch - new Date(Date.UTC(1899, 11, 30))) / (24 * 60 * 60 * 1000);
}

// eslint-disable-next-line no-unused-vars
function sheet_from_array_of_arrays(data, opts) {
	var ws = {};
	var range = {
		s: {
			c: 10000000,
			r: 10000000,
		},
		e: {
			c: 0,
			r: 0,
		},
	};
	for (var R = 0; R != data.length; ++R) {
		for (var C = 0; C != data[R].length; ++C) {
			if (range.s.r > R) {
				range.s.r = R;
			}
			if (range.s.c > C) {
				range.s.c = C;
			}
			if (range.e.r < R) {
				range.e.r = R;
			}
			if (range.e.c < C) {
				range.e.c = C;
			}
			var cell = {
				v: data[R][C],
			};
			if (cell.v == null) {
				continue;
			}
			var cell_ref = XLSX.utils.encode_cell({
				c: C,
				r: R,
			});

			if (typeof cell.v === "number") {
				cell.t = "n";
			} else if (typeof cell.v === "boolean") {
				cell.t = "b";
			} else if (cell.v instanceof Date) {
				cell.t = "n";
				cell.z = XLSX.SSF._table[14];
				cell.v = datenum(cell.v);
			} else {
				cell.t = "s";
			}

			ws[cell_ref] = cell;
		}
	}
	if (range.s.c < 10000000) {
		ws["!ref"] = XLSX.utils.encode_range(range);
	}
	return ws;
}

// eslint-disable-next-line no-unused-vars
function Workbook() {
	if (!(this instanceof Workbook)) {
		return new Workbook();
	}
	this.SheetNames = [];
	this.Sheets = {};
}

// eslint-disable-next-line no-unused-vars
function s2ab(s) {
	var buf = new ArrayBuffer(s.length);
	var view = new Uint8Array(buf);
	for (var i = 0; i != s.length; ++i) {
		view[i] = s.charCodeAt(i) & 0xFF;
	}
	return buf;
}

// eslint-disable-next-line no-unused-vars
function date2String(d) {
	var date = d.getDate();
	if (date<10) {
		date= "0"+date;
	}
	var month = d.getMonth() +1;
	if (month<10) {
		month= "0"+month;
	}
	return date+"/"+month+"/"+d.getFullYear();
}
var offset = new Date().getTimezoneOffsetMills();
// eslint-disable-next-line no-unused-vars
function excelDateToJSDate(orgDate) {
	if (typeof orgDate === "string" || orgDate instanceof String) {
		var m = moment(orgDate, "DD/MM/YYYY");
		if (m.isValid) {
			return m.toDate();
		} else {
			return null;
		}
	} else {
		var date = Number(orgDate);
		if (isNaN(date)) {
			return null;
		}
		return new Date(Math.round(((date - 25569)*86400*1000)+offset));
	}
}

const excelColumnNames = [
	"A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N",
	"O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "AA", "AB",
	"AC", "AD", "AE", "AF", "AG", "AH", "AI", "AJ", "AK", "AL", "AM", "AN",
	"AO", "AP", "AQ", "AR", "AS", "AT", "AU", "AV", "AW", "AX", "AY", "AZ",
	"BA", "BB", "BC", "BD", "BE", "BF", "BG", "BH", "BI", "BJ", "BK", "BL",
	"BM", "BN", "BO", "BP", "BQ", "BR", "BS", "BT", "BU", "BV", "BW", "BX",
	"BY", "BZ", "CA", "CB", "CC", "CD", "CE", "CF", "CG", "CH", "CI", "CJ",
	"CK", "CL", "CM", "CN", "CO", "CP", "CQ", "CR", "CS", "CT", "CU", "CV",
	"CW", "CX", "CY", "CZ", "DA", "DB", "DC", "DD", "DE", "DF", "DG", "DH", "DI", "DJ",
	"DK", "DL", "DM", "DN", "DO", "DP", "DQ", "DR", "DS", "DT", "DU", "DV",
	"DW", "DX", "DY", "DZ",
];

const headerColorStyle = {rgb: "FFD3D3D3"};
const blackColorStyle = {rgb: "FF000000"};
const errorColorStyle = {rgb: "FFF55B5B"};
const borderLineStyle = {style: "thin", color: blackColorStyle};
const borderStyle = {top: borderLineStyle, right: borderLineStyle, bottom: borderLineStyle, left: borderLineStyle};
const headerStyle = {alignment: {wrapText: 1, horizontal: "center"}, fill: {fgColor: headerColorStyle}, font: {sz: 10}, border: borderStyle};
const defaultStyle = {alignment: {horizontal: "left"}, font: {sz: 10}, border: borderStyle};
const defaultStyleRight = {alignment: {wrapText: 1, horizontal: "right"}, font: {sz: 10}, border: borderStyle};
// const errorStyle = {alignment: {horizontal: "left"}, fill: {fgColor: errorColorStyle}, font: {sz: 10}, border: borderStyle};
// const errorStyleRight = {alignment: {wrapText: 1, horizontal: "right"}, fill: {fgColor: errorColorStyle}, font: {sz: 10}, border: borderStyle};
const dateStyleWithBorder = {alignment: {wrapText: true, horizontal: "left"}, font: {sz: 10}, border: borderStyle, numFmt: "dd/mm/yyyy"};

const displayString = function(input) {
	if (!input) {
		return {v: "", t: "s", s: defaultStyle};
	}
	if (typeof input === "object" && input !== null) {
		input = input.toString();
	} else if (Array.isArray(input)) {
		input = input.toString();
	} else {
		input = "" + input;
	}
	return {v: input, t: "s", s: defaultStyle};
};
const displayInt = function(input, hideZero) {
	if (input == null) {
		return {v: "", t: "s", s: defaultStyle};
	}
	if ((input == 0) && hideZero) {
		return {v: "", t: "s", s: defaultStyle};
	}
	input = Number(input);
	if (isNaN(input)) {
		return {v: "", t: "s", s: defaultStyle};
	}
	return {v: input, t: "n", s: defaultStyleRight};
};
const displayDate = function(input) {
	if (!input) {
		return {v: "", t: "s", s: defaultStyle};
	}
	if (input instanceof Date && !isNaN(input)) {
		input = new Date(input.getTime() + 5.5 * 60 * 60 * 1000);
		return {v: input, t: "d", s: dateStyleWithBorder};
	} else if (!isNaN(input)) {
		var dt = new Date(Number(input));
		dt.setTime(dt.getTime() + 5.5 * 60 * 60 * 1000);
		return {v: dt, t: "d", s: dateStyleWithBorder};
	} else {
		return {v: "", t: "s", s: defaultStyle};
	}
};
const displayBoolean = function(input) {
	if ((input == null) || (input == undefined)) {
		return {v: "", t: "s", s: defaultStyle};
	} else if (input != true) {
		return {v: "False", t: "s", s: defaultStyle};
	}
	return {v: "True", t: "s", s: defaultStyle};
};

// eslint-disable-next-line no-unused-vars
const getDefaultWorkBook = function(docs, fields) {
	try {
		let rowCount = 1;
		const workbook = {SheetNames: [], Sheets: {}};
		const main = {};
		const availableColumnCount = fields.length;
		for (let loop = 0, length = fields.length; loop < length; loop++) {
			main[excelColumnNames[loop] + rowCount] = {v: fields[loop].display, s: headerStyle, t: "s"};
		}
		for (let loop = 0, length = docs.length; loop < length; loop++) {
			rowCount++;
			for (let inner = 0, innerLen = fields.length; inner < innerLen; inner++) {
				let fVal = docs[loop][fields[inner].key];
				if ((fVal==null) || (fVal==undefined)) {
					fVal = {val: fVal};
				}
				// eslint-disable-next-line no-prototype-builtins
				if (!fVal.hasOwnProperty("val")) {
					fVal = {val: fVal};
				}
				let val = null;
				if (fields[inner].type == "s") {
					val = displayString(fVal.val);
				} else if (fields[inner].type == "n") {
					val = displayInt(fVal.val);
				} else if (fields[inner].type == "b") {
					val = displayBoolean(fVal.val);
				} else if (fields[inner].type == "d") {
					val = displayDate(fVal.val);
				}
				if (fVal.error) {
					val.s= JSON.parse(JSON.stringify(val.s));
					val.s.fill = {fgColor: errorColorStyle};
					val.s.font.color = {rgb: "FFFFE3E3"};
				}
				main[excelColumnNames[inner] + rowCount] = val;
			}
		}
		main["!ref"] = `A1:${excelColumnNames[availableColumnCount]}` + (rowCount + 1);
		workbook.SheetNames.push("main");
		workbook.Sheets["main"] = main;
		return {status: true, doc: workbook};
	} catch (err) {
		return {status: false};
	}
};
