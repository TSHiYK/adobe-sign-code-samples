require('dotenv').config();
const fs = require("fs");
const agreements = require("./agreements");
const transientDocuments = require("../transientDocuments/transientDocuments");

const DRAFT_AGREEMENT_ID = process.env.DRAFT_AGREEMENT_ID;
const SIGNED_AGREEMENT_ID = process.env.SIGNED_AGREEMENT_ID;

describe("POST /agreements", () => {
    it("should return agreement ID", async () => {
        const transientDocumentId = JSON.parse(await transientDocuments.postTransientDocuments()).transientDocumentId;
        const agreementInfo = {
            "fileInfos": [{
                "transientDocumentId": transientDocumentId
            }],
            "name": "Adobe Sign API Code Sample - POST /agreements",
            "participantSetsInfo": [{
                "memberInfos": [{
                    "email": "jp.test.adobesign2@gmail.com"
                }],
                "order": 1,
                "role": "SIGNER"
            }],
            "mergeFieldInfo": [{
                    "fieldName": "CompanyName",
                    "defaultValue": "サンプル株式会社"
                },
                {
                    "fieldName": "CompanyAddress",
                    "defaultValue": "東京都品川区1-2-3-4567"
                },
            ],
            "signatureType": "ESIGN",
            "state": "IN_PROCESS"
        };
        const result = await agreements.postAgreements(agreementInfo);
        expect(result).toHaveProperty("id");
    });
});

describe("POST /agreements/{agreementId}/formFields", () => {
    it("should return form field information of an agreement", async () => {
        const agreementId = DRAFT_AGREEMENT_ID;
        const formFieldPostInfo = {
            templateId: "CBJCHBCAABAAPnlNZ1onRpMsO4AVUhD8azW8RCxTxjLa"
        };
        const result = await agreements.postAgreementsFormFields(agreementId, formFieldPostInfo);
        expect(result).toHaveProperty("fields");
    });
});

describe("GET /agreements", () => {
    it("should return agreements", async () => {
        const result = await agreements.getAgreements();
        expect(JSON.parse(result)).toHaveProperty("userAgreementList");
    });
});

describe("GET /agreements/{agreementId}", () => {
    it("should return agreements", async () => {
        const agreementId = DRAFT_AGREEMENT_ID;
        const result = await agreements.getAgreementsInfo(agreementId);
        expect(JSON.parse(result)).toHaveProperty("name");
    });
});

describe("GET /agreements/{agreementId}/auditTrail", () => {
    it("should return agreements", async () => {
        const agreementId = DRAFT_AGREEMENT_ID;
        const result = await agreements.getAgreementsAuditTrail(agreementId);
        expect(typeof result).toBe("string");
    });
});

describe("GET /agreements/{agreementId}/combinedDocument", () => {
    it("should exists the downloaded agreement file", async () => {
        const agreementId = SIGNED_AGREEMENT_ID;
        await agreements.getAgreementsCombinedDocument(agreementId);
        expect(fs.existsSync("downloaded_sample.pdf")).toBe(true);
    }, 30000);
});