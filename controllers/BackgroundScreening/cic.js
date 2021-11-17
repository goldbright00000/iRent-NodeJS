const builder = require('xmlbuilder');
const xml2js = require('xml2js');
const axios = require('axios');
const models = require('../../models/importAll');

const Email = require('../../util/email');

exports.getReport = async (req, res, next) => {
    try {
        const data = req.body.data || req.body;
            
        const url = 'https://www.securecontinfo.com/API/prod/';
        const property = await models.PropertyDefaults.getByPropertyID(data.propertyID);

        const xmlData = `
            <?xml version="1.0" encoding="UTF-8" ?> 
            <ScreeningRequest>
                <Request Type="View">
                    <Account>
                        <AppVersion>002</AppVersion>
                        <UserID>${property.CICUserID}</UserID>
                        <UserPassword>${property.CICPassword}</UserPassword>
                    </Account>
                    <ReferenceInformation>	
                        <TransactionID>ID123456</TransactionID>
                    </ReferenceInformation>
                    <Report>	
                        <ReportID>${data.reportID}</ReportID>	
                        <KEY>${data.key}</KEY>
                        <ViewID>${Math.random()}</ViewID>
                        <RequestAdvisement>Yes</RequestAdvisement>
                    </Report>
                </Request>
            </ScreeningRequest>
        `;
            
        let reportURL = null;
        await axios.post(url, xmlData, 
            { headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'} })
            .then(async (result) => {
                const parser = new xml2js.Parser();
                await parser.parseStringPromise(result.data).then(function (report) {
                    const response = report.ScreeningResponse.Response[0].Report[0];
                    if(response.Link !== undefined)
                        reportURL = response.Link[0]
                    else
                        reportURL = 'Report is Pending';
                })
            })
            .catch(async (error) => {
                const email = new Email();
                await email.errorEmail(
                    error,
                    "iRent Backend - CIC Controller - getReport"
                );
                return res.json(-1);
            });

        return res.json(reportURL)
    } catch(err) {
        const email = new Email();
        await email.errorEmail(
            err.toString(),
            "iRent Backend - CIC Controller - getReport"
        );
        return res.json(-1);
    } 
}

exports.runReport = async (req, res, next) => {
    try {
        const data = req.body.data || req.body;

        // Insert BackgroundCheckLog


    } catch(err) {
        const email = new Email();
        await email.errorEmail(
            err.toString(),
            "iRent Backend - CIC Controller - runReport"
        );
        return res.json(-1);
    } 
}