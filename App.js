import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Homepage from './pages/HomePage/Homepage';
import NoteContent from './pages/NotePage/NoteContent';
import ArchiveNotes from './pages/ArchivePage/ArchiveNotes';
import SettingsPage from './pages/SettingsPage/SettingsPage';
import AboutPage from './pages/SettingsPage/AboutPage';
import { Provider } from 'react-redux';
import store from './redux/store';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <View style={styles.container}>
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Homepage" component={Homepage} />
            <Stack.Screen name="NoteContent" component={NoteContent} />
            <Stack.Screen name="ArchiveNotes" component={ArchiveNotes} />
            <Stack.Screen name="SettingsPage" component={SettingsPage} />
            <Stack.Screen name="AboutPage" component={AboutPage} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
});
