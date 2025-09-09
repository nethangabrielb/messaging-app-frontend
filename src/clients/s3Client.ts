import { S3Client } from "@aws-sdk/client-s3";

export const s3Client = new S3Client({
  region: "apac",
  endpoint: `https://${
    import.meta.env.VITE_R2_ACCOUNT_ID
  }.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: import.meta.env.VITE_R2_ACCESS_KEY_ID,
    secretAccessKey: import.meta.env.VITE_R2_SECRET_ACCESS_KEY,
  },
});
