const express = require('express');
require('./db/mongoose');
require('ejs');
const axios = require('axios');
const cheerio = require('cheerio');
const path = require('path');
const moment = require('moment');
const Product = require('./models/products');

const app = express();

// Setup ejs engine and views location
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// ANCHOR scrap website data from AWS source URL and store details into mongoDB database
const fetchShelves = async () => {
  try {
    const response = await axios.get('https://www.amazon.com/s?srs=5286335011');
    const html = response.data;
    const $ = cheerio.load(html);

    $(
      'div.sg-col-4-of-12.s-result-item.s-asin.sg-col-4-of-16.sg-col.sg-col-4-of-20',
    ).each(async (_idx, el) => {
      const shelf = $(el);

      let element = {
        title: shelf
          .find('span.a-size-base-plus.a-color-base.a-text-normal')
          .text(),
        image: shelf.find('img.s-image').attr('src'),
        price: shelf.find('span.a-price > span.a-offscreen').text(),
      }
      const productData = new Product(element);
      productData.created_at = moment();
      await productData.save();
    });
  } catch (error) {
    throw error;
  }
};

fetchShelves().then(() => console.log("Congratulations, Data stored in MongoDB"));


app.get('/products', async (req, res) => {
  try {
    const products = await Product.find({});
    res.render('products-list', { title: 'Products List', productData: products });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

app.listen(3000, () => {
  console.log('listening on port 3000');
});

app.get('/products/delete/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).send('Product Not Found');
    }

    await product.remove();
    res.redirect('/products');
  } catch (err) {
    res.status(400).send(err.message);
  }

});