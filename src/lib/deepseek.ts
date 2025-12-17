import { z } from "zod";

const DeepSeekResponseSchema = z.object({
  spanish_legal_text: z.string().min(1),
  native_user_translation: z.string().min(1),
});

export type DeepSeekResult = z.infer<typeof DeepSeekResponseSchema>;

export async function generateDualLanguageLegalText(input: {
  userLanguage: string;
  facts: string;
  useCaseHint?: string;
}): Promise<DeepSeekResult> {
  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) throw new Error("Missing env: DEEPSEEK_API_KEY");

  const baseUrl = process.env.DEEPSEEK_BASE_URL ?? "https://api.deepseek.com";
  const url = `${baseUrl.replace(/\/$/, "")}/chat/completions`;

  const system = [
    "Ты — испанский юрист.",
    "Твоя задача — принять жалобу на языке пользователя, извлечь факты и составить формальную претензию на испанском.",
    "Пиши как готовый документ для отправки: без плейсхолдеров вида [Nombre], [Dirección] и т.п.",
    "Если каких-то данных не хватает — пропусти строку или используй 'N/D' (но НЕ добавляй плейсхолдеры в скобках).",
    "Верни СТРОГО JSON-объект с полями:",
    '"spanish_legal_text" (string) и "native_user_translation" (string).',
    "Никаких дополнительных ключей, текста вне JSON или markdown.",
  ].join(" ");

  const user = [
    `Язык пользователя: ${input.userLanguage}`,
    input.useCaseHint ? `Контекст/кейс: ${input.useCaseHint}` : "",
    "Факты:",
    input.facts,
  ]
    .filter(Boolean)
    .join("\n");

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: process.env.DEEPSEEK_MODEL ?? "deepseek-chat",
      temperature: 0.2,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
    }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`DeepSeek error: HTTP ${res.status} ${text}`);
  }

  const payload = (await res.json()) as any;
  const content = payload?.choices?.[0]?.message?.content;
  if (typeof content !== "string" || !content.trim()) {
    throw new Error("DeepSeek error: empty message content");
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(content);
  } catch {
    throw new Error("DeepSeek error: content is not valid JSON");
  }

  return DeepSeekResponseSchema.parse(parsed);
}

