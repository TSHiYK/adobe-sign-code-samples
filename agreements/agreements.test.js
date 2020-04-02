const agreements = require("./agreements");
const transientDocuments = require("../transientDocuments/transientDocuments");

describe("POST /agreements", () => {
    it("should return agreement ID", async (done) => {
        const transientDocumentId = JSON.parse(await transientDocuments.postTransientDocuments()).transientDocumentId;
        const agreementInfo = {
            "fileInfos": [
                {
                    "transientDocumentId": transientDocumentId
                }
            ],
            "name": "Adobe Sign API Code Sample - POST /agreements",
            "participantSetsInfo": [
                {
                    "memberInfos": [
                        {
                            "email": "jp.test.adobesign2@gmail.com"
                        }
                    ],
                    "order": 1,
                    "role": "SIGNER"
                }
            ],
            "signatureType": "ESIGN",
            "state": "DRAFT"
        };
        const result = await agreements.postAgreements(agreementInfo);
        expect(result).toHaveProperty("id");
        done();
    });
});

describe("POST /agreements/{agreementId}/formFields", () => {
    it("should return form field information of an agreement", async (done) => {
        const agreementId = "CBJCHBCAABAAUco-bTvgetP94z7-yGBDUdOM790UvJ98"; // Agreement should be DRAFT state
        const formFieldPostInfo = {
            templateId: "CBJCHBCAABAAPnlNZ1onRpMsO4AVUhD8azW8RCxTxjLa"
        };
        const result = await agreements.postAgreementsFormFields(agreementId, formFieldPostInfo);
        expect(result).toHaveProperty("fields");
        done();
    });
});

describe("GET /agreements", () => {
    it("should return agreements", async (done) => {
        const result = await agreements.getAgreements();
        expect(JSON.parse(result)).toHaveProperty("userAgreementList");
        done();
    });
});

describe("GET /agreements/{agreementId}", () => {
    it("should return agreements", async (done) => {
        const agreementId = "CBJCHBCAABAAUco-bTvgetP94z7-yGBDUdOM790UvJ98";
        const result = await agreements.getAgreementsInfo(agreementId);
        expect(JSON.parse(result)).toHaveProperty("name");
        done();
    });
});

describe("GET /agreements/{agreementId}/auditTrail", () => {
    it("should return agreements", async (done) => {
        const agreementId = "CBJCHBCAABAAKmMojxerFfPMzKkFQb65aTcJTkjTEQUP";
        const result = await agreements.getAgreementsAuditTrail(agreementId);
        expect(JSON.parse(result)).toHaveProperty("name");
        done();
    });
});