import { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";

export default function HomeScreen() {

  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");

  const [expenses, setExpenses] =
    useState<
    {
      id:number;
      note:string;
      amount:string;
    }[]>([]);

  function addExpense() {

    const newExpense = {
      id: Date.now(),
      note: note,
      amount: amount
    };

    setExpenses([
      ...expenses,
      newExpense
    ]);

    setAmount("");
    setNote("");
  }

  // Calculate Total Spending
    const total =
  expenses.reduce((sum, item) => {

    return sum +
      Number(item.amount);

  },0);

  return (

    <View
      style={{
        flex: 1,
        justifyContent: "center",
        padding: 20
      }}
    >

      <Text
        style={{
          fontSize: 30,
          textAlign: "center",
          marginBottom: 20
        }}
      >
        PocketFlow
      </Text>

      <Text>Amount</Text>

      <TextInput
        value={amount}
        onChangeText={setAmount}
        style={{
          borderWidth: 1,
          padding: 10,
          marginBottom: 20
        }}
      />

      <Text>Note</Text>

      <TextInput
        value={note}
        onChangeText={setNote}
        style={{
          borderWidth: 1,
          padding: 10,
          marginBottom: 20
        }}
      />

      <Button
        title="Add Expense"
        onPress={addExpense}
      />

      {expenses.map((item) => (

      <View
        key={item.id }
        style={{
          flexDirection:"row",
          justifyContent:"space-between",
          marginTop:20
        }}
      >

        <Text style={{fontSize:22}}>
          {item.note} — £{item.amount}
        </Text>

        <Button
          title="REMOVE"
          onPress={() => {

            setExpenses(
              expenses.filter(
                expense =>
                  expense.id !== item.id
              )
            );

          }}
        />

      </View>

      ))}

      <Text
        style={{
          marginTop: 30,
          fontSize: 25,
          fontWeight: "bold"
        }}
      >
        Total: £{total.toFixed(2)}
      </Text>

    </View>

  );
}