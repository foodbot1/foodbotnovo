import PocketBase from 'pocketbase';

export const pb = new PocketBase('http://127.0.0.1:8090');

// Enable auto refresh of the auth store
pb.autoCancellation(false);