
module.exports = {
	isValidDate: (date)=> {
		if (Object.prototype.toString.call(date) === "[object Date]") {
			if (isNaN(date.getTime())) {
				return false;
			} else {
				return true;
			}
		} else {
			return false;
		}
	},
	JSDateToExcelDate: (inDate) => {
		return 25569.0 + ((inDate.getTime() - (inDate.getTimezoneOffset() * 60 * 1000)) / (1000 * 60 * 60 * 24));
	},
};
