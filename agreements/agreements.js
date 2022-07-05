require('dotenv').config();
const request = require("request");
const fs = require("fs");

beforeAll(() => {
    if (fs.existsSync('downloaded_sample.pdf')) {
        fs.unlinkSync('downloaded_sample.pdf');
    }
});

/**
 * POST /agreements
 * 
 * Creates an agreement. Sends it out for signatures, and returns the agreementID in the response to the client.
 * 契約書を作成、送信を行います。成功すると agreement ID を返します。
 * 
 * @param {Object} agreementInfo 
 * @return {Promise<Object>}
 * 
 * https://secure.na1.echosign.com/public/docs/restapi/v6#!/agreements/createAgreement
 */
exports.postAgreements = (agreementInfo) => {
    const options = {
        url: `${process.env.api_access_point}/api/rest/v6/agreements`,
        headers: {
            "Authorization": `Bearer ${process.env.access_token}`,
            "Content-Type": "application/json"
        }
    };

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
 * @param {String} agreementId
 * @param {Object} formFieldPostInfo
 * @return {Promise<Object>}
 * 
 * https://secure.na1.echosign.com/public/docs/restapi/v6#!/agreements/addTemplateFieldsToAgreement
 */
exports.postAgreementsFormFields = (agreementId, formFieldPostInfo) => {
    const options = {
        url: `${process.env.api_access_point}/api/rest/v6/agreements/${agreementId}/formFields`,
        headers: {
            "Authorization": `Bearer ${process.env.access_token}`,
            "Content-Type": "application/json"
        }
    };

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


/**
 * GET /agreements
 * 
 * Retrieves agreements for the user.
 * ユーザーの契約一覧を取得します。
 * 
 * @return {Promise<Object>}
 *  
 * https://secure.na1.echosign.com/public/docs/restapi/v6#!/agreements/getAgreements
 */
exports.getAgreements = () => {
    const options = {
        url: `${process.env.api_access_point}/api/rest/v6/agreements`,
        headers: {
            "Authorization": `Bearer ${process.env.access_token}`
        }
    };

    return new Promise((resolve, reject) => {
        request.get(options, (error, response, body) => {
            if (error) {
                console.log(error);
            }

            resolve(body);
        });
    });
}

/**
 * GET /agreements/{agreemnetId}
 * 
 * Retrieves the current status of an agreement.
 * agreementId で指定した契約の詳細情報を取得します。
 * 
 * @param {String} agreementId
 * @return {Promise<Object>}
 * 
 * https://secure.na1.echosign.com/public/docs/restapi/v6#!/agreements/getAgreementInfo
 */
exports.getAgreementsInfo = (agreementId) => {
    const options = {
        url: `${process.env.api_access_point}/api/rest/v6/agreements/${agreementId}`,
        headers: {
            "Authorization": `Bearer ${process.env.access_token}`
        }
    };

    return new Promise((resolve, reject) => {
        request.get(options, (error, response, body) => {
            if (error) {
                console.log(error);
            }

            resolve(body);
        });
    });
}

/**
 * GET /agreements/{agreemnetId}/auditTrail
 * 
 * Retrieves the audit trail of an agreement identified by agreementId.
 * agreementId で指定した契約の監査証跡を取得します。
 * 
 * @param {String} agreementId
 * @return {Promise<Object>}
 * 
 * https://secure.na1.echosign.com/public/docs/restapi/v6#!/agreements/getAuditTrail
 */
exports.getAgreementsAuditTrail = (agreementId) => {
    const options = {
        url: `${process.env.api_access_point}/api/rest/v6/agreements/${agreementId}/auditTrail`,
        headers: {
            "Authorization": `Bearer ${process.env.access_token}`
        }
    };

    return new Promise((resolve, reject) => {
        request.get(options, (error, response, body) => {
            if (error) {
                console.log(error);
            }

            resolve(body);
        });
    });
}

/**
 * GET /agreements/{agreementId}/combinedDocument 
 * 
 * Retrieves a single combined PDF document for the documents associated with an agreement.
 * 指定した契約書に関連する文書をひとつに結合されたPDF文書を取得します。
 * 
 * @param {String} agreementId
 * @return {Promise<Object>}
 * 
 * https://secure.na1.echosign.com/public/docs/restapi/v6#!/agreements/getCombinedDocument
 */
exports.getAgreementsCombinedDocument = (agreementId) => {
    const options = {
        url: `${process.env.api_access_point}/api/rest/v6/agreements/${agreementId}/combinedDocument`,
        encoding: "base64",
        headers: {
            "Authorization": `Bearer ${process.env.access_token}`,
        }
    };

    return new Promise((resolve, reject) => {
        const fileName = "downloaded_sample.pdf";

        request.get(options, (error, response, body) => {
            if (error) {
                console.log(error);
            }
            fs.writeFileSync(fileName, body, "base64");
            resolve();
        });
    });
}