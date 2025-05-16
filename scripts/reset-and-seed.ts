import { execSync } from 'child_process';

function run(command: string) {
  console.log(`\n▶️ Running: ${command}`);
  execSync(command, { stdio: 'inherit' });
}

async function main() {
  console.log('🧹 Resetting Prisma database and applying migrations...\n');

  try {
    // Step 1: Apply migrations and recreate the database
    run('npx prisma migrate dev --name init');

    // Step 2: Seed the database
    run('npx prisma db seed');

    console.log(
      '\n✅ Done! Database reset, migrations applied, and seed executed successfully.',
    );
  } catch (error) {
    console.error('\n❌ Error during reset/seed:');
    console.error(error);
    process.exit(1);
  }
}

main();
