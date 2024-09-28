import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Svg, Path } from 'react-native-svg';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { getObjectives, getSales, Objective, Sale } from '../utils/storage';

const DashboardScreen = () => {
  const navigation = useNavigation();
  const [objectives, setObjectives] = useState<Objective[]>([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalSales, setTotalSales] = useState(0);
  const [recentSales, setRecentSales] = useState<Sale[]>([]);

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        const storedObjectives = await getObjectives();
        setObjectives(storedObjectives);

        const storedSales = await getSales();
        const revenue = storedSales.reduce((sum, sale) => sum + sale.amount, 0);
        setTotalRevenue(revenue);
        setTotalSales(storedSales.length);

        const recent = storedSales.slice(-7).reverse();
        setRecentSales(recent);
      };
      fetchData();
    }, [])
  );

  const chartData = recentSales.map(sale => sale.amount);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Dashboard</Text>
      </View>
      <View style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>Total Revenue</Text>
        <Text style={styles.summaryAmount}>Kshs. {totalRevenue.toFixed(2)}</Text>
        <Text style={styles.summaryPeriod}>All Time</Text>
      </View>
      <View style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>Total Sales</Text>
        <Text style={styles.summaryAmount}>{totalSales}</Text>
        <Text style={styles.summaryPeriod}>All Time</Text>
      </View>
      <View style={styles.chartCard}>
        <Text style={styles.chartTitle}>Recent Sales Trend</Text>
        <Svg height="200" width="100%">
          <Path
            d={`M 0 200 ${chartData.map((value, index) => `L ${index * 50} ${200 - value}`).join(' ')}`}
            fill="none"
            stroke="#4CAF50"
            strokeWidth="3"
          />
        </Svg>
      </View>
      <View style={styles.objectivesContainer}>
        <View style={styles.objectivesHeader}>
          <Text style={styles.objectivesTitle}>Objectives</Text>
          <TouchableOpacity onPress={() => navigation.navigate('AddObjective')}>
            <FontAwesome name="plus" size={24} color="#4CAF50" />
          </TouchableOpacity>
        </View>
        {objectives.map((objective) => (
          <View key={objective.id} style={styles.objectiveCard}>
            <Text style={styles.objectiveTitle}>{objective.title}</Text>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill, 
                  { width: `${(objective.current / objective.target) * 100}%` }
                ]} 
              />
            </View>
            <Text style={styles.objectiveProgress}>
              {objective.current} / {objective.target}
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
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
  summaryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    margin: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  summaryTitle: {
    fontSize: 18,
    color: '#333333',
  },
  summaryAmount: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginVertical: 10,
  },
  summaryPeriod: {
    fontSize: 14,
    color: '#888888',
  },
  chartCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    margin: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333333',
  },
  objectivesContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    margin: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  objectivesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  objectivesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  objectiveCard: {
    marginBottom: 15,
  },
  objectiveTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 5,
  },
  progressBar: {
    height: 10,
    backgroundColor: '#E0E0E0',
    borderRadius: 5,
    marginBottom: 5,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 5,
  },
  objectiveProgress: {
    fontSize: 14,
    color: '#888888',
  },
});

export default DashboardScreen;