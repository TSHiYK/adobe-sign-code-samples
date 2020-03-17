require('dotenv').config();
const request = require("request");

const options = {
    url: `${process.env.api_access_point}/api/rest/v6/agreements`,
    headers: {
        "Authorization": `Bearer ${process.env.access_token}`,
        "Content-Type": "application/json"
    }
};

exports.postAgreements = (agreementInfo) => {
    return new Promise((resolve, reject) => {
        options["json"] = agreementInfo;
        request.post(options, (error, response, body) => {
            if (error) {
                console.log(error);
            }

            resolve(body);
        });
    });
}
