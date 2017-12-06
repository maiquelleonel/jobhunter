export default (req, res) => {

    if( ! req.user ){
        return res.render('users/login', {
            title: 'Indexador de Vagas - Login',
            layout: 'login_register'
        })
    }

    return res.redirect('/users/'.concat(req.user._id))
}
