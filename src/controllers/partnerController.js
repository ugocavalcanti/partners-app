const partnerService = require("../services/partnerService")

const addPartner = async (req, res) => {
    try {
        const partner = await partnerService.create(req.body);

        res.status(200).send({
            success: true,
            data: partner
        })
    } catch (error) {
        res.status(500).send({ error: error.message})
    }
}

const getPartnerById = async (req, res) => {
    try {
        const id = req.params.id;
        const partner = await partnerService.getById(id);
        res.status(200).send({
            success: true,
            data: partner
        })
    } catch (error) {
        res.status(500).send({ error: error.message})
    }
}

const searchNearestPartner = async (req, res) => {
    try {
        const {long, lat} = req.params;

        const point = {
            type: "Point",
            coordinates: [long, lat]
        }

        const nearestPartner = await partnerService.searchNearestPartner(point);
        
        if (nearestPartner === null ) {
            res.status(200).send({
                message: "Sua localização ainda não está ao nosso alcance.",
                data: null
            });
        }else {
            res.status(200).send({
                message: "Melhor parceiro encontrado.",
                data: nearestPartner
            });
        }
    } catch (error) {
        res.status(500).send({ error: error.message})
    }
}

module.exports = {addPartner, getPartnerById, searchNearestPartner};