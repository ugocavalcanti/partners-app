const request = require("supertest");
const app = require("../../src/api");
const { factory, partnerObject } = require("../utils/factories");
const Partner = require("../../src/models/Partner");


afterAll(async () => {
  await Partner.deleteMany();
  factory.cleanUp();
  Partner.db.close();
})

describe("Create Partner",  () => {
  it("should create a partner in database", async (done) => {
     
       const response = await request(app)
             .post("/partner")
             .send(partnerObject);
   
        expect(response.statusCode).toBe(200);
        expect(response.body.data.document).toBe("05202839000150");   
        
        done();
  });

  it("shouldn't create a partner in database with the same document", async () => {
      const response = await request(app)
          .post("/partner")
          .send(partnerObject);
  
          expect(response.statusCode).toBe(500);
          expect(response.body).toHaveProperty("error"); 
  });

    it("shouldn't create a partner in database with polygon opened", async () => {
      const response = await request(app)
        .post("/partner")
        .send({
            ...partnerObject,
            coverageArea: {
                "type": "MultiPolygon",
                "coordinates": [
                    [[[-43.50404,-22.768366], [-43.45254,-22.775646], [-43.429195,-22.804451]]]
                ]
            }
        });

        expect(response.statusCode).toBe(500);
        expect(response.body).toHaveProperty("error");      
    });
  
    it("shouldn't create a partner in database that don't respect the enum", async () => {
        const response = await request(app)
            .post("/partner")
            .send({
                ...partnerObject,
                coverageArea: {
                    "type": "Polygon",
                    "coordinates": [
                        [[[-43.50404,-22.768366], [-43.45254,-22.775646], [-43.429195,-22.804451],[-43.50404,-22.768366]]]
                    ]
                }
            });
    
            expect(response.statusCode).toBe(500);
            expect(response.body).toHaveProperty("error");      
      });

      it("shouldn't create a partner in database without required fields - coverageArea", async () => {
        const response = await request(app)
            .post("/partner")
            .send({
                ...partnerObject,
                coverageArea: {}
            });
    
            expect(response.statusCode).toBe(500);
            expect(response.body).toHaveProperty("error");      
    });

    it("shouldn't create a partner in database without required fields - address", async () => {
        const response = await request(app)
            .post("/partner")
            .send({
                ...partnerObject,
                address: {}
            });
    
            expect(response.statusCode).toBe(500);
            expect(response.body).toHaveProperty("error");      
    });
});

describe("Get Partner by id", () => {

    it("should get a partner by id", async () => {
      
      const partner = await factory.create("Partner", {
          document: "05202839000151"
      });

      const id = partner._id;

      const responseGet = await request(app).get(`/partner/${id}`);
      expect(responseGet.statusCode).toBe(200);
      expect(responseGet.body.data._id.toString()).toBe(id.toString());
    });

    it("should get a null data when the id doesn't exist in database", async () => {
            const id = "608071d13bfb412091bbb422";
    
           const responseGet = await request(app)
            .get(`/partner/${id}`);
    
            expect(responseGet.statusCode).toBe(200);
            expect(responseGet.body.data).toBeNull();
    });
});

describe("Search Partner by coordinates", () => {

    it("should get a nearest partner of a specific point", async () => {

      await factory.create("Partner", {
          document: "05202839000101"
      });
      await factory.create("Partner", {
          document: "05202839000102",
          coverageArea: {
              "type": "MultiPolygon",
              "coordinates": [
                [
                  [
                    [ -43.400630950927734,-22.759403224505906],
                    [-43.31806182861328,-22.759403224505906],
                    [-43.31806182861328,-22.718081880968413],
                    [-43.400630950927734,-22.718081880968413],
                    [-43.400630950927734,-22.759403224505906]
                  ]
                ]
              ]
            },
            address: {
              "type": "Point",
              "coordinates": [-43.3445,-22.7401]
            }
      });
      await factory.create("Partner", {
          document: "05202839000103",
          coverageArea: {
              "type": "MultiPolygon",
              "coordinates": [
                [
                  [
                    [-43.44921112060547, -22.735340206036337],
                    [-43.370933532714844,-22.735340206036337],
                    [-43.370933532714844,-22.689735505952164],
                    [-43.44921112060547,-22.689735505952164],
                    [-43.44921112060547,-22.735340206036337]
                  ]
                ]
              ]
            },
            address: {
              "type": "Point",
              "coordinates": [-43.4145,-22.7106 ]
            }
      });
      
      const long = -43.3829;
      const lat = -22.7182;
      const {body, statusCode} = await request(app).get(`/partner/${long}/${lat}`);

      const nearestPartnerCoordinates = [ -43.4145, -22.7106 ]
  
          expect(statusCode).toBe(200);
          expect(body.data).not.toBeNull();
          expect(body.data.address.coordinates[0]).toBe(nearestPartnerCoordinates[0]);
          expect(body.data.address.coordinates[1]).toBe(nearestPartnerCoordinates[1]);
    });

    it("should get a nearest partner of a specific point, where the partners cover more than one area", async () => {

      await factory.create("Partner", {
          document: "05202839000104",
          "coverageArea": {
            "type": "MultiPolygon",
            "coordinates": 
            [
              [
                [
                  [-34.83017921447753,-7.159998483517317],
                  [-34.81284141540527,-7.159998483517317],
                  [-34.81284141540527, -7.143562041735011],
                  [-34.83017921447753,-7.143562041735011],
                  [-34.83017921447753,-7.159998483517317]
                ]
              ]
            ]
          },
          address: {
            "type": "Point",
            "coordinates": [-34.8204,-7.1585]
            }
      });

      await factory.create("Partner", {
            document: "05202839000105",
            "coverageArea": {
            "type": "MultiPolygon",
            "coordinates": [
              [
                  [
                      [-34.84940528869629, -7.145350491537931],
                      [-34.86210823059082, -7.164937816661006],
                      [-34.855241775512695, -7.168514541731985],
                      [-34.85180854797363, -7.164256532512354],
                      [-34.842796325683594, -7.161190741243953],
                      [-34.82597351074219, -7.1603391289001],
                      [-34.84940528869629, -7.145350491537931]
                  ]
              ],
              [
                  [
                      [-34.8460578918457, -7.16936613880083],
                      [-34.810523986816406, -7.172091238721084],
                      [-34.82073783874512, -7.186397745584484],
                      [-34.84811782836914, -7.188441495531797],
                      [-34.8460578918457, -7.16936613880083]
                  ]
              ]
          ]
          },
          address: {
            "type": "Point",
            "coordinates": [-34.8433, -7.1702]
            }
        });

        const long = -34.8291;
        const lat = -7.1589;
        const {body, statusCode} = await request(app).get(`/partner/${long}/${lat}`);

        const nearestPartnerCoordinates = [-34.8204,-7.1585 ]

        expect(statusCode).toBe(200);
        expect(body.data).not.toBeNull();
        expect(body.data.address.coordinates[0]).toBe(nearestPartnerCoordinates[0]);
        expect(body.data.address.coordinates[1]).toBe(nearestPartnerCoordinates[1]);


    });

    it("shouldn't get a partner if the point isn't coveraged ", async () => {
        
        const long = -10.3829;
        const lat = -10.7182;
        const {body, statusCode} = await request(app)
            .get(`/partner/${long}/${lat}`);
    
            expect(statusCode).toBe(200);
            expect(body.data).toBeNull();
    });
})