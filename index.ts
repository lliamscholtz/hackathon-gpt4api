import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

async function chat(prompt: string) {
    const response = await openai.chat.completions.create({
        messages: [{ role: 'user', content: prompt }],
        model: 'gpt-4',
    });

    return response.choices[0].message.content;
}

Bun.serve({
    port: 8080,
    hostname: '0.0.0.0',
    async fetch(req) {
        const url = new URL(req.url);

        if (url.pathname === '/' && req.method === 'POST') {
            const json = (await (req.json() as Promise<{ prompt: string }>)) || {};

            console.log(
                '[+]',
                new Date().toLocaleString('en-ZA'),
                req.method,
                url.pathname,
                JSON.stringify(json)
            );

            const response = await chat(json.prompt);

            return new Response(response);
        }

        return new Response('404!');
    },
});

console.log('Server started on http://0.0.0.0:8080 🚀');
