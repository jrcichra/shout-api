# shout-api
Like [Yellkey](https://yellkey.com) but open source and serverless. Host your own short-term link shortener (without a server)

# Info
+ This repo contains the serverless API for shout. It runs on Cloudflare Workers and leverages Cloudflare Workers KV

# Features
+ `POST` a URL and optional TTL to get a dictionary word
+ `GET` a dictionary word and redirect to the URL
+ `DELETE` a dictionary word to remove it before it expires 

# Examples
+ `POST`:
```
curl --request POST \
  --url http://127.0.0.1:8787/ \
  --header 'Content-Type: application/json' \
  --data '{
	"url": "https://google.com"
}
```
+ `GET`:
```
curl http://127.0.0.1:8787/ephedraceae
```
+ `DELETE`:
```
curl --request DELETE \
  --url http://127.0.0.1:8787/ \
  --header 'Content-Type: application/json' \
  --data '{
	"word": "ephedraceae",
	"delUUID": "4229011a-aef0-40e8-b7a7-4f9532e6dbf2"
}
```
