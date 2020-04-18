import AppError from '../errors/AppError';
import { getRepository } from 'typeorm';
import Transaction from '../models/Transaction';

class DeleteTransactionService {
  public async execute(id: string): Promise<void> {
    // TODO
    const transactionRepository = getRepository(Transaction);
    const transaction = await transactionRepository.find({ where: { id }});
    if(!transaction){
      throw new AppError("transaction not a found");
    }

    await transactionRepository.delete(id);
  }
}

export default DeleteTransactionService;
