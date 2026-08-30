
import { defineConfig, type Config } from 'drizzle-kit';

export const config: Config = {
  schema: './src/+rime.generated/schema.server.ts',
  out: './db',
  strict: false,
  dialect: 'sqlite',
  dbCredentials: {
    url: './db/embed-field.sqlite'
  }
};

export default defineConfig(config);
