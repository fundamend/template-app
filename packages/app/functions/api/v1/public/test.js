export async function onRequest() {
	return new Response(JSON.stringify({ message: 'Hello, world!' }));
}
