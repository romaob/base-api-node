const app = require('./app');

app.listen(process.env.PORT || 3000);
console.log(`listeninh on ${(process.env.PORT || 3000)}`);