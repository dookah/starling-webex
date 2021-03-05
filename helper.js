

/**
 * Returns x raised to the n-th power.
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
        case "transferIn" :
            returnedMessage = generateTransferInMessage(body);
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
    generatedString += "Payment Reference: \n"
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
    generatedString += "Payment Reference: \n"
    generatedString += "``` \n" + body.content.reference + "\n ```"

    return generatedString
}

exports.generateMessageInterface = generateMessageInterface;