import React from 'react'
import { MdEdit, MdDelete } from 'react-icons/md'

const ExpenseItem = ({ expens, clearSelectedItem, editSelectedItem }) => {
    const { id, charge, amount } = expens
    return (
        <li className="item">
            <div className="info">
                <span className="expense">{charge}</span>
                <span className="amount">{amount} ₺</span>
            </div>
            <div>
                <button className="edit-btn" aria-label="edit button" 
                onClick={()=>editSelectedItem(id)}>
                    <MdEdit />
                </button>
                <button className="clear-btn" aria-label="edit button" onClick={()=>clearSelectedItem(id)}>
                    <MdDelete />
                </button>
            </div>
        </li>
    )
}
export default ExpenseItem