import { ShoutKV } from "./types";
declare var SHOUT: KVNamespace;

export async function get(request: Request): Promise<Response> {
    // get the route from the url
    const word = new URL(request.url).pathname.split('/').pop();
    if (!word) {
        return new Response(JSON.stringify({ error: 'Invalid request' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
        });
    }
    const data = await SHOUT.get(word);
    if (data) {
        const dataKV: ShoutKV = JSON.parse(data);
        // redirect to the url stored in the data
        return new Response(JSON.stringify({ url: dataKV.url }), {
            status: 302,
            headers: { 'Location': dataKV.url }
        });

    } else {
        return new Response(JSON.stringify({ error: `${word} not found` }), {
            status: 404,
            headers: { 'Content-Type': 'application/json' }
        });
    }

}