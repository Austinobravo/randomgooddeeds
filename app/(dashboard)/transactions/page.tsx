import React from "react"
import TransactionTable from "../_components/TransactionTable"
import data from "@/app/(dashboard)/_components/data.json"
const TransactionsPage = () => {

    return (
        <div>
            <TransactionTable data={data}/>
        </div>
    )

}

export default TransactionsPage