/* global getDefaultWorkBook :true*/
// eslint-disable-next-line no-unused-vars
function updateNumber() {
	$.ajax({
		type: "POST",
		url: "/random.json",
		data: {foo: "bar"},
		success: function(result) {
			$("#randomStatVal").html(result.number);
		},
		dataType: "json",
	});
}

let uploadedFile = null;
function processFileForUpload(e) {
	try {
		var files = e.target.files || e.dataTransfer.files || e.originalEvent.dataTransfer.files;
		var file = files[0];
		if (file) {
			if (/\.(xls|xlsx|ods)$/i.test(file.name)) {
				// var extention = file.name.toUpperCase().split(".");
				// extention = extention[extention.length - 1];
				$(".file-upload-tab .parsley-required").html("");
				if (file.size > (512 * 1024 * 1024)) {
					$(".file-upload-tab .parsley-required").html("Please use a file smaller than 512kB");
					return;
				}
				$(".file-upload-tab .parsley-required").html("");
				$("#holder p label").hide();
				$("#holder p a").html(file.name);
				$("#holder p a").show();
				$("#submit_create_brand_bulk").removeClass("disabled");
				$("#reset_create_brand_bulk").removeClass("disabled");
				// window.fileUploadForm = new FormData();
				// window.fileUploadForm.append("extention", extention);
				// window.fileUploadForm.append("upload", file);
				uploadedFile = file;
				document.getElementById("file_for_upload").value = "";
			} else {
				$(".file-upload-tab .parsley-required").html("Only <i>xls, xlsx, ods<i/> files are allowed.");
			}
		}
		return;
	} catch (err) {
		//
	}
}

const ISODate = function(input) {
	return new Date(input);
};

const mockData = [
	{
		"slno": 1,
		"name": "AANAND",
		"code": "MRK0001",
		"organic": false,
		"createdAt": ISODate("2020-09-29T18:11:17.923Z"),
		"teaBoardRegNo": "RC-861",
		"mdmCode": "M0001",
	},
	{
		"slno": 2,
		"name": "AANCHAL TEA",
		"code": "MRK0002",
		"organic": false,
		"createdAt": ISODate("2020-09-29T18:11:17.923Z"),
		"mdmCode": "M0002",
	},
	{
		"slno": 3,
		"name": "AAROHI",
		"code": "MRK0003",
		"organic": false,
		"createdAt": ISODate("2020-09-29T18:11:17.923Z"),
		"mdmCode": "M3091",
		"teaBoardRegNo": "RC-2030",
	},
	{
		"slno": 4,
		"name": "AASHVI (GOLD)",
		"code": "MRK0004",
		"organic": false,
		"createdAt": ISODate("2020-09-29T18:11:17.923Z"),
		"teaBoardRegNo": "RC-1696",
		"mdmCode": "M0004",
	},
	{
		"slno": 5,
		"name": "AASTHA",
		"code": "MRK0005",
		"organic": false,
		"createdAt": ISODate("2020-09-29T18:11:17.923Z"),
		"mdmCode": "M0005",
		"teaBoardRegNo": "RC-1934",
	},
	{
		"slno": 6,
		"name": "ABALI ORGANIC",
		"code": "MRK0006",
		"organic": false,
		"createdAt": ISODate("2020-09-29T18:11:17.923Z"),
		"mdmCode": "M2854",
	},
	{
		"slno": 7,
		"name": "ABHAY GOLD",
		"code": "MRK0007",
		"organic": false,
		"createdAt": ISODate("2020-09-29T18:11:17.923Z"),
		"teaBoardRegNo": "RC-2036",
		"mdmCode": "M0007",
	},
	{
		"slno": 8,
		"name": "ABHILEXTEA",
		"code": "MRK0008",
		"organic": false,
		"createdAt": ISODate("2020-09-29T18:11:17.923Z"),
		"teaBoardRegNo": "NA",
		"mdmCode": "M0008",
	},
	{
		"slno": 9,
		"name": "ABHINAV",
		"code": "MRK0009",
		"organic": false,
		"createdAt": ISODate("2020-09-29T18:11:17.923Z"),
		"mdmCode": "M0009",
	},
	{
		"slno": 10,
		"name": "ABHISHEK",
		"code": "MRK0010",
		"organic": false,
		"createdAt": ISODate("2020-09-29T18:11:17.923Z"),
		"mdmCode": "M2855",
	},
	{
		"slno": 11,
		"name": "ABHISHEKTEA",
		"code": "MRK0011",
		"organic": false,
		"createdAt": ISODate("2020-09-29T18:11:17.923Z"),
		"mdmCode": "M2855",
	},
	{
		"slno": 12,
		"name": "ABHOYJAN",
		"code": "MRK0012",
		"organic": false,
		"createdAt": ISODate("2020-09-29T18:11:17.923Z"),
		"mdmCode": "M0010",
	},
	{
		"slno": 13,
		"name": "ACHABAM",
		"code": "MRK0013",
		"organic": false,
		"createdAt": ISODate("2020-09-29T18:11:17.923Z"),
		"teaBoardRegNo": "NA",
		"mdmCode": "M0011",
	},
	{
		"slno": 14,
		"name": "ACHAPARA",
		"code": "MRK0014",
		"organic": false,
		"createdAt": ISODate("2020-09-29T18:11:17.923Z"),
		"mdmCode": "M0013",
	},
	{
		"slno": 15,
		"name": "ADARSH",
		"code": "MRK0015",
		"organic": false,
		"createdAt": ISODate("2020-09-29T18:11:17.923Z"),
		"mdmCode": "M0014",
		"teaBoardRegNo": "RC-1470",
	},
	{
		"slno": 16,
		"name": "ADARSHGOLD",
		"code": "MRK0016",
		"organic": false,
		"createdAt": ISODate("2020-09-29T18:11:17.923Z"),
		"mdmCode": "M0015",
	},
	{
		"slno": 17,
		"name": "ADDABARIE",
		"code": "MRK0017",
		"organic": false,
		"createdAt": ISODate("2020-09-29T18:11:17.923Z"),
		"teaBoardRegNo": "NA",
		"mdmCode": "M0016",
	},
	{
		"slno": 18,
		"name": "ADDABARIEHIGHGROWN",
		"code": "MRK0018",
		"organic": false,
		"createdAt": ISODate("2020-09-29T18:11:17.923Z"),
		"mdmCode": "M0017",
	},
	{
		"slno": 19,
		"name": "ADHIKARY",
		"code": "MRK0019",
		"organic": false,
		"createdAt": ISODate("2020-09-29T18:11:17.923Z"),
		"mdmCode": "M0018",
	},
	{
		"slno": 20,
		"name": "AENAKHALL",
		"code": "MRK0020",
		"organic": false,
		"createdAt": ISODate("2020-09-29T18:11:17.923Z"),
		"mdmCode": "M0020",
	},
	{
		"slno": 21,
		"name": "AENAKHALLCLONAL",
		"code": "MRK0021",
		"organic": false,
		"createdAt": ISODate("2020-09-29T18:11:17.923Z"),
		"mdmCode": "M0021",
	},
	{
		"slno": 22,
		"name": "AENAKHALLPREMIUM",
		"code": "MRK0022",
		"organic": false,
		"createdAt": ISODate("2020-09-29T18:11:17.923Z"),
		"mdmCode": "M0022",
	},
	{
		"slno": 23,
		"name": "AGNIGARH",
		"code": "MRK0023",
		"organic": false,
		"createdAt": ISODate("2020-09-29T18:11:17.923Z"),
		"mdmCode": "M0024",
	},
	{
		"slno": 24,
		"name": "AGNIGARHCLONAL",
		"code": "MRK0024",
		"organic": false,
		"createdAt": ISODate("2020-09-29T18:11:17.923Z"),
		"mdmCode": "M0025",
	},
	{
		"slno": 25,
		"name": "AGNIGARHORGANIC",
		"code": "MRK0025",
		"organic": false,
		"createdAt": ISODate("2020-09-29T18:11:17.923Z"),
		"mdmCode": "M0026",
	},
	{
		"slno": 26,
		"name": "AGOMONI",
		"code": "MRK0026",
		"organic": false,
		"createdAt": ISODate("2020-09-29T18:11:17.923Z"),
		"mdmCode": "M0027",
		"teaBoardRegNo": "RC-2044",
	},
	{
		"slno": 27,
		"name": "AGRATULEE",
		"code": "MRK0027",
		"organic": false,
		"createdAt": ISODate("2020-09-29T18:11:17.923Z"),
		"mdmCode": "M0028",
	},
	{
		"slno": 28,
		"name": "AHEDGOLD",
		"code": "MRK0028",
		"organic": false,
		"createdAt": ISODate("2020-09-29T18:11:17.923Z"),
		"mdmCode": "M0029",
	},
	{
		"slno": 29,
		"name": "AHINABARI",
		"code": "MRK0029",
		"organic": false,
		"createdAt": ISODate("2020-09-29T18:11:17.923Z"),
		"mdmCode": "M0030",
	},
	{
		"slno": 30,
		"name": "AHOMBARI",
		"code": "MRK0030",
		"organic": false,
		"createdAt": ISODate("2020-09-29T18:11:17.923Z"),
		"mdmCode": "M0031",
	},
	{
		"slno": 31,
		"name": "AIBHEEL",
		"code": "MRK0031",
		"organic": false,
		"createdAt": ISODate("2020-09-29T18:11:17.923Z"),
		"teaBoardRegNo": "RC-932",
		"mdmCode": "M0032",
	},
	{
		"slno": 32,
		"name": "AIDAUPUKHURI",
		"code": "MRK0032",
		"organic": false,
		"createdAt": ISODate("2020-09-29T18:11:17.923Z"),
		"mdmCode": "M0033",
	},
	{
		"slno": 33,
		"name": "AIDEOBARIE",
		"code": "MRK0033",
		"organic": false,
		"createdAt": ISODate("2020-09-29T18:11:17.923Z"),
		"mdmCode": "M0035",
	},
	{
		"slno": 34,
		"name": "AIDEOBARIPREMIUM",
		"code": "MRK0034",
		"organic": false,
		"createdAt": ISODate("2020-09-29T18:11:17.923Z"),
		"mdmCode": "M0034",
	},
	{
		"slno": 35,
		"name": "AISHWINI",
		"code": "MRK0035",
		"organic": false,
		"createdAt": ISODate("2020-09-29T18:11:17.923Z"),
		"mdmCode": "M0037",
	},
	{
		"slno": 36,
		"name": "AKIYA",
		"code": "MRK0036",
		"organic": false,
		"createdAt": ISODate("2020-09-29T18:11:17.923Z"),
		"mdmCode": "M0038",
	},
	{
		"slno": 37,
		"name": "AKIYACLONAL",
		"code": "MRK0037",
		"organic": false,
		"createdAt": ISODate("2020-09-29T18:11:17.923Z"),
		"mdmCode": "M0039",
	},
	{
		"slno": 38,
		"name": "AKSHAYPUR",
		"code": "MRK0038",
		"organic": false,
		"createdAt": ISODate("2020-09-29T18:11:17.923Z"),
		"mdmCode": "M0044",
	},
	{
		"slno": 39,
		"name": "ALIF",
		"code": "MRK0039",
		"organic": false,
		"createdAt": ISODate("2020-09-29T18:11:17.923Z"),
		"mdmCode": "M0046",
	},
	{
		"slno": 40,
		"name": "ALIMUR",
		"code": "MRK0040",
		"organic": false,
		"createdAt": ISODate("2020-09-29T18:11:17.923Z"),
		"mdmCode": "M0047",
	},
	{
		"slno": 41,
		"name": "ALIMURNATURAL",
		"code": "MRK0041",
		"organic": false,
		"createdAt": ISODate("2020-09-29T18:11:17.923Z"),
		"mdmCode": "M0048",
	},
	{
		"slno": 42,
		"name": "ALITEA",
		"code": "MRK0042",
		"organic": false,
		"createdAt": ISODate("2020-09-29T18:11:17.923Z"),
		"mdmCode": "M0045",
	},
	{
		"slno": 43,
		"name": "ALLEY BUSTEE",
		"code": "MRK0043",
		"organic": false,
		"createdAt": ISODate("2020-09-29T18:11:17.923Z"),
		"mdmCode": "M0050",
		"teaBoardRegNo": "RC-943",
	},
	{
		"slno": 44,
		"name": "ALOKEPUR",
		"code": "MRK0044",
		"organic": false,
		"createdAt": ISODate("2020-09-29T18:11:17.923Z"),
		"mdmCode": "M0051",
	},
	{
		"slno": 45,
		"name": "ALOKPUR",
		"code": "MRK0045",
		"organic": false,
		"createdAt": ISODate("2020-09-29T18:11:17.923Z"),
		"mdmCode": "M0052",
	},
	{
		"slno": 46,
		"name": "AMALAAN",
		"code": "MRK0046",
		"organic": false,
		"createdAt": ISODate("2020-09-29T18:11:17.923Z"),
		"mdmCode": "M0054",
	},
	{
		"slno": 47,
		"name": "AMALBARI",
		"code": "MRK0047",
		"organic": false,
		"teaBoardRegNo": "RC-10009",
		"createdAt": ISODate("2020-09-29T18:11:17.923Z"),
		"mdmCode": "M0055",
	},
	{
		"slno": 48,
		"name": "AMARNATHTEA",
		"code": "MRK0048",
		"organic": false,
		"createdAt": ISODate("2020-09-29T18:11:17.923Z"),
		"teaBoardRegNo": "NA",
		"mdmCode": "M0056",
	},
	{
		"slno": 49,
		"name": "AMARPUR",
		"code": "MRK0049",
		"organic": false,
		"createdAt": ISODate("2020-09-29T18:11:17.923Z"),
		"mdmCode": "M0057",
		"teaBoardRegNo": "RC-1922",
	},
	{
		"slno": 50,
		"name": "AMARPUR GOLD",
		"code": "MRK0050",
		"organic": false,
		"createdAt": ISODate("2020-09-29T18:11:17.923Z"),
		"mdmCode": "M0058",
		"teaBoardRegNo": "RC-1922",
	},
];

// eslint-disable-next-line no-unused-vars
function validateData(input) {
	let excelUploaded = true;
	if (!input) {
		input = mockData;
		excelUploaded = false;
	}
	const fields = [];
	fields.push({display: "Sl No", key: "slno", excelKey: "Sl No", type: "n", required: true});
	fields.push({display: "Name", key: "name", excelKey: "Name", type: "s", required: true});
	fields.push({display: "Code", key: "code", excelKey: "Code", type: "s", required: true});
	fields.push({display: "Mdm", key: "mdmCode", excelKey: "Mdm", type: "s", required: true});
	fields.push({display: "Organic", key: "organic", excelKey: "Organic", type: "b"});
	fields.push({display: "Reg No", key: "teaBoardRegNo", excelKey: "Reg No", type: "s", required: true});
	fields.push({display: "Created At", key: "createdAt", excelKey: "Created At", type: "d", required: true});
	fields.push({display: "Status", key: "status", excelKey: "Status", type: "s"});
	fields.push({display: "Msg", key: "msg", excelKey: "Msg", type: "s"});
	const processedDocs = [];
	for (let loop=0, length = input.length; loop<length; loop++) {
		const row = input[loop];
		const processedRow = {};
		const errorMsgs = [];
		for (let fLoop=0, fLen = fields.length; fLoop<fLen; fLoop++) {
			const field = fields[fLoop];
			let _val = row[field.excelKey] || row[field.key];
			if (_val && (field.type=="d") && excelUploaded) {
				_val = excelDateToJSDate(_val);
			}
			if ((_val!=null) && (field.type=="b")) {
				if ((""+_val).trim().toUpperCase()=="TRUE") {
					_val = true;
				} else {
					_val = false;
				}
			}
			if ((_val!=null) && (field.type=="s")) {
				_val = (""+_val).trim().toUpperCase();
			}
			if ((_val!=null) && (field.type=="n")) {
				_val = Number(_val);
				if (isNaN(_val)) {
					_val = null;
				}
			}
			let processedVal = _val;
			if ((!_val) && (field.required)) {
				processedVal = {val: _val, error: true};
				errorMsgs.push(`'${field.display}' is required.`);
			}
			processedRow[field.key] = processedVal;
		}
		if (errorMsgs.length==0) {
			processedRow.status = "OK";
		} else {
			processedRow.status = "NOT OK";
			processedRow.msg = errorMsgs.join(", ");
		}
		processedDocs.push(processedRow);
	}
	const wbResult = getDefaultWorkBook(processedDocs, fields);
	if (wbResult.status) {
		var wbout = XLSX.write(wbResult.doc, {
			bookType: "xlsx",
			bookSST: true,
			type: "binary",
		});
		saveAs(new Blob([s2ab(wbout)], {
			type: "application/octet-stream",
		}), "output_" + new Date().getTime() + ".xlsx");
	}
}

// eslint-disable-next-line no-unused-vars
function submitBulk() {
	if (!uploadedFile) {
		return;
	}
	var reader = new FileReader();
	reader.onload = function(e) {
		var data = e.target.result;
		var workbook = XLSX.read(data, {type: "binary"});
		var first_sheet_name = workbook.SheetNames[0];
		var worksheet = workbook.Sheets[first_sheet_name];
		var requiredJson = XLSX.utils.sheet_to_json(worksheet, {raw: true});
		console.log(requiredJson);
		validateData(requiredJson);
	};
	reader.readAsBinaryString(uploadedFile);
}

// eslint-disable-next-line no-unused-vars
function clearBulk() {
	$(".file-upload-tab .parsley-required").html("");
	$("#holder p label").show();
	$("#holder p a").html("");
	$("#holder p a").hide();
	$("#submit_create_brand_bulk").addClass("disabled");
	$("#reset_create_brand_bulk").addClass("disabled");
	uploadedFile = null;
}


var holder = document.getElementById("holder");
holder.ondragover = function() {
	$(this).addClass("div_drag_hover");
	return false;
};
holder.ondragend = function() {
	$(this).removeClass("div_drag_hover");
	return false;
};
holder.ondrop = function(e) {
	$(this).removeClass("div_drag_hover");
	e.preventDefault();
	processFileForUpload(e);
};
