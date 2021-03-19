const bcrypt = require('bcrypt')

const security  = async () => {
    const salting = await bcrypt.genSalt(10)
    const hashing = await bcrypt.hash(salting, salting)
    console.log(salting)
    console.log(hashing)
}

security()