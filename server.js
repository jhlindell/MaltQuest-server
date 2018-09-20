const app = require('./app');

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Now listening on port ${port}`);
});

app.use((req, res) => {
  res.sendStatus(404);
});