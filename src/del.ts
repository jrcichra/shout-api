import { ShoutDeleteRequest } from "./types";
declare var SHOUT: KVNamespace;

export async function del(request: Request): Promise<Response> {

    let body: ShoutDeleteRequest;
    try {
        body = await request.json();
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    // make sure the request has a delete UUID
    if (!body.delUUID) {
        return new Response(JSON.stringify({ error: 'Missing required parameters' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    // make sure the key has the UUID they provided
    const shoutjson: string | null = await SHOUT.get(body.word);
    if (!shoutjson) {
        return new Response(JSON.stringify({ error: 'Not found' }), {
            status: 404,
            headers: { 'Content-Type': 'application/json' }
        });
    }
    const shoutkv: ShoutDeleteRequest = JSON.parse(shoutjson);
    if (shoutkv.delUUID !== body.delUUID) {
        return new Response(JSON.stringify({ error: 'Invalid UUID' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
        });
    }


    // UUID is good, delete the key

    await SHOUT.delete(body.word);
    return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    });
}