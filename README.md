# shout-api
Like [Yellkey](https://yellkey.com) but open source and serverless. Host your own short-term link shortener (without a server)

# Info
+ This repo contains the serverless API for shout. It runs on Cloudflare Workers and leverages Cloudflare Workers KV

# Features
+ `POST` a URL and optional TTL to get a dictionary word
+ `GET` a dictionary word and redirect to the URL
+ `DELETE` a dictionary word to remove it before it expires 