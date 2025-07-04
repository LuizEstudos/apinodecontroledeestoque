import fastify from "fastify";
import fastifyCors from "@fastify/cors";
const server = fastify()


///SEQUELIZE
import db_sequelize from './database/database-sequelize.js'

import  ProdutosCrud from './database/produtos-sequelize.js'
const prod_crud = new ProdutosCrud()

import EstoqueCrud from "./database/estoque-sequelize.js";
const estoq_crud = new EstoqueCrud()






try {
    await db_sequelize.authenticate()
} catch (error) {
    console.error( 'Unable to connect to the database:', error )
}

db_sequelize.sync()


///         ESTOQUE 
//CREATE
server.post('/estoque/create',            
    async (request, reply)=>{
        const{ quantidade, setor, idfk_produto, produto_nome, produto_descricao } = request.body
        const estoque = { quantidade, setor, idfk_produto, produto_nome, produto_descricao } 
        
        console.log( estoque )

        await estoq_crud.create( estoque )


        reply.status(201).send()
     }

)
//READ
server.get( '/estoque/list',
    async (request, reply)=>{
        var list = {}

        // console.log( `get - request.query: ${request.query}` )
        list = await estoq_crud.list(  )
        
        return list
    }
)
server.get( '/estoque/getbyid',
    async ( request, reply ) => {
        const qId = request.query.id
        let get
        
        console.log( "-getting by id:" + qId )
        get = await estoq_crud.get_by_id( qId )
        
        return get
     }
)
//DELETE
server.delete( '/estoque/delete/:id', 
    async ( request, reply )=> {
        const pId= request.params.id

        console.log( "-deleting by id:" + pId )
        await estoq_crud.delete( pId )

        reply.status(204).send()
    }  
 )

///PRODUTOS
///CREATE
server.post( '/produtos/create', 
    async (request, reply)=>{
        const {nome, preco, descricao} = request.body
        var prod = { nome, preco, descricao }

        var query = await prod_crud.create(prod)

        reply.status(201).send()
    }
)
///READ
server.get( '/produtos/list',
    async (request, reply)=>{
        const q_search = request.query.search
        let list = {}

        // console.log( `get - request.query: ${request.query}` )
        console.log( "get with query:" + q_search )
        list = await prod_crud.list( q_search )
        
        return list
    }
)
server.get( '/produtos/getbyid',
    async ( request, reply ) => {
        const qId = request.query.id
        let get
        
        console.log( "-getting produto by id:" + qId )
        get = await prod_crud.get_by_id( qId )
        
        return get
     }
)
///UPDATE
server.put( '/produtos/edit/:id', 
    async (request, reply)=>{   
        const {nome, preco, descricao} = request.body
        const newInfos = {nome, preco, descricao}
        const qId = request.params.id

        console.log("put produtos with param:" + qId + ". New Infos:" + newInfos)
        
        
        prod_crud.update(qId, newInfos)
        
        reply.status(204).send()
     } 
) 
//form
server.get( '/produtos/edit/form/:id' ,
    async ( request, reply )=>{
        const qId = request.params.id
        let video
        
        console.log( "-form getting produto by id:" + qId )
        video = await prod_crud.get_by_id( qId )
        
        return video
     }
)


///DELETE
server.delete( '/produtos/delete/:id',
    async (request, reply)=>{
        const paramsId = request.params.id

        await prod_crud.delete( paramsId )

        reply.status(204).send()
    }
 )



 ///FASTIFY CONFIGS
//HABILITA CONSUMO do front end
server.register( fastifyCors, {
    origin: true,
    methods: ['DELETE', 'GET', 'PUT', 'POST']
} )
server.listen( {

    port: 5555
}
)
