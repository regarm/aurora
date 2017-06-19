module.exports = function(req, res, next){
    req.session.destroy();
    return res.redirect(303, '/');
};