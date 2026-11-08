import { searchRecords } from '../lib/posts';
export async function GET() { return new Response(JSON.stringify(await searchRecords()),{headers:{'Content-Type':'application/json; charset=utf-8'}}); }
