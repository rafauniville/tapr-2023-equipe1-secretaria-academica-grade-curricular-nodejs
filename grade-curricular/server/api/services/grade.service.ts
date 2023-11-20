import { Container, SqlQuerySpec } from '@azure/cosmos';
import cosmosdb from '../../../server/common/cosmosdb';
import { Grade } from '../entites/Grade';

class GradeService {
  private container: Container = cosmosdb.container('grade');

  async all(): Promise<Grade[]> {
    const { resources: listaGrade } = await this.container.items
      .readAll<Grade>()
      .fetchAll();

    return Promise.resolve(listaGrade);
  }
  async getById(id: string): Promise<Grade> {
    const querySpec: SqlQuerySpec = {
      query: 'SELECT * FROM Grade g WHERE g.id = @id',
      parameters: [{ name: '@id', value: id }],
    };
    const { resources: listaGrade } = await this.container.items
      .query(querySpec)
      .fetchAll();

    return Promise.resolve(listaGrade[0]);
  }
  async saveNew(grade:Grade): Promise<Grade>{
    grade.id = "";
    await this.container.items.create(grade);
    
    return Promise.resolve(grade);
  }

}

export default new GradeService();
