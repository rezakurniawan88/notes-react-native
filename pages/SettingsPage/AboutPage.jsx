import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, StatusBar } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import { useSelector } from 'react-redux';

export default function AboutPage({navigation}) {
    const { darkMode,language } = useSelector((state) => state);

  return (
    <SafeAreaView>
        <StatusBar barStyle={darkMode ? "light-content" : "dark-content"} backgroundColor={darkMode ? "#111827" : "#F4F5F7"} />
        <View style={{height: "100%", backgroundColor: darkMode ? "#111827" : "#F4F5F7"}}>
            <View style={styles.headbar}>
                <TouchableOpacity style={styles.headbar_back_button} onPress={() => navigation.navigate('SettingsPage')}>
                    <Feather name="chevron-left" color={darkMode ? "#FFF" : "#000"} size={30}></Feather>
                </TouchableOpacity>
                <Text style={darkMode ? styles.headbar_title_dark : styles.headbar_title}>{language ? "Tentang" : "About"}</Text>
            </View>

            <View style={styles.about_content_container}>
                <Text style={darkMode ? styles.about_content_dark : styles.about_content}>{language ? "Aplikasi Catatan adalah sebuah aplikasi yang berguna untuk mengelola catatan-catatan Anda dengan mudah dan efisien. Fitur-fitur yang tersedia pada aplikasi Aplikasi Catatan ini meliputi penambahan catatan baru, pengeditan, penghapusan catatan, serta pengarsipan pada catatan, dan juga bisa memilih tema yang ingin digunakan yaitu darkmode atau lightmode." : "Notes App is a useful application for managing your notes easily and efficiently. The features available on this Notes App application include adding new notes, editing, deleting notes, as well as archiving notes, and can also choose the theme you want to use, namely darkmode or lightmode."}</Text>
                <Text style={darkMode ? styles.about_content_dark : styles.about_content}>{language ? "Aplikasi Catatan didukung oleh platform android, aplikasi ini bersifat open source atau bebas dengan link repository pada link berikut http://github.com/rezakurniawan88. Kami berkomitmen untuk terus meningkatkan kualitas aplikasi Aplikasi Catatan agar dapat memberikan pengalaman pengguna yang lebih baik." : "Notes App is supported by the android platform, this application is open source or free with a repository link at the following link http://github.com/rezakurniawan88. We are committed to continuously improving the quality of the Notes App application in order to provide a better user experience."}</Text>
            </View>


            <View style={styles.version}>
                <Text style={{color: darkMode ? "#FFF" : "#000"}}>{language ? "Versi aplikasi 1.0.0" : "App version 1.0.0"}</Text>
            </View>
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
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
    about_content_container: {
        marginTop: 20,
        marginHorizontal: 30
    },
    about_content: {
        textAlign: "justify",
        fontSize: 16,
        lineHeight: 30,
        paddingBottom: 15,
        color: "#475569",
    },
    about_content_dark: {
        textAlign: "justify",
        fontSize: 16,
        lineHeight: 30,
        paddingBottom: 15,
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