import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { getSales, Sale } from '../utils/storage';

const SalesScreen = () => {
  const [sales, setSales] = useState<Sale[]>([]);
  const navigation = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      const fetchSales = async () => {
        const storedSales = await getSales();
        setSales(storedSales);
      };
      fetchSales();
    }, [])
  );

  const renderSaleItem = ({ item }: { item: Sale }) => (
    <View style={styles.saleItem}>
      <View style={styles.saleIcon}>
        <FontAwesome name="shopping-cart" size={24} color="#4CAF50" />
      </View>
      <View style={styles.saleDetails}>
        <Text style={styles.saleProduct}>{item.product}</Text>
        <Text style={styles.saleDate}>{item.date}</Text>
      </View>
      <Text style={styles.saleAmount}>Kshs. {item.amount.toFixed(2)}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Sales</Text>
      </View>
      <FlatList
        data={sales}
        renderItem={renderSaleItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
      />
      <TouchableOpacity 
        style={styles.addButton}
        onPress={() => navigation.navigate('AddSale')}
      >
        <FontAwesome name="plus" size={24} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#4CAF50',
    padding: 20,
    paddingTop: 60,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  listContent: {
    padding: 20,
  },
  saleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  saleIcon: {
    backgroundColor: '#E8F5E9',
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saleDetails: {
    flex: 1,
    marginLeft: 15,
  },
  saleProduct: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  saleDate: {
    fontSize: 14,
    color: '#888888',
  },
  saleAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  addButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#4CAF50',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default SalesScreen;