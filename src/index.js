const restify = require('restify');
const mongoose = require('mongoose');
const config = require('./config');
const server = restify.createServer();

server.use(restify.plugins.bodyParser())

server.listen(config.PORT, () => {
  mongoose.set('useFindAndModify', false)
  mongoose.connect(
    config.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,   
    }
  );
});

const database = mongoose.connection;

database.on('error', (err) => {
  console.log(err)
})

database.once('open', () => {
  require('./routes/beneficiaries')(server)
  console.log(`Server running on Port: ${config.PORT}`);
})