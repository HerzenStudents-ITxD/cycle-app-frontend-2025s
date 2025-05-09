import React, {useEffect, useState} from 'react';
import {
    ActivityIndicator,
    Dimensions,
    Image,
    Modal,
    StyleSheet,
    Switch,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import * as Font from 'expo-font';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {UsersApi} from "../api-client2";
import {getConfigAuth} from "../utils/ServerUtils";

const COLORS = {
    light: {
        background: '#FFFFFF',
        text: '#000000',
        inputBorder: '#F4CDB0',
        inputBackground: '#FFFFFF',
        buttonActive: '#F4CDB0',
        buttonInactive: '#FFFFFF',
        buttonTextActive: '#FFFFFF',
        buttonTextInactive: '#000000',
        logoutText: '#F4CDB0',
        modalBackground: '#FFFFFF',
        modalText: '#000000',
        cancelButton: '#EEEEEE',
    },
    dark: {
        background: '#121212',
        text: '#FFFFFF',
        inputBorder: '#555',
        inputBackground: '#333',
        buttonActive: '#F4CDB0',
        buttonInactive: '#333',
        buttonTextActive: '#FFFFFF',
        buttonTextInactive: '#FFFFFF',
        logoutText: '#F4CDB0',
        modalBackground: '#333',
        modalText: '#FFFFFF',
        cancelButton: '#555',
    }
};

const { width, height } = Dimensions.get('window');

const SettingsScreen = () => {
    const navigation = useNavigation();
    const [fontsLoaded, setFontsLoaded] = useState(false);
    const [cycleLength, setCycleLength] = useState('?');
    const [menstruationLength, setMenstruationLength] = useState('?');
    const [cycleVariation, setCycleVariation] = useState('?');
    const [remindMenstruation, setRemindMenstruation] = useState(undefined);
    const [remindOvulation, setRemindOvulation] = useState(undefined);
    const [darkTheme, setDarkTheme] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    const [settingsLoaded, setSettingsLoaded] = useState(false);

    function refreshStats() {
        getConfigAuth().then((config) => {
            AsyncStorage.getItem('UserId')
                .then((userId) => {
                    new UsersApi(config).apiUsersUserIdGet(userId)
                        .then((response) => {
                            console.log(response);
                            setSettingsLoaded(true);
                            let data = response.data;
                            setCycleLength(data.cycleLength);
                            setMenstruationLength(data.periodLength);
                            setRemindOvulation(data.remindOvulation);
                            setRemindMenstruation(data.remindPeriod)
                        })
                        .catch((error) => {
                            console.log(error);
                            if (error.status === 401 || error.status === 403) {
                                handleLogout()
                            }
                            alert("Чёто пошло не так, перелогиньсо, a?")
                        })
                }).catch((error) => {
                console.log(error);
                alert("Чёто пошло не так, перелогиньсо")
            })
        })
    }

    function uploadStats() {
        getConfigAuth().then((config) => {
            AsyncStorage.getItem('UserId').then((userId) => {
                new UsersApi(config).apiUsersUserIdPut(userId, {
                    cycleLength: cycleLength,
                    periodLength: menstruationLength,
                    remindPeriod: remindMenstruation,
                    remindOvulation: remindOvulation,
                }, (response) => {
                    console.log(response);
                })
            })
        })
    }

    useEffect(() => {
        (async () => {
            await Font.loadAsync({
                'Comfortaa-Regular': require('../assets/fonts/Comfortaa-Regular.ttf'),
                'Comfortaa-Bold': require('../assets/fonts/Comfortaa-Bold.ttf'),
            });
            setFontsLoaded(true);
            refreshStats();
        })();
    }, []);

    useEffect(() => {
        if (!settingsLoaded) {
            return
        }
        uploadStats()
    }, [remindMenstruation, remindOvulation])


    const confirmLogout = () => {
        setShowLogoutModal(true);
    };

    const handleLogout = () => {
        AsyncStorage.removeItem('Token');
        AsyncStorage.removeItem('UserId');
        setShowLogoutModal(false);
        navigation.navigate('Login');
    };

    if (!fontsLoaded) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#F4CDB0" />
            </View>
        );
    }

    const colors = darkTheme ? COLORS.dark : COLORS.light;

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={styles.headerContainer}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.navigate('Home')}
                >
                    <Image
                        source={require('../assets/backButton.png')}
                        style={[styles.backButtonImage, { tintColor: colors.logoutText }]}
                        resizeMode="contain"
                    />
                </TouchableOpacity>
                <Text style={[styles.title, { color: colors.text }]}>настройки</Text>
            </View>

            <View style={styles.centeredContainer}>
                <View style={styles.contentContainer}>
                    {/* Длительность цикла */}
                    <View style={styles.settingRow}>
                        <Text style={[styles.settingLabel, { color: colors.text }]}>длительность цикла</Text>
                        <Text style={[styles.numberInput, { color: colors.text }]}>
                            {cycleLength}
                        </Text>
                    </View>

                    {/* Длительность менструации */}
                    <View style={styles.settingRow}>
                        <Text style={[styles.settingLabel, { color: colors.text }]}>длительность менструации</Text>
                        <Text style={[styles.numberInput, { color: colors.text }]}>
                            {menstruationLength}
                        </Text>
                    </View>

                    {/* Вариация цикла */}
                    <View style={styles.settingRow}>
                        <Text style={[styles.settingLabel, { color: colors.text }]}>вариация цикла</Text>
                        <Text style={[styles.numberInput, { color: colors.text }]}>
                            {cycleVariation}
                        </Text>
                    </View>

                    {/* Напоминания */}
                    <View style={styles.settingRow}>
                        <Text style={[styles.settingLabel, { color: colors.text }]}>напоминать о начале менструации</Text>
                        <Switch
                            value={remindMenstruation}
                            onValueChange={setRemindMenstruation}
                            trackColor={{ false: "#767577", true: "#F4CDB0" }}
                            thumbColor={remindMenstruation ? "#FFFFFF" : "#f4f3f4"}
                        />
                    </View>

                    <View style={styles.settingRow}>
                        <Text style={[styles.settingLabel, { color: colors.text }]}>напоминать о начале овуляции</Text>
                        <Switch
                            value={remindOvulation}
                            onValueChange={setRemindOvulation}
                            trackColor={{ false: "#767577", true: "#F4CDB0" }}
                            thumbColor={remindOvulation ? "#FFFFFF" : "#f4f3f4"}
                        />
                    </View>

                    {/* Тема */}
                    <View style={styles.settingRow}>
                        <Text style={[styles.settingLabel, { color: colors.text }]}>тема</Text>
                        <View style={styles.themeOptions}>
                            <TouchableOpacity
                                style={[
                                    styles.themeButton,
                                    !darkTheme && styles.activeThemeButton,
                                    { backgroundColor: !darkTheme ? colors.buttonActive : colors.buttonInactive }
                                ]}
                                onPress={() => setDarkTheme(false)}
                            >
                                <Text style={[
                                    styles.themeButtonText,
                                    {
                                        color: !darkTheme ? colors.buttonTextActive : colors.buttonTextInactive,
                                        textAlignVertical: 'center',
                                        lineHeight: 30,

                                    }
                                ]}>
                                    светлая
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[
                                    styles.themeButton,
                                    darkTheme && styles.activeThemeButton,
                                    { backgroundColor: darkTheme ? colors.buttonActive : colors.buttonInactive }
                                ]}
                                onPress={() => setDarkTheme(true)}
                            >
                                <Text style={[
                                    styles.themeButtonText,
                                    {
                                        color: darkTheme ? colors.buttonTextActive : colors.buttonTextInactive,
                                        textAlignVertical: 'center',
                                        lineHeight: 30
                                    }
                                ]}>
                                    темная
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                {/* Кнопка выхода */}
                    <TouchableOpacity onPress={confirmLogout}>
                        <Text style={[styles.logoutText, { color: colors.logoutText }]}>выйти</Text>
                    </TouchableOpacity>
            </View>

            {/* Модальное окно подтверждения выхода */}
            <Modal
                visible={showLogoutModal}
                transparent={true}
                animationType="fade"
            >
                <View style={styles.modalOverlay}>
                    <View style={[styles.modalContent, { backgroundColor: colors.modalBackground }]}>
                        <Text style={[styles.modalTitle, { color: colors.text }]}>Вы точно хотите выйти?</Text>
                        <View style={styles.modalButtons}>
                            <TouchableOpacity
                                style={[styles.modalButton, { backgroundColor: colors.cancelButton }]}
                                onPress={() => setShowLogoutModal(false)}
                            >
                                <Text style={[styles.modalButtonText, { color: colors.text }]}>Отмена</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.modalButton, styles.confirmButton]}
                                onPress={handleLogout}
                            >
                                <Text style={styles.modalButtonText}>Выйти</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: height * 0.10,
        position: 'relative',
        width: '100%',
    },
    backButton: {
        position: 'absolute',
        left: 20,
        padding: 10,
        top: 2,
    },
    backButtonImage: {
        // width: 24,
        // height: 24,
    },
    title: {
        fontSize: 33,
        fontFamily: 'Comfortaa-Regular',
        textAlign: 'center',
    },
    centeredContainer: {
        flex: 1,
        width: width * 0.8,
        maxWidth: 400,
        alignSelf: 'center',
        justifyContent: 'space-between',
        marginTop: height * 0.06,
    },
    contentContainer: {
        flex: 1,
    },
    settingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 25,
        minHeight: 40,
    },
    settingLabel: {
        flex: 1,
        fontSize: 19,
        fontFamily: 'Comfortaa-Regular',
        marginRight: 15,
        textAlign: 'left',
    },
    numberInput: {
        fontSize: 19,
        fontFamily: 'Comfortaa-Regular',
        textAlign: 'center',
        minWidth: 60,
    },
    themeOptions: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    themeButton: {
        paddingVertical: 0,
        paddingHorizontal: 15,
        borderRadius: 20,
        marginLeft: 10,
        borderWidth: 1,
        height: 32,  // Убедитесь, что высота кнопки достаточна
        justifyContent: 'center',  // Центрируем по вертикали
        alignItems: 'center',  // Центрируем по горизонтали
    },

    themeButtonText: {
        fontSize: 19,
        fontFamily: 'Comfortaa-Regular',
        textAlign: 'center',  // По горизонтали
        lineHeight: 32, // Устанавливаем высоту строки равной высоте кнопки, чтобы текст был в центре
    },

    activeThemeButton: {
        borderWidth: 0,
    },

    bottomButtonContainer: {
        width: '100%',
        alignItems: 'flex-start',
        paddingLeft: 5,
    },
    logoutText: {
        fontSize: 19,
        fontFamily: 'Comfortaa-Regular',
        marginBottom: "15%",
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '80%',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontFamily: 'Comfortaa-Regular',
        marginBottom: 25,
        textAlign: 'center',
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    modalButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        minWidth: '45%',
        alignItems: 'center',
    },
    confirmButton: {
        backgroundColor: '#F4CDB0',
    },
    modalButtonText: {
        fontSize: 18,
        fontFamily: 'Comfortaa-Regular',
        color: '#FFFFFF',
    },
});

export default SettingsScreen;