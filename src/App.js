import React, { useState } from 'react'
import './App.css';
import ExpenseList from './components/ExpenseList';
import ExpenseForm from './components/ExpenseForm';
import Alert from './components/Alert';
import uuid from '../node_modules/uuid/dist/v4'

const initExpenses = [];
function App() {
  const [values, setValues] = useState(initExpenses);
  const [charge, setCharge] = useState('');
  const [amount, setAmount] = useState('');
  const [alert, setAlert] = useState({ show: false })
  const [edit, setEdit] = useState(false)
  const [id, setId] = useState(0)
  const handleCharge = e => {
    setCharge(e.target.value)
  }
  const handleAmount = e => {
    setAmount(e.target.value)
  }
  const handleAlert = ({ type, text }) => {
    setAlert({ show: true, type, text });
    setTimeout(() => {
      setAlert({ show: false });
    }, 3000);
  };
  const handleSubmit = e => {
    e.preventDefault();
    if (charge !== '' && amount > 0) {
      const singleExpense = { id: uuid(), charge: charge, amount: amount };
      setValues([...values, singleExpense]);
      handleAlert({ type: "success", text: "Gider eklendi" });
      setCharge('');
      setAmount('');
      if (edit) handleAlert({ type: "success", text: "Gider Düzenlendi" });
      else handleAlert({ type: "success", text: "Gider Eklendi" });
      setEdit(false)
    } else {
      handleAlert({
        type: "danger",
        text: "İsim boş olamaz ve değer 0'dan yüksek olmalı"
      });
    }
  }
  const handleDelete = () => {
    setValues([])
    handleAlert({
      type: "success",
      text: "Tüm Giderler Temizlendi"
    });
  }
  const clearSelectedItem = id => {
    var expensItem = values.filter(i => i.id != id);
    setValues(expensItem);
    handleAlert({
      type: "success",
      text: "Seçilen Gider Temizlendi"
    });
  }
  const editSelectedItem = id => {
    var expensItem = values.find(i => i.id == id);
    var { charge, amount } = expensItem;
    clearSelectedItem(id)
    setCharge(charge);
    setAmount(amount);
    setEdit(true);
    setId(id);
  }
  return (
    <>
      {alert.show && <Alert type={alert.type} text={alert.text} />}
      <h1>Budget Calculator</h1>
      <main className="App">
        <ExpenseForm charge={charge} amount={amount}
          handleAmount={handleAmount}
          handleCharge={handleCharge}
          handleSubmit={handleSubmit}
          edit={edit} />
        <ExpenseList values={values}
          clearSelectedItem={clearSelectedItem}
          editSelectedItem={editSelectedItem}
          handleDelete={handleDelete} />
      </main>
      <h1>Toplam:{" "} <span className="total">
        {values.reduce((account, current) => {
          return (account += parseInt(current.amount));
        }, 0)}{" "} ₺</span></h1>
    </>
  );
}

export default App;
