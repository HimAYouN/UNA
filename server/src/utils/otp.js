import crypto, { randomInt } from 'crypto'


const generateOTP = () => {
    let randomOTP = 0
    randomOTP = randomInt(0, 1000000).toString().padStart(6, '0');
    return randomOTP
}
const hashOTP = (random) => {

    return crypto
        .createHash('SHA256')
        .update(random)
        .digest('hex')
}


export {generateOTP, hashOTP}