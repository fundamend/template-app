async function handleRequest(request) {
	console.log(JSON.stringify(request));
	return new Response(JSON.stringify({ received: true }), {
		headers: { 'Content-type': 'application/json' }
	});
}

addEventListener('fetch', (event) => {
	event.respondWith(handleRequest(event.request));
});
