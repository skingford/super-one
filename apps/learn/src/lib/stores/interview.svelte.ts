import { storage, generateId } from "$lib/utils/storage";
import type { InterviewQuestion, InterviewCategory, Difficulty } from "$lib/types";

const STORAGE_KEY = "interview_questions";

class InterviewStore {
  questions = $state<InterviewQuestion[]>([]);
  isLoading = $state(true);
  searchQuery = $state("");
  selectedCategory = $state<InterviewCategory | null>(null);
  selectedDifficulty = $state<Difficulty | null>(null);
  showFavoritesOnly = $state(false);

  // Practice mode state
  practiceMode = $state(false);
  practiceQuestions = $state<InterviewQuestion[]>([]);
  currentPracticeIndex = $state(0);
  showAnswer = $state(false);

  get filteredQuestions() {
    let result = this.questions;

    if (this.selectedCategory) {
      result = result.filter((q) => q.category === this.selectedCategory);
    }

    if (this.selectedDifficulty) {
      result = result.filter((q) => q.difficulty === this.selectedDifficulty);
    }

    if (this.showFavoritesOnly) {
      result = result.filter((q) => q.isFavorite);
    }

    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase();
      result = result.filter(
        (q) =>
          q.question.toLowerCase().includes(query) ||
          q.answer.toLowerCase().includes(query) ||
          q.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    // Sort: favorites first, then by practiceCount (less practiced first)
    return result.sort((a, b) => {
      if (a.isFavorite !== b.isFavorite) return a.isFavorite ? -1 : 1;
      return a.practiceCount - b.practiceCount;
    });
  }

  get totalCount() {
    return this.questions.length;
  }

  get favoriteCount() {
    return this.questions.filter((q) => q.isFavorite).length;
  }

  get categoryStats(): Record<InterviewCategory, number> {
    const stats: Record<string, number> = {};
    for (const q of this.questions) {
      stats[q.category] = (stats[q.category] || 0) + 1;
    }
    return stats as Record<InterviewCategory, number>;
  }

  get difficultyStats(): Record<Difficulty, number> {
    const stats: Record<string, number> = { easy: 0, medium: 0, hard: 0 };
    for (const q of this.questions) {
      stats[q.difficulty] = (stats[q.difficulty] || 0) + 1;
    }
    return stats as Record<Difficulty, number>;
  }

  get currentPracticeQuestion(): InterviewQuestion | null {
    return this.practiceQuestions[this.currentPracticeIndex] || null;
  }

  get practiceProgress() {
    return {
      current: this.currentPracticeIndex + 1,
      total: this.practiceQuestions.length,
    };
  }

  async init() {
    this.isLoading = true;
    try {
      const questions = await storage.get<InterviewQuestion[]>(STORAGE_KEY);
      this.questions = questions || [];
    } finally {
      this.isLoading = false;
    }
  }

  async add(data: Omit<InterviewQuestion, "id" | "createdAt" | "practiceCount" | "isFavorite">) {
    const newQuestion: InterviewQuestion = {
      ...data,
      id: generateId(),
      createdAt: new Date(),
      practiceCount: 0,
      isFavorite: false,
    };
    this.questions = [newQuestion, ...this.questions];
    await this.persist();
    return newQuestion;
  }

  async update(id: string, data: Partial<Omit<InterviewQuestion, "id" | "createdAt">>) {
    const index = this.questions.findIndex((q) => q.id === id);
    if (index === -1) return null;

    this.questions[index] = {
      ...this.questions[index],
      ...data,
    };
    this.questions = [...this.questions];
    await this.persist();
    return this.questions[index];
  }

  async delete(id: string) {
    this.questions = this.questions.filter((q) => q.id !== id);
    await this.persist();
  }

  async toggleFavorite(id: string) {
    const q = this.questions.find((q) => q.id === id);
    if (q) {
      await this.update(id, { isFavorite: !q.isFavorite });
    }
  }

  getById(id: string) {
    return this.questions.find((q) => q.id === id);
  }

  // Practice mode methods
  startPractice(
    options: { category?: InterviewCategory; difficulty?: Difficulty; count?: number } = {}
  ) {
    let pool = [...this.questions];

    if (options.category) {
      pool = pool.filter((q) => q.category === options.category);
    }

    if (options.difficulty) {
      pool = pool.filter((q) => q.difficulty === options.difficulty);
    }

    // Shuffle and take count
    pool = this.shuffle(pool);
    const count = options.count || Math.min(10, pool.length);
    this.practiceQuestions = pool.slice(0, count);
    this.currentPracticeIndex = 0;
    this.showAnswer = false;
    this.practiceMode = true;
  }

  nextQuestion() {
    if (this.currentPracticeIndex < this.practiceQuestions.length - 1) {
      this.currentPracticeIndex++;
      this.showAnswer = false;
    }
  }

  prevQuestion() {
    if (this.currentPracticeIndex > 0) {
      this.currentPracticeIndex--;
      this.showAnswer = false;
    }
  }

  toggleAnswer() {
    this.showAnswer = !this.showAnswer;
  }

  async markPracticed() {
    const q = this.currentPracticeQuestion;
    if (q) {
      await this.update(q.id, {
        practiceCount: q.practiceCount + 1,
        lastPracticed: new Date(),
      });
    }
  }

  endPractice() {
    this.practiceMode = false;
    this.practiceQuestions = [];
    this.currentPracticeIndex = 0;
    this.showAnswer = false;
  }

  private shuffle<T>(array: T[]): T[] {
    const result = [...array];
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  }

  private async persist() {
    await storage.set(STORAGE_KEY, this.questions);
  }
}

export const interviewStore = new InterviewStore();
