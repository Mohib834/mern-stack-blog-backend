const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URL, {
    useCreateIndex: true,
    useNewUrlParser: true
}).then(() => {
    console.log('DB connected')
}).catch(err => {
    console.log(err)
})


