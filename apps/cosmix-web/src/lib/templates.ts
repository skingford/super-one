import type { Template } from "@super-one/cosmix-types";

export const DEFAULT_TEMPLATES: Template[] = [
  {
    id: "campus-revenge",
    name: "逆袭打脸",
    category: "campus",
    description: "校园霸凌后的华丽逆袭，打脸反转的爽文套路",
    promptTemplate: `你是一位擅长校园爽文的作家。请根据以下创意生成一篇校园逆袭打脸文：

创意：{{idea}}

要求：
1. 主角开场受欺负/被看不起
2. 中间展现隐藏实力或获得机遇
3. 高潮部分华丽打脸，让看不起主角的人目瞪口呆
4. 结尾意犹未尽，留有悬念
5. 字数约 2000 字
6. 语言生动，节奏紧凑`,
    exampleOutput: "示例：被全班嘲笑的转学生，竟然是隐藏的学霸...",
    tags: ["校园", "逆袭", "打脸", "爽文"],
    isActive: true,
    usageCount: 0,
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-01T00:00:00Z",
  },
  {
    id: "campus-romance",
    name: "校花倒追",
    category: "campus",
    description: "高冷校花主动倒追普通男生的甜蜜故事",
    promptTemplate: `你是一位擅长校园甜宠文的作家。请根据以下创意生成一篇校花倒追文：

创意：{{idea}}

要求：
1. 开场设置校花和男主的初次邂逅
2. 校花因某个契机对男主产生好感
3. 校花开始各种暗示/明示追求
4. 男主从懵懂到心动的变化
5. 字数约 2000 字
6. 甜度适中，有撒糖有心动`,
    exampleOutput: "示例：全校最高冷的校花，每天给我带早餐...",
    tags: ["校园", "甜宠", "恋爱", "校花"],
    isActive: true,
    usageCount: 0,
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-01T00:00:00Z",
  },
  {
    id: "sweet-childhood",
    name: "青梅竹马",
    category: "sweet",
    description: "从小一起长大的两人终于互通心意",
    promptTemplate: `你是一位擅长甜宠文的作家。请根据以下创意生成一篇青梅竹马文：

创意：{{idea}}

要求：
1. 回忆小时候的温馨片段
2. 长大后的重逢或关系变化
3. 双向暗恋的微妙心理
4. 捅破窗户纸的甜蜜时刻
5. 字数约 2000 字
6. 温馨治愈，青春感满满`,
    exampleOutput: "示例：邻家的他，从小说要娶我当老婆...",
    tags: ["甜宠", "青梅竹马", "暗恋", "温馨"],
    isActive: false, // Growth phase
    usageCount: 0,
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-01T00:00:00Z",
  },
];

export function getTemplateById(id: string): Template | undefined {
  return DEFAULT_TEMPLATES.find((t) => t.id === id);
}

export function getActiveTemplates(): Template[] {
  return DEFAULT_TEMPLATES.filter((t) => t.isActive);
}
