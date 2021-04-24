const FactoryGirl = require('factory-girl');
const { factory } = require('factory-girl');
const Partner = require("../../src/models/Partner");

factory.setAdapter(new FactoryGirl.MongooseAdapter());

factory.define("Partner", Partner, {
    "tradingName": "Bar Legal",
    "ownerName": "Fernando Silva",
    "document": "05202839000126",
    "coverageArea": {
        "type": "MultiPolygon",
        "coordinates": [
        [
            [
            [
                -43.50404,
                -22.768366
            ],
            [
                -43.45254,
                -22.775646
            ],
            [
                -43.429195,
                -22.804451
            ],
            [
                -43.38422,
                -22.788942
            ],
            [
                -43.390743,
                -22.764568
            ],
            [
                -43.355724,
                -22.739239
            ],
            [
                -43.403446,
                -22.705671
            ],
            [
                -43.440525,
                -22.707571
            ],
            [
                -43.4752,
                -22.698704
            ],
            [
                -43.514683,
                -22.742722
            ],
            [
                -43.50404,
                -22.768366
            ]
            ]
        ]
        ]
    },
    "address": {
        "type": "Point",
        "coordinates": [
        -43.432034,
        -22.747707
        ]
    }
});

const partnerObject = {
    "tradingName": "Bar de Teste - create partner",
    "ownerName": "Fernando Silva",
    "document": "05202839000150",
    "coverageArea": {
    "type": "MultiPolygon",
    "coordinates": [
        [[[-43.50404,-22.768366], [-43.45254,-22.775646], [-43.429195,-22.804451],[-43.50404,-22.768366]]]
    ]
    },
    "address": {
    "type": "Point",
    "coordinates": [-43.432034,-22.747707]
    }
}

module.exports = { factory, partnerObject };