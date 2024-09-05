/**
 * @param {Request} request
 */
export async function POST(request) {
	return new Response(await request.text());
}