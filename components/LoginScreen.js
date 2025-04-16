import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, Dimensions } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import * as Font from 'expo-font';

const { width } = Dimensions.get('window');
const marginLeft = width * 0.1;
const labelWidth1 = width * 0.7;

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [fontsLoaded, setFontsLoaded] = useState(false);

    const accentColor = '#F4CDB0';
    const blackColor = '#000000';

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
            {/* Заголовок вынесен отдельно перед основным контентом */}
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
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        backgroundColor: '#FFFFFF',
    },
    title: {
        fontSize: 24,
        marginTop: 80,
        marginBottom: 80, // Увеличено с 20 до 40 (или любое другое значение)
        color: '#000000',
        fontFamily: 'Comfortaa-Regular',
        textAlign: 'center',
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        width: '100%',
    },
    fieldLabel: {
        fontSize: 18.1,
        marginBottom: 4,
        color: '#000000',
        fontFamily: 'Comfortaa-Regular',
        alignSelf: 'flex-start',
        paddingLeft: marginLeft
    },
    input: {
        marginBottom: 10,
        backgroundColor: 'transparent',
        width: labelWidth1,
        height: 50,
        alignSelf: 'center',
    },
    submitButton: {
        marginBottom: 40,
        borderRadius: 4,
        width: '53%',
        height: 25,
        backgroundColor: '#F4CDB0',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-start',
        marginLeft: marginLeft,
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
        height: 37,
    },
    bottomButtonContainer: {
        width: '100%',
        marginBottom: 70,
        alignItems: 'center',
    },
    nextButton: {
        borderRadius: 4,
        backgroundColor: '#F4CDB0',
        width: labelWidth1,
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