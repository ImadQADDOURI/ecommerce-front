import {mongooseConnect} from "@/lib/mongoose";
import {Product} from "@/models/Product";
import {Order} from "@/models/Order";
const stripe = require('stripe')(process.env.STRIPE_SK);

export default async function handler(req,res) {
  if (req.method !== 'POST') {
    res.json('should be a POST request');
    return;
  }
  const {
    name,email,city,
    postalCode,streetAddress,country,
    cartProducts,
  } = req.body;
  await mongooseConnect();
  const productsIds = cartProducts;
  const uniqueIds = [...new Set(productsIds)];
  const productsInfos = await Product.find({_id:uniqueIds});

  let line_items = [];
  let totalPrice = 0;
  for (const productId of uniqueIds) {
    const productInfo = productsInfos.find(p => p._id.toString() === productId);
    
    const quantity = productsIds.filter(id => id === productId)?.length || 0;

    console.log(productInfo.price,quantity);

    if (quantity > 0 && productInfo) {
      
      const unitAmountUSD = productInfo.price; // Price in USD


      line_items.push({
        quantity,
        price_data: {
          currency: 'USD',
          product_data: {name:productInfo.title},
          unit_amount: unitAmountUSD * 100, // you should ensure that the unit_amount is provided in the smallest currency unit (e.g., cents) when creating the line items for Stripe. Since Stripe expects the amount to be in the smallest currency unit, you need to convert the price from dollars to cents.
        },
      });

      totalPrice += quantity * unitAmountUSD; // Calculate the total price in USD

    }
  }

  const orderDoc = await Order.create({
    line_items,name,email,city,postalCode,
    streetAddress,country,paid:false,totalPrice
  });

  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: 'payment',
    customer_email: email,
    success_url: process.env.PUBLIC_URL + '/cart?success=1',
    cancel_url: process.env.PUBLIC_URL + '/cart?canceled=1',
    metadata: {orderId:orderDoc._id.toString(),test:'ok'},
  });

  res.json({
    url:session.url,
  })

}