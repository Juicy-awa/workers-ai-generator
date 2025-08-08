[English](README.md)

# AI 文生图 (使用 Cloudflare Workers)

这是一个基于 Cloudflare Workers 和 Workers AI 构建的文生图应用。用户可以输入提示词，选择模型，应用会自动将提示词优化并翻译成英文，然后生成对应的图片。

---

## 功能

- **多模型选择**: 支持在多个文生图模型之间切换，如 Stable Diffusion XL, DreamShaper 等。
- **智能提示词优化**: 使用 Llama 3 大语言模型自动将用户输入优化和翻译为高质量的英文提示词，并能保留“动漫风”等风格化描述。
- **内容安全审查**: 在前端检测并提示可能违反使用政策的内容。
- **多语言界面**: 支持简体中文和英文界面，并能根据浏览器设置自动选择语言。
- **浅色/深色模式**: 支持主题切换，并能记忆用户的选择。
- **响应式设计**: 界面在不同尺寸的设备上都能良好显示。

---

## 技术栈

- **[Cloudflare Workers](https://workers.cloudflare.com/)**: 后端逻辑运行环境。
- **[Cloudflare Workers AI](https://developers.cloudflare.com/workers-ai/)**: 提供文生图、翻译和提示词优化功能。
- **[Wrangler](https://developers.cloudflare.com/workers/wrangler/)**: Cloudflare Workers 的命令行工具。
- **HTML / CSS / JavaScript**: 前端界面。

---

## 如何部署

1.  **克隆项目**
    ```bash
    git clone https://github.com/Juicy-awa/workers-ai-generator.git
    cd workers-ai-generator
    ```

2.  **安装依赖**
    Wrangler 是唯一的依赖，你可以通过 npm 全局安装。
    ```bash
    npm install -g wrangler
    ```

3.  **配置 `wrangler.toml`**
    打开 `wrangler.toml` 文件，填入你自己的 Cloudflare `account_id`。
    ```toml
    name = "workers-ai"
    main = "src/index.js"
    compatibility_date = "2024-01-01"
    account_id = "YOUR_ACCOUNT_ID" # <-- 替换这里

    [ai]
    binding = "AI"
    ```

4.  **部署**
    ```bash
    wrangler deploy
    ```

部署成功后，Wrangler 会在命令行中输出你的应用 URL。
