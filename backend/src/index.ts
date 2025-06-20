import express, { Application, Request, Response } from 'express';
import connectDB from './db/database.js';
import salesmanRouter from './controllers/salesmanController.js';

const app: Application = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use('/salesmen', salesmanRouter);

const startServer = async (): Promise<void> => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to connect DB or start server:', error);
    process.exit(1);
  }
};

startServer();
