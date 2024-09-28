import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getSales, storeSales, Sale } from '../utils/storage';

const AddSaleScreen = () => {
  const [product, setProduct] = useState('');
  const [amount, setAmount] = useState('');
  const navigation = useNavigation();

  const handleAddSale = async () => {
    if (!product || !amount) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const newSale: Sale = {
      id: Date.now().toString(),
      product,
      amount: parseFloat(amount),
      date: new Date().toISOString().split('T')[0],
    };

    try {
      const existingSales = await getSales();
      const updatedSales = [...existingSales, newSale];
      await storeSales(updatedSales);
      navigation.goBack();
    } catch (error) {
      console.error('Error adding sale:', error);
      Alert.alert('Error', 'Failed to add sale. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New Sale</Text>
      <TextInput
        style={styles.input}
        placeholder="Product Name"
        value={product}
        onChangeText={setProduct}
      />
      <TextInput
        style={styles.input}
        placeholder="Amount"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.button} onPress={handleAddSale}>
        <Text style={styles.buttonText}>Add Sale</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AddSaleScreen;