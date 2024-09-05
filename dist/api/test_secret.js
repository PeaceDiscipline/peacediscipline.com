/**
 * @param {Request} request
 */
export async function POST(request) {
	return new Response(JSON.stringify({
		test_secret: process.env.TEST_SECRET,
		region: process.env.VERCEL_REGION
	}));
}