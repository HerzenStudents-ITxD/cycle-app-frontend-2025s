import {Configuration} from "../api-client2";
import {serverAddress} from "../constants/server_settings";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const configNoAuth = new Configuration({
    basePath: serverAddress,
})

export const configAuth = new Configuration({
    basePath: serverAddress,
    accessToken: () => 'Bearer ' + AsyncStorage.getItem('Token'),
})