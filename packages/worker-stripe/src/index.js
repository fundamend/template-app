/* global callUndefinedFunction, PRIVATE_STRIPE_CLI_WEBHOOK_SECRET, PRIVATE_STRIPE_SECRET_API_KEY, PUBLIC_ENVIRONMENT, PUBLIC_SENTRY_DSN */

import CrashReporter from '@template-app/adapter-crash-reporter-sentry';
import { version } from '../package.json';
import Stripe from 'stripe';

addEventListener('fetch', (event) => {
	const environment = PUBLIC_ENVIRONMENT;
	let crashReporter;

	async function handleRequest(request) {
		try {
			callUndefinedFunction();
			const stripe = Stripe(PRIVATE_STRIPE_SECRET_API_KEY, {
				httpClient: Stripe.createFetchHttpClient()
			});
			const cryptoProvider = Stripe.createSubtleCryptoProvider();
			const body = await request.text();
			const sig = request.headers.get('stripe-signature');
			const event = stripe.webhooks.constructEvent(
				body,
				sig,
				PRIVATE_STRIPE_CLI_WEBHOOK_SECRET,
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
		} catch (error) {
			if (environment != 'development') {
				if (!crashReporter) {
					crashReporter = new CrashReporter({
						dsn: PUBLIC_SENTRY_DSN,
						context: event,
						environment: environment,
						release: version
					});
				}
				crashReporter.captureException(error);
				return new Response(JSON.stringify({ received: true }), {
					headers: { 'Content-type': 'application/json' }
				});
			} else {
				throw error;
			}
		}
	}

	event.respondWith(handleRequest(event.request));
});
