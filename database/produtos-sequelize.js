import{Sequelize, DataTypes, Op} from 'sequelize'
import db_sequelize from './database-sequelize.js'

import { v4 as uuid} from 'uuid'

const ProdutosSeq = db_sequelize.define( 'produto',
{

    id: {
        type: Sequelize.STRING,
        allowNul: false,
        primaryKey: true,
    },
    nome: {
        type: Sequelize.STRING,
        allowNul: false
    },
    preco :{
        type: Sequelize.DECIMAL,
        allowNul: false
    },
    descricao: Sequelize.TEXT
        
    
}
)

class ProdutosCrud {
    //CREATE
    async create( produto ){


        const randID = uuid()
        await ProdutosSeq.create( {
          id: randID, 
          ...produto   
         } )
    }
    //READ
    async list( searchByNome ) {
        var list

        if( searchByNome ){
            list = await ProdutosSeq.findAll({
                 where: { nome : {[Op.iLike]:`%${searchByNome}%`} } 
                })
        } else {
            list = await ProdutosSeq.findAll()
        }

        return list
    }
    //by id
    async get_by_id( id ) {
        var get

        get = ProdutosSeq.findByPk( id )

        return get
    }
    //UPDATE
    async update( idToUpdate, newInfos ) {
        ProdutosSeq.update( 
            {...newInfos},
            { where:{ id:idToUpdate } }

         )
    }
    async delete( id ) {
        let prodToDestroy = await this.get_by_id( id )
        prodToDestroy.destroy()

    }



}

export default ProdutosCrud