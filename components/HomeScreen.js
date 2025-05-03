import React, { useState, useCallback, useMemo, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    useWindowDimensions,
    TouchableOpacity,
    Image,
    Animated,
    TouchableWithoutFeedback,
} from 'react-native';
import { CalendarList, LocaleConfig } from 'react-native-calendars';

const COLORS = {
    accent: '#F9E3D6',
    button: '#F4CDB0',
    black: '#000000',
    white: '#FFFFFF',
    gray: '#888888',
    pinkish: '#FABDC2',
};

// Настройка локали календаря
LocaleConfig.locales['ru'] = {
    monthNames: ['январь','февраль','март','апрель','май','июнь','июль','август','сентябрь','октябрь','ноябрь','декабрь'],
    monthNamesShort: ['янв','фев','мар','апр','май','июн','июл','авг','сен','окт','ноя','дек'],
    dayNames: ['понедельник','вторник','среда','четверг','пятница','суббота','воскресенье'],
    dayNamesShort: ['пн','вт','ср','чт','пт','сб','вс'],
    today: 'сегодня',
};
LocaleConfig.defaultLocale = 'ru';

const CalendarMemo = React.memo(({ styles }) => (
    <View style={styles.calendarContainer}>
        <CalendarList
            pastScrollRange={0}
            futureScrollRange={4}
            scrollEnabled={true}
            showScrollIndicator={true}
            firstDay={0}
            theme={{
                backgroundColor: COLORS.white,
                calendarBackground: COLORS.white,
                textSectionTitleColor: COLORS.pinkish,
                selectedDayBackgroundColor: COLORS.accent,
                selectedDayTextColor: COLORS.white,
                todayTextColor: COLORS.button,
                dayTextColor: COLORS.black,
                textDisabledColor: COLORS.gray,
                monthTextColor: COLORS.pinkish,
                textDayFontFamily: 'Comfortaa-Regular',
                textMonthFontFamily: 'Comfortaa-Regular',
                textDayHeaderFontFamily: 'Comfortaa-Regular',
                textSectionTitleFontFamily: 'Comfortaa-Regular',
                textMonthFontSize: 21,
                textDayFontSize: 19,
                dateTextColor: COLORS.black,
                textDayHeaderFontSize: 14
            }}
            monthFormat={'MMMM'}
            style={styles.calendar}
        />
    </View>
));

const HomeScreen = React.memo(({ navigation }) => {
    const { width, height } = useWindowDimensions();
    const styles = useMemo(() => createStyles({ width, height }), [width, height]);

    const [modalVisible, setModalVisible] = useState(false);
    const modalAnim = useRef(new Animated.Value(0)).current;

    const today = useMemo(() => (
        new Date().toLocaleDateString('ru-RU', {
            day: 'numeric',
            month: 'long',
        })
    ), []);

    const openModal = useCallback(() => {
        setModalVisible(true);
        Animated.timing(modalAnim, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
        }).start();
    }, [modalAnim]);

    const closeModal = useCallback(() => {
        Animated.timing(modalAnim, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
        }).start(() => setModalVisible(false));
    }, [modalAnim]);

    const handleAddButtonPress = useCallback(() => {
        openModal();
    }, [openModal]);

    const handleSettingsPress = useCallback(() => {
        navigation.navigate('Settings');
    }, [navigation]);

    const modalTranslateY = modalAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [height, 0],
    });

    return (
        <View style={styles.container}>
            <View style={styles.centeredContainer}>
                <View style={styles.headerContainer}>
                    <Text style={styles.dateText}>{today}</Text>
                    <TouchableOpacity style={styles.settingsButton} onPress={handleSettingsPress}>
                        <Image
                            source={require('../assets/goToSettingsButton.png')}
                            style={styles.settingsButtonImage}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                </View>

                <View style={styles.infoColumnsContainer}>
                    <View style={styles.infoColumn}>
                        <Text style={styles.infoNumber}>6</Text>
                        <Text style={styles.infoLabel}>дней до овуляции</Text>
                    </View>
                    <View style={styles.infoColumn}>
                        <Text style={styles.infoNumber}>16</Text>
                        <Text style={styles.infoLabel}>дней до менструации</Text>
                    </View>
                    <View style={styles.infoColumn}>
                        <Text style={styles.infoNumber}>12</Text>
                        <Text style={styles.infoLabel}>день{"\n"}цикла</Text>
                    </View>
                </View>

                <TouchableOpacity style={styles.addButton} onPress={handleAddButtonPress}>
                    <Image
                        source={require('../assets/addButton.png')}
                        style={styles.addButtonImage}
                        resizeMode="contain"
                    />
                </TouchableOpacity>

                <CalendarMemo styles={styles} />
            </View>

            {/* Модальное окно поверх всех элементов */}
            {modalVisible && (
                <Animated.View style={[StyleSheet.absoluteFill, { zIndex: 10 }]}>
                    <TouchableWithoutFeedback onPress={closeModal}>
                        <View style={styles.modalBackdrop} />
                    </TouchableWithoutFeedback>
                    <Animated.View
                        style={[
                            styles.modalContent,
                            { transform: [{ translateY: modalTranslateY }], zIndex: 11 },
                        ]}
                    >
                        <Text style={{ fontSize: 18, fontFamily: 'Comfortaa-Regular' }}>
                            Здесь содержимое модального окна
                        </Text>
                    </Animated.View>
                </Animated.View>
            )}
        </View>
    );
});

const createStyles = ({ width = 375, height = 812 } = {}) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    centeredContainer: {
        flex: 1,
        width: '100%',
        alignSelf: 'center',
        paddingVertical: 20,
        paddingHorizontal: 16,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginTop: height * 0.05,
        marginBottom: 20,
        position: 'relative',
        width: '100%',
    },
    dateText: {
        fontSize: 33,
        color: COLORS.black,
        fontFamily: 'Comfortaa-Regular',
        textAlign: 'center',
        flex: 1,
    },
    settingsButton: {
        position: 'absolute',
        right: 0,
        top: 7,
        padding: 10,
    },
    settingsButtonImage: {
        width: 24,
        height: 24,
    },
    infoColumnsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 10,
    },
    infoColumn: {
        flex: 1,
        alignItems: 'center',
    },
    infoNumber: {
        fontSize: 27,
        color: COLORS.black,
        fontFamily: 'Comfortaa-Regular',
        textAlign: 'center',
        marginBottom: 4,
    },
    infoLabel: {
        fontSize: 14,
        color: COLORS.black,
        fontFamily: 'Comfortaa-Regular',
        textAlign: 'center',
    },
    addButton: {
        alignSelf: 'center',
        zIndex: 2,
        marginTop: 20,
        padding: 0,
        position: 'relative',
    },

    calendarContainer: {
        width: '100%',
        alignItems: 'center',
        zIndex: 1,
        marginTop: -25,
    },
    calendar: {
        width: '100%',
        maxWidth: 400,
    },
    modalBackdrop: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.5)',
        zIndex: 10,
    },
    modalContent: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: height * 0.3,
        backgroundColor: COLORS.white,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        padding: 16,
        zIndex: 11,
    },
});

export default HomeScreen;