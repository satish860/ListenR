import Stripe from 'stripe'
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: '2022-11-15',
})

export async function POST(request: Request) {
    const { id, amount } = await request.json()
    const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: 'usd',
        description: 'Transcription',
        payment_method: id,
        confirm: true,
    })
    return {
        body: paymentIntent,
    }
}