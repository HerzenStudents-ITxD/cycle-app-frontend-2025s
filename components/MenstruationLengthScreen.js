// components/LoginScreen.js
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function MenstruationLengthScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Text>Страница Длительности Менструации</Text>
            <Button
                title="Перейти на главную страницу"
                onPress={() => navigation.navigate('Home')}
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
