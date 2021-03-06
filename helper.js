

/**
 * Returns WebEx constructed string.
 *
 * @param {string} ctx The type of transfer.
 * @param {object} body The metadata of the starling transfer.
 * @return {string}  Constructed string with parameters.
 */
let generateMessageInterface = (ctx, body) => {
    
    let returnedMessage = null;

    console.log('current ctx: ' + ctx)

    //Select the function from the type of transfer
    switch(ctx) {
        case "transferOut" :
            returnedMessage = generateTransferOutMessage(body);
            break;
        case "transferIn" :
            returnedMessage = generateTransferInMessage(body);
            break;
        case "standingOrder" :
            returnedMessage = generateStandingOrderMessage(body);
            break;
        default:
            console.log('LOG: No Suitable Paymeny Context')
            break;
    }

    return returnedMessage;
}

/**
 * Returns x raised to the n-th power.
 *
 * @param {string} body The metadata of the starling transfer.
 * @return {string}  Constructed string with parameters.
 */
let generateTransferOutMessage = (body) => {
    // String to procederally generate
    let generatedString = ""

    // Append Introduction 
    generatedString += "# 💸 Outbound Payment Alert! 💸 \n"
    generatedString += "--- \n"
    generatedString += "A Faster Payment of £" + (body.content.amount)*-1 +" has just been sent to **_" + body.content.counterParty + "_**. \n"
    generatedString += "### Payment Reference: \n"
    generatedString += "``` \n" + body.content.reference + "\n ```"

    return generatedString
}

/**
 * Returns x raised to the n-th power.
 *
 * @param {string} body The metadata of the starling transfer.
 * @return {string}  Constructed string with parameters.
 */
 let generateTransferInMessage = (body) => {
    // String to procederally generate
    let generatedString = ""

    // Append Introduction 
    generatedString += "# 💸 Inbound Payment Alert! 💸 \n"
    generatedString += "--- \n"
    generatedString += "A Faster Payment of £" + (body.content.amount)*-1 +" has just been recieved by **_" + body.content.counterParty + "_**. \n"
    generatedString += "### Payment Reference: \n"
    generatedString += "``` \n" + body.content.reference + "\n ```"

    return generatedString
}

/**
 * Returns x raised to the n-th power.
 *
 * @param {string} body The metadata of the starling transfer.
 * @return {string}  Constructed string with parameters.
 */
 let generateStandingOrderMessage = (body) => {
    // String to procederally generate
    let generatedString = ""

    // Append Introduction 
    generatedString += "# 💸 Standing Order Payment Alert! 💸 \n"
    generatedString += "--- \n"
    generatedString += "A Faster Payment of £" + (body.content.amount)*-1 +" has just been recieved by **_" + body.content.counterParty + "_**. \n"
    generatedString += "### Payment Reference: \n"
    generatedString += "``` \n" + body.content.reference + "\n ```"

    return generatedString
}


exports.generateMessageInterface = generateMessageInterface;