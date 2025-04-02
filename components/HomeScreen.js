// components/HomeScreen.js
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Text>4</Text>
            <Button
                title="Перейти на страницу Настройки"
                onPress={() => navigation.navigate('Settings')}
            />
            <Button
                title="Перейти на страницу Входа"
                onPress={() => navigation.navigate('Login')} // Кнопка для перехода на страницу Входа
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
