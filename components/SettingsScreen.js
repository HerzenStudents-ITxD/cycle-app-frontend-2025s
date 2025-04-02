// components/SettingsScreen.js
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function SettingsScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Text>Страница Настройки</Text>
            <Text>Настройки приложения</Text>
            <Button
                title="Вернуться назад"
                onPress={() => navigation.goBack()}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
