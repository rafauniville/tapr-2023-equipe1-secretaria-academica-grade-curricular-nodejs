import { Container, SqlQuerySpec } from "@azure/cosmos";
import cosmosDb from "../../common/cosmosdb";
import { Disciplina } from "../entites/Disciplina";

class DisciplinaService{
    
    private container:Container =
        cosmosDb.container("disciplina");

    async updateEvent(disciplina:Disciplina): Promise<Disciplina>{
        await this.container.items.upsert(disciplina);
        return Promise.resolve(disciplina);
    }
    
    async all(): Promise<Disciplina[]>{
        const {resources: listaDisciplinas}
            = await this.container.items.readAll<Disciplina>().fetchAll();
        
        return Promise.resolve(listaDisciplinas);
    }
    async getById(id:string): Promise<Disciplina>{
        const querySpec: SqlQuerySpec = {
            query: "SELECT * FROM Disciplina d WHERE d.id = @id",
            parameters: [
                {name: "@id", value: id}
            ]
            };
        const {resources: listaDisciplinas}
            = await this.container.items.query(querySpec).fetchAll();
        
        return Promise.resolve(listaDisciplinas[0]);
    }
    async saveNew(disciplina:Disciplina): Promise<Disciplina>{
        disciplina.id = "";
        await this.container.items.create(disciplina);
        
        return Promise.resolve(disciplina);
    }
    async update(id:string, disciplina:Disciplina): Promise<Disciplina>{
        const querySpec: SqlQuerySpec = {
            query: "SELECT * FROM Disciplina d WHERE d.id = @id",
            parameters: [
                {name: "@id", value: id}
            ]
            };
        const {resources: listaDisciplinas}
            = await this.container.items.query(querySpec).fetchAll();
        const disciplinaAntiga = listaDisciplinas[0];
        if(disciplinaAntiga == undefined){
            return Promise.reject();
        }
        disciplinaAntiga.nome = disciplina.nome;
        disciplinaAntiga.cargaHoraria = disciplina.cargaHoraria;
        
        await this.container.items.upsert(disciplinaAntiga)
        
        return Promise.resolve(disciplinaAntiga);
    }
    async delete(id:string): Promise<string>{

        const querySpec: SqlQuerySpec = {
            query: "SELECT * FROM Disciplina d WHERE d.id = @id",
            parameters: [
                {name: "@id", value: id}
            ]
            };
        const {resources: listaDisciplinas}
            = await this.container.items.query(querySpec).fetchAll();
        for (const disciplina of listaDisciplinas) {
            await this.container.item(disciplina.id).delete();
        }
        
        return Promise.resolve(id);
    }
}

export default new DisciplinaService();