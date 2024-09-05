/**
 * @param {Request} request
 */
export async function POST(request) {
	try {
		const token = await request.text();
		const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
			method: "POST",
			body: JSON.stringify({ response: token, secret: process.env.RECAPTCHA_KEY }),

		});
		return new Response(await response.text());

	} catch (error) {
		return new Response(error.message, { status: 400 });
	}
}