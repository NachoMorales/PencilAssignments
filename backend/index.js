const mongoose = require('mongoose');
const settings = require('./config/settings');
const app = require('./app');
mongoose.plugin(require('meanie-mongoose-to-json'));

async function start()  {
  await mongoose.connect(settings.mongoURI).catch(e => console.log(e));

  app.listen(settings.port, () => console.log(`servidor corriendo en puerto ${settings.port}`));
}

start();
