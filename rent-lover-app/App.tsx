import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet } from 'react-native';
import { HomeScreen } from './src/features/user/HomeScreen';
import { theme } from './src/theme';

export default function App() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <HomeScreen />
      <StatusBar style="dark" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.surface,
  },
});
