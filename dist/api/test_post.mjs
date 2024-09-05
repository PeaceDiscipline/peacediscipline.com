/**
 * @param {Request} request
 */
export function POST(request) {
	return new Response(`Hello from ${process?.env?.VERCEL_REGION}. That was a post request.`);
}