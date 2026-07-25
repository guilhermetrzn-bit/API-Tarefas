import type { Request, Response } from 'express';
import { taskService } from '../services/taskService.js';

export const taskController = {
  getAll: (req: Request, res: Response) => {
    const tasks = taskService.getAll();
    return res.status(200).json(tasks);
  },

  getById: (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params;
    
    if (!id) {
      return res.status(400).json({ mensagem: 'ID é obrigatório' });
    }

    const task = taskService.getById(id);

    if (!task) {
      return res.status(404).json({ mensagem: 'Tarefa não encontrada' });
    }

    return res.status(200).json(task);
  },

  create: (req: Request, res: Response) => {
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({ mensagem: 'O título é obrigatório' });
    }

    const newTask = taskService.create(title);
    return res.status(201).json(newTask);
  },

  update: (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params;
    const { title, completed } = req.body;

    if (!id) {
      return res.status(400).json({ mensagem: 'ID é obrigatório' });
    }

    const updatedTask = taskService.update(id, { title, completed });

    if (!updatedTask) {
      return res.status(404).json({ mensagem: 'Tarefa não encontrada' });
    }

    return res.status(200).json(updatedTask);
  },

  delete: (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ mensagem: 'ID é obrigatório' });
    }

    const deleted = taskService.delete(id);

    if (!deleted) {
      return res.status(404).json({ mensagem: 'Tarefa não encontrada' });
    }

    return res.status(204).send();
  },
};