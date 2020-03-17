require('dotenv').config();
const request = require("request");

// Common options
const options = {
    url: `${process.env.api_access_point}/api/rest/v6/agreements`,
    headers: {
        "Authorization": `Bearer ${process.env.access_token}`,
        "Content-Type": "application/json"
    }
};

/**
 * POST /agreements
 * 
 * Creates an agreement. Sends it out for signatures, and returns the agreementID in the response to the client.
 * 契約書を作成、送信を行います。成功すると agreement ID を返します。
 * 
 * https://secure.na1.echosign.com/public/docs/restapi/v6#!/agreements/createAgreement
 */
exports.postAgreements = (agreementInfo) => {
    return new Promise((resolve, reject) => {
        options.json = agreementInfo;
        request.post(options, (error, response, body) => {
            if (error) {
                console.log(error);
            }

            resolve(body);
        });
    });
}

/**
 * POST /agreements/{agreementId}/formFields
 * 
 * Adds template fields to an agreement.
 * フィールドテンプレートを契約書に追加します。ただし契約書の状態が DRAFT である必要があります。
 * 
 * https://secure.na1.echosign.com/public/docs/restapi/v6#!/agreements/addTemplateFieldsToAgreement
 */
exports.postAgreementsFormFields = (agreementId, formFieldPostInfo) => {
    options.url += `/${agreementId}/formFields`;

    return new Promise((resolve, reject) => {
        options.json = formFieldPostInfo;
        request.post(options, (error, response, body) => {
            if (error) {
                console.log(error);
            }

            resolve(body);
        });
    });
}
