import PocketBase from 'pocketbase';

const POCKETBASE_URL = import.meta.env.VITE_POCKETBASE_URL
const POCKETBASE_LOG = import.meta.env.VITE_POCKETBASE_LOG
const POCKETBASE_PWD = import.meta.env.VITE_POCKETBASE_PWD

const pb = new PocketBase(POCKETBASE_URL);

const authData = await pb.admins.authWithPassword(POCKETBASE_LOG, POCKETBASE_PWD);

export default pb
