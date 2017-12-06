export default (req, res) => {
    return res.render('dash/index', {
        title : 'indexador de vagas - Análises',
        user  : req.user || undefined,
        layout: 'app'
    })

}
