const agreements = require("./agreements");
const transientDocuments = require("../transientDocuments/transientDocuments");
let transientDocumentId;

describe("agreements", () => {
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
