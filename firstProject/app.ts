let userInput: unknown
let user: string

userInput: 1
userInput: 'das'
userInput: user! // without '!' it will fail

function generateError(message: string, code: number): never {
    throw { message, errro: code }
}

generateError('error', 505)