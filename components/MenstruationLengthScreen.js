import React, { useState, useEffect, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    View,
    StyleSheet,
    ActivityIndicator,
    useWindowDimensions,
    FlatList,
    Text as RNText,
    Image,
    TouchableOpacity
} from 'react-native';
import { Text, Button } from 'react-native-paper';
import * as Font from 'expo-font';

const COLORS = {
    accent: '#FABDC2',
    highlight: '#F9E3D6',
    black: '#000000',
    white: '#FFFFFF',
    gray: '#CCCCCC',
    transparentWhite: 'rgba(255, 255, 255, 0.7)',
};

const SIZES = {
    itemHeight: 70,
    visibleItems: 5,
};

export default function CycleDurationScreen({route, navigation }) {
    const { email, tempToken, cycleLength } = route.params;
    console.log(email);
    console.log(tempToken);
    console.log(cycleLength);

    const [selectedDay, setSelectedDay] = useState(5);
    const [fontsLoaded, setFontsLoaded] = useState(false);
    const { width, height } = useWindowDimensions();
    const flatListRef = useRef(null);

    const days = Array.from({ length: 10 }, (_, i) => i + 1);
    const styles = createStyles({ width, height }, SIZES.itemHeight, SIZES.visibleItems);

    useEffect(() => {
        (async () => {
            try {
                await Font.loadAsync({
                    'Comfortaa-Regular': require('../assets/fonts/Comfortaa-Regular.ttf'),
                    'Comfortaa-Bold': require('../assets/fonts/Comfortaa-Bold.ttf'),
                });
                setFontsLoaded(true);
            } catch (e) {
                console.error('Font loading error:', e);
            }
        })();
    }, []);

    useEffect(() => {
        flatListRef.current?.scrollToIndex({
            index: selectedDay - 1,
            animated: false,
        });
    }, [fontsLoaded]);

    const handleScroll = (event) => {
        const y = event.nativeEvent.contentOffset.y;
        const index = Math.round(y / SIZES.itemHeight);
        if (days[index] !== selectedDay) {
            setSelectedDay(days[index]);
        }
    };

    const handleMomentumScrollEnd = (event) => {
        const y = event.nativeEvent.contentOffset.y;
        const index = Math.round(y / SIZES.itemHeight);
        setSelectedDay(days[index]);
    };

    // const handleNavigate = () => {
    //     navigation.navigate('Home', {"email": email, "tempToken": tempToken, "cycleLength": cycleLength, "periodLength": selectedDay});
    // };

    const handleNavigate = async(useDefault = false) => {

        const response = await fetch("http://knafchik.lan:5000/api/auth/register", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "email": email,
                "tempToken": tempToken,
                "cycleLength": cycleLength,
                "periodLength": useDefault ? 0 : selectedDay
            })
        });

        const data = await response.json();
        console.log('Код подтверждён:', data);
        await AsyncStorage.setItem('Token', data.token);
        navigation.navigate('Home');

    }

    if (!fontsLoaded) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color={COLORS.accent} />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.navigate('CycleDuration')}
            >
                <Image
                    source={require('../assets/backButton.png')}
                    style={styles.backButtonImage}
                    resizeMode="contain"
                />
            </TouchableOpacity>

            <View style={styles.centeredContainer}>
                <Text style={styles.title}>длительность{'\n'}менструации</Text>

                <View style={styles.scrollPickerContainer}>
                    <View style={styles.scrollPickerHighlightBackground} />
                    <View style={[styles.scrollPickerMask, styles.scrollPickerMaskTop]} />

                    <FlatList
                        ref={flatListRef}
                        data={days}
                        keyExtractor={(item) => item.toString()}
                        renderItem={({ item }) => {
                            const isSelected = selectedDay === item;
                            return (
                                <View style={[styles.scrollPickerItem, { height: SIZES.itemHeight }]}>
                                    <RNText style={[
                                        styles.scrollPickerItemText,
                                        isSelected && styles.scrollPickerItemTextSelected,
                                        isSelected && { lineHeight: SIZES.itemHeight }
                                    ]}>
                                        {item}
                                    </RNText>
                                </View>
                            );
                        }}
                        getItemLayout={(data, index) => ({
                            length: SIZES.itemHeight,
                            offset: SIZES.itemHeight * index,
                            index,
                        })}
                        showsVerticalScrollIndicator={false}
                        snapToInterval={SIZES.itemHeight}
                        decelerationRate="fast"
                        onScroll={handleScroll}
                        scrollEventThrottle={16}
                        onMomentumScrollEnd={handleMomentumScrollEnd}
                        initialNumToRender={30}
                        windowSize={11}
                        maxToRenderPerBatch={30}
                        updateCellsBatchingPeriod={50}
                        contentContainerStyle={{
                            paddingTop: SIZES.itemHeight * Math.floor(SIZES.visibleItems / 2),
                            paddingBottom: SIZES.itemHeight * Math.floor(SIZES.visibleItems / 2),
                        }}
                    />

                    <View style={[styles.scrollPickerMask, styles.scrollPickerMaskBottom]} />
                </View>

                {/* Кнопка "Не знаю" */}
                <View style={styles.dontKnowButtonContainer}>
                    <Button
                        mode="contained"
                        onPress={()=> handleNavigate (true)}
                        style={styles.dontKnowButton}
                        labelStyle={styles.dontKnowButtonLabel}
                        contentStyle={styles.dontKnowButtonContent}
                    >
                        не знаю
                    </Button>
                </View>

                {/* Кнопка "Далее" */}
                <View style={styles.bottomButtonContainer}>
                    <Button
                        mode="contained"
                        onPress={()=> handleNavigate(false)}
                        style={styles.startButton}
                        labelStyle={styles.startButtonLabel}
                        contentStyle={styles.startButtonContent}
                    >
                        начать
                    </Button>
                </View>
            </View>
        </View>
    );
}

const createStyles = ({ width, height }, itemHeight, visibleItems) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    backButton: {
        position: 'absolute',
        top: height * 0.15,
        left: 20,
        zIndex: 10,
        padding: 10,
    },
    backButtonImage: {
        // width: 24,
        // height: 24,
    },
    centeredContainer: {
        flex: 1,
        width: width * 0.8,
        maxWidth: 400,
        alignSelf: 'center',
        justifyContent: 'space-between',
        paddingVertical: 20,
    },
    title: {
        fontSize: 24,
        marginTop: height * 0.15,
        color: COLORS.black,
        fontFamily: 'Comfortaa-Regular',
        textAlign: 'center',
    },
    scrollPickerContainer: {
        width: '100%',
        height: itemHeight * visibleItems,
        position: 'relative',
        marginBottom: 0, // Уменьшил отступ снизу для пикера
        overflow: 'hidden',
    },
    scrollPickerHighlightBackground: {
        position: 'absolute',
        top: itemHeight * Math.floor(visibleItems / 2) + 2,
        left: 0,
        right: 0,
        height: itemHeight - 4,
        backgroundColor: COLORS.highlight,
        borderRadius: 4,
        zIndex: 0,
    },
    scrollPickerMask: {
        position: 'absolute',
        left: 0,
        right: 0,
        height: itemHeight,
        backgroundColor: COLORS.transparentWhite,
        zIndex: 2,
    },
    scrollPickerMaskTop: {
        top: 0,
    },
    scrollPickerMaskBottom: {
        bottom: 0,
    },
    scrollPickerItem: {
        justifyContent: 'center',
        alignItems: 'center',
        height: itemHeight,
    },
    scrollPickerItemText: {
        fontSize: 50,
        fontFamily: 'Comfortaa-Regular',
        color: COLORS.gray,
        textAlign: 'center',
        textAlignVertical: 'center',
        includeFontPadding: false,
        paddingTop: 0,
        paddingBottom: 0,
        marginTop: -2,
        marginBottom: -2,
    },
    scrollPickerItemTextSelected: {
        fontSize: 60,
        color: COLORS.black,
        fontFamily: 'Comfortaa-Regular',
        textAlign: 'center',
        textAlignVertical: 'center',
        includeFontPadding: false,
        paddingTop: 0,
        paddingBottom: 0,
        marginTop: 1,
        marginBottom: -4,
        lineHeight: itemHeight - 4,
    },
    // Стили для кнопки "Не знаю"
    dontKnowButtonContainer: {
        width: '100%',
        alignItems: 'center',
    },
    dontKnowButton: {
        borderRadius: 4,
        width: '53%',
        height: 30,
        backgroundColor: '#F9E3D6',
        justifyContent: 'center',
    },
    dontKnowButtonLabel: {
        fontSize: 19.84,
        color: '#FFFFFF',
        fontFamily: 'Comfortaa-Regular',
        fontWeight: 'normal',
        marginHorizontal: 0,
        paddingVertical: 0,
    },
    dontKnowButtonContent: {
        height: 50,
    },
    // Стили для кнопки "Далее"
    bottomButtonContainer: {
        width: '100%',
        alignItems: 'center',
        paddingBottom: '15%',
    },
    startButton: {
        borderRadius: 4,
        backgroundColor: COLORS.accent,
        width: '100%',
        height: 70,
        justifyContent: 'center',
    },
    startButtonLabel: {
        fontSize: 27.68,
        color: COLORS.white,
        fontFamily: 'Comfortaa-Regular',
        fontWeight: 'normal',
        lineHeight: 27.68,
        paddingVertical: 0,
    },
    startButtonContent: {
        height: 70,
    },
});