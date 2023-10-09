const navigationController = require("../controllers/navigationController");
const randomController = require("../controllers/randomController");
const masterController = require("../controllers/masterController");
const patientController = require("../controllers/patientController");

module.exports = (router) => {
	router.get("/", navigationController.landingPage);
	router.get("/pet-management.html", navigationController.petManagement);

	router.get("/patientForm", patientController.patientForm);
	router.get("/getallpatient", patientController.getAllPatient);
	router.post("/patientFormSubmit", patientController.getpatientData);
	router.get("/patientdataDelete/:id", patientController.deleteData);
	router.get("/patientdataupdate/:id", patientController.getdataupdate);

	/** ***********************************************************
	 * JSON API ENDPOINTS                                        *
	 *************************************************************/
	router.post("/random.json", randomController.randomNumber);
	router.post("/update-pet.json", masterController.updatePet);
	router.post("/create-pet.json", masterController.createPet);

	router.post("/test-multipart", randomController.testMultipart);
};
