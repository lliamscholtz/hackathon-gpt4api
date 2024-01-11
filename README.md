1. Initialise the project

```
bun init
bun run --watch index.ts
```

2. Create an `.env` file

```
OPENAI_API_KEY = xxxx
```

3. Create a simple HTTP server

```
Bun.serve({
    port: 8080,
    hostname: 'localhost',

    fetch(req) {
        const url = new URL(req.url);
        if (url.pathname === '/') return new Response('Hello from Bun!');

        return new Response('404!');
    },
});
```

4. Install OpenAI Node API Library

```
bun install openai
```

5. Implement the chat completions API

```
import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

async function main() {
    const chatCompletion = await openai.chat.completions.create({
        messages: [{ role: 'user', content: 'Say this is a test' }],
        model: 'gpt-4',
    });

    const result = chatCompletion.choices[0].message.content;

    console.log(result);
}

main();
```

6. Put it all together

7. [Containerise!!!](https://bun.sh/guides/ecosystem/docker)

```
FROM --platform=linux/amd64 oven/bun

WORKDIR /app

COPY . .
RUN bun install --production

EXPOSE 8080

CMD ["bun", "run", "index.ts"]
```

8. Build and run

```
bun run build
bun run start
```
