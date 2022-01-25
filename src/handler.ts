import { del } from "./del";
import { get } from "./get";
import { post } from "./post";

export async function handleRequest(request: Request): Promise<Response> {
  let response: Response;

  const url = new URL(request.url);

  // serve a blank page at path / and favicon.ico
  if (request.method === "GET" && (url.pathname === '/' || url.pathname === '/favicon.ico')) {
    response = new Response('', {
      status: 200,
      headers: { 'Content-Type': 'text/html' }
    });
  } else if (request.method === "POST") {
    response = await post(request);
  } else if (request.method === "GET") {
    response = await get(request);
  } else if (request.method === "DELETE") {
    response = await del(request);
  } else {
    response = new Response(JSON.stringify({ error: 'Invalid request method' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  return response;
}
