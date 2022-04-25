const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const db = require('./config/db/connectMonggo') 
const Customer= require('./model/customer')
const Admin=require('./model/admin')
const path = require('path')
const ejs = require('ejs')
const fs = require('fs')
var cookieParser = require('cookie-parser')
const admin = require('./model/admin')
const isAmin = require('./midddleware/auth')
const port = process.env.PORT || 5000

app.use(cookieParser());
app.use(express.static('public'))

app.use(bodyParser.json()) 
app.use(bodyParser.urlencoded({ extended: true }))

app.set('views', './public')
app.set('view engine', 'ejs')
app.use('/public', express.static(path.join(__dirname, '/public')))


db.connect()

app.use('/logout',(req,res)=>{
         res.clearCookie('token')
         res.redirect('/')
})

app.post('/data',(req,res)=>{
    let _name= req.body.name
    let _sdt= req.body.sdt
    let _infor= req.body.infor
    let customer= new Customer({
        name : _name,
        sdt : _sdt,
        infor : _infor,
    })
    customer.save().then((data)=>{
        console.log(data)
    })
    res.redirect('/')
})

app.get('/admin',(req,res)=>{
    res.render('login')
})

app.post('/login',(req,res)=>{
    let user=req.body.user
    let pass=req.body.pass
    Admin.findOne({username:user},(err,data)=>{
        if(pass==data.password){
            res.cookie('token','hun127d9!$^&(')
            res.redirect('/showData')
        }
        else res.redirect('/')
        
    })
    
})

app.get('/password',(req,res)=>{
    res.render('password')
})

app.post('/password',(req,res)=>{
    let oldpass =req.body.oldpass
    let newpass = req.body.newpass
    console.log('1 :'+oldpass+newpass)
    Admin.findOne({username:'admin'},(err,data)=>{
        console.log(data)
        if(oldpass==data.password){
            Admin.findOneAndUpdate(
                {username:'admin'}
            ,
            {password:newpass}
            ,(err,data)=>{
                res.redirect('/admin')
            })
            
        }
        else res.redirect('/')
        
    })
    
})

app.get('/exel',isAmin,(req,res)=>{
    let file="Tên khách hàng,Số điện thoại,Nội dung\n"
    Customer.find({},(err,_data)=>{
        _data.forEach(element => {
            file+=element.name
            file+=',+'
            file+=element.sdt
            file+=','
            file+=element.infor+"\n"
           
            
        });      
        console.log(file)
        fs.writeFile( './public/file/data.csv', file, 'utf8',()=>{
            res.download('./public/file/data.csv')
        })
    })
    
    
    
   

})

app.get('/showData',isAmin,(req,res)=>{   
    Customer.find({},(err,_data)=>{
        res.render('showData',{
            data: _data
        })          
    })

})

app.get('/delete',isAmin,async (req,res)=>{
    
    await Customer.deleteMany({})
    res.redirect('/showData')

})

app.listen(port,()=>{
    console.log(`host run in port ${port}`)
})
