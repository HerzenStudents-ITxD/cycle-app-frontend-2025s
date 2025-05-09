import {Configuration} from "../api-client2";
import {serverAddress} from "../constants/server_settings";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const configNoAuth = new Configuration({
    basePath: serverAddress,
})


export const getConfigAuth = async () => {
    const token = await AsyncStorage.getItem('Token');
    return new Configuration({
        basePath: serverAddress,
        baseOptions: {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        },
    });
};