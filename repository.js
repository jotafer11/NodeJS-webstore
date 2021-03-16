const {google} = require('googleapis');

const oAuth2Client = new google.auth.OAuth2(
    "617506194227-q7v2n2imei31hml4hop6dhutkjva9cfm.apps.googleusercontent.com", 
    "MuVkQqC-yy-xGDFEv_oirdjm",
    "urn:ietf:wg:oauth:2.0:oob"
);

oAuth2Client.setCredentials({
    access_token:
        "ya29.a0AfH6SMCNxRFI89KpJ8nhntVRgRG74nsyvX3k1ba7DZoVCdSdSc-tvS-fsawT-csylGGrEcRMxGK3m3mJGuqGP6P2nz_PySRi3Js85FDjYQEWP7eT1-NIDPrFGcqfJkDahVClZ1FPLuYlS_XrLJ7-uQ5_YlGX",
    refresh_token: 
        "1//0h7zsNXskLGcdCgYIARAAGBESNgF-L9Ir0xbdRk-uwpY9aypKpLE4aGftNVB2OUpO-8Dxq8GYJZQ1KEhMrgU3Bba-nc-5luAuJw",
    scope: 
        "https://www.googleapis.com/auth/spreadsheets",
    token_type: "Bearer",
    expiry_date: 1615435285921
});

const sheets = google.sheets({version: 'v4', auth: oAuth2Client});

async function read(){
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: '1K4wna5qeWTL4Bw2DP4-_ng9pRD90ftmuce-5y-t990k',
      range: 'A2:E',
    });
    
    const rows = response.data.values;
    const products = rows.map((row) => ({
        id: +row[0],
        name: row[1],
        price: +row[2],
        image: row[3],
        stock:+row[4],
        }));

    return products;
}


async function write(products) {
    let values = products.map(p => [p.id, p.name, p.price, p.image, p.stock])

        const resource = {
            values,
        };
        const result = await sheets.spreadsheets.values.update({
            spreadsheetId: '1K4wna5qeWTL4Bw2DP4-_ng9pRD90ftmuce-5y-t990k',
            range: 'A2:E',
            valueInputOption: "RAW",
            resource,
        });

    console.log(result.updateCells);
}



//async function readAndWrite(){
//    const products = await read();
//    products[0].stock = 20;
//    await write(products);
//}



//readAndWrite();

module.exports = {
    read,
    write,
};
