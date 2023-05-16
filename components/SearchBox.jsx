import React from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import { useSelector } from 'react-redux';

export default function SearchBox({searchNotes, searchTerm}) {
  const { darkMode,language } = useSelector((state) => state);

  return (
    <View style={darkMode ? styles.search_box_dark : styles.search_box}>
      <View>
          <Feather name="search" color={darkMode ? "#9CA3AF" : "#000"} size={20}></Feather>
      </View>
      <TextInput 
        style={darkMode ? styles.search_box_input_dark : styles.search_box_input} 
        placeholder={language ? "Cari catatan ..." : "Search notes ..."} 
        placeholderTextColor={darkMode ? "#9CA3AF" : "gray"} 
        onChangeText={(input) => searchNotes(input)}
        value={searchTerm}
        />
    </View>
  )
}

const styles = StyleSheet.create({
  search_box: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    backgroundColor: "white",
    marginHorizontal: 30,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
  },
  search_box_dark: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#374151",
    marginHorizontal: 30,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
  },
  search_box_input: {
      width: "90%",
      fontSize: 16
  },
  search_box_input_dark: {
      width: "90%",
      fontSize: 16,
      color: "white"
  },
})