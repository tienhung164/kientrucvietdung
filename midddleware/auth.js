function isAmin(req,res,next){
    let token=req.cookies.token
    console.log(token)
    if(token=='hun127d9!$^&(') next()
    else res.redirect('/')
}

module.exports = isAmin