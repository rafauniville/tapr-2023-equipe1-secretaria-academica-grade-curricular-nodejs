import { Container, SqlQuerySpec } from '@azure/cosmos';
import daprClient from "../../common/daprclient"
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

  async publishEvent(grade:Grade): Promise<Grade>{
    daprClient.pubsub.publish(process.env.APPCOMPONENTSERVICE as string,
                              process.env.APPCOMPONENTTOPICOGRADE as string,
                              grade);
    return Promise.resolve(grade);

  }
  async saveNew(grade:Grade): Promise<Grade>{
    grade.id = "";
    await this.container.items.create(grade);
    await this.publishEvent(grade);
    
    return Promise.resolve(grade);
  }
  async update(id:string, grade:Grade): Promise<Grade>{
    const querySpec: SqlQuerySpec = {
        query: "SELECT * FROM Grade g WHERE g.id = @id",
        parameters: [
            {name: "@id", value: id}
        ]
        };
    const {resources: listaGrade}
        = await this.container.items.query(querySpec).fetchAll();
    const gradeAntiga = listaGrade[0];
    
    if(gradeAntiga == undefined){
        return Promise.reject();
    }

    gradeAntiga.semestre = grade.semestre;
    
    await this.container.items.upsert(gradeAntiga);
    await this.publishEvent(gradeAntiga);

    return Promise.resolve(gradeAntiga);
  }
  async delete(id:string): Promise<string>{

    const querySpec: SqlQuerySpec = {
        query: "SELECT * FROM Grade g WHERE g.id = @id",
        parameters: [
            {name: "@id", value: id}
        ]
        };
    const {resources: listaGrade}
        = await this.container.items.query(querySpec).fetchAll();
    for (const grade of listaGrade) {
        await this.container.item(grade.id,grade.semestre).delete();
    }
    
    return Promise.resolve(id);
  }
  async updateEvent(grade:Grade): Promise<Grade>{
    await this.container.items.upsert(grade);
    return Promise.resolve(grade);
}

}

export default new GradeService();
