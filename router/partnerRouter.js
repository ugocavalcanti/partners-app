const express = require("express");
const {addPartner, getListPartners, getPartnerId, searchNearestPartner} = require("../controllers/partnerController")

const router = express.Router();

router.route("/")
    .get(getListPartners)
    .post(addPartner);

router.get("/:id", getPartnerId)
router.get("/:long/:lat", searchNearestPartner);

module.exports = router;