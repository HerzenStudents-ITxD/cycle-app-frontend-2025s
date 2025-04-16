import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    Text,
    TouchableOpacity,
    Image,
    PanResponder
} from 'react-native';
import { Button } from 'react-native-paper';

const { width, height } = Dimensions.get('window');
const labelWidth1 = width * 0.7;

export default function CycleDurationScreen({ navigation }) {
    const [selectedDay, setSelectedDay] = useState(15);
    const [swipeY, setSwipeY] = useState(0);
    const accentColor = '#F4CDB0';

    const handleDecrement = () => {
        if (selectedDay > 1) {
            setSelectedDay(prev => prev - 1);
        }
    };

    const handleIncrement = () => {
        if (selectedDay < 31) {
            setSelectedDay(prev => prev + 1);
        }
    };

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: (evt, gestureState) => {
            // Чувствительность свайпа
            const sensitivity = 5;
            if (gestureState.dy > sensitivity) {
                handleDecrement();
            } else if (gestureState.dy < -sensitivity) {
                handleIncrement();
            }
        },
        onPanResponderRelease: () => {
            setSwipeY(0);
        }
    });

    return (
        <View style={styles.container}>
            {/* Кнопка "Назад" */}
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.navigate('Login')}
            >
                <Image
                    source={require('../assets/backButton.png')}
                    style={styles.backButtonImage}
                    resizeMode="contain"
                />
            </TouchableOpacity>

            {/* Заголовок */}
            <View style={styles.titleContainer}>
                <Text style={styles.titleLine}>длительность</Text>
                <Text style={styles.titleLine}>цикла</Text>
            </View>

            {/* Колесо выбора */}
            <View
                style={styles.pickerContainer}
                {...panResponder.panHandlers}
            >
                <TouchableOpacity
                    style={styles.numberTouchArea}
                    onPress={handleDecrement}
                    activeOpacity={0.6}
                >
                    <Text style={styles.smallNumber}>
                        {selectedDay > 1 ? selectedDay - 1 : ''}
                    </Text>
                </TouchableOpacity>

                <Text style={styles.selectedNumber}>{selectedDay}</Text>

                <TouchableOpacity
                    style={styles.numberTouchArea}
                    onPress={handleIncrement}
                    activeOpacity={0.6}
                >
                    <Text style={styles.smallNumber}>
                        {selectedDay < 31 ? selectedDay + 1 : ''}
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Кнопка "Не знаю" */}
            <Button
                mode="contained"
                style={styles.unknownButton}
                labelStyle={styles.unknownButtonLabel}
                contentStyle={styles.unknownButtonContent}
                onPress={() => navigation.navigate('MenstruationLength')}
            >
                не знаю
            </Button>

            {/* Кнопка "Далее" */}
            <View style={styles.bottomButtonContainer}>
                <Button
                    mode="contained"
                    onPress={() => navigation.navigate('MenstruationLength', { cycleLength: selectedDay })}
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
    backButton: {
        position: 'absolute',
        top: 40,
        left: 24,
        zIndex: 1,
        padding: 10,
    },
    backButtonImage: {
        width: 24,
        height: 24,
    },
    titleContainer: {
        marginTop: 80,
        marginBottom: 40,
        alignItems: 'center',
    },
    titleLine: {
        fontSize: 24,
        color: '#000000',
        fontFamily: 'Comfortaa-Regular',
        textAlign: 'center',
    },
    pickerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        width: '100%',
    },
    numberTouchArea: {
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    selectedNumber: {
        fontSize: 48,
        color: '#F4CDB0',
        fontFamily: 'Comfortaa-Regular',
        marginVertical: 10,
        paddingVertical: 20,
    },
    smallNumber: {
        fontSize: 24,
        color: '#888888',
        fontFamily: 'Comfortaa-Regular',
        paddingVertical: 10,
    },
    unknownButton: {
        marginBottom: 30,
        borderRadius: 4,
        width: '53%',
        height: 40,
        backgroundColor: '#F4CDB0',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    unknownButtonLabel: {
        fontSize: 19.84,
        color: '#FFFFFF',
        fontFamily: 'Comfortaa-Regular',
        fontWeight: 'normal',
        marginHorizontal: 0,
        paddingVertical: 0,
    },
    unknownButtonContent: {
        height: 40,
    },
    bottomButtonContainer: {
        width: '100%',
        marginBottom: 24,
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