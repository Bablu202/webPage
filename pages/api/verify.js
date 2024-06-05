// import database from '../../lib/firebase'
// Get spreadsheet npm package
const { GoogleSpreadsheet } = require('google-spreadsheet')

// Ensure you've updated this file with your client secret
const clientSecret = require('../../public/client_secret.json')

// Add your Google sheet ID here
const googleSheetID = '1bDR2wwvaL8sbKmV_qjgdAKHnRCr2baJ3qkGOLbE7eVg'

// Instantiates the spreadsheet
const sheet = new GoogleSpreadsheet(googleSheetID)

const codes = [
  'P9E7R-6QCQR-C164T-97R78',
  '811MD-RFSW8-26ZKM-LJ507',
  'C61JH-5LCT2-5UQQZ-UPEBL',
  'ZWJ7O-1BS9E-T39TK-213RS',
  '5HQOJ-DK0XQ-IIYAH-GHYZU',
  '3ZKEU-IA5YR-1ZVUU-PAI4X',
  '71118-8YL7F-UO2OD-W6NYD',
  'GPZMG-XQTAA-R4KX3-OVYG8',
  'PQ9KO-PEGCE-32B4T-01WI6',
  'EDPZM-U9KM7-Q3PLS-CMYPB',
  '1Z066-U3IEF-FT7CB-OZOIX',
  '5D3CH-TXZHR-9KV20-TX9D4',
  'YENSJ-VO2VZ-MS7YT-0NWSI',
  'OI57G-X3M16-KDMK2-ACKYS',
  'OD9UA-GM5MD-9JE80-8ZD6E',
  'UUOSE-F7DEZ-5VQ3O-46HP4',
  'JOKYV-PUTQ8-NGBWD-NITWK',
  '36JTB-X8P46-7MZLP-7YQM3',
  'JDQ5A-BMUL5-FUFNQ-Q4N11',
  'F4BIE-U274D-FWHYK-Q340G',
  '81OJG-45GWV-A44OL-7VB61',
  'PBHOQ-E7M72-Y667U-P230Y',
  'LNDOB-BKE80-3Q50I-A62R5',
  'E9UDX-EBFQ8-EPIIY-XXIJP',
  'Q4TV9-FUSUV-06ANK-17G34',
  'VGHQ0-2ETB8-UVXCN-8SP3A',
  'YXWVP-OXC75-APED1-SUQ1T',
  'DLY61-K8B9G-Z705L-U0SMZ',
  '74VHD-ZO4SJ-4CAXP-Q890A',
  'ZMQLH-E5HCU-FSIN3-YTV0F',
  'RRMOW-FGDE1-5ZAGJ-Q395W',
  'J1CLZ-3NIKK-R7J5E-JFJTK',
  'I1FYF-4V6AM-Y0HYL-R70QZ',
]

// Asynchronously get the data
async function verifyCode(code) {
  let valid = false
  try {
    // Authenticate using the JSON file we set up earlier
    await sheet.useServiceAccountAuth(clientSecret)
    await sheet.loadInfo()

    // Get the first tab's data
    const tab = sheet.sheetsByIndex[0]

    // Get row data
    const rows = await tab.getRows()

    // If we have data
    if (rows.length > 0) {
      // Iterate through the array of rows
      // and push the clean data from your spreadsheet
      rows.forEach((row) => {
        if (code === row._rawData[0]) {
          valid = true
          return
        }
      })
    } else {
      return false
    }
    return { valid: valid }
  } catch (err) {
    return { valid: false }
  }
}

export default async (req, res) => {
  // let email = "achuth.hadnoor123@gmail.com";
  // let phrase = '00MTI-TGPS1-4WP7J-CTGYL';
  const { email, phrase } = req.body
  try {
    // let valid = await verifyCode(phrase);
    console.log(codes[phrase])
    if (codes.includes(phrase)) {
      return res.json({ status: 200, message: "Let's get started" })
    }
    return res.json({
      status: 503,
      message: 'Please check the details entered',
    })
  } catch (error) {
    return res.json({ status: 403, message: `Unknown ${error}` })
  }
}
