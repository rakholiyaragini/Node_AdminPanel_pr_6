const defaultController = (req , res) =>{
    
    if(req.cookies.userId){
        res.render('index')
    }else{
        res.redirect('logIn')

    }
}
module.exports = {defaultController}