const bcrypt = require('bcryptjs');

const encrypt = async (textPlain) => {
    const hash = await bcrypt.hash(textPlain, 1);
    return hash;
}

const compare = async (passwordPlain, hashPassword) => {
    return await bcrypt.compare(passwordPlain, hashPassword);
}

module.exports = { encrypt, compare };