const {connect} = require('mongoose')
const {MONGO_URI} = require('dotenv').config().parsed
connect(MONGO_URI).then(()=>console.log(`conection good withe mongodb *_*`))