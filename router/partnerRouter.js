const express = require("express");
const {addPartner, getPartnerById, searchNearestPartner} = require("../controllers/partnerController")

const router = express.Router();

router.post("/", addPartner);
router.get("/:id", getPartnerById)
router.get("/:long/:lat", searchNearestPartner);

module.exports = router;