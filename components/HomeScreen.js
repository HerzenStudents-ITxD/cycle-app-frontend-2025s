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
    LayoutAnimation, UIManager,Dimensions,FlatList,
} from 'react-native';
import {Calendar} from "react-native-calendars";
import {toIsoString, generateDaysBetween} from '../DateUtils';



const COLORS = {
    accent: '#F9E3D6',
    button: '#F4CDB0',
    black: '#000000',
    white: '#FFFFFF',
    gray: '#888888',
    pinkish: '#FABDC2',
};

let options = [
    ['всё хорошо', 'диарея', 'спазмы в животе', 'усталость', 'прыщи', 'боль в спине', 'чувствительность груди', 'вздутие', 'тошнота', 'головная боль', 'озноб', 'температура'],
    ['весёлое', 'спокойное', 'энергичное', 'игривое', 'переменчивое', 'грустное', 'безразличное', 'злое', 'возбуждённое', 'вдохновлённое', 'унылое', 'тревожное', 'депрессивное'],
    ['нет', 'пятнистые', 'липкие', 'кремообразные', 'слизистые', 'водянистые', 'аномальные'],
    ['лёгкие', 'средние', 'обильные'],
    ['нет', 'щащищённый', 'незащищённый', 'сильное желание', 'мастурбация']
]


const HomeScreen = React.memo(({navigation}) => {
    const {width, height} = useWindowDimensions();
    const styles = useMemo(() => createStyles({width, height}), [width, height]);

    const [modalVisible, setModalVisible] = useState(false);
    const modalAnim = useRef(new Animated.Value(0)).current;
    const [isNotesFocused, setIsNotesFocused] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState([[], null, null, null, null]);
    const [menstruationStatus, setMenstruationStatus] = useState("менструация началась");  // Состояние для текста
    const [dateModalVisible, setDateModalVisible] = useState(false);
    const [selectedDate, setSelectedDate] = useState('');
    const dateModalAnim = useRef(new Animated.Value(0)).current;



    const today = useMemo(() => (
        new Date().toLocaleDateString('ru-RU', {
            day: 'numeric',
            month: 'long',
        })
    ), []);



    let dates = generateMonths(5, [ {start: new Date(), finish: new Date("2025-06-15")} ]);




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

    const openDateModal = useCallback((date) => {
        setSelectedDate(date);
        setDateModalVisible(true);
        dateModalAnim.setValue(0);
        Animated.timing(dateModalAnim, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
        }).start();
    }, [dateModalAnim]);

    const closeDateModal = useCallback(() => {
        Animated.timing(dateModalAnim, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
        }).start(() => setDateModalVisible(false));
    }, [dateModalAnim]);

    const dateModalTranslateY = dateModalAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [height, 0],
    });

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

            if (rowIndex > 0) {
                newOptions[rowIndex] = (newOptions[rowIndex] === optionIndex) ? null : optionIndex;
            } else {
                //мультивыбор
                const current = newOptions[rowIndex] || [];
                const alreadySelected = current.includes(optionIndex);

                newOptions[rowIndex] = alreadySelected
                    ? current.filter(i => i !== optionIndex)
                    : [...current, optionIndex];
            }

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
        <View style={{backgroundColor: COLORS.white, flex: 1}}>
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
                <FlatList
                    data={dates}
                    keyExtractor={(item) => { return item.key } }
                    renderItem={({ item }) => (
                        <Calendar
                            markedDates={item.markings}
                            markingType={'period'}
                            current={item.key}
                            firstDay={1}
                            hideArrows={true}
                            hideExtraDays={true}
                            onDayPress={(day) => openDateModal(day.dateString)}
                        />
                    )}
                />
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
                                    {options.map((options, rowIndex) => (
                                        <ScrollView
                                            key={rowIndex}
                                            horizontal
                                            showsHorizontalScrollIndicator={false}
                                            style={styles.optionScrollView}
                                            contentContainerStyle={styles.optionScrollContent}
                                        >
                                            {options.map((option, optionIndex) => {
                                                const isSelected =
                                                    rowIndex === 0
                                                        ?  selectedOptions[rowIndex]?.includes(optionIndex)
                                                        : selectedOptions[rowIndex] === optionIndex;

                                                return (
                                                    <TouchableOpacity
                                                        key={optionIndex}
                                                        style={[
                                                            styles.optionItem,
                                                            isSelected && styles.optionItemSelected
                                                        ]}
                                                        onPress={() => handleOptionPress(rowIndex, optionIndex)}
                                                    >
                                                        <Text style={[
                                                            styles.optionText,
                                                            isSelected && styles.optionTextSelected
                                                        ]}>
                                                            {option}
                                                        </Text>
                                                    </TouchableOpacity>
                                                );
                                            })}

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

            {dateModalVisible && (
                <>
                    <TouchableWithoutFeedback onPress={closeDateModal}>
                        <View style={[StyleSheet.absoluteFill, styles.modalBackdrop]}/>
                    </TouchableWithoutFeedback>
                    <Animated.View
                        style={[
                            styles.dateModalContent,
                            {transform: [{translateY: dateModalTranslateY}]},
                        ]}
                    >
                        <Text style={styles.dateModalText}>
                            {new Date(selectedDate).toLocaleDateString('ru-RU', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric'
                            })}
                        </Text>
                        <TouchableOpacity
                            style={styles.dateModalCloseButton}
                            onPress={closeDateModal}
                        >
                            <Text style={styles.dateModalCloseText}>Закрыть</Text>
                        </TouchableOpacity>
                    </Animated.View>
                </>
            )}
        </View>
    );
});

const createStyles = ({width = 375, height = 812} = {}) => StyleSheet.create({

    monthHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    monthTitle: {
        fontSize: 18,
        fontFamily: 'Comfortaa-Regular',
        color: COLORS.black,
    },
    navButton: {
        fontSize: 20,
        paddingHorizontal: 15,
        color: COLORS.black,
    },
    daysHeader: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 10,
    },
    dayNameContainer: {
        width: 30,
        alignItems: 'center',
    },
    dayNameText: {
        fontSize: 14,
        fontFamily: 'Comfortaa-Regular',
        color: COLORS.gray,
    },
    daysContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
    },
    dayContainer: {
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5,
    },
    emptyDay: {
        width: 30,
        height: 30,
        margin: 5,
    },
    dayText: {
        fontSize: 16,
        fontFamily: 'Comfortaa-Regular',
        color: COLORS.black,
    },
    todayContainer: {
        backgroundColor: COLORS.pinkish,
        borderRadius: 15,
    },
    todayText: {
        color: COLORS.white,
    },
    container: {
        // flex: 1,
        width: width * 0.9,
        maxWidth: 400,
        alignSelf: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#8f4720',
        height: '100%'
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginTop: height * 0.05,
        marginBottom: 20,
        position: 'relative',
        width: '100%',
        backgroundColor: 'rgb(153,161,90)',
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
        marginBottom: -25,
        padding: 0,
        position: 'relative',
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
    dateModalContent: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        width: '100%',
        height: height * 0.3,
        backgroundColor: COLORS.white,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        zIndex: 20,
    },
    dateModalText: {
        fontSize: 24,
        textAlign: 'center',
        marginTop: 20,
        fontFamily: 'Comfortaa-Regular',
    },
    dateModalCloseButton: {
        marginTop: 30,
        padding: 15,
        backgroundColor: COLORS.pinkish,
        borderRadius: 20,
        alignItems: 'center',
    },
    dateModalCloseText: {
        color: COLORS.white,
        fontSize: 18,
        fontFamily: 'Comfortaa-Regular',
    },

});


function generateMonths(monthsCount, intervals) {
    let firstMonth = new Date().setMonth(new Date().getMonth() - monthsCount / 2);

    let dates = []
    for (let i = 0; i < monthsCount; i++) {
        let date = new Date(firstMonth);
        date.setMonth(date.getMonth() + i + 1);

        let key = toIsoString(date)


        let markedDates= []
        intervals.forEach(interval => {
            generateDaysBetween(interval.start, interval.finish).forEach((day) => {markedDates.push(day)})
        })

        const markings = Object.fromEntries(markedDates.map((key, index) => [key, {
            color: 'green',
            startingDay: index === 0,
            endingDay: index === markedDates.length - 1,
        }]));


        let month = {key: key, markings: markings}

        dates.push(month);
    }
    return dates;
}

export default HomeScreen;