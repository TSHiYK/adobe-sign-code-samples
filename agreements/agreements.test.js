const agreements = require("./agreements");
const transientDocuments = require("../transientDocuments/transientDocuments");

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
            "state": "IN_PROCESS"
        };
        const result = await agreements.postAgreements(agreementInfo);
        expect(result).toHaveProperty("id");
        done();
    });
});
