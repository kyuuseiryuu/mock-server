/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `wrangler dev src/index.ts` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `wrangler publish src/index.ts --name my-worker` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */
import { mock } from "mockjs";

export interface Env {
	// Example binding to KV. Learn more at https://developers.cloudflare.com/workers/runtime-apis/kv/
	// MY_KV_NAMESPACE: KVNamespace;
	//
	// Example binding to Durable Object. Learn more at https://developers.cloudflare.com/workers/runtime-apis/durable-objects/
	// MY_DURABLE_OBJECT: DurableObjectNamespace;
	//
	// Example binding to R2. Learn more at https://developers.cloudflare.com/workers/runtime-apis/r2/
	// MY_BUCKET: R2Bucket;
}

export default {
	async fetch(
		request: Request,
		env: Env,
		ctx: ExecutionContext
	): Promise<Response> {
		const defaultHeader = {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'GET,POST,HEAD,OPTIONS',
			'Access-Control-Allow-Headers': request.headers.get('Access-Control-Request-Headers') || '',
		}
		try {
			const str = request.headers.get('Mock-Schema-Base64') || '';
			const schema = JSON.parse(atob(str))
			const timeout = Number(request.headers.get('__timeout') ?? 0);
			await new Promise(resolve => setTimeout(resolve, timeout));
			return new Response(JSON.stringify({
				__schema__: schema,
				...mock(schema),
			}), {
				headers: {
					...defaultHeader,
				}
			});
		} catch (e: any) {
			return new Response(JSON.stringify({
				error: e.message,
				example: {
					mockjs: 'http://mockjs.com/examples.html',
					'headers': {
						'Mock-Schema-Base64': btoa(JSON.stringify({'result|10': [{ id: '@uuid()', name: '@name()' }]}))
					},
					'optinal-headers': {
						'__timeout': 1000
					}
				}
			}), {
				headers: {
					...defaultHeader,
				},
			});
		}
	},
};
