const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/inoteBook?readPreference=primary&directConnection=true',{useNewUrlParser: true}
).then(()=>{
    console.log("Connected Sucessfully");
}).catch(()=>{
    console.log("No connection");
})

// username :   himanshu638684
// password :  1oEmcg1reMXVoBwV
//url : mongodb+srv://himanshu638684:1oEmcg1reMXVoBwV@cluster0.44wrne4.mongodb.net/WebNote