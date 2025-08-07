import indexHtml from './index.html';

export default {
  async fetch(request, env) {
    if (request.method === 'POST') {
      return this.handlePostRequest(request, env);
    } else {
      return this.handleGetRequest();
    }
  },

  async handleGetRequest() {
    return new Response(indexHtml, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
      },
    });
  },

  async handlePostRequest(request, env) {
    try {
      const { prompt, model } = await request.json();

      if (!prompt || !model) {
        return new Response('Prompt and model are required', { status: 400 });
      }

      // 使用 LLM 来优化和翻译 prompt
      const messages = [
        {
          role: 'system',
          content: 'You are an expert prompt engineer for AI image generation models. Your task is to translate and enhance user prompts. Translate the user\'s input to English. Preserve and clarify all stylistic details. The final output MUST be only the powerful English prompt string, without any of your own explanations, prefixes, or conversational text.'
        },
        { role: 'user', content: prompt }
      ];

      const llmResponse = await env.AI.run(
        '@cf/meta/llama-3-8b-instruct',
        { messages, stream: false } // stream: false to get the full response at once
      );

      let englishPrompt = llmResponse.response.trim();

      // 后处理：尝试提取引号内的内容，以防模型仍然添加解释
      const quoteMatch = englishPrompt.match(/"(.*?)"/);
      if (quoteMatch && quoteMatch[1]) {
        englishPrompt = quoteMatch[1];
      }

      const inputs = {
        prompt: englishPrompt,
      };

      const imageResponse = await env.AI.run(model, inputs);

      const headers = new Headers({
        'Content-Type': 'image/png',
        'X-Translated-Prompt': encodeURIComponent(englishPrompt)
      });

      return new Response(imageResponse, { headers });
    } catch (error) {
      console.error('Error generating image:', error);
      const errorMessage = String(error);
      if (errorMessage.includes('rate limit') || errorMessage.includes('quota')) {
        return new Response('已达到使用限制，请稍后再试。', { status: 429 });
      }
      return new Response('生成图片时发生内部错误。', { status: 500 });
    }
  },
};
