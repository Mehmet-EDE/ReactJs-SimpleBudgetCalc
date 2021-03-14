import React from 'react'
import Item from './ExpenseItem'
import { MdDelete } from 'react-icons/md'
const ExpenseList = ({values,handleDelete,clearSelectedItem,editSelectedItem}) => {
    return (
        <>
            <ul className="list">
                {values.map((expens) => {
                    return <Item key={expens.id} expens={expens} 
                    clearSelectedItem={clearSelectedItem} 
                    editSelectedItem={editSelectedItem} />
                })}
            </ul>
            {values.length > 0 && (
        <button className="btn" onClick={handleDelete}  >
          masrafları temizle
          <MdDelete className="btn-icon" />
        </button>
      )}
        </>
    )
}
export default ExpenseList