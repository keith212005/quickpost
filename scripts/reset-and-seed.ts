import { config } from 'dotenv';
config({ path: '.env.local' });
import { execSync } from 'child_process';

function run(command: string) {
  console.log(`\n▶️ Running: ${command}`);
  execSync(command, { stdio: 'inherit' });
}

async function main() {
  console.log(
    '🧹 Resetting entire Prisma database and reapplying migrations...\n',
  );

  try {
    // Step 1: Drop the database
    console.log('Step 1: Dropping the database...');
    run('npx prisma migrate reset --skip-seed');

    // Step 1.5: Push the schema and create tables
    console.log('✅ Step 1.5 complete: Running db push to create tables...');
    run('npx prisma db push');

    // Step 2: Seed the database
    console.log('✅ Step 2: Seeding the database...');
    run('npx prisma db seed');

    console.log(
      '\n✅ Done! Database dropped, migrations reapplied, and seed executed successfully.',
    );
  } catch (error) {
    console.error('\n❌ Error during full reset and seed:');
    console.error(error);
    process.exit(1);
  }
}

main();
