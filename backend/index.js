const mongoose = require('mongoose');
const settings = require('./config/settings');
const app = require('./app');
mongoose.plugin(require('meanie-mongoose-to-json'));

async function start()  {
  // mongoose.connect(settings.database.mongoURI).catch(e => console.log(e));

  // app.listen(settings.port, () => console.log(`servidor corriendo en puerto ${settings.port}`));

  try {
    await mongoose.connect('mongodb://' + settings.database.host + '/' + settings.database.name, { useNewUrlParser: true });
  } catch (e) {
    console.log(e)
  } finally {
    app.listen(settings.port, () => {
      console.log(`servidor corriendo en puerto ${settings.port}`)
    });
  }
}

start();
