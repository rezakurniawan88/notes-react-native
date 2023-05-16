import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView, TextInput, Alert, SafeAreaView, StatusBar } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';

export default function NoteContent({route, navigation}) {
  const { notes, archived } = route.params || {};
  const [ title, setTitle ] = useState(notes ? notes.title : "");
  const [ content, setContent ] = useState(notes ? notes.content : "");
  const [ pageState ] = useState(notes ? "edit" : "new");
  const [ notesData ] = useState(notes ? notes : {});
  const [ displayStyle, setDisplayStyle ] = useState("none");
  const { darkMode,language } = useSelector((state) => state);

  const createNotes = async() => {
    if(!title | !content) {
      Alert.alert("Error", "Please fill in all fields!", [
        {
          text: "OK"
        }
      ])
      return;
    }

    let notes = await AsyncStorage.getItem("notes");
    notes = JSON.parse(notes) || [];
    let notesTempData = {
      id: new Date().getTime(),
      title: title,
      content: content,
      isArchived: false
    }
    notes.push(notesTempData);
    await AsyncStorage.setItem("notes", JSON.stringify(notes));
    Alert.alert("Note Saved", "Your note has been saved succesfully", [
      {
        text: "OK",
        onPress: () => navigation.navigate("Homepage")
      }
    ])
  }

  const editNotes = async() => {
    let notes = await AsyncStorage.getItem('notes');
    notes = JSON.parse(notes);
    let notesTempData = {
      ...notesData,
      id: new Date().getTime(),
      title: title,
      content: content,
    }
 
    let notesIndex = notes.findIndex((note) => note.id === notesData.id);
    notes[notesIndex] = notesTempData;
    await AsyncStorage.setItem('notes', JSON.stringify(notes));
    Alert.alert("Notes Edited", "Your notes has been edited successfully", [
      {
        text: "OK",
        onPress: () => navigation.navigate('Homepage')
      }
    ])
  }

  const deleteNotes = async () => {
    let notes = await AsyncStorage.getItem('notes');
    notes = JSON.parse(notes);
    let notesIndex = notes.findIndex((note) => note.id === notesData.id);
    notes.splice(notesIndex, 1);
    await AsyncStorage.setItem('notes', JSON.stringify(notes));
    Alert.alert("Notes Deleted", "Your notes has been deleted successfully", [
      {
        text: "OK",
        onPress: () => navigation.navigate('Homepage')
      }
    ])
  }

  const archiveHadler = async () => {
    let notes = await AsyncStorage.getItem('notes');
    notes = JSON.parse(notes);
    let notesTempData = {
      ...notesData,
      isArchived: true
    }
 
    let notesIndex = notes.findIndex((note) => note.id === notesData.id);
    notes[notesIndex] = notesTempData;
    await AsyncStorage.setItem('notes', JSON.stringify(notes));
    Alert.alert("Archived", "Your notes has been archived", [
      {
        text: "OK",
        onPress: () => navigation.navigate('Homepage')
      }
    ])
  }

  const unarchiveHadler = async () => {
    let notes = await AsyncStorage.getItem('notes');
    notes = JSON.parse(notes);
    let notesTempData = {
      ...notesData,
      isArchived: false
    }
 
    let notesIndex = notes.findIndex((note) => note.id === notesData.id);
    notes[notesIndex] = notesTempData;
    await AsyncStorage.setItem('notes', JSON.stringify(notes));
    Alert.alert("Unarchived", "Your notes has been unarchived", [
        {
            text: "OK",
            onPress: () => navigation.navigate('Homepage')
          }
    ])
  }

  const toggleDisplay = () => {
    setDisplayStyle(displayStyle === "none" ? "flex" : "none");
  }

  return (
    <SafeAreaView>
      <StatusBar barStyle={darkMode ? "light-content" : "dark-content"} backgroundColor={darkMode ? "#111827" : "#F4F5F7"} />
      <ScrollView style={{height: "100%", backgroundColor: darkMode ? "#111827" : "#F4F5F7"}}>
        <View style={styles.headbar}>
          <TouchableOpacity style={styles.headbar_back_button} onPress={() => navigation.navigate('Homepage')}>
            <Feather name="chevron-left" color={darkMode ? "#FFF" : "#000"} size={30}></Feather>
          </TouchableOpacity>


          <View style={{display: "flex", flexDirection: "row"}}>
            <TouchableOpacity 
            style={styles.headbar_save_button}
            onPress={() => {
              if(pageState === "new") {
                createNotes();
              } else {
                editNotes();
              }
            }}
            >
              <Text style={styles.headbar_save_button_text}>{pageState === "new" ? language ? "Simpan" : "Save" : language ? "Simpan Perubahan" : "Save Changes"}</Text>
            </TouchableOpacity>
          </View>

        </View>

        <View style={styles.container}>
          {pageState === "edit" ? (
            <Text style={styles.date}>{!notes.id ? null : new Date(notes.id).toDateString()}</Text>
          ) : (
            <View></View>
          )}
          <TextInput 
          style={darkMode ? styles.title_dark : styles.title}
          placeholder={language ? "Judul" : "Title"}
          placeholderTextColor={darkMode ? "#6b7280" : "gray"}
          onChangeText={text => setTitle(text)}
          value={title}
          multiline={true}
          maxLength={60}
          />
          <TextInput 
          style={darkMode ? styles.content_dark : styles.content} 
          placeholder={language ? "Catatan" : "Note"}
          placeholderTextColor={darkMode ? "#9ca3af" : "gray"}
          onChangeText={text => setContent(text)}
          value={content}
          multiline={true}
          />
        </View>
      </ScrollView>
      {pageState === "edit" ? (
        <>
          <TouchableOpacity style={styles.menu_button} onPress={toggleDisplay}>
            <Feather name="more-vertical" color="#fff" size={20}></Feather>
          </TouchableOpacity>
          <View style={[styles.show_button, {display: displayStyle}]}>
            <TouchableOpacity style={darkMode ? styles.archive_button_dark : styles.archive_button} onPress={archived ? () => unarchiveHadler() : () => archiveHadler()}>
              <Feather name="archive" color={darkMode ? "#FFF" : "#000"} size={20}></Feather>
            </TouchableOpacity>
            <TouchableOpacity style={darkMode ? styles.delete_button_dark : styles.delete_button} onPress={() => deleteNotes()}>
              <Feather name="trash" color="red" size={20}></Feather>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <View></View>
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    headbar: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
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
    },
    headbar_trash_button: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: 40,
      height: 40,
      borderRadius: 30,
    },
    headbar_save_button: {
      padding: 10
    },
    headbar_save_button_text: {
      fontWeight: "bold",
      fontSize: 18,
      color: "#2563eb"
    },
    container: {
      marginTop: 10,
      paddingHorizontal: 30,
    },
    date: {
      color: "#94a3b8",
      fontWeight: "bold",
      marginBottom: 5,
    },
    title: {
        fontSize: 25,
        fontWeight: "bold",
        color: "#1E293B"
    },
    title_dark: {
        fontSize: 25,
        fontWeight: "bold",
        color: "#C4C4C4",
    },
    content: {
      fontSize: 16,
      marginTop: 20,
      lineHeight: 28,
      color: "#64748B",
    },
    content_dark: {
      fontSize: 16,
      marginTop: 20,
      lineHeight: 28,
      color: "#9ca3af",
    },
    menu_button: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      position: "absolute",
      bottom: 0,
      right: 0,
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: "#2563eb",
      marginRight: 30,
      marginBottom: 30,
      zIndex: 50
    },
    show_button: {
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      gap: 10,
      position: "absolute",
      bottom: 0,
      right: 0,
      width: 60,
      marginRight: 30,
      marginBottom: 120,
      borderRadius: 40,
      zIndex: 50
    },
    archive_button: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: "white",
      zIndex: 50
    },
    archive_button_dark: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: "#1f2937",
      zIndex: 50
    },
    delete_button: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: "white",
      zIndex: 50
  },
    delete_button_dark: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: "#1f2937",
      zIndex: 50
  },
})