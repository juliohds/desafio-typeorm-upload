import Transaction from '../models/Transaction';
import TransactionsRepository from '../repositories/TransactionsRepository';
import { getCustomRepository } from 'typeorm';
import uploadConfig from '../config/upload';
import path from 'path';
import fs from 'fs';
import AppError from '../errors/AppError';

interface Response {
  title: string;
  value: number;
  type: 'outcome' | 'income';
  category: string;
}
class ImportTransactionsService {
  async execute(filename: string): Promise<Transaction[]> {
    const transactionsRepository = getCustomRepository(TransactionsRepository);
    const filePath = path.join(uploadConfig.directory, filename);
    let transactions: Transaction[] = [];
    fs.readFile(filePath, 'utf8', async (err, data) => {
      let dataArray = data.split(/\r?\n/);

      // dataArray.map(async (v, i) => {
      //   if(i !== 0 && v.length > 0){
      //     const arrayDataLines = v.split(',');

      //     if(arrayDataLines[1].trim() !== 'outcome' && arrayDataLines[1].trim() !== 'income'){
      //       throw new AppError('Invalid type in file.')
      //     }

      //     const transactionData: Response = {
      //       title: arrayDataLines[0],
      //       type: arrayDataLines[1].trim() !== 'income' ? arrayDataLines[1].trim(),
      //       value: Number(arrayDataLines[2]),
      //       // category_id: arrayDataLines[3]
      //     }
      //     const transactionCreate = transactionsRepository.create(transactionData)
      //     const transaction = await transactionsRepository.save(transactionCreate);
      //     transactions.push(transaction);
      //   }
      // })
    });
    return transactions;
  }
}

export default ImportTransactionsService;
