import React, { useCallback, useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

// Импортируем компоненты экранов
import HomeScreen from './components/HomeScreen';
import SettingsScreen from './components/SettingsScreen';
import LoginScreen from './components/LoginScreen';
import CycleDurationScreen from './components/CycleDurationScreen';
import MenstruationLengthScreen from "./components/MenstruationLengthScreen";

const Stack = createNativeStackNavigator();

// Запрещаем автоматическое скрытие splash screen
SplashScreen.preventAutoHideAsync();

export default function App() {
    const [appIsReady, setAppIsReady] = useState(false);

    // Загружаем шрифты
    useEffect(() => {
        async function prepare() {
            try {
                await Font.loadAsync({
                    'Comfortaa-Regular': require('./assets/fonts/Comfortaa-Regular.ttf'),
                    'Comfortaa-Bold': require('./assets/fonts/Comfortaa-Bold.ttf'),
                });
            } catch (e) {
                console.warn('Ошибка загрузки шрифтов:', e);
            } finally {
                setAppIsReady(true);
            }
        }

        prepare();
    }, []);

    const onLayoutRootView = useCallback(async () => {
        if (appIsReady) {
            await SplashScreen.hideAsync();
        }
    }, [appIsReady]);

    if (!appIsReady) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
            <NavigationContainer>
                <StatusBar style="auto" />
                <Stack.Navigator
                    initialRouteName="Login"
                    screenOptions={{
                        headerTitleStyle: {
                            fontFamily: 'Comfortaa-Bold',
                            fontSize: 20,
                        },
                        headerTitleAlign: 'center',
                        contentStyle: {
                            fontFamily: 'Comfortaa-Regular',
                        }
                    }}
                >
                    <Stack.Screen
                        name="Login"
                        component={LoginScreen}
                        options={{
                            title: 'Вход',
                            headerTitleStyle: {
                                fontFamily: 'Comfortaa-Bold',
                            }
                        }}
                    />
                    <Stack.Screen
                        name="Home"
                        component={HomeScreen}
                        options={{
                            title: 'Главная',
                            headerTitleStyle: {
                                fontFamily: 'Comfortaa-Bold',
                            }
                        }}
                    />
                    <Stack.Screen
                        name="Settings"
                        component={SettingsScreen}
                        options={{
                            title: 'Настройки',
                            headerTitleStyle: {
                                fontFamily: 'Comfortaa-Bold',
                            }
                        }}
                    />
                    <Stack.Screen
                        name="CycleDuration"
                        component={CycleDurationScreen}
                        options={{
                            title: 'Длительность цикла',
                            headerTitleStyle: {
                                fontFamily: 'Comfortaa-Bold',
                            }
                        }}
                    />
                    <Stack.Screen
                        name="MenstruationLength"
                        component={MenstruationLengthScreen}
                        options={{
                            title: 'Длительность менструации',
                            headerTitleStyle: {
                                fontFamily: 'Comfortaa-Bold',
                            }
                        }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </View>
    );
}