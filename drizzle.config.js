/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.js",
    dialect: 'postgresql',
    dbCredentials: {
      url:"postgresql://a-mock-interview_owner:M5gDVFH3cBPl@ep-wispy-lab-a1alho1g.ap-southeast-1.aws.neon.tech/a-mock-interview?sslmode=require"
    }
  };