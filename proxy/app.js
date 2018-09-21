const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, '../public')));

app.all('/api/restaurant/info/*', (req, res) => res.redirect(`http://zagat-info2.us-west-1.elasticbeanstalk.com/${req.path}`))
app.all('/api/restaurant/suggestions/*', (req, res) => res.redirect(`http://zagat-suggestions-dev.us-west-1.elasticbeanstalk.com/${req.path}`))
app.all('/api/restaurant/reviews/*', (req, res) => res.redirect(`http://reviews-api.us-west-2.elasticbeanstalk.com/${req.path}`))
app.all('/api/restaurant/carousel/*', (req, res) => res.redirect(`http://carousel-dev6.us-west-1.elasticbeanstalk.com/${req.path}`))
// app.all('/api/restaurant/recommendations/*', (req, res) => res.redirect(`http://localhost:3004${req.path}`))

app.use((req, res) => {
  const restaurantId = req.path.slice(1).split('/')[0];
  if (restaurantId && Number.isInteger(+restaurantId)) {
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
  } else {
    res.send('Error').end();
  }
});


module.exports = app;