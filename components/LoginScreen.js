// components/LoginScreen.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, TextInput, Button, useTheme } from 'react-native-paper';

export default function LoginScreen({ navigation }) {
    const theme = useTheme();
    const [email, setEmail] = React.useState('');
    const [code, setCode] = React.useState('');

    // Цвета из задания
    const accentColor = '#F4CDB0';
    const buttonTextColor = '#000000';

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <Text variant="displaySmall" style={styles.title}>
                вход
            </Text>

            <TextInput
                label="Почта"
                value={email}
                onChangeText={setEmail}
                mode="outlined"
                style={styles.input}
                theme={{
                    colors: {
                        primary: accentColor,
                        outline: accentColor,
                    },
                    roundness: 6
                }}
                autoCapitalize="none"
            />

            <View style={styles.buttonAlignContainer}>
                <Button
                    mode="contained"
                    onPress={() => navigation.navigate('CycleDuration')}
                    style={[styles.submitButton, {
                        backgroundColor: accentColor,
                        borderRadius: 4
                    }]}
                    labelStyle={[styles.buttonLabel, { color: buttonTextColor }]}
                    theme={{
                        roundness: 1
                    }}
                >
                    Отправить код
                </Button>
            </View>

            <TextInput
                label="Код"
                value={code}
                onChangeText={setCode}
                mode="outlined"
                style={styles.input}
                theme={{
                    colors: {
                        primary: accentColor,
                        outline: accentColor,
                    },
                    roundness: 6
                }}
            />

            <Button
                mode="outlined"
                onPress={() => navigation.navigate('CycleDuration')}
                style={[styles.navButton, {
                    borderColor: accentColor,
                    borderRadius: 4
                }]}
                labelStyle={[styles.buttonLabel, { color: accentColor }]}
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
    },
    title: {
        marginBottom: 40,
        fontWeight: 'bold',
        fontSize: 24,
        alignSelf: 'center'
    },
    input: {
        width: '100%',
        marginBottom: 20,
    },
    buttonAlignContainer: {
        width: '100%',
        marginBottom: 20,
        alignItems: 'flex-start' // Это выравнивает кнопку влево
    },
    submitButton: {
        paddingVertical: 0,
        paddingHorizontal: 24,
        height: 36,
    },
    navButton: {
        width: '100%',
        paddingVertical: 8,
        marginTop: 20,
        borderWidth: 1,
    },
    buttonLabel: {
        fontSize: 16,
    },
});