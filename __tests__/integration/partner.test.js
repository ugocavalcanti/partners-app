const request = require("supertest");
const app = require("../../api");

describe("Create Partner", () => {

    it("should create a partner in database", async () => {
        const response = await request(app)
            .post("/partner")
            .send({
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
            });
    
            expect(response.statusCode).toBe(200);
            expect(response.body.data.document).toBe("05202839000150");      
    });

    it("shouldn't create a partner in database with the same document", async () => {
        const response = await request(app)
            .post("/partner")
            .send({
                "tradingName": "Bar de Teste - create partner again",
                "ownerName": "Rafael Silva",
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
            });
    
            expect(response.statusCode).toBe(500);
            expect(response.body).toHaveProperty("error");      
    });

    it("shouldn't create a partner in database with polygon opened", async () => {
        const response = await request(app)
            .post("/partner")
            .send({
                "tradingName": "Bar de Teste - create partner again",
                "ownerName": "Rafael Silva",
                "document": "05202839000149",
                "coverageArea": {
                "type": "MultiPolygon",
                "coordinates": [
                    [[[-43.50404,-22.768366], [-43.45254,-22.775646], [-43.429195,-22.804451]]]
                ]
                },
                "address": {
                "type": "Point",
                "coordinates": [-43.432034,-22.747707]
                }
            });
    
            expect(response.statusCode).toBe(500);
            expect(response.body).toHaveProperty("error");      
    });

    it("shouldn't create a partner in database that don't respect the enum", async () => {
        const response = await request(app)
            .post("/partner")
            .send({
                "tradingName": "Bar de Teste - create partner again",
                "ownerName": "Rafael Silva",
                "document": "05202839000149",
                "coverageArea": {
                "type": "Polygon",
                "coordinates": [
                    [[[-43.50404,-22.768366], [-43.45254,-22.775646], [-43.429195,-22.804451],[-43.50404,-22.768366]]]
                ]
                },
                "address": {
                "type": "Point",
                "coordinates": [-43.432034,-22.747707]
                }
            });
    
            expect(response.statusCode).toBe(500);
            expect(response.body).toHaveProperty("error");      
    });

    it("shouldn't create a partner in database without required fields - coordinates of the coverageArea", async () => {
        const response = await request(app)
            .post("/partner")
            .send({
                "tradingName": "Bar de Teste - create partner again",
                "ownerName": "Rafael Silva",
                "document": "05202839000149",
                "coverageArea": {
                "type": "Polygon"
                },
                "address": {
                "type": "Point",
                "coordinates": [-43.432034,-22.747707]
                }
            });
    
            expect(response.statusCode).toBe(500);
            expect(response.body).toHaveProperty("error");      
    });

    it("shouldn't create a partner in database without required fields - address", async () => {
        const response = await request(app)
            .post("/partner")
            .send({
                "tradingName": "Bar de Teste - create partner again",
                "ownerName": "Rafael Silva",
                "document": "05202839000149",
                "coverageArea": {
                "type": "Polygon",
                "coordinates": [
                    [[[-43.50404,-22.768366], [-43.45254,-22.775646], [-43.429195,-22.804451],[-43.50404,-22.768366]]]
                ]
                }
            });
    
            expect(response.statusCode).toBe(500);
            expect(response.body).toHaveProperty("error");      
    });
    
});

describe("Get Partner by id", () => {
    
    it("should get a partner by id", async () => {
        const responseCreate = await request(app)
            .post("/partner")
            .send({
                "tradingName": "Bar de Teste - get by Id",
                "ownerName": "Fernando Silva",
                "document": "05202839000151",
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
            });
    
            const id = responseCreate.body.data._id;
    
           const responseGet = await request(app)
            .get(`/partner/${id}`);
    
            expect(responseGet.statusCode).toBe(200);
            expect(responseGet.body.data._id).toBe(id);
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
        
        const long = -43.3829;
        const lat = -22.7182;
        const {body, statusCode} = await request(app)
            .get(`/partner/${long}/${lat}`);
    
            expect(statusCode).toBe(200);
            expect(body.data).not.toBeNull();
    });
})