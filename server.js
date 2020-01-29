const express = require('express');
const app = express();

const dotenv = require('dotenv');
dotenv.config();
const {
  TENEO_ENGINE_URL,
  CLOSE_TIE_SESSION_ON_EXIT
} = process.env;
const port = 9000;

if (!TENEO_ENGINE_URL) {
  throw new Error('Missing environment variable TENEO_ENGINE_URL!');
}


app.set('view engine', 'ejs');

app.use(express.static('./dist/'));

app.get('/', (req, res) =>
  res.render('index', {
    TENEO_ENGINE_URL,
    CLOSE_TIE_SESSION_ON_EXIT
  })
);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on http://localhost:${port}, Engine Endpoint${TENEO_ENGINE_URL}`);
});
