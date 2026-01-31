import { storage, generateId } from "$lib/utils/storage";
import type { StudyPlan, StudyGoal, CheckIn, Mood } from "$lib/types";

const STORAGE_KEY = "study_plans";

class StudyStore {
  plans = $state<StudyPlan[]>([]);
  isLoading = $state(true);

  get activePlans() {
    return this.plans.filter((p) => p.isActive);
  }

  get completedPlans() {
    return this.plans.filter((p) => !p.isActive);
  }

  get todayCheckIns() {
    const today = new Date().toDateString();
    const checkIns: Array<CheckIn & { planId: string; planTitle: string }> = [];
    for (const plan of this.plans) {
      for (const checkIn of plan.checkIns) {
        if (new Date(checkIn.date).toDateString() === today) {
          checkIns.push({ ...checkIn, planId: plan.id, planTitle: plan.title });
        }
      }
    }
    return checkIns;
  }

  get hasCheckedInToday() {
    return this.todayCheckIns.length > 0;
  }

  get streakDays() {
    const allCheckIns = this.plans
      .flatMap((p) => p.checkIns)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    if (allCheckIns.length === 0) return 0;

    let streak = 0;
    let currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    // Check if checked in today
    const latestCheckIn = new Date(allCheckIns[0].date);
    latestCheckIn.setHours(0, 0, 0, 0);

    if (currentDate.getTime() - latestCheckIn.getTime() > 86400000) {
      return 0; // No check-in today or yesterday
    }

    const checkInDates = new Set(allCheckIns.map((c) => new Date(c.date).toDateString()));

    while (checkInDates.has(currentDate.toDateString())) {
      streak++;
      currentDate.setDate(currentDate.getDate() - 1);
    }

    return streak;
  }

  get totalStudyMinutes() {
    return this.plans.reduce((total, plan) => {
      return total + plan.checkIns.reduce((sum, c) => sum + c.duration, 0);
    }, 0);
  }

  async init() {
    this.isLoading = true;
    try {
      const plans = await storage.get<StudyPlan[]>(STORAGE_KEY);
      this.plans = plans || [];
    } finally {
      this.isLoading = false;
    }
  }

  async addPlan(data: Omit<StudyPlan, "id" | "createdAt" | "checkIns" | "isActive">) {
    const newPlan: StudyPlan = {
      ...data,
      id: generateId(),
      createdAt: new Date(),
      checkIns: [],
      isActive: true,
    };
    this.plans = [newPlan, ...this.plans];
    await this.persist();
    return newPlan;
  }

  async updatePlan(id: string, data: Partial<Omit<StudyPlan, "id" | "createdAt">>) {
    const index = this.plans.findIndex((p) => p.id === id);
    if (index === -1) return null;

    this.plans[index] = {
      ...this.plans[index],
      ...data,
    };
    this.plans = [...this.plans];
    await this.persist();
    return this.plans[index];
  }

  async deletePlan(id: string) {
    this.plans = this.plans.filter((p) => p.id !== id);
    await this.persist();
  }

  getPlanById(id: string) {
    return this.plans.find((p) => p.id === id);
  }

  // Goals management
  async addGoal(planId: string, goalData: Omit<StudyGoal, "id" | "completed" | "order">) {
    const plan = this.getPlanById(planId);
    if (!plan) return null;

    const newGoal: StudyGoal = {
      ...goalData,
      id: generateId(),
      completed: false,
      order: plan.goals.length,
    };

    await this.updatePlan(planId, {
      goals: [...plan.goals, newGoal],
    });

    return newGoal;
  }

  async toggleGoal(planId: string, goalId: string) {
    const plan = this.getPlanById(planId);
    if (!plan) return;

    const goals = plan.goals.map((g) => (g.id === goalId ? { ...g, completed: !g.completed } : g));

    await this.updatePlan(planId, { goals });
  }

  async deleteGoal(planId: string, goalId: string) {
    const plan = this.getPlanById(planId);
    if (!plan) return;

    const goals = plan.goals.filter((g) => g.id !== goalId);
    await this.updatePlan(planId, { goals });
  }

  async reorderGoals(planId: string, goalIds: string[]) {
    const plan = this.getPlanById(planId);
    if (!plan) return;

    const goals = goalIds
      .map((id, index) => {
        const goal = plan.goals.find((g) => g.id === id);
        return goal ? { ...goal, order: index } : null;
      })
      .filter(Boolean) as StudyGoal[];

    await this.updatePlan(planId, { goals });
  }

  // Check-in management
  async checkIn(planId: string, data: { content: string; duration: number; mood: Mood }) {
    const plan = this.getPlanById(planId);
    if (!plan) return null;

    const newCheckIn: CheckIn = {
      id: generateId(),
      date: new Date(),
      ...data,
    };

    await this.updatePlan(planId, {
      checkIns: [newCheckIn, ...plan.checkIns],
    });

    return newCheckIn;
  }

  async deleteCheckIn(planId: string, checkInId: string) {
    const plan = this.getPlanById(planId);
    if (!plan) return;

    const checkIns = plan.checkIns.filter((c) => c.id !== checkInId);
    await this.updatePlan(planId, { checkIns });
  }

  // Plan progress calculation
  getPlanProgress(planId: string): { completed: number; total: number; percentage: number } {
    const plan = this.getPlanById(planId);
    if (!plan || plan.goals.length === 0) {
      return { completed: 0, total: 0, percentage: 0 };
    }

    const completed = plan.goals.filter((g) => g.completed).length;
    const total = plan.goals.length;
    const percentage = Math.round((completed / total) * 100);

    return { completed, total, percentage };
  }

  private async persist() {
    await storage.set(STORAGE_KEY, this.plans);
  }
}

export const studyStore = new StudyStore();
