// components/LoginScreen.js
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function CycleDurationScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Text>Страница Цикла</Text>

            <Button
                title="Перейти на страницу Менструации"
                onPress={() => navigation.navigate('MenstruationLength')} //
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
