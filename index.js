const express = require('express');
const bodyParser = require("body-parser");
const repository = require("./repository");
const WebpayPlus = require('transbank-sdk').WebpayPlus;
const { response, request } = require('express');
const app = express();
const port = 3000;



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/api/products', async(req, res) => {
  res.send(await repository.read());
});

app.post('/api/pay', async (req, res) => {
  const order = req.body;
  const ids = order.items.map((p)=> p.id);
  const productsCopy = await repository.read();

  let error = false;
  ids.forEach((id) => {
    const product = productsCopy.find((p) => p.id === id);
    if (product.stock > 0) {
      product.stock--;
      preference.items.push({
        title: product.name,
        unit_price: product.price,
        quantity: 1,
      });
    } else {
      error = true;
    }
  });

  if (error) {
    res.send("Sin stock").statusCode(400);
  } 
});

app.get("/feedback", function(request, response){
  response.json({
    Payment: request.query.payment_id,
    Status: request.query.status,
    MerchantOrder: request.query.merchant_order_id
  })
});

app.use("/", express.static("fe"));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
