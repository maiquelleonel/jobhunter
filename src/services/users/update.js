import User from './../../models/user'

export default (req, res) => {

    let { email, telephone, password } = req.body
    let data = { email, telephone }

    User.findById( req.params.id )
        .then( (user) => {
            if(!user){
                return req.status(404).send('Usuário não encontrado')
            }

            if( ! password ) {
                return User.findByIdAndUpdate( req.params.id, data)
                           .then(user => res.redirect('/users/'.concat(user._id)))
            }

            user.setPassword(password , (error, updated, passErr) =>{
                if( error || passErr) {
                    return;
                }

                updated.save()

                return User.findByIdAndUpdate( req.params.id, data)
                           .then(user => res.redirect('/users/'.concat(user._id)))
            })

        })
}
