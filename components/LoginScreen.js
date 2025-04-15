import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import * as Font from 'expo-font';

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [fontsLoaded, setFontsLoaded] = useState(false);

    // Цвета
    const accentColor = '#F4CDB0';
    const buttonTextColor = '#000000';
    const backgroundColor = '#FFFFFF';
    const textColor = '#000000';

    // Загрузка шрифтов
    useEffect(() => {
        async function loadFonts() {
            await Font.loadAsync({
                'Comfortaa-Regular': require('../assets/fonts/Comfortaa-Regular.ttf'),
                'Comfortaa-Bold': require('../assets/fonts/Comfortaa-Bold.ttf'),
            });
            setFontsLoaded(true);
        }
        loadFonts();
    }, []);

    if (!fontsLoaded) {
        return (
            <View style={[styles.container, { backgroundColor }]}>
                <ActivityIndicator size="large" color={accentColor} />
            </View>
        );
    }

    return (
        <View style={[styles.container, { backgroundColor }]}>
            {/* Заголовок */}
            <Text style={[styles.title, {
                fontFamily: 'Comfortaa-Bold',
                color: textColor
            }]}>
                вход
            </Text>

            {/* Поле почты - ТОЛЬКО ОБВОДКА */}
            <TextInput
                label="Почта"
                value={email}
                onChangeText={setEmail}
                mode="outlined"
                style={styles.input}
                theme={{
                    colors: {
                        primary: accentColor, // Цвет обводки
                        background: backgroundColor, // Прозрачный фон
                        text: textColor,
                        placeholder: '#888888',
                        surface: backgroundColor // Важно для прозрачности
                    },
                    fonts: {
                        regular: { fontFamily: 'Comfortaa-Regular' }
                    },
                    roundness: 6
                }}
                outlineColor={accentColor} // Обводка всегда акцентного цвета
                activeOutlineColor={accentColor}
                autoCapitalize="none"
            />

            {/* Кнопка - ПОЛНОСТЬЮ ЗАЛИТА ЦВЕТОМ */}
            <Button
                mode="contained"
                onPress={() => navigation.navigate('CycleDuration')}
                style={[styles.submitButton, {
                    backgroundColor: accentColor, // Полная заливка
                    borderColor: accentColor
                }]}
                labelStyle={[styles.buttonLabel, {
                    color: buttonTextColor,
                    fontFamily: 'Comfortaa-Regular'
                }]}
                contentStyle={{ height: 37 }}
            >
                Отправить код
            </Button>

            {/* Поле кода - ТОЛЬКО ОБВОДКА */}
            <TextInput
                label="Код"
                value={code}
                onChangeText={setCode}
                mode="outlined"
                style={styles.input}
                theme={{
                    colors: {
                        primary: accentColor,
                        background: backgroundColor,
                        text: textColor,
                        placeholder: '#888888',
                        surface: backgroundColor
                    },
                    fonts: {
                        regular: { fontFamily: 'Comfortaa-Regular' }
                    },
                    roundness: 6
                }}
                outlineColor={accentColor}
                activeOutlineColor={accentColor}
            />

            {/* Вторая кнопка */}
            <Button
                mode="contained"
                onPress={() => navigation.navigate('CycleDuration')}
                style={[styles.navButton, {
                    backgroundColor: backgroundColor // Полная заливка
                }]}
                labelStyle={[styles.buttonLabel, {
                    color: buttonTextColor,
                    fontFamily: 'Comfortaa-Regular'
                }]}
                contentStyle={{ height: 50 }}
            >
                Перейти на страницу Цикла
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
    },
    title: {
        fontSize: 24,
        marginBottom: 40,
        textAlign: 'center',
    },
    input: {
        marginBottom: 20,
        backgroundColor: 'transparent', // Прозрачный фон
    },
    submitButton: {
        marginBottom: 20,
        borderRadius: 4,
        width: '70%',
    },
    navButton: {
        borderRadius: 4,
        marginTop: 10
    },
    buttonLabel: {
        fontSize: 16,
        fontWeight: 'normal',
    },
});