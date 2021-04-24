const partnerRepository = require("../repositories/partnerRepository")

const create = async (partner) => {
    // RN001 - testing if exists partner with the same document
    const partnerDb = await partnerRepository.getByDocument(partner.document);

    if (partnerDb !== null){
        throw new Error("Partner with this document already exists.");
    }else {
        return await partnerRepository.create(partner);
    }
}

const getById = async (id) => {
    return await partnerRepository.getById(id);
}

const searchNearestPartner = async (point) => {
    const partnerOrdered = await partnerRepository.searchPartnersOrderedByDistance(point);

    if (partnerOrdered.length !== 0) {
        return partnerOrdered[0];
    }else {
        return null;
    }
}

module.exports = {create, getById, searchNearestPartner}