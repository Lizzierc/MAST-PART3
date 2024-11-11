import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';

interface MenuItem {
  id: string;
  name: string;
  course: string;
  price: number;
}

// Updated menu items with prices in ZAR
const updatedMenuItems: MenuItem[] = [
  { id: '1', name: 'Bruschetta', course: 'Starters', price: 100.00 },
  { id: '2', name: 'Stuffed Mushrooms', course: 'Starters', price: 120.00 },
  { id: '3', name: 'Grilled Salmon', course: 'Mains', price: 250.00 },
  { id: '4', name: 'Vegetable Stir-fry', course: 'Mains', price: 210.00 },
  { id: '5', name: 'Chicken Parmesan', course: 'Mains', price: 230.00 },
  { id: '6', name: 'Tiramisu', course: 'Desserts', price: 130.00 },
  { id: '7', name: 'Lemon Sorbet', course: 'Desserts', price: 90.00 },
  { id: '8', name: 'Panna Cotta', course: 'Desserts', price: 150.00 },
  { id: '9', name: 'Caesar Salad', course: 'Starters', price: 80.00 },
  { id: '10', name: 'Chicken Wings', course: 'Starters', price: 110.00 },
  { id: '11', name: 'Beef Wellington', course: 'Mains', price: 350.00 },
  { id: '12', name: 'Lasagna', course: 'Mains', price: 180.00 },
  { id: '13', name: 'Chocolate Cake', course: 'Desserts', price: 160.00 },
  { id: '14', name: 'Apple Pie', course: 'Desserts', price: 110.00 },
  { id: '15', name: 'Spring Rolls', course: 'Starters', price: 90.00 },
];

const HomeScreen: React.FC = () => {
  const navigation = useNavigation();
  const [selectedCourse, setSelectedCourse] = useState<string>(''); // State for dropdown selection

  // Filter the menu items based on the selected course
  const filteredItems = selectedCourse
    ? updatedMenuItems.filter(item => item.course === selectedCourse)
    : [];

  const calculateAveragePrice = (course: string): string => {
    const filteredItems = updatedMenuItems.filter(item => item.course === course);
    if (filteredItems.length === 0) return '0.00';
    const totalPrice = filteredItems.reduce((acc, item) => acc + item.price, 0);
    const averagePrice = totalPrice / filteredItems.length;
    return averagePrice.toFixed(2);
  };

  const navigateToCourse = (course: string) => {
    if (course) {
      navigation.navigate('Guest Menu', { course });
      setSelectedCourse(''); // Reset selection after navigation
    }
  };

  return (
    <View style={styles.container}>
      {/* Grouped header and average price display */}
      <View style={styles.averagePriceSection}>
        <Text style={styles.header}>Average Menu Prices</Text>
        <View style={styles.averagePriceContainer}>
          <Text style={styles.averagePriceText}>Starters: R{calculateAveragePrice('Starters')}</Text>
          <Text style={styles.averagePriceText}>Mains: R{calculateAveragePrice('Mains')}</Text>
          <Text style={styles.averagePriceText}>Desserts: R{calculateAveragePrice('Desserts')}</Text>
        </View>
      </View>

      {/* Dropdown for course selection */}
      <View style={styles.pickerContainer}>
        <Text style={styles.pickerLabel}>Select a Course:</Text>
        <Picker
          selectedValue={selectedCourse}
          style={styles.picker}
          onValueChange={(itemValue) => setSelectedCourse(itemValue)}
        >
          <Picker.Item label="Choose a course..." value="" />
          <Picker.Item label="Starters" value="Starters" />
          <Picker.Item label="Mains" value="Mains" />
          <Picker.Item label="Desserts" value="Desserts" />
        </Picker>
      </View>

      {/* Display menu items for selected course */}
      {selectedCourse && (
        <FlatList
          data={filteredItems}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Text style={styles.itemText}>{item.name}</Text>
              <Text style={styles.itemPrice}>R{item.price.toFixed(2)}</Text>
              <TouchableOpacity style={styles.orderButton} onPress={() => alert(`Ordered: ${item.name}`)}>
                <Text style={styles.buttonText}>Order</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}

      {/* Button to navigate to Manage Menu */}
      <TouchableOpacity style={styles.manageButton} onPress={() => navigation.navigate('Manage Menu')}>
        <Text style={styles.buttonText}>Create Menu</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // White background
    padding: 16,
    alignItems: 'center',
  },
  averagePriceSection: {
    alignItems: 'center',
    marginBottom: 20, // Space between this section and the dropdown
  },
  header: {
    fontSize: 24,
    color: '#000', // Black text
    textAlign: 'center',
    marginBottom: 10, // Reduced spacing to bring the title closer to the average prices
  },
  averagePriceContainer: {
    alignItems: 'center',
  },
  averagePriceText: {
    color: '#000', // Black text for readability
    fontSize: 20,
    marginVertical: 3, // Reduced vertical spacing between price items for a compact display
  },
  pickerContainer: {
    width: '80%',
    backgroundColor: '#f0f0f0', // Light gray background for the picker container
    borderRadius: 8,
    marginBottom: 20,
  },
  pickerLabel: {
    color: '#000', // Black text for picker label
    fontSize: 18,
    paddingVertical: 8,
    textAlign: 'center',
  },
  picker: {
    color: '#000', // Black text for the picker options
    fontSize: 16,
    height: 40,
  },
  itemContainer: {
    backgroundColor: '#f8f8f8', // Light gray background for each dish item
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    width: '90%', // Take up most of the width of the container
    alignItems: 'center',
  },
  itemText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemPrice: {
    fontSize: 16,
    color: '#555',
    marginVertical: 5,
  },
  orderButton: {
    backgroundColor: '#28a745', // Green button for "Order"
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: 100,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff', // White text on green button
    fontSize: 16,
    fontWeight: '600',
  },
  manageButton: {
    backgroundColor: '#28a745', // Green button background
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginVertical: 20,
    width: '80%',
    alignItems: 'center',
  },
});

export default HomeScreen;
