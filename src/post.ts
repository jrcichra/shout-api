import { ShoutKV, ShoutRequest } from "./types";
import { getRandomWord } from "./word";
declare var SHOUT: KVNamespace;

const MAX_TTL = 60 * 60 * 24; // 1 day
const DEFAULT_TTL = 60 * 5 // 5 minutes
export async function post(request: Request): Promise<Response> {
    let body: ShoutRequest;
    try {
        body = await request.json();
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    // Check the request body for required parameters
    if (!body.url) {
        return new Response(JSON.stringify({ error: 'Missing URL' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    // make sure the duration request is less than or equal to one day
    if (body.ttl && body.ttl > MAX_TTL) {
        return new Response(JSON.stringify({
            error: `Duration must be less than or equal to ${MAX_TTL} seconds`
        }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    // the url must start with http:// or https://
    if (!body.url.startsWith('http://') && !body.url.startsWith('https://')) {
        return new Response(JSON.stringify({ error: 'Invalid URL' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    const shoutkv: ShoutKV = {
        url: body.url,
        ttl: body.ttl,
        created: Date.now(),
        delUUID: crypto.randomUUID(),
    }

    const word = await getRandomWord();
    if (!word) {
        return new Response(JSON.stringify({ error: 'Failed to get random word' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
    const ttl = body.ttl || DEFAULT_TTL;
    await SHOUT.put(word, JSON.stringify(shoutkv), { expirationTtl: ttl });
    return new Response(JSON.stringify({ success: true, word: word, ttl: ttl }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    });
}