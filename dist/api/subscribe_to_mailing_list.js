export const config = { runtime: "edge" };

/** @param {Request} request */
export async function POST(request) {
	const data = await request.formData();
	const name = data.get("name");
	const email = data.get("email")?.toLowerCase();
	const token = data.get("g-recaptcha-response");
	// https://vercel.com/docs/edge-network/headers#x-forwarded-for
	const ip_address = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || null;
	if (!EMAIL_REGEX.test(email)) {
		console.warn(`Invalid email address: name: ${name}, email: ${email}, ip address: ${ip_address}`);
		return response("Invalid email", "Please use a valid email address.", 400);
	}
	if (name?.length < 2 || name?.length > 50) {
		console.warn(`Invalid name (length): name: ${name}, email: ${email}, ip address: ${ip_address}`);
		return response("Invalid name", "Please use a name between 2 and 50 characters long.", 400);
	}
	if (/\d/.test(name)) {
		console.warn(`Invalid name (numbers): name: ${name}, email: ${email}, ip address: ${ip_address}`);
		return response("Invalid name", "Please use a name that does not contain numbers.", 400);
	}
	if (!(await verify_captcha(token))) {
		console.warn(`Invalid captcha token: name: ${name}, email: ${email}, ip address: ${ip_address}, token: ${token}`);
		return response("Invalid captcha token", "Don't be suspicious.", 400);
	}
	const status = await send_to_getresponse(name, email, ip_address);
	switch (status) {
		case 200:
		case 201:
		case 202: return response("Success", "You have successfully subscribed!");
		case 400: return response("Bad request", "Something went wrong, please try again.", status);
		case 401: return response("Unauthorized", "Looks like our API key expired. Try again in a few days.", status);
		case 409: return response("Success", "It looks like you are already subscribed!", 200);
		case 429: return response("Too many requests", "We are experiencing high loads at the moment. Please wait a few minutes and try again.", status);
		default: return response("Internal server error", "Something went wrong on our side, please try again.", status);
	}
}

function response(response, message, status=200) {
	return new Response(JSON.stringify({response, message}), { status });
}

// https://emailregex.com/
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

/**
 * Check if the captcha token is valid
 * @param {string} token
 */
async function verify_captcha(token) {
	try {
		const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
			method: "POST",
			headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
			body: new URLSearchParams({
				secret: process.env.RECAPTCHA_KEY,
				response: token
			}),

		});
		const data = await response.json();
		console.log(data);
		return data.success;

	} catch (error) {
		console.log(error);
		return false;
	}
}

/**
 *
 * @param {string} name
 * @param {string} email
 * @param {string?} ip_address
 */
async function send_to_getresponse(name, email, ip_address=null) {
	const body = {
		name: name,
		email: email,
		campaign: {
			campaignId: process.env.GETRESPONSE_CAMPAIGN_ID
		}
	};
	if (ip_address) {
		body.ipAddress = ip_address;
	}
	try {
		const response = await fetch("https://api.getresponse.com/v3/contacts", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"X-Auth-Token": process.env.GETRESPONSE_API_KEY
			},
			body: JSON.stringify(body)
		});
		return response.status;
	}
	catch (error) {
		console.log(error);
		return 500;
	}
}
