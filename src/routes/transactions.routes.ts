import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';
import DeleteTransactionService from '../services/DeleteTransactionService';
// import ImportTransactionsService from '../services/ImportTransactionsService';

const transactionsRouter = Router();

transactionsRouter.get('/', async (request, response) => {
  const transactionsRepository = getCustomRepository(TransactionsRepository);
  const transactions = await transactionsRepository.find({ relations: ["category_id"] });
  const balance = await transactionsRepository.getBalance();
  return response.json({transactions, balance});
});

transactionsRouter.post('/', async (request, response) => {
  const { title, value, type, category } = request.body;
  const createTransaction = new CreateTransactionService();
  const transaction = await createTransaction.execute({title, value, type, category});
  return response.json(transaction)
});

transactionsRouter.delete('/:id', async (request, response) => {
  // TODO
  const { id } = request.params;
  const deleteTransaction = new DeleteTransactionService();
  deleteTransaction.execute(id);
  return response.status(204).json({ok: true});
});

transactionsRouter.post('/import', async (request, response) => {
  // TODO
});

export default transactionsRouter;
