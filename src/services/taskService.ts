export interface Task {
  id: string;
  title: string;
  completed: boolean;
}

const tarefas: Task[] = [];

export const taskService = {
  getAll: (): Task[] => {
    return tarefas;
  },

  getById: (id: string): Task | undefined => {
    return tarefas.find((t) => t.id === id);
  },

  create: (title: string): Task => {
    const newTask: Task = {
      id: Math.random().toString(36).substring(2, 9),
      title,
      completed: false,
    };
    tarefas.push(newTask);
    return newTask;
  },

  update: (id: string, updates: Partial<Pick<Task, 'title' | 'completed'>>): Task | null => {
    const task = tarefas.find((t) => t.id === id);
    if (!task) return null;

    if (updates.title !== undefined) {
      task.title = updates.title;
    }
    if (updates.completed !== undefined) {
      task.completed = updates.completed;
    }

    return task;
  },

  delete: (id: string): boolean => {
    const taskIndex = tarefas.findIndex((t) => t.id === id);
    if (taskIndex === -1) return false;

    tarefas.splice(taskIndex, 1);
    return true;
  },
};