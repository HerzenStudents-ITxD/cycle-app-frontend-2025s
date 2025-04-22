import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, useWindowDimensions } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import * as Font from 'expo-font';

const COLORS = {
    accent: '#F9E3D6',
    button: '#F4CDB0',
    black: '#000000',
    white: '#FFFFFF',
    gray: '#888888',
};

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [fontsLoaded, setFontsLoaded] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { width, height } = useWindowDimensions();

    const styles = createStyles({ width, height });

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

    const inputTheme = {
        colors: {
            primary: COLORS.accent,
            background: COLORS.white,
            text: COLORS.black,
            placeholder: COLORS.gray,
            surface: COLORS.white,
            accent: COLORS.accent,
            outline: COLORS.accent,
        },
        fonts: {
            regular: { fontFamily: 'Comfortaa-Regular' }
        },
        roundness: 6
    };

    const handleSendCode = async () => {
        if (!email.includes('@') || !email.includes('.')) {
            alert('Пожалуйста, введите корректный email');
            return;
        }
        setIsLoading(true);
        try {
            // Логика отправки кода...
            console.log('Код отправлен на:', email);
        } finally {
            setIsLoading(false);
        }
    };

    const handleNext = () => {
        if (!code) {
            alert('Пожалуйста, введите код');
            return;
        }
        navigation.navigate('CycleDuration');
    };

    if (!fontsLoaded) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color={COLORS.accent} />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.centeredContainer}>
                <Text style={styles.title}>вход</Text>

                <View style={styles.contentContainer}>
                    <Text style={styles.fieldLabel}>почта</Text>
                    <TextInput
                        value={email}
                        onChangeText={setEmail}
                        mode="outlined"
                        style={styles.input}
                        theme={inputTheme}
                        outlineColor={COLORS.accent}
                        activeOutlineColor={COLORS.accent}
                        autoCapitalize="none"
                        keyboardType="email-address"
                    />

                    <Button
                        mode="contained"
                        style={styles.submitButton}
                        labelStyle={styles.submitButtonLabel}
                        contentStyle={styles.submitButtonContent}
                        onPress={handleSendCode}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Отправка...' : 'отправить код'}
                    </Button>

                    <Text style={styles.fieldLabel}>код</Text>
                    <TextInput
                        value={code}
                        onChangeText={setCode}
                        mode="outlined"
                        style={styles.input}
                        theme={inputTheme}
                        outlineColor={COLORS.accent}
                        activeOutlineColor={COLORS.accent}
                        keyboardType="numeric"
                    />
                </View>

                <View style={styles.bottomButtonContainer}>
                    <Button
                        mode="contained"
                        onPress={handleNext}
                        style={styles.nextButton}
                        labelStyle={styles.nextButtonLabel}
                        contentStyle={styles.nextButtonContent}
                    >
                        далее
                    </Button>
                </View>
            </View>
        </View>
    );
}

const createStyles = ({ width = 375, height = 812 } = {}) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    centeredContainer: {
        flex: 1,
        width: width * 0.8, // 80% ширины экрана
        maxWidth: 400, // Максимальная ширина
        marginHorizontal: 'auto', // Центрирование по горизонтали
        alignSelf: 'center', // Важно для центрирования
        justifyContent: 'space-between', // Прижимаем кнопку "далее" к низу
        paddingVertical: 20,
    },
    title: {
        fontSize: 24,
        marginBottom: height * 0.1,
        marginTop: height * 0.15,
        color: '#000000',
        fontFamily: 'Comfortaa-Regular',
        textAlign: 'center',
    },
    contentContainer: {
        width: '100%',
        alignItems: 'flex-start', // Выравниваем элементы по левому краю
        flexGrow: 1, // Позволяет контейнеру растягиваться
    },
    fieldLabel: {
        fontSize: 18.1,
        marginBottom: 4,
        color: '#000000',
        fontFamily: 'Comfortaa-Regular',
        alignSelf: 'flex-start',
        width: '100%',
    },
    input: {
        marginBottom: 10,
        backgroundColor: 'transparent',
        width: '100%',
        height: 50,
    },
    submitButton: {
        marginBottom: 40,
        borderRadius: 4,
        width: '53%',
        height: 25,
        backgroundColor: '#F9E3D6',
        justifyContent: 'center',
        alignSelf: 'flex-start',
    },
    submitButtonLabel: {
        fontSize: 19.84,
        color: '#FFFFFF',
        fontFamily: 'Comfortaa-Regular',
        fontWeight: 'normal',
        marginHorizontal: 0,
        paddingVertical: 0,
    },
    submitButtonContent: {
        height: 50,
    },
    bottomButtonContainer: {
        width: '100%',
        alignItems: 'center',
        paddingBottom: '15%', // Добавляем отступ снизу
    },
    nextButton: {
        borderRadius: 4,
        backgroundColor: '#F4CDB0',
        width: '100%',
        height: 70,
        justifyContent: 'center',
    },
    nextButtonLabel: {
        fontSize: 27.68,
        color: '#FFFFFF',
        fontFamily: 'Comfortaa-Regular',
        fontWeight: 'normal',
        lineHeight: 27.68,
        paddingVertical: 0,
    },
    nextButtonContent: {
        height: 55,
    },
});