[简体中文](README.zh-CN.md)

# AI Image Generation with Cloudflare Workers

This is a Text-to-Image application built with Cloudflare Workers and Workers AI. Users can input a prompt, select a model, and the application will automatically optimize and translate the prompt into English to generate a corresponding image.

---

## Features

- **Multi-Model Selection**: Supports switching between multiple Text-to-Image models, such as Stable Diffusion XL, DreamShaper, etc.
- **Intelligent Prompt Optimization**: Uses the Llama 3 Large Language Model to automatically optimize and translate user input into high-quality English prompts, preserving stylistic details like "anime style".
- **Content Moderation**: Detects and provides warnings for content that may violate usage policies on the frontend.
- **Multi-Language UI**: Supports both Simplified Chinese and English interfaces, with auto-detection based on browser settings.
- **Light/Dark Mode**: Supports theme switching and remembers the user's preference.
- **Responsive Design**: The interface displays well on devices of different sizes.

---

## Tech Stack

- **[Cloudflare Workers](https://workers.cloudflare.com/)**: Backend runtime environment.
- **[Cloudflare Workers AI](https://developers.cloudflare.com/workers-ai/)**: Provides Text-to-Image, Translation, and Prompt Optimization.
- **[Wrangler](https://developers.cloudflare.com/workers/wrangler/)**: CLI tool for Cloudflare Workers.
- **HTML / CSS / JavaScript**: Frontend interface.

---

## How to Deploy

1.  **Clone the project**
    ```bash
    git clone [Your-Repo-URL]
    cd [Your-Repo-Directory]
    ```

2.  **Install dependencies**
    Wrangler is the only dependency. You can install it globally via npm.
    ```bash
    npm install -g wrangler
    ```

3.  **Configure `wrangler.toml`**
    Open the `wrangler.toml` file and fill in your own Cloudflare `account_id`.
    ```toml
    name = "workers-ai"
    main = "src/index.js"
    compatibility_date = "2024-01-01"
    account_id = "YOUR_ACCOUNT_ID" # <-- Replace this

    [ai]
    binding = "AI"
    ```

4.  **Deploy**
    ```bash
    wrangler deploy
    ```

After successful deployment, Wrangler will output your application's URL in the command line.
