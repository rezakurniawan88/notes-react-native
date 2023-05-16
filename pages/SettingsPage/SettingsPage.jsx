import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, StatusBar } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import OptionPopup from '../../components/OptionPopup';
import { useSelector } from 'react-redux';

export default function SettingsPage({navigation}) {
    const [ displayStyle, setDisplayStyle ] = useState("none");
    const [ pageState, setPageState ] = useState("");
    const { darkMode, language } = useSelector((state) => state);

    const definePageState = (page) => {
        setPageState(page);
    };

    const toggleDisplay = (page) => {
        setDisplayStyle(displayStyle === "none" ? "flex" : "none");
        definePageState(page);
    }

  return (
    <SafeAreaView>
        <StatusBar barStyle={darkMode ? "light-content" : "dark-content"} backgroundColor={darkMode ? "#111827" : "#F4F5F7"} />
        <View style={darkMode ? styles.main_container_dark : styles.main_container}>
            <View style={styles.headbar}>
                <TouchableOpacity style={styles.headbar_back_button} onPress={() => navigation.navigate('Homepage')}>
                    <Feather name="chevron-left" color={darkMode ? "#FFF" : "#000"} size={30}></Feather>
                </TouchableOpacity>
                <Text style={darkMode ? styles.headbar_title_dark : styles.headbar_title}>{language ? "Pengaturan" : "Settings"}</Text>
            </View>

            <View>
                <View style={styles.container_setting}>
                    <Text style={darkMode ? styles.text_container_setting_dark : styles.text_container_setting}>{language ? "Tampilan" : "Display"}</Text>
                    <TouchableOpacity 
                    style={styles.dark_mode_setting} 
                    onPress={() => toggleDisplay("theme")}>
                        <Text style={darkMode ? styles.dark_mode_title_dark : styles.dark_mode_title}>{language ? "Tema" : "Theme"}</Text>
                        <View style={styles.dark_mode_sub_setting}>
                            <Text style={darkMode ? styles.dark_mode_toggle_dark : styles.dark_mode_toggle}>{darkMode ? "Dark" : "Light"}</Text>
                            <Feather name="chevron-right" color={darkMode ? "#FFF" : "#000"} size={20}></Feather>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.container_setting}>
                    <Text style={darkMode ? styles.text_container_setting_dark : styles.text_container_setting}>{language ? "Sistem" : "System"}</Text>
                    <TouchableOpacity 
                    style={styles.dark_mode_setting} 
                    onPress={() => toggleDisplay("lang")}>
                        <Text style={darkMode ? styles.dark_mode_title_dark : styles.dark_mode_title}>{language ? "Bahasa" : "Language"}</Text>
                        <View style={styles.dark_mode_sub_setting}>
                            <Text style={darkMode ? styles.dark_mode_toggle_dark : styles.dark_mode_toggle}>{language ? "ID" : "EN"}</Text>
                            <Feather name="chevron-right" color={darkMode ? "#FFF" : "#000"} size={20}></Feather>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.container_setting}>
                    <Text style={darkMode ? styles.text_container_setting_dark : styles.text_container_setting}>{language ? "Lain-lain" : "Other"}</Text>
                    <TouchableOpacity style={styles.about_setting} onPress={() => navigation.navigate("AboutPage")}>
                        <Text style={darkMode ? styles.about_setting_title_dark : styles.about_setting_title}>{language ? "Tentang Aplikasi" : "About app"}</Text>
                        <Feather name="chevron-right" color={darkMode ? "#FFF" : "#000"} size={20}></Feather>
                    </TouchableOpacity>
                </View>
            </View>


            <OptionPopup 
                displayStyle={displayStyle} 
                setDisplayStyle={setDisplayStyle} 
                toggleDisplay={toggleDisplay}
                pageState={pageState}
            />


            <View style={styles.version}>
                <Text style={{color: darkMode ? "#FFF" : "#000"}}>{language ? "Versi aplikasi 1.0.0" : "App version 1.0.0"}</Text>
            </View>
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    main_container: {
        height: "100%",
        backgroundColor: "#F4F5F7",
    },
    main_container_dark: {
        height: "100%",
        backgroundColor: "#111827",
    },
    headbar: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        marginTop: 10,
        paddingVertical: 10,
        paddingHorizontal: 15
    },
    headbar_back_button: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: 40,
        height: 40,
        borderRadius: 30,
        zIndex: 10,
    },
    headbar_title: {
        flex: 1,
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        marginLeft: -30
    },
    headbar_title_dark: {
        flex: 1,
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        marginLeft: -30,
        color: "white"
    },
    container_setting: {
        marginHorizontal: 30,
        marginTop: 20
    },
    text_container_setting: {
        fontWeight: "bold"
    },
    text_container_setting_dark: {
        fontWeight: "bold",
        color: "white"
    },
    dark_mode_setting: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 15,
    },
    dark_mode_sub_setting: {
        display: "flex",
        flexDirection: "row",
        gap: 15
    },
    dark_mode_title: {
        fontSize: 18
    },
    dark_mode_title_dark: {
        fontSize: 18,
        color: "#9ca3af"
    },
    dark_mode_toggle_dark: {
        color: "white"
    },
    about_setting: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 10,
        paddingVertical: 15,
    },
    about_setting_title: {
        fontSize: 18
    },
    about_setting_title_dark: {
        fontSize: 18,
        color: "#9ca3af"
    },
    version: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        width: "100%",
        position: "absolute",
        bottom: 0,
        paddingVertical: 20
    },
})