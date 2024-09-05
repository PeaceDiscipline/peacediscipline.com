/**
 * @param {Request} request
 */
export async function POST(request) {
	try {
		const response = await fetch('https://jsonplaceholder.typicode.com/todos/1')
		const body = await response.json();
		return new Response(JSON.stringify({request: await request.json(), response: body}));

	} catch (error) {
		return new Response(`ERROR: ${error.message}`, { status: 400 });
	}
}