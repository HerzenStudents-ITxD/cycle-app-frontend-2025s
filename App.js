import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Импортируем компоненты экранов
import HomeScreen from './components/HomeScreen';
import SettingsScreen from './components/SettingsScreen';
import LoginScreen from './components/LoginScreen'; // Импортируем страницу входа
import CycleDurationScreen from './components/CycleDurationScreen';
import MenstruationLengthScreen from "./components/MenstruationLengthScreen"; // Импортируем страницу входа

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Settings" component={SettingsScreen} />
                <Stack.Screen name="CycleDuration" component={CycleDurationScreen} />
                <Stack.Screen name="MenstruationLength" component={MenstruationLengthScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
