import { getCustomRepository, getRepository } from 'typeorm';

// import AppError from '../errors/AppError';

import Transaction from '../models/Transaction';
import CategoriesRepository from '../repositories/CategoriesRepository';
import AppError from '../errors/AppError';

interface Request {
  title: string;
  value: number;
  type: string;
  category : string;
}
class CreateTransactionService {
  public async execute({ title, value, type, category}: Request): Promise<Transaction> {
    // TODO
    const categoriesRepository = getCustomRepository(CategoriesRepository);
    let categoryByName = await categoriesRepository.getCategoryByName(category);
    let category_id = "";
    if(categoryByName){
      category_id = categoryByName.id;
    } else {
      const newCategory = categoriesRepository.create({ title: category });
      await categoriesRepository.save(newCategory);
      category_id = newCategory.id;
    }

    if(type !== "income" && type !== "outcome"){
      throw new AppError('invalid type entry', 400);
    }

    const transactionsRepository = getRepository(Transaction);
    const transaction = transactionsRepository.create({
      title, value, type, category_id
    })

    await transactionsRepository.save(transaction);
    return transaction;
  }
}

export default CreateTransactionService;
