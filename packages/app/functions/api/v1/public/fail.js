export async function onRequest() {
	callUndefinedFunction();
	return new Response('This should have failed');
}
