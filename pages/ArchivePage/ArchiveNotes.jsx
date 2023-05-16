import React, { useState, useEffect } from 'react'
import { ScrollView, SafeAreaView, StyleSheet, Text, View, TouchableOpacity, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Feather from '@expo/vector-icons/Feather';
import NotesEmpty from '../../components/NotesEmpty';
import { useSelector } from 'react-redux';

export default function ArchiveNotes({navigation}) {
    const [ notesData, setNotesData ] = useState([]);
    const { darkMode,language } = useSelector((state) => state);

    useEffect(() => {
        const subs = navigation.addListener("focus", () => {getNotesArchived();});
        return subs;
    },[])
    
    const getNotesArchived = async() => {
        let notes = await AsyncStorage.getItem("notes");
        notes = JSON.parse(notes) || [];
        const archivedNotes = notes.filter(note => note.isArchived);
        const sortedNotes = archivedNotes.sort((a,b) => b.id - a.id);
        setNotesData(sortedNotes);
    }


  return (
    <SafeAreaView>
        <StatusBar barStyle={darkMode ? "light-content" : "dark-content"} backgroundColor={darkMode ? "#111827" : "#F4F5F7"} />
        <ScrollView style={{height: "100%", backgroundColor: darkMode ? "#111827" : "#F4F5F7"}}>
            <View style={styles.headbar}>
                <TouchableOpacity style={styles.headbar_back_button} onPress={() => navigation.navigate('Homepage')}>
                    <Feather name="chevron-left" color={darkMode ? "#FFF" : "#000"} size={30}></Feather>
                </TouchableOpacity>
                <Text style={darkMode ? styles.headbar_title_dark : styles.headbar_title}>{language ? "Arsip Catatan" : "Archived Notes"}</Text>
            </View>

            <View style={styles.notes_container}>
                {notesData.length > 0 ? notesData.map((note) => {
                    const limitTitle = note.title.substring(0, 28 - 3) + "...";
                    const limitContent = note.content.substring(0, 50 - 3) + "...";
                    return (
                        <TouchableOpacity 
                        key={note.id}
                        style={darkMode ? styles.notes_card_dark : styles.notes_card} 
                        onPress={() => navigation.navigate('NoteContent', {notes: note, archived: true})}>
                            <Text style={darkMode ? styles.notes_title_dark  : styles.notes_title}>{note.title > 28 ? limitTitle : note.title}</Text>
                            <Text style={darkMode ? styles.notes_content_dark : styles.notes_content}>{note.content > 50 ? limitContent : note.content}</Text>
                        </TouchableOpacity>
                    )
                }) : (
                    <NotesEmpty />
                )}
            </View>
        </ScrollView>
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
        marginBottom: 30,
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
        zIndex: 10
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
    notes_container: {
        display: "flex",
        flexDirection: "row",
        gap: 15,
        flexWrap: "wrap",
        width: "85%",
        height: "100%",
        marginHorizontal: 30,
        paddingBottom: 20,
    },
    notes_card: {
        width: "47%",
        height: 180,
        borderRadius: 10,
        padding: 15,
        backgroundColor: "white",
    },
    notes_card_dark: {
        width: "47%",
        height: 180,
        borderRadius: 10,
        padding: 15,
        backgroundColor: "#1f2937",
        borderWidth: 1,
        borderColor: "#374151",
    },
    notes_title: {
        fontSize: 18,
        fontWeight: "600",
        color: "#1E293B"
    },
    notes_title_dark: {
        fontSize: 18,
        fontWeight: "600",
        color: "#C4C4C4"
    },
    notes_content: {
        fontSize: 14,
        marginTop: 10,
        color: "#64748B",
    },
    notes_content_dark: {
        fontSize: 14,
        marginTop: 10,
        color: "#9ca3af",
    },
    notes_empty: {
        width: "100%",
        height: 500,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    notes_empty_text: {
        fontSize: 20,
        color: "gray",
    },
})