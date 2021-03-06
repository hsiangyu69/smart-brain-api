// run db, bcrypt then return (req, res) function
const handleSignin = (db, bcrypt) => (req, res) => {
    const { email , password} = req.body;
    if (!email || !password) {
        return res.status(400).json("incorrect form submission")
     }
    db.select('hash', 'email').from('login')
        .where('email', '=', email)
        .then(data => {
            const valid = bcrypt.compareSync(password, data[0].hash);
            if (valid) {
                db.select('*').from('users')
                    .where('email', '=', email)
                    .then(user => {
                        res.json(user[0]);
                    })
                    .catch(err => res.status(400).json('unable to get user'))
            } else {
                res.status(400).json('wrong credentials')
            }
        })
        .catch(err => res.status(400).json('wrong credentials'));
}

module.exports = {
    handleSignin: handleSignin
}