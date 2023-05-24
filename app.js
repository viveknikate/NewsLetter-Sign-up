const express = require('express');
const bodyParser = require('body-parser');
const request = require("request");
const https = require('https');


const app = express();

app.use(bodyParser.urlencoded({extended:true}))

app.get('/', (req,res)=>{
     res.sendFile(__dirname+'/signup.html');
})


app.post('/',(req,res)=>{
     const name = req.body.fname;
     const email = req.body.email;
     const surname = req.body.lname;

     const data={
          members:[
               {
                    email_address: email,
                    status: 'subscribed',
                    merge_fields: {
                         FNAME: name,
                         LNAME: surname,

                    }
               }
          ]
     }

     const jsonData = JSON.stringify(data);
     // console.log(data);

     const URL = 'https://us13.api.mailchimp.com/3.0/lists/2825d03d4a';

     const options = {
          method: 'POST',
          auth:'Vivek:0a286a91ae6e6abe254133ebaa2d6c49-us13'
     }

     const request = https.request(URL, options, (response)=>{

          if(response.statusCode === 200){
               res.sendFile(__dirname+"/success.html");
          }
          else{
               res.sendFile(__dirname+'/failure.html');
          }

          // response.on('data', function(data){
          //      console.log(JSON.parse(data))
          // })
     })

     // request.write(jsonData)
     request.end();

     // res.send(`<h1>Thanks for Subscribing ${name} ${surname} <br/> we sent confirmation on ${email}</h1>`)
     // console.log(`name: ${name} surname: ${surname} Email: ${email}`);
})

app.post('/failure',(req, res)=>{
     res.redirect('/');
})

app.listen(process.env.PORT || 3000,(req, res)=>{
     console.log('Server is running on port 3000')
})

// api key
// generate new key when you need. this project might fail due to inproper api key

// audience ID
// ID 2825d03d4a

