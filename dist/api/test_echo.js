/**
 * @param {Request} request
 */
export async function POST(request) {
	return new Response(JSON.stringify({
		echo: await request.text(),
		region: process.env.VERCEL_REGION,
		s: `Test env: ${process.env.TEST_KEY}`,
	}));
}

export const config = {
	runtime: 'edge',
};