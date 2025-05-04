import React, {useState, useCallback, useMemo, useRef} from 'react';
import {
    View,
    Text,
    StyleSheet,
    useWindowDimensions,
    TouchableOpacity,
    Image,
    Animated,
    TouchableWithoutFeedback,
    ScrollView,
    TextInput,
    Keyboard,
    LayoutAnimation, UIManager,
} from 'react-native';
import {CalendarList, LocaleConfig} from 'react-native-calendars';

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
    monthNames: ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'],
    monthNamesShort: ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'],
    dayNames: ['понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота', 'воскресенье'],
    dayNamesShort: ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'],
    today: 'сегодня',
};
LocaleConfig.defaultLocale = 'ru';

const CalendarMemo = React.memo(({styles}) => {
    const today = new Date().toISOString().split('T')[0];

    const DayComponent = ({date, state, marking}) => {
        const isToday = date.dateString === today;
        const isSelected = marking?.selected;

        return (
            <View style={[
                styles.dayContainer,
                isSelected && styles.selectedDayContainer
            ]}>
                <Text style={[
                    styles.dayText,
                    state === 'disabled' && styles.disabledDayText,
                    state === 'today' && styles.todayText,
                    isSelected && styles.selectedDayText
                ]}>
                    {date.day}
                </Text>
            </View>
        );
    };

    return (
        <View style={styles.calendarContainer}>
            <CalendarList
                pastScrollRange={0}
                futureScrollRange={4}
                scrollEnabled={true}
                showScrollIndicator={true}
                firstDay={0}
                dayComponent={DayComponent}
                markedDates={{
                    [today]: {
                        selected: true,
                        selectedColor: '#F9E3D6',
                        customStyles: {
                            container: {
                                borderRadius: 20,
                                backgroundColor: '#F9E3D6',
                            },
                            text: {
                                color: COLORS.black,
                                fontWeight: 'bold'
                            }
                        }
                    }
                }}
                theme={{
                    calendarBackground: COLORS.accent,
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
                    textDayHeaderFontSize: 14,
                    'stylesheet.calendar.main': {
                        week: {
                            marginTop: 10,
                            marginBottom: 10,
                            flexDirection: 'row',
                            justifyContent: 'space-around'
                        },
                        dayContainer: {
                            width: 40,
                            height: 40,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }
                    },
                    'stylesheet.calendar.header': {
                        week: {
                            marginTop: 10,
                            marginBottom: 10,
                            flexDirection: 'row',
                            justifyContent: 'space-around'
                        }
                    }
                }}
                monthFormat={'MMMM'}
                style={styles.calendar}
            />
        </View>
    );
});

const HomeScreen = React.memo(({navigation}) => {
    const {width, height} = useWindowDimensions();
    const styles = useMemo(() => createStyles({width, height}), [width, height]);

    const [modalVisible, setModalVisible] = useState(false);
    const modalAnim = useRef(new Animated.Value(0)).current;
    const [isNotesFocused, setIsNotesFocused] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState(Array(5).fill(null));

    const [menstruationStatus, setMenstruationStatus] = useState("менструация началась");  // Состояние для текста


    const today = useMemo(() => (
        new Date().toLocaleDateString('ru-RU', {
            day: 'numeric',
            month: 'long',
        })
    ), []);

    const openModal = useCallback(() => {
        setModalVisible(true);
        modalAnim.setValue(0);
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
        setTimeout(() => {
            openModal();  // Ждем немного перед запуском анимации
        }, );  // Устанавливаем задержку в 50 мс
    }, [openModal]);

    const handleSettingsPress = useCallback(() => {
        navigation.navigate('Settings');
    }, [navigation]);

    const handleOptionPress = useCallback((rowIndex, optionIndex) => {
        setSelectedOptions(prev => {
            const newOptions = [...prev];
            newOptions[rowIndex] = newOptions[rowIndex] === optionIndex ? null : optionIndex;
            return newOptions;
        });
    }, []);

    const handleMenstruationStatusPress = useCallback(() => {
        setMenstruationStatus(prevStatus =>
            prevStatus === "менструация началась" ? "менструация закончилась" : "менструация началась"
        );
    }, []);

    const modalTranslateY = modalAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [height, 0],
    });

    return (
        <>
            <View style={styles.container}>
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

                <CalendarMemo styles={styles}/>
            </View>

            {modalVisible && (
                <>
                    <TouchableWithoutFeedback onPress={closeModal}>
                        <View style={[StyleSheet.absoluteFill, styles.modalBackdrop]}/>
                    </TouchableWithoutFeedback>
                    <Animated.View
                        style={[
                            styles.modalContent,
                            {transform: [{translateY: modalTranslateY}]},
                        ]}
                    >
                        <View style={styles.modalMain}>
                            <View style={styles.modalHeader}>
                                <TouchableOpacity onPress={handleMenstruationStatusPress}>
                                    <Text style={styles.modalHeaderText}>
                                        {menstruationStatus}  {/* Изменяем текст */}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.modalFirstFiveOptions}>
                                <View style={styles.modalColumnContainer}>
                                    <View style={styles.modalItemLeft}>
                                        <Image source={require('../assets/symptoms.png')} style={styles.modalIcon}/>
                                        <Text style={styles.modalIconText}>симптомы</Text>
                                    </View>
                                    <View style={styles.modalItemLeft}>
                                        <Image source={require('../assets/mood.png')} style={styles.modalIcon}/>
                                        <Text style={styles.modalIconText}>настроение</Text>
                                    </View>
                                    <View style={styles.modalItemLeft}>
                                        <Image source={require('../assets/discharge.png')} style={styles.modalIcon}/>
                                        <Text style={styles.modalIconText}>выделение</Text>
                                    </View>
                                    <View style={styles.modalItemLeft}>
                                        <Image source={require('../assets/amount.png')} style={styles.modalIcon}/>
                                        <Text style={styles.modalIconText}>обильность</Text>
                                    </View>
                                    <View style={styles.modalItemLeft}>
                                        <Image source={require('../assets/sex.png')} style={styles.modalIcon}/>
                                        <Text style={styles.modalIconText}>секс</Text>
                                    </View>
                                </View>

                                <View style={styles.optionsColumn}>
                                    {[
                                        ['всё хорошо', 'диарея', 'спазмы в животе', 'усталость', 'прыщи', 'боль в спине', 'чувствительность груди', 'вздутие', 'тошнота', 'головная боль', 'озноб', 'температура'],
                                        ['весёлое', 'спокойное', 'энергичное', 'игривое', 'переменчивое', 'грустное', 'безразличное', 'злое', 'возбуждённое', 'вдохновлённое', 'унылое', 'тревожное', 'депрессивное'],
                                        ['нет', 'пятнистые', 'липкие', 'кремообразные', 'слизистые', 'водянистые', 'аномальные'],
                                        ['лёгкие', 'средние', 'обильные'],
                                        ['нет', 'щащищённый', 'незащищённый', 'сильное желание', 'мастурбация']
                                    ].map((options, rowIndex) => (
                                        <ScrollView
                                            key={rowIndex}
                                            horizontal
                                            showsHorizontalScrollIndicator={false}
                                            style={styles.optionScrollView}
                                            contentContainerStyle={styles.optionScrollContent}
                                        >
                                            {options.map((option, optionIndex) => (
                                                <TouchableOpacity
                                                    key={optionIndex}
                                                    style={[
                                                        styles.optionItem,
                                                        selectedOptions[rowIndex] === optionIndex && styles.optionItemSelected
                                                    ]}
                                                    onPress={() => handleOptionPress(rowIndex, optionIndex)}
                                                >
                                                    <Text style={[
                                                        styles.optionText,
                                                        selectedOptions[rowIndex] === optionIndex && styles.optionTextSelected
                                                    ]}>
                                                        {option}
                                                    </Text>
                                                </TouchableOpacity>
                                            ))}
                                        </ScrollView>
                                    ))}
                                </View>
                            </View>

                            <TouchableWithoutFeedback
                                onPress={() => {
                                    if (isNotesFocused) {
                                        Keyboard.dismiss();
                                        setIsNotesFocused(false);
                                    }
                                }}
                            >
                                <View style={styles.modalSixsOption}>
                                    <View style={styles.modalColumnContainer}>
                                        <View style={styles.modalItemLeft}>
                                            <Image source={require('../assets/notes.png')} style={styles.modalIcon} />
                                            <Text style={styles.modalIconText}>заметки</Text>
                                        </View>
                                    </View>

                                    <View style={styles.notesInputContainer}>
                                        <TextInput
                                            style={styles.notesInput}
                                            multiline
                                            onFocus={() => setIsNotesFocused(true)}
                                            onBlur={() => setIsNotesFocused(false)}
                                        />
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </Animated.View>
                </>
            )}
        </>
    );
});

const createStyles = ({width = 375, height = 812} = {}) => StyleSheet.create({
    container: {
        flex: 1,
        width: width * 0.8,
        maxWidth: 400,
        alignSelf: 'center',
        justifyContent: 'space-between',
        backgroundColor: COLORS.pinkish,
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
        marginTop: 10,
        padding: 0,
        position: 'relative',
    },
    dayContainer: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
    },
    dayText: {
        fontSize: 19,
        fontFamily: 'Comfortaa-Regular',
        color: COLORS.black,
    },
    selectedDayContainer: {
        backgroundColor: '#F9E3D6',
    },
    disabledDayText: {
        color: COLORS.gray,
    },
    todayText: {
        color: COLORS.button,
    },
    selectedDayText: {
        color: COLORS.black,
        fontWeight: 'regular',
    },
    calendarContainer: {
        width: '100%',
        alignItems: 'center',
        zIndex: 1,
        marginTop: -25,
        // backgroundColor: '#8f4720',
    },
    calendar: {
        width: '100%',
        maxWidth: 400,
    },
    modalBackdrop: {
        backgroundColor: 'rgba(250, 189, 194, 0.3)',
        zIndex: 10,
    },
    modalMain: {
        flexDirection: 'column',
        flex: 1,
        // backgroundColor: 'rgb(185,255,218)',
    },
    modalHeader: {
        marginTop: 30,
        alignItems: 'center',
        justifyContent: 'center',
        width: '83%',
        alignSelf: 'center', // Center the header horizontally
        marginBottom: 30,
        borderWidth: 1,
        borderColor: COLORS.pinkish,
        borderRadius: 20,
        paddingVertical: 8, // Adjusted for better vertical centering
        paddingHorizontal: 2,
        // backgroundColor: 'rgb(59,131,64)',
    },
    modalHeaderText: {
        fontSize: 23,
        color: COLORS.black,
        fontFamily: 'Comfortaa-Regular',
        textAlign: 'center',
        includeFontPadding: false, // Remove extra font padding for better vertical alignment
        textAlignVertical: 'center', // Ensure text is vertically centered
        textAlignHorizontal: 'center',


    },
    modalColumnContainer: {
        width: 100,
        // backgroundColor: 'rgb(161,15,32)',
    },

    modalFirstFiveOptions: {
        flexDirection: 'row',
        height: 325,
        // backgroundColor: 'rgb(180,193,79)',
    },

    optionsColumn: {
        flex: 1,
        paddingLeft: 10,
        paddingRight: 15,  // Добавляем отступ справа
    },
    optionRowContainer: {
        height: 50,
        marginBottom: 2,
        // backgroundColor: 'rgb(97,19,128)',
    },
    optionScrollView: {
        flexGrow: 0,
        height: '100%',
    },
    optionScrollContent: {
        alignItems: 'center',
        paddingRight: 30,  // Добавляем дополнительный отступ для прокрутки
        // backgroundColor: 'rgb(197,108,230)',
    },
    optionItem: {
        height: 35,
        paddingHorizontal: 15,
        paddingVertical: 0,
        marginRight: 10,
        backgroundColor: COLORS.white,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: COLORS.pinkish,
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: 100,  // Минимальная ширина для элементов
        marginTop:-20
    },
    scrollPadding: {
        width: 30,  // Невидимый элемент для завершения прокрутки
        height: 1,
        opacity: 0,
    },

    optionItemSelected: {
        backgroundColor: COLORS.pinkish,
    },
    optionText: {
        fontSize: 15,
        color: COLORS.black,
        fontFamily: 'Comfortaa-Regular',
        includeFontPadding: false,
        textAlignVertical: 'center',
    },
    optionTextSelected: {
        color: COLORS.white,
    },
    modalItemLeft: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'rgb(214,80,95)',
        marginBottom: 15,
    },
    modalContent: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        width: '100%',
        height: height * 0.8,
        backgroundColor: COLORS.white,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingTop: 0,
        zIndex: 11,
        color: COLORS.gray,
    },

    modalIconText: {
        fontSize: 12,
        color: COLORS.pinkish,
        fontFamily: 'Comfortaa-Regular',
        textAlign: 'center',
    },
    modalSixsOption: {
        flexDirection: 'row',
        flex: 1,
        // backgroundColor: 'rgb(207,201,201)',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
    },
    notesInputContainer: {
        flex: 1,
        paddingLeft: 10,
        paddingRight: width * 0.05,
        paddingBottom: width * 0.10,
        justifyContent: 'flex-start',
    },
    notesInput: {
        height: '100%',
        borderWidth: 1,
        borderColor: '#FABDC2',
        borderRadius: 10,
        padding: 10,
        fontFamily: 'Comfortaa-Regular',
        fontSize: 14,
        color: COLORS.black,
        backgroundColor: '#fff',
        textAlignVertical: 'top',
    },

});

export default HomeScreen;