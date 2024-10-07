import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import BookAppointment from './BookAppointment';
import CurrentOrderScreen1 from './CurrentOrderScreen1';
import ProductDetailScreen1 from './ProductDetailScreen1';

const Tab = createBottomTabNavigator();

const Navigation = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName;
        switch (route.name) {
          case 'BookAppointment':
            iconName = 'calendar';
            break;
          case 'CurrentO1':
            iconName = 'cart';
            break;
          case 'PDetails1':
            iconName = 'person';
            break;
          default:
            iconName = 'home';
        }
        return <Icon name={iconName} size={size} color={color} />;
      },
    })}
    tabBarOptions={{
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    }}
  >
    <Tab.Screen name="BookAppointment" component={BookAppointment} />
    <Tab.Screen name="CurrentO1" component={CurrentOrderScreen1} />
    <Tab.Screen name="PDetails1" component={ProductDetailScreen1} />
  </Tab.Navigator>
);

export default Navigation;