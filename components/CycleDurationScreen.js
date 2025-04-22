import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, Dimensions } from 'react-native';
import { Text, Button } from 'react-native-paper';
import * as Font from 'expo-font';
import { Picker } from '@react-native-picker/picker';


const { width, height } = Dimensions.get('window');
const marginLeft = width * 0.1;
const labelWidth = width * 0.7;
const marginFromBottom = height * 0.1;
const marginFromTop = height * 0.1;

export default function CycleDurationScreen({ navigation }) {
    const [days, setDays] = useState('5');
    const [fontsLoaded, setFontsLoaded] = useState(false);

    const accentColor = '#F4CDB0';
    const blackColor = '#000000';

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
            <Text style={styles.title}>длительность цикла</Text>



            <View style={styles.bottomButtonContainer}>
                <Button
                    mode="contained"
                    onPress={() => navigation.navigate('PeriodDuration')}
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
        backgroundColor: '#FFFFFF',
    },
    title: {
        fontSize: 24,
        marginTop: marginFromTop,
        marginBottom: height * 0.15,
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
        marginBottom: height * 0.02,
        color: '#000000',
        fontFamily: 'Comfortaa-Regular',
        alignSelf: 'flex-start',
        paddingLeft: marginLeft
    },
    pickerContainer: {
        width: labelWidth,
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: '#F4CDB0',
        borderRadius: 6,
        marginBottom: height * 0.05,
    },
    picker: {
        width: '100%',
        height: height * 0.07,
    },
    pickerItem: {
        fontSize: 16,
        fontFamily: 'Comfortaa-Regular',
    },
    bottomButtonContainer: {
        width: '100%',
        marginBottom: marginFromBottom,
        alignItems: 'center',
    },
    nextButton: {
        borderRadius: 4,
        backgroundColor: '#F4CDB0',
        width: labelWidth,
        height: height * 0.07,
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
        height: height * 0.07,
    },
});