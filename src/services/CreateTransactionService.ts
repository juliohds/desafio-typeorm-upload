import { getCustomRepository, getRepository } from 'typeorm';

import Transaction from '../models/Transaction';
import CategoriesRepository from '../repositories/CategoriesRepository';
import TransactionsRepository from '../repositories/TransactionsRepository';
import AppError from '../errors/AppError';

interface Request {
  title: string;
  value: number;
  type: string;
  category: string;
}
class CreateTransactionService {
  public async execute({
    title,
    value,
    type,
    category,
  }: Request): Promise<Transaction> {
    // TODO
    const categoriesRepository = getCustomRepository(CategoriesRepository);
    let categoryByName = await categoriesRepository.getCategoryByName(category);
    let category_id = {};
    if (categoryByName) {
      category_id = categoryByName;
    } else {
      const newCategory = categoriesRepository.create({ title: category });
      await categoriesRepository.save(newCategory);
      category_id = newCategory;
    }

    if (type !== 'income' && type !== 'outcome') {
      throw new AppError('invalid type entry', 400);
    }

    const transactionsRepository = getCustomRepository(TransactionsRepository);

    const balance = await transactionsRepository.getBalance();

    if (type === 'outcome' && value > balance.total) {
      throw new AppError('dont have saldo, please make a income value', 400);
    }
    const transaction = transactionsRepository.create({
      title,
      value,
      type,
      category: category_id,
    });

    await transactionsRepository.save(transaction);
    return transaction;
  }
}

export default CreateTransactionService;
