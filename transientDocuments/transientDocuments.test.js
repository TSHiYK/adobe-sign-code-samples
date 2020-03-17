const transientDocuments = require("./transientDocuments");

describe("transientDocuments", () => {
    it("should return transientDocumentId", async (done) => {
        const result = await transientDocuments.postTransientDocuments();
        expect(JSON.parse(result)).toHaveProperty("transientDocumentId");
        done();
    });
});
