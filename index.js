// const express = require('express')
// const app = express()
// require('dotenv').config()
// const cors = require('cors')
// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

// app.use(express.json())
// app.use(cors({origin:"http://localhost:5173"}))

// app.post('/checkout',async(req,res)=>{
//     try {
//         const session = await stripe.checkout.sessions.create({
//             payment_method_types:['card'],
//             mode:"payment",
//             line_items:req.body.items.map(item=>{
//                 return{
//                     price_data:{
//                         currency:"inr",
//                         product_data:{
//                             nameerror:item.name
//                         },
//                         unit_amount:(item.price * 100)
//                     },
//                     quantity: item.quantity
//                 }
//             }),
//             success_url:"http://localhost:5173/success",
//             cancel_url:"http://localhost:5173/cancel"

//         })
//         res.json({url:session.url})
//     } catch (error) {
//         res.status(500).json({error:error.message})
//     }
// })

// app.listen(4000,()=>{
//     console.log('server runing')
// })

const express = require('express')
const app = express()
require('dotenv').config()
const cors = require('cors')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

app.use(express.json())
app.use(cors({origin: "http://localhost:5173"}))

app.post('/checkout', async(req, res) => {
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: "payment",
            line_items: req.body.items.map(item => {
                return {
                    price_data: {
                        currency: "inr",
                        product_data: {
                            name: item.name  // Fixed: changed from nameerror to name
                        },
                        unit_amount: (item.price * 100)
                    },
                    quantity: item.quantity
                }
            }),
            success_url: "http://localhost:5173/success",
            cancel_url: "http://localhost:5173/cancel"
        })
        res.json({url: session.url})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

app.listen(4000, () => {
    console.log('server running')
})