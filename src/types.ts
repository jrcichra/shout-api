export type ShoutRequest = {
    url: string;           // The URL to store
    ttl?: number;           // TTL in seconds
    delUUID?: string;      // The UUID of the delete request
}

export type ShoutKV = {
    url: string;        // The URL to store
    ttl?: number;        // TTL in seconds
    created: number;    // When this was created
    delUUID: string;    // UUID given to the user so they can prematurely delete it
}

