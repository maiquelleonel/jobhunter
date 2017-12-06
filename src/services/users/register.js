export default (req, res) => {
    if( ! req.user){
        return res.render('users/register', {
            title: 'Indexador de Vagas - Criar novo usuário',
            layout: 'login_register'
        })
    }
    return res.redirect('/users/'.concat(req.user._id))
}
