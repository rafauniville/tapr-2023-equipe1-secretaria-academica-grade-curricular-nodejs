import { Container } from '@azure/cosmos';
import cosmosdb from 'server/common/cosmosdb';
import { Grade } from '../entites/Grade';

class GradeService {
  private container: Container = cosmosdb.container('grade');

  async all(): Promise<Grade[]> {
    const { resources: listaGrade } = await this.container.items
      .readAll<Grade>()
      .fetchAll();

    return Promise.resolve(listaGrade);
  }
}

export default new GradeService();
