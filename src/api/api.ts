import { type TaskFormValues, type StoredTask } from "../types";

export interface Performer {
  id: string;
  name: string;
  avatar?: string;
  type: "user" | "team";
  role?: string;
}

const MOCK_USERS: Performer[] = [
  {
    id: "u1",
    name: "Аблямова Нигора",
    type: "user",
    role: "Project Manager",
    avatar: "https://i.pravatar.cc/150?u=u1",
  },
  {
    id: "u2",
    name: "Исроилов Жамшид",
    type: "user",
    role: "Lead Developer",
    avatar: "https://i.pravatar.cc/150?u=u2",
  },
  {
    id: "u3",
    name: "Анвар Каримов",
    type: "user",
    role: "UI/UX Designer",
    avatar: "https://i.pravatar.cc/150?u=u3",
  },
  {
    id: "u4",
    name: "Елена Петрова",
    type: "user",
    role: "QA Engineer",
    avatar: "https://i.pravatar.cc/150?u=u4",
  },
  {
    id: "u5",
    name: "Тимур Мансуров",
    type: "user",
    role: "Backend Dev",
    avatar: "https://i.pravatar.cc/150?u=u5",
  },
  {
    id: "u6",
    name: "Диана Смирнова",
    type: "user",
    role: "Frontend Dev",
    avatar: "https://i.pravatar.cc/150?u=u6",
  },
  {
    id: "u7",
    name: "Руслан Хакимов",
    type: "user",
    role: "DevOps",
    avatar: "https://i.pravatar.cc/150?u=u7",
  },
  {
    id: "u8",
    name: "Марина Ли",
    type: "user",
    role: "Marketing",
    avatar: "https://i.pravatar.cc/150?u=u8",
  },
  {
    id: "u9",
    name: "Алексей Иванов",
    type: "user",
    role: "Analyst",
    avatar: "https://i.pravatar.cc/150?u=u9",
  },
  { id: "u10", name: "Саида Рахимова", type: "user", role: "Product Owner" },
];

const MOCK_TEAMS: Performer[] = [
  { id: "t1", name: "Design Team", type: "team" },
  { id: "t2", name: "Frontend Squad", type: "team" },
  { id: "t3", name: "QA & Testing", type: "team" },
  { id: "t4", name: "Models & Assets", type: "team" },
  { id: "t5", name: "Mobile App Team", type: "team" },
  { id: "t6", name: "Backend Core", type: "team" },
  { id: "t7", name: "DevOps & Infra", type: "team" },
];

export const TaskApi = {
  getPerformers: async (
    search: string,
    isTeamMode: boolean
  ): Promise<Performer[]> => {
    await sleep(1000);

    const source = isTeamMode ? MOCK_TEAMS : MOCK_USERS;

    if (!search) {
      return source;
    }

    const normalizedSearch = search.toLowerCase();
    return source.filter(
      item =>
        item.name.toLowerCase().includes(normalizedSearch) ||
        item.role?.toLowerCase().includes(normalizedSearch)
    );
  },

  submitTask: async (
    data: TaskFormValues
  ): Promise<{ success: boolean; task: StoredTask }> => {
    await sleep(1000);

    const newTask: StoredTask = {
      ...data,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      files: data.files.map(f => `uploads/${f.name}`),
    };

    const existingTasksJson = localStorage.getItem("remindr_tasks");
    const tasks = existingTasksJson ? JSON.parse(existingTasksJson) : [];
    tasks.push(newTask);
    localStorage.setItem("remindr_tasks", JSON.stringify(tasks));

    console.log("Task saved to store:", newTask);
    return { success: true, task: newTask };
  },

  getTasks: async (): Promise<StoredTask[]> => {
    await sleep(500);
    const existingTasksJson = localStorage.getItem("remindr_tasks");
    return existingTasksJson ? JSON.parse(existingTasksJson) : [];
  },

  getAllPerformers: async (): Promise<Performer[]> => {
    return [...MOCK_USERS, ...MOCK_TEAMS];
  },

  deleteTask: async (id: string): Promise<{ success: boolean }> => {
    await sleep(500);
    const existingTasksJson = localStorage.getItem("remindr_tasks");
    if (!existingTasksJson) return { success: false };

    const tasks: StoredTask[] = JSON.parse(existingTasksJson);
    const filteredTasks = tasks.filter(t => t.id !== id);
    localStorage.setItem("remindr_tasks", JSON.stringify(filteredTasks));

    return { success: true };
  },
};

async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
