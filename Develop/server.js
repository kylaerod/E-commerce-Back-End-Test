const express = require('express');
const routes = require('./routes');
// import sequelize connection

// Import your routes
const productRoutes = require('./routes/api/product-routes');
const tagRoutes = require('./routes/api/tag-routes');
const categoryRoutes = require('./routes/api/category-routes');


const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// sync sequelize models to the database, then turn on the server

sequelize.sync({ force: false }) // Set force to true to drop tables and re-sync on every server start (useful for development)
  .then(() => {
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  })
  .catch((err) => console.log('Error syncing Sequelize models:', err));

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
