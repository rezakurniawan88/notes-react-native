import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { useSelector } from 'react-redux';

export default function NotesEmpty() {
    const { language } = useSelector((state) => state);

  return (
    <View style={styles.notes_empty}>
        <Image
            style={styles.notes_empty_image}
            source={require("../assets/images/notes.png")}
        />
        <Text style={styles.notes_empty_text}>{language ? "Tidak ada notes" : "Notes Empty"}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    notes_empty: {
        width: "100%",
        height: 500,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 20
    },
    notes_empty_image: {
        width: 150,
        height: 150
    },
    notes_empty_text: {
        fontSize: 24,
        fontWeight: "400",
        color: "gray",
    },
})