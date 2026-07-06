const { Client } = require('pg');

const regions = [
  'ap-south-1', 'ap-southeast-1', 'ap-southeast-2', 'ap-northeast-1', 'ap-northeast-2',
  'us-east-1', 'us-east-2', 'us-west-1', 'us-west-2',
  'eu-west-1', 'eu-west-2', 'eu-central-1',
  'sa-east-1', 'ca-central-1'
];

const password = 'iloveammu199';
const projectRef = 'xmexlnoscozqhuxthpyu';

async function tryConnect(region) {
  const url = `postgresql://postgres.${projectRef}:${password}@aws-0-${region}.pooler.supabase.com:6543/postgres`;
  const client = new Client({ connectionString: url, connectionTimeoutMillis: 5000 });
  try {
    await client.connect();
    await client.end();
    return url;
  } catch (err) {
    if (err.message && err.message.includes('password authentication failed')) {
      // password failed but it hit the right DB instance
      return url;
    }
    // console.log(region, err.message);
    return null;
  }
}

async function main() {
  console.log("Scanning...");
  for (const region of regions) {
    // console.log(`Trying ${region}...`);
    const successUrl = await tryConnect(region);
    if (successUrl) {
      console.log('SUCCESS_URL=' + successUrl);
      process.exit(0);
    }
  }
  console.log('Not found');
}

main();
