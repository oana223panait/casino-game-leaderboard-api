const express = require('express');
const app = express();
const cors = require('cors');

// Use CORS middleware
app.use(cors());

const routes = require('./routes');
app.use('/api', routes);

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
