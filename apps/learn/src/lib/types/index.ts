// Knowledge Archive Types
export interface KnowledgeItem {
  id: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  isPinned: boolean;
}

export interface KnowledgeCategory {
  id: string;
  name: string;
  icon: string;
  color: string;
}

// Interview Prep Types
export interface InterviewQuestion {
  id: string;
  question: string;
  answer: string;
  category: InterviewCategory;
  difficulty: Difficulty;
  tags: string[];
  isFavorite: boolean;
  practiceCount: number;
  lastPracticed?: Date;
  createdAt: Date;
}

export type InterviewCategory =
  | "frontend"
  | "backend"
  | "algorithm"
  | "system-design"
  | "behavioral";
export type Difficulty = "easy" | "medium" | "hard";

export const INTERVIEW_CATEGORIES: Record<
  InterviewCategory,
  { label: string; icon: string; color: string }
> = {
  frontend: { label: "前端", icon: "Monitor", color: "text-blue-500" },
  backend: { label: "后端", icon: "Server", color: "text-green-500" },
  algorithm: { label: "算法", icon: "Binary", color: "text-purple-500" },
  "system-design": { label: "系统设计", icon: "Network", color: "text-orange-500" },
  behavioral: { label: "行为面试", icon: "Users", color: "text-pink-500" },
};

export const DIFFICULTY_CONFIG: Record<
  Difficulty,
  { label: string; color: string; bgColor: string }
> = {
  easy: { label: "简单", color: "text-green-600 dark:text-green-400", bgColor: "bg-green-500/10" },
  medium: {
    label: "中等",
    color: "text-yellow-600 dark:text-yellow-400",
    bgColor: "bg-yellow-500/10",
  },
  hard: { label: "困难", color: "text-red-600 dark:text-red-400", bgColor: "bg-red-500/10" },
};

// Study Plan Types
export interface StudyPlan {
  id: string;
  title: string;
  description: string;
  startDate: Date;
  endDate?: Date;
  goals: StudyGoal[];
  checkIns: CheckIn[];
  isActive: boolean;
  createdAt: Date;
}

export interface StudyGoal {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  order: number;
}

export interface CheckIn {
  id: string;
  date: Date;
  content: string;
  duration: number; // in minutes
  mood: Mood;
}

export type Mood = "great" | "good" | "okay" | "tired" | "struggling";

export const MOOD_CONFIG: Record<Mood, { emoji: string; label: string; color: string }> = {
  great: { emoji: "🔥", label: "状态极佳", color: "text-green-500" },
  good: { emoji: "😊", label: "状态不错", color: "text-blue-500" },
  okay: { emoji: "😐", label: "一般般", color: "text-yellow-500" },
  tired: { emoji: "😴", label: "有点累", color: "text-orange-500" },
  struggling: { emoji: "😵", label: "很艰难", color: "text-red-500" },
};

// Dashboard Stats
export interface DashboardStats {
  totalKnowledge: number;
  totalQuestions: number;
  activePlans: number;
  todayCheckIn: boolean;
  streakDays: number;
  practiceToday: number;
}
