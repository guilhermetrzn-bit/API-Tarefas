import express from 'express';
import taskRoutes from './routes/taskRoutes.js';

const app = express();
const PORTA = 3333;

app.use(express.json());

app.use(taskRoutes);

app.listen(PORTA, () => {
  console.log(`🚀 Servidor rodando na porta ${PORTA}`);
});