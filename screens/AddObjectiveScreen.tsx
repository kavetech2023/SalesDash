import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getObjectives, storeObjectives, Objective } from '../utils/storage';

const AddObjectiveScreen = () => {
  const [title, setTitle] = useState('');
  const [target, setTarget] = useState('');
  const navigation = useNavigation();

  const handleAddObjective = async () => {
    if (!title || !target) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const newObjective: Objective = {
      id: Date.now().toString(),
      title,
      target: parseFloat(target),
      current: 0,
    };

    try {
      const existingObjectives = await getObjectives();
      const updatedObjectives = [...existingObjectives, newObjective];
      await storeObjectives(updatedObjectives);
      navigation.goBack();
    } catch (error) {
      console.error('Error adding objective:', error);
      Alert.alert('Error', 'Failed to add objective. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New Objective</Text>
      <TextInput
        style={styles.input}
        placeholder="Objective Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Target Amount"
        value={target}
        onChangeText={setTarget}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.button} onPress={handleAddObjective}>
        <Text style={styles.buttonText}>Add Objective</Text>
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

export default AddObjectiveScreen;