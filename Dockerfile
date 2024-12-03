FROM node:20-alpine

RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY . .

ARG DATABASE_URI
ARG DATABASE_SECRET
ARG PAYLOAD_SECRET
ARG NEXT_PUBLIC_PUBLIC_URL
ARG PAYLOAD_URL
ARG S3_ENDPOINT
ARG S3_ACCESS_KEY_ID
ARG S3_SECRET_ACCESS_KEY
ARG S3_BUCKET
ARG S3_REGION
ARG RESEND_API_KEY
ARG RESEND_SENDER_EMAIL
ARG RESEND_SENDER_NAME
ARG OPENAPI_KEY
ARG SUBSCRIPTION_PLAN

ENV DATABASE_URI=$DATABASE_URI
ENV DATABASE_SECRET=$DATABASE_SECRET
ENV PAYLOAD_SECRET=$PAYLOAD_SECRET
ENV NEXT_PUBLIC_PUBLIC_URL=$NEXT_PUBLIC_PUBLIC_URL
ENV PAYLOAD_URL=$PAYLOAD_URL
ENV S3_ENDPOINT=$S3_ENDPOINT
ENV S3_ACCESS_KEY_ID=$S3_ACCESS_KEY_ID
ENV S3_SECRET_ACCESS_KEY=$S3_SECRET_ACCESS_KEY
ENV S3_BUCKET=$S3_BUCKET
ENV S3_REGION=$S3_REGION
ENV RESEND_API_KEY=$RESEND_API_KEY
ENV RESEND_SENDER_EMAIL=$RESEND_SENDER_EMAIL
ENV RESEND_SENDER_NAME=$RESEND_SENDER_NAME
ENV OPENAPI_KEY=$OPENAPI_KEY
ENV SUBSCRIPTION_PLAN=$SUBSCRIPTION_PLAN

ENV NODE_ENV production

RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i @libsql/linux-x64-musl && pnpm i --frozen-lockfile && pnpm run build; \
  else echo "Lockfile not found." && exit 1; \
  fi

EXPOSE 3000

ENV PORT 3000

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/next-config-js/output

# CMD HOSTNAME="0.0.0.0" node server.js
CMD ["pnpm", "start"]
