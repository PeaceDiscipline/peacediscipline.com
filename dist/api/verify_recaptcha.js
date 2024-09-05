/**
 * @param {Request} request
 */
export async function POST(request) {
	try {
		const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
			method: "POST",
			headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
			body: new URLSearchParams({
				secret: process.env.RECAPTCHA_KEY,
				response: await request.text()
			}),

		});
		return new Response(await response.text());

	} catch (error) {
		return new Response(error.message, { status: 400 });
	}
}

export const config = {
	runtime: 'edge',
};