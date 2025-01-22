import React, { useState } from "react";
import { Text, TextInput, View, FlatList, StyleSheet, TouchableOpacity } from "react-native";

export default function Index() {
  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [itemDesc, setItemDesc] = useState("");
  const [shoppingList, setShoppingList] = useState([]);

  const addItem = () => {
    if (itemName !== "" && itemPrice !== "") {
      const price = parseFloat(itemPrice);
      setShoppingList([...shoppingList, { name: itemName, price: price, desc: itemDesc }]);
      setItemName("");
      setItemPrice("");
      setItemDesc("");
    }
  };

  const totalAmount = shoppingList.reduce((acc, item) => acc + item.price, 0).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  const renderFooter = () => (
    <View style={styles.totalContainer}>
      <Text style={styles.totalLabel}>Total:</Text>
      <Text style={styles.totalValue}>{totalAmount}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.label}>Nome do Item:</Text>
        <TextInput
          style={styles.input}
          placeholder="Uber"
          value={itemName}
          onChangeText={setItemName}
        />
        <Text style={styles.label}>Preço:</Text>
        <TextInput
          style={styles.input}
          placeholder="10.50"
          value={itemPrice}
          onChangeText={setItemPrice}
          keyboardType="numeric"
        />
        <Text style={styles.label}>Descrição:</Text>
        <TextInput
          style={styles.input}
          placeholder="Descrição do gasto."
          value={itemDesc}
          onChangeText={setItemDesc}
        />
        <TouchableOpacity style={styles.button} onPress={addItem}>
          <Text style={styles.buttonText}>Adicionar</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        style={styles.list}
        data={shoppingList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemPrice}>{item.price.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })}</Text>
            <Text style={styles.itemDesc}>{item.desc}</Text>
          </View>
        )}
        ListFooterComponent={renderFooter}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  form: {
    width: "100%",
    maxWidth: 400,
    padding: 16,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 12,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#007BFF",
    borderRadius: 4,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  list: {
    flexGrow: 1,
    width: "100%",
  },
  listItem: {
    flexDirection: "column",
    width: "100%",
    padding: 16,
    borderBottomColor: "grey",
    borderBottomWidth: 1,
    marginBottom: 8,
  },
  itemName: {
    fontSize: 16,
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 16,
    color: "green",
    fontWeight: "bold",
    marginBottom: 4,
  },
  itemDesc: {
    fontSize: 16,
    fontStyle: "italic",
    color: "grey",
  },
  totalContainer: {
    padding: 16,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    marginTop: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    alignItems: "center",
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  totalValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "green",
  },
});
