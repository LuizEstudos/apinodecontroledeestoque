import { Sequelize, DataTypes, Op } from "sequelize";
import db_sequelize from "./database-sequelize.js";
import { v4 as uuid } from "uuid";

const EstoqueSeq = db_sequelize.define( 'estoque',
    {

        id: {
            type: DataTypes.STRING,
            allowNull : false,
            primaryKey : true
        },
        quantidade: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        setor: {
            type: DataTypes.STRING(2)
        },
        idfk_produto: {
            type: DataTypes.STRING,
            allowNull : false
        },
        produto_nome: {
            type: DataTypes.STRING
        },
        produto_descricao: {
            type: DataTypes.STRING()
        }


    }

 )

class EstoqueCrud {
    //CREATE
    async create( estoque ) {
        const randID = uuid()

        await EstoqueSeq.create( {
            id: randID,
            ...estoque
        } )
    }
    //READ
    async list() {
        var _list = await EstoqueSeq.findAll()

        return _list
        
    }
    async get_by_id(id) {
        var get

        get = EstoqueSeq.findByPk( id )

        return get
    }
    //DELETE
    async delete( id ) {
        let destroy = await this.get_by_id( id )
        destroy.destroy()
    }
}

export default EstoqueCrud