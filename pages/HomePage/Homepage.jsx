import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, SafeAreaView, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Feather from '@expo/vector-icons/Feather';
import SearchBox from '../../components/SearchBox';
import NotesEmpty from '../../components/NotesEmpty';
import { useSelector, useDispatch } from 'react-redux';
import { setDarkMode, setLanguage } from '../../redux/actions';

export default function Homepage({navigation}) {
    const [ notesData, setNotesData ] = useState([]);
    const [ layoutState, setLayoutState ] = useState("grid")
    const [ displayWidth, setDisplayWidth ] = useState("47%");
    const [ displayHeight, setDisplayHeight ] = useState(200);
    const [ displayStyle, setDisplayStyle ] = useState("none");
    const { darkMode, language } = useSelector((state) => state);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [ loaded, setLoaded ] = useState(false);
    const dispatch = useDispatch();

    
    useEffect(() => {
        const loadReduxState = async() => {
            try {
              const darkModeState = await AsyncStorage.getItem("darkMode");
              const langState = await AsyncStorage.getItem("language");
              if(darkModeState !== null && langState !== null) {
                const parsedThemeState = JSON.parse(darkModeState);
                const parsedLangState = JSON.parse(langState);
                dispatch(setDarkMode(parsedThemeState));
                dispatch(setLanguage(parsedLangState));
              }
            } catch(error) {
              console.log(error);
            }
            setLoaded(true);
        };
      
        loadReduxState();
        
        const subs = navigation.addListener("focus", () => {
            getNotes();
        });
        return subs;
    },[])
    
    const getNotes = async() => {
        let notes = await AsyncStorage.getItem("notes");
        notes = JSON.parse(notes) || [];
        const unarchivedNotes = notes.filter(note => !note.isArchived);
        const sortedNotes = unarchivedNotes.sort((a,b) => b.id - a.id);
        setNotesData(sortedNotes);
        setSearchResults(sortedNotes);
    }

    const searchNotes = (input) => {
        setSearchTerm(input);
        if(input) {
            const filteredData = notesData.filter((note) => note.title.toLowerCase().includes(input.toLowerCase()) );
            setSearchResults(filteredData);
        } else {
            setSearchResults(notesData);
        }
    }

    const toggleChangeLayout = () => {
        setDisplayWidth(displayWidth === "47%" ? "100%" : "47%");
        setDisplayHeight(displayHeight === 200 ? 120 : 200);
        setLayoutState(layoutState === "grid" ? "column" : "grid");
    }

    const toggleDisplay = () => {
        setDisplayStyle(displayStyle === "none" ? "flex" : "none");
    }


    if(!loaded) {
        return null;
    }

  return (
    <SafeAreaView>
        <StatusBar barStyle={darkMode ? "light-content" : "dark-content"} backgroundColor={darkMode ? "#111827" : "#F4F5F7"} />
        <ScrollView style={{height: "100%", backgroundColor: darkMode ? "#111827" : "#F4F5F7"}}>
            <View style={styles.header}>
                <Text style={darkMode ? styles.title_dark : styles.title}>{language ? "Catatan" : "Notes"}</Text>
                <TouchableOpacity style={styles.menu_button} onPress={toggleDisplay}>
                    <Feather name="more-vertical" color={darkMode ? "#FFF" : "#000"} size={18}></Feather>
                </TouchableOpacity>
            </View>

            <SearchBox searchNotes={searchNotes} searchTerm={searchTerm} />

            <View style={styles.sub_header}>
                <Text style={darkMode ? styles.sub_title_dark : styles.sub_title}>{language ? "List catatan" : "All Notes"}</Text>
                <TouchableOpacity style={styles.menu_button} onPress={toggleChangeLayout}>
                    {layoutState === "grid" ? (
                        <Feather name="columns" color={darkMode ? "#FFF" : "#000"} size={18} style={{transform: [{rotate: "90deg"}]}}></Feather>
                    ) : (
                        <Feather name="grid" color={darkMode ? "#FFF" : "#000"} size={18}></Feather>
                    )}
                </TouchableOpacity>
            </View>

            <View style={styles.notes_container}>
                {searchResults.length > 0 ? searchResults.map((note) => {
                    const limitTitle = note.title.substring(0, 28 - 3) + "...";
                    const limitContent = note.content.substring(0, 120 - 3) + "...";
                    return (
                        <TouchableOpacity 
                        key={note.id}
                        style={[darkMode ? styles.notes_card_dark : styles.notes_card, {width: displayWidth, height: displayHeight}]} 
                        onPress={() => navigation.navigate('NoteContent', {notes: note})}>
                            <Text style={darkMode ? styles.notes_title_dark  : styles.notes_title}>{note.title.length > 28 ? limitTitle : note.title}</Text>
                            <Text style={darkMode ? styles.notes_content_dark : styles.notes_content}>{note.content.length > 120 ? limitContent : note.content}</Text>
                        </TouchableOpacity>
                    )
                }) : (
                    <NotesEmpty />
                )}
            </View>
        </ScrollView>

        <View style={[darkMode ? styles.sub_menu_button_dark : styles.sub_menu_button, {display: displayStyle}]}>
            <TouchableOpacity 
                style={styles.item_menu_button} 
                onPress={() => {
                    navigation.navigate('ArchiveNotes');
                    setDisplayStyle("none");
                }}>
                <Feather name="archive" color={darkMode ? "#FFF" : "#000"} size={16}></Feather>
                <Text style={{color: darkMode ? "#FFF" : "#000"}}>{language ? "Arsip" : "Archive"}</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={styles.item_menu_button} 
                onPress={() => {
                    navigation.navigate('SettingsPage');
                    setDisplayStyle("none");
                }}>
                <Feather name="settings" color={darkMode ? "#FFF" : "#000"} size={16}></Feather>
                <Text style={{color: darkMode ? "#FFF" : "#000"}}>{language ? "Pengaturan" : "Settings"}</Text>
            </TouchableOpacity>
        </View>


        <TouchableOpacity style={styles.add_notes} onPress={() => navigation.navigate('NoteContent')}>
                <Feather name="plus" color="#fff" size={25}></Feather>
        </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    header: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginHorizontal: 30,
        marginTop: 20,
        marginBottom: 30,
    },
    title: {
        fontSize: 24,
        fontWeight: "700"
    },
    title_dark: {
        fontSize: 24,
        fontWeight: "700",
        color: "white"
    },
    sub_header: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginHorizontal: 30,
        marginTop: 30,
        marginBottom: 20,
    },
    sub_title: {
        fontSize: 18,
        fontWeight: "700",
        color: "#64748b"
    },
    sub_title_dark: {
        fontSize: 18,
        fontWeight: "700",
        color: "white"
    },
    menu_button: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: 40,
        height: 40,
        borderRadius: 30,
    },
    sub_menu_button: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top: 60,
        right: 20,
        zIndex: 50,
        borderRadius: 10,
        backgroundColor: "white"
    },
    sub_menu_button_dark: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top: 60,
        right: 20,
        zIndex: 50,
        borderRadius: 10,
        backgroundColor: "#1f2937"
    },
    item_menu_button: {
        display: "flex",
        flexDirection: "row",
        gap: 20,
        paddingHorizontal: 40,
        paddingVertical: 20,
    },
    add_notes: {
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
        height: 200,
        borderRadius: 15,
        paddingVertical: 15,
        paddingHorizontal: 20,
        backgroundColor: "white",
    },
    notes_card_dark: {
        width: "47%",
        height: 200,
        borderRadius: 15,
        paddingVertical: 15,
        paddingHorizontal: 20,
        backgroundColor: "#1f2937",
        borderWidth: 1,
        borderColor: "#374151",
    },
    notes_title: {
        fontSize: 18,
        fontWeight: "700",
        color: "#1E293B"
    },
    notes_title_dark: {
        fontSize: 18,
        fontWeight: "700",
        color: "#C4C4C4",
    },
    notes_content: {
        fontSize: 14,
        marginTop: 8,
        color: "#64748B",
    },
    notes_content_dark: {
        fontSize: 14,
        marginTop: 8,
        color: "#9ca3af",
    },
})