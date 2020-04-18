import { EntityRepository, Repository } from 'typeorm';

import Category from '../models/Category';

@EntityRepository(Category)
class CategoriesRepository extends Repository<Category> {
  public async getCategoryByName(title: string): Promise<Category | null> {
    // TODO
    const category = await this.findOne({
      where: { title }
    })

    return category || null;
  }
}

export default CategoriesRepository;
