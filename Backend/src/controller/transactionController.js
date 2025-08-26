import { sql } from "../config/db.js";


export const createTransaction = async (req,res)=>{
    // title  , amount , category , user_id
    try {
        const {title , amount , category , user_id} = req.body;

        if(!title || !user_id || !category || amount=== undefined){
            return res.status(400).json({message : "All fields are required"})
        }

        const transaction =  await sql`
        INSERT INTO transactions (title , amount , category , user_id)
        VALUES (${title} , ${amount} , ${category} , ${user_id})
        RETURNING *
        `

        res.status(201).json({message : "Transaction created successfully" , transaction:transaction[0]})


         
        
    } catch (error) {
        console.log("Error code while Get transacrion : " , error)
        res.status(500).json({message : "Internal server error"})
        
    }
}

export  const getTransactions = async (req,res)=>{

    try {
        const {user_id} = req.params;

        if(!user_id){
            return res.status(400).json({message : "user_id is required"})
        }

       const transaction =  await sql`
            SELECT * FROM transactions WHERE user_id = ${user_id} ORDER BY created_at DESC
        `

        res.status(200).json({transaction : transaction})


        
    } catch (error) {
        console.log("Error in Get User Transaction: " , error)
        res.status(500).json({message : "Internal server error"})
    }
}   


export const DeleteTransaction = async (req,res) =>{
    try {
        const {id} = req.params;

        if(isNaN(parseInt(id))){
            return res.status(400).json({message :"Invalid transaction id"});
        }

        if(!id){
            return res.status(400).json({message :"Transaction id is required"});
        }
        const result = await sql`
            DELETE FROM transactions WHERE id = ${id} RETURNING *
        `

        if(result.length === 0){
            return res.status(404).json({message : "Transaction not found"});
        }

        res.status(200).json({message : "Transaction deleted successfully " })

        
    } catch (error) {
        console.log("Error code while Delete transacrion : " , error)
        res.status(500).json({message : "Internal server error"})
    }
}

export const getSummary = async (req,res) =>{
    try {

        const {user_id} = req.params;

        if(!user_id){
            return res.status(400).json({message : "user_id is required"})
        }

        const balanceResult  = await sql`
            SELECT COALESCE(SUM(amount),0) AS balance FROM transactions WHERE user_id = ${user_id}
        `

        const incomeResult = await sql`
            SELECT COALESCE(SUM(amount),0) AS income FROM transactions WHERE user_id = ${user_id} AND amount > 0 `


        const expenseResult = await sql`
            SELECT COALESCE(SUM(amount),0) AS expense FROM transactions WHERE user_id = ${user_id} AND amount < 0 `

        res.status(200).json({
            balance : balanceResult[0].balance,
            income : incomeResult[0].income,
            expense : expenseResult[0].expense
        })
        
    } catch (error) {
        console.log("Error code while Summary transacrion : " , error)
        res.status(500).json({message : "Internal server error"})
    }
}