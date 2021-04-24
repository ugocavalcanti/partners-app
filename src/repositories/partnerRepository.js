const partnerModel = require("../models/Partner")

const create = async (partner) => {
    return await partnerModel.create(partner);
}

const getByDocument = async (document) => {
    return await partnerModel.findOne({document: document});
}

const getById = async (id) => {
    return await partnerModel.findById(id);
}

const searchPartnersOrderedByDistance = async (point) => {
    return await partnerModel.find(
        {
            coverageArea:{
                $geoIntersects: {
                    $geometry: point
                }
            },
            address: {
                $near: {
                    $geometry: point
                }
            }
        }
    )
}


module.exports = {create, getByDocument, getById, searchPartnersOrderedByDistance};