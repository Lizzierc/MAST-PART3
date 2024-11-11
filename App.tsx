import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './secondpage';
import ManageMenuScreen from './ManageMenuScreen';
import GuestMenuScreen from './GuestMenuScreen';

const Stack = createStackNavigator();

export interface MenuItem {
  id: string;
  name: string;
  course: string;
  price: number;
}

const App: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    { id: '1', name: 'Bruschetta', course: 'Starters', price: 8.50 },
    { id: '2', name: 'Caesar Salad', course: 'Starters', price: 7.00 },
    { id: '3', name: 'Grilled Chicken', course: 'Mains', price: 15.00 },
    { id: '4', name: 'Spaghetti Carbonara', course: 'Mains', price: 12.50 },
    { id: '5', name: 'Cheesecake', course: 'Desserts', price: 6.00 },
    { id: '6', name: 'Chocolate Mousse', course: 'Desserts', price: 5.50 },
  ]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" options={{ headerShown: false }}>
          {(props) => <HomeScreen {...props} menuItems={menuItems} />}
        </Stack.Screen>
        <Stack.Screen name="Manage Menu" options={{ title: 'Manage Menu' }}>
          {(props) => (
            <ManageMenuScreen {...props} menuItems={menuItems} setMenuItems={setMenuItems} />
          )}
        </Stack.Screen>
        <Stack.Screen name="Guest Menu">
          {(props) => <GuestMenuScreen {...props} menuItems={menuItems} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

