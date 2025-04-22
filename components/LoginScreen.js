import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, Dimensions } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import * as Font from 'expo-font';

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [fontsLoaded, setFontsLoaded] = useState(false);
    const [dimensions, setDimensions] = useState(() => Dimensions.get('window'));

    const accentColor = '#F4CDB0';
    const blackColor = '#000000';

    const styles = createStyles(dimensions);

    useEffect(() => {
        const subscription = Dimensions.addEventListener('change', ({ window }) => {
            setDimensions(window);
        });
        return () => subscription?.remove();
    }, []);

    const inputTheme = {
        colors: {
            primary: accentColor,
            background: '#FFFFFF',
            text: blackColor,
            placeholder: '#888888',
            surface: '#FFFFFF',
            accent: accentColor,
            outline: accentColor
        },
        fonts: {
            regular: { fontFamily: 'Comfortaa-Regular' }
        },
        roundness: 6
    };

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
            <View style={styles.container}>
                <ActivityIndicator size="large" color={accentColor} />
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
                        outlineColor={accentColor}
                        activeOutlineColor={accentColor}
                    />

                    <Button
                        mode="contained"
                        style={styles.submitButton}
                        labelStyle={styles.submitButtonLabel}
                        contentStyle={styles.submitButtonContent}
                    >
                        отправить код
                    </Button>

                    <Text style={styles.fieldLabel}>код</Text>
                    <TextInput
                        value={code}
                        onChangeText={setCode}
                        mode="outlined"
                        style={styles.input}
                        theme={inputTheme}
                        outlineColor={accentColor}
                        activeOutlineColor={accentColor}
                    />
                </View>

                <View style={styles.bottomButtonContainer}>
                    <Button
                        mode="contained"
                        onPress={() => navigation.navigate('CycleDuration')}
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
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
    centeredContainer: {
        width: width * 0.8, // 80% ширины экрана
        maxWidth: 400, // Максимальная ширина для больших экранов
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        marginBottom: height * 0.1,
        color: '#000000',
        fontFamily: 'Comfortaa-Regular',
        textAlign: 'center',
    },
    contentContainer: {
        width: '100%',
        alignItems: 'center',
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
        backgroundColor: '#F4CDB0',
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
        marginTop: 20,
        marginBottom: height * 0.05,
        alignItems: 'center',
    },
    nextButton: {
        borderRadius: 4,
        backgroundColor: '#F4CDB0',
        width: '100%',
        height: 55,
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