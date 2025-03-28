FROM denoland/deno:alpine-2.2.6

WORKDIR /app

COPY . .

EXPOSE 8888

CMD [ "deno", "run", "-A", "main.ts" ]