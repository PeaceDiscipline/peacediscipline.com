/**
 * @param {Request} request
 */
export async function POST(request) {
	try {
		const { token } = await request.json();
		const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
			method: "POST",
			body: JSON.stringify({ response: token, secret: process.env.RECAPTCHA_KEY }),

		});
		const response_json = await response.json();
		return new Response(JSON.stringify({...response_json, token}));

	} catch (error) {
		return new Response(error.message, { status: 400 });
	}
}

export const config = {
	runtime: 'edge',
};