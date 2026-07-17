import 'dotenv/config';
import { defineConfig, env } from 'prisma/config';

export default defineConfig({
  schema: 'prisma/schema.prisma',
  datasource: {
    // We tell the CLI to strictly use the DIRECT_URL for running migrations
    url: env('DIRECT_URL'), 
  },
});