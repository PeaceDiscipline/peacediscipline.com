/**
 * @param {Request} request
 */
export async function POST(request) {
	return new Response(JSON.stringify({
		s: `Test env: ${process.env.TEST_KEY}`,
		region: process.env.VERCEL_REGION
	}));
}

export const config = {
	runtime: 'edge',
};