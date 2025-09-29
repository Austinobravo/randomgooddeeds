import React from "react"
import TransactionTable from "../_components/TransactionTable"
import data from "@/app/(dashboard)/_components/data.json"
import prisma from "@/prisma/prisma"
import { getCurrentUser } from "@/lib/getServerSession"


const TransactionsPage = async () => {
    const user = await getCurrentUser()

    const dbTransactions = await prisma.transaction.findMany({
        where:{
            userId: user?.id

        },
        orderBy:{
            createdAt: "desc"
        }
    })
        const transactions = dbTransactions.map((tx) => ({...tx, amount: tx.amount.toNumber()}))

    return (
        <div>
            <TransactionTable data={transactions}/>
        </div>
    )

}

export default TransactionsPage