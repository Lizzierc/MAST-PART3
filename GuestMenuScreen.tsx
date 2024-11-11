import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { MenuItem } from './App';

interface Props {
  menuItems: MenuItem[];
}

const GuestMenuScreen: React.FC<Props> = ({ menuItems = [] }) => {
  const route = useRoute<RouteProp<{ params: { course: string } }, 'params'>>();
  const { course } = route.params;

  // Safe filter check to avoid crashes
  const filteredItems = menuItems?.filter((item) => item.course === course) || [];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{course} Menu</Text>
      {filteredItems.length > 0 ? (
        <FlatList
          data={filteredItems}
          keyExtractor={(item) => item.id.toString()} // Ensure the key is a string
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <View style={styles.itemTextContainer}>
                <Text style={styles.itemText}>{`${item.name} - R${item.price.toFixed(2)}`}</Text>
              </View>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Order</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      ) : (
        <Text style={styles.noItemsText}>No items found for this course.</Text>
      )}
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
    color: '#000', // Black text
    marginBottom: 20,
    textAlign: 'center',
  },
  itemContainer: {
    backgroundColor: '#28a745', // Green background for items
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemTextContainer: {
    flex: 1, // Allows text to fill available space
  },
  itemText: {
    color: '#fff', // White text for contrast
    fontSize: 20,
  },
  noItemsText: {
    color: '#aaa', // Light gray text for "No items" message
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#28a745', // Green button for "Order"
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: 100,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff', // White text on green button
    fontSize: 16,
    fontWeight: '600',
  },
});

export default GuestMenuScreen;
