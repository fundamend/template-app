/* global STRIPE_SECRET_API_KEY, STRIPE_CLI_WEBHOOK_SECRET */

import Stripe from 'stripe';

async function handleRequest(request, env) {
	const stripe = Stripe(env.STRIPE_SECRET_API_KEY, {
		httpClient: Stripe.createFetchHttpClient()
	});
	const cryptoProvider = Stripe.createSubtleCryptoProvider();
	const body = await request.text();
	const sig = request.headers.get('stripe-signature');
	const event = stripe.webhooks.constructEvent(
		body,
		sig,
		env.STRIPE_CLI_WEBHOOK_SECRET,
		undefined,
		cryptoProvider
	);

	switch (event.type) {
		case 'customer.created': {
			const customer = event.data.object;
			console.log('customer.created', event, customer);
			break;
		}

		case 'customer.subscription.deleted': {
			const subscription = event.data.object;
			console.log('customer.subscription.deleted', event, subscription);
			break;
		}

		case 'customer.subscription.updated': {
			const subscription2 = event.data.object;
			console.log('customer.subscription.deleted', event, subscription2);
			break;
		}

		default:
			console.log(`Unhandled event type ${event.type}`);
	}

	return new Response(JSON.stringify({ received: true }), {
		headers: { 'Content-type': 'application/json' }
	});
}

addEventListener('fetch', (event) => {
	event.respondWith(handleRequest(event.request));
});
