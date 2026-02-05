# Technical Design

## Architecture Overview

```
super-one/
├── apps/
│   ├── cosmix-web/              # 用户端 (Next.js 15 + React 19)
│   │   ├── src/
│   │   │   ├── app/             # App Router
│   │   │   │   ├── layout.tsx
│   │   │   │   ├── page.tsx     # 首页/创作工作台
│   │   │   │   ├── drafts/      # 草稿列表
│   │   │   │   └── templates/   # 模板库
│   │   │   ├── components/
│   │   │   │   ├── editor/      # Tiptap 编辑器相关
│   │   │   │   ├── generation/  # AI 生成相关
│   │   │   │   ├── layout/      # 布局组件
│   │   │   │   ├── templates/   # 模板相关
│   │   │   │   └── ui/          # 基础 UI 组件
│   │   │   ├── hooks/           # 自定义 Hooks
│   │   │   ├── stores/          # Zustand stores
│   │   │   ├── lib/             # 工具函数
│   │   │   └── types/           # 类型定义
│   │   └── public/
│   │       └── sounds/          # 音效文件
│   │
│   └── cosmix-admin/            # 管理端 (Vue3 + Vite)
│       ├── src/
│       │   ├── views/           # 页面组件
│       │   │   ├── dashboard/
│       │   │   ├── templates/
│       │   │   ├── settings/
│       │   │   └── login/
│       │   ├── components/      # 组件
│       │   ├── stores/          # Pinia stores
│       │   ├── router/          # Vue Router
│       │   └── api/             # API 封装
│       └── public/
│
└── packages/
    ├── cosmix-types/            # 共享类型定义
    │   └── src/
    │       ├── api.ts           # API 请求/响应类型
    │       ├── content.ts       # 内容相关类型
    │       ├── template.ts      # 模板类型
    │       └── index.ts
    │
    ├── cosmix-api-client/       # API 客户端
    │   └── src/
    │       ├── client.ts        # HTTP 客户端
    │       ├── generation.ts    # AI 生成 API
    │       ├── templates.ts     # 模板 API
    │       └── index.ts
    │
    └── design-tokens/           # 设计变量
        └── src/
            ├── colors.ts        # 颜色变量
            ├── typography.ts    # 字体变量
            └── index.ts
```

## Key Components

### 1. StreamingText Component

流式文本渲染组件，实现打字机效果。

```tsx
interface StreamingTextProps {
  content: string;        // 累积的内容
  isStreaming: boolean;   // 是否正在流式输出
  speed?: number;         // 渲染速度 (可选)
}
```

**实现要点**:
- 使用 `requestAnimationFrame` 实现平滑渲染
- 光标闪烁使用 CSS animation
- 支持中断和恢复

### 2. Tiptap Editor

富文本编辑器，基于 Tiptap。

**配置的扩展**:
- StarterKit (基础功能)
- Placeholder (占位符)
- CharacterCount (字数统计)
- History (撤销/重做)

**自定义扩展**:
- AutoSave (自动保存)

### 3. Generation Store (Zustand)

```ts
interface GenerationState {
  status: 'idle' | 'generating' | 'completed' | 'error';
  content: string;
  progress: number;
  error: string | null;

  // Actions
  startGeneration: (idea: string, templateId: string) => Promise<void>;
  stopGeneration: () => void;
  reset: () => void;
}
```

### 4. Draft Store (Zustand)

```ts
interface Draft {
  id: string;
  title: string;
  content: string;
  templateId: string;
  createdAt: Date;
  updatedAt: Date;
}

interface DraftState {
  drafts: Draft[];
  currentDraftId: string | null;

  // Actions
  saveDraft: (draft: Partial<Draft>) => void;
  loadDraft: (id: string) => void;
  deleteDraft: (id: string) => void;
  autoSave: () => void;
}
```

## Data Flow

```
用户输入想法 → 选择模板 → 点击生成
                              ↓
                    API 调用 (SSE 连接)
                              ↓
                    StreamingText 实时渲染
                              ↓
                    生成完成 → 编辑器可编辑
                              ↓
                    自动保存到 localStorage
                              ↓
                    复制内容 → 手动发布
```

## API Contracts

### 生成内容 API

```
POST /api/v1/generate
Content-Type: application/json

Request:
{
  "idea": string,
  "templateId": string,
  "targetLength": number  // 目标字数
}

Response (SSE):
data: {"type": "token", "content": "..."}
data: {"type": "token", "content": "..."}
data: {"type": "done", "totalTokens": 1234}
```

### 模板列表 API

```
GET /api/v1/templates

Response:
{
  "templates": [
    {
      "id": "campus-revenge",
      "name": "逆袭打脸",
      "category": "校园爽文",
      "description": "...",
      "promptTemplate": "..."
    }
  ]
}
```

## Design Tokens

### Colors

```ts
export const colors = {
  primary: '#8B5CF6',     // 紫色 - AI/创意
  secondary: '#06B6D4',   // 青色 - 科技感
  accent: '#F59E0B',      // 橙色 - 活力/热门

  // 语义色
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',

  // 中性色
  gray: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    // ...
    900: '#111827',
  }
};
```

### Typography

```ts
export const typography = {
  fontFamily: {
    sans: 'Inter, system-ui, sans-serif',
    mono: 'JetBrains Mono, monospace',
  },
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
  }
};
```

## Performance Considerations

1. **流式渲染**: 使用 `requestAnimationFrame` 确保 60 FPS
2. **自动保存**: 使用 debounce (1s) 避免频繁写入
3. **草稿列表**: 虚拟化列表 (如超过 10 篇)
4. **Bundle 优化**: 代码分割，按需加载编辑器

## Security Considerations

1. **XSS 防护**: 使用 DOMPurify 消毒 HTML 内容
2. **CSRF**: API 调用携带 CSRF Token
3. **敏感词**: 前端显示检测结果，后端实际检测
