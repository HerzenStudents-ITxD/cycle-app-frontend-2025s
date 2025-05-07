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
import asyncStorage from "@react-native-async-storage/async-storage/src/AsyncStorage";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createNativeStackNavigator();

// Запрещаем автоматическое скрытие splash screen
SplashScreen.preventAutoHideAsync();

export default function App() {
    const [appIsReady, setAppIsReady] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(null);


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

    useEffect(() => {
        const checkToken = async () => {
            try {
                const token = await AsyncStorage.getItem('Token');
                if (token) {
                    setIsLoggedIn(true);  // Если токен есть, считаем, что пользователь авторизован
                } else {
                    setIsLoggedIn(false); // Если токен нет, считаем, что нужно показать экран входа
                }
            } catch (error) {
                console.error('Ошибка при проверке токена:', error);
                setIsLoggedIn(false);  // В случае ошибки показываем экран входа
            }
        };
        checkToken(); // Вызываем проверку токена
    }, []); // Выполняется только один раз при старте приложения

    // Если состояние isLoggedIn ещё не определено, показываем загрузочный экран
    if (isLoggedIn === null) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }


    if (!appIsReady) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    let headElement = isLoggedIn ? "Home" : "Login";

    return (
        <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
            <NavigationContainer>
                <StatusBar style="auto" />
                <Stack.Navigator
                    initialRouteName={headElement}
                    screenOptions={{
                        headerShown: false,
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