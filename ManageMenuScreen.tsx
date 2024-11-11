import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { MenuItem } from './App';

interface Props {
  menuItems: MenuItem[];
  setMenuItems: React.Dispatch<React.SetStateAction<MenuItem[]>>;
}

const ManageMenuScreen: React.FC<Props> = ({ menuItems = [], setMenuItems }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [course, setCourse] = useState('Starters');

  const addItem = () => {
    if (name && price) {
      const newItem: MenuItem = {
        id: (menuItems.length + 1).toString(),
        name,
        price: parseFloat(price),
        course,
      };
      setMenuItems([...menuItems, newItem]);
      setName('');
      setPrice('');
    } else {
      alert('Please enter a valid name and price.');
    }
  };

  const removeItem = (id: string) => {
    setMenuItems(menuItems.filter((item) => item.id !== id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add Menu Item</Text>
      <TextInput
        style={styles.input}
        placeholder="Item Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Price"
        keyboardType="numeric"
        value={price}
        onChangeText={setPrice}
      />
      <TouchableOpacity style={styles.addButton} onPress={addItem}>
        <Text style={styles.buttonText}>Add Item</Text>
      </TouchableOpacity>

      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.text}>{`${item.name} - R${item.price.toFixed(2)}`}</Text>
            <TouchableOpacity style={styles.removeButton} onPress={() => removeItem(item.id)}>
              <Text style={styles.buttonText}>Remove</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // White background
    padding: 16,
  },
  header: {
    fontSize: 24,
    color: '#000', // Black header for contrast
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#f0f0f0', // Light gray for input fields
    marginBottom: 12,
    padding: 12,
    borderRadius: 5,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#28a745', // Green background for item
    borderRadius: 5,
    marginVertical: 8,
  },
  text: {
    color: '#fff', // White text for better contrast
    fontSize: 20, // Larger text for better readability
  },
  addButton: {
    backgroundColor: '#28a745', // Green button background
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginVertical: 8,
    width: '80%', // Consistent width for the button
    alignItems: 'center',
  },
  removeButton: {
    backgroundColor: '#dc3545', // Red background for remove button
    paddingVertical: 6,
    paddingHorizontal: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff', // White text
    fontSize: 16,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});

export default ManageMenuScreen;
