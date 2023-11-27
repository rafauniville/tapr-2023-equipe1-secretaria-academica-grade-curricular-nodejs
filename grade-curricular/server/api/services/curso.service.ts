import { Container, SqlQuerySpec } from "@azure/cosmos";
import cosmosDb from "../../common/cosmosdb";
import { Curso } from "../entites/Curso";

class CursoService{
    
    private container:Container =
        cosmosDb.container("curso");

    async updateEvent(curso:Curso): Promise<Curso>{
        await this.container.items.upsert(curso);
        return Promise.resolve(curso);
    }
    
    async all(): Promise<Curso[]>{
        const {resources: listaCursos}
            = await this.container.items.readAll<Curso>().fetchAll();
        
        return Promise.resolve(listaCursos);
    }
    async getById(id:string): Promise<Curso>{
        const querySpec: SqlQuerySpec = {
            query: "SELECT * FROM Curso c WHERE c.id = @id",
            parameters: [
                {name: "@id", value: id}
            ]
            };
        const {resources: listaCursos}
            = await this.container.items.query(querySpec).fetchAll();
        
        return Promise.resolve(listaCursos[0]);
    }
    async saveNew(curso:Curso): Promise<Curso>{
        curso.id = "";
        await this.container.items.create(curso);
        
        return Promise.resolve(curso);
    }
    async update(id:string, curso:Curso): Promise<Curso>{
        const querySpec: SqlQuerySpec = {
            query: "SELECT * FROM Curso c WHERE c.id = @id",
            parameters: [
                {name: "@id", value: id}
            ]
            };
        const {resources: listaCursos}
            = await this.container.items.query(querySpec).fetchAll();
        const cursoAntigo = listaCursos[0];
        if(cursoAntigo == undefined){
            return Promise.reject();
        }
        cursoAntigo.nome = curso.nome;
        cursoAntigo.duracao = curso.duracao;
        
        await this.container.items.upsert(cursoAntigo)
        
        return Promise.resolve(cursoAntigo);
    }
    async delete(id:string): Promise<string>{

        const querySpec: SqlQuerySpec = {
            query: "SELECT * FROM Curso c WHERE c.id = @id",
            parameters: [
                {name: "@id", value: id}
            ]
            };
        const {resources: listaCursos}
            = await this.container.items.query(querySpec).fetchAll();
        for (const curso of listaCursos) {
            await this.container.item(curso.id).delete();
        }
        
        return Promise.resolve(id);
    }
}

export default new CursoService();