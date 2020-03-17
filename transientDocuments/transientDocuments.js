/**
 * POST /transientDocuments
 * 
 * Uploads a document and obtains the document's ID.
 * ドキュメントファイルをアップロードし、transientDocumentId を取得します。
 * 
 * https://secure.na1.echosign.com/public/docs/restapi/v6#!/transientDocuments/createTransientDocument
 */

require('dotenv').config();
const request = require("request");
const fs = require("fs");

const options = {
    url: `${process.env.api_access_point}/api/rest/v6/transientDocuments`,
    headers: {
        "Authorization": `Bearer ${process.env.access_token}`,
        "Content-Type": "multipart/form-data"
    },
    formData: {
        "File": fs.createReadStream("./sample.pdf")
    }
};

exports.postTransientDocuments = () => {
    return new Promise((resolve, reject) => {
        request.post(options, (error, response, body) => {
            if (error) {
                console.log(error);
            }

            resolve(body);
        });
    });
}
