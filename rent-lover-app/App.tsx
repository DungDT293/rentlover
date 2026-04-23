import { StatusBar } from 'expo-status-bar';
import { useCallback, useMemo, useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { HomeScreen } from './src/features/user/HomeScreen';
import { CompanionProfileScreen } from './src/features/user/CompanionProfileScreen';
import { BookingScreen } from './src/features/user/BookingScreen';
import { COMPANIONS } from './src/data/mock';
import { theme } from './src/theme';
import { AppScreen } from './src/types/domain';

export default function App() {
  const [screen, setScreen] = useState<AppScreen>('home');
  const [selectedCompanionId, setSelectedCompanionId] = useState<string | null>(null);

  const selectedCompanion = useMemo(
    () => COMPANIONS.find((c) => c.id === selectedCompanionId) ?? COMPANIONS[0],
    [selectedCompanionId]
  );

  const goToProfile = useCallback((id: string) => {
    setSelectedCompanionId(id);
    setScreen('profile');
  }, []);

  const goToBooking = useCallback(() => {
    setScreen('booking');
  }, []);

  const goHome = useCallback(() => {
    setScreen('home');
    setSelectedCompanionId(null);
  }, []);

  const goBackFromBooking = useCallback(() => {
    setScreen('profile');
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      {screen === 'home' && (
        <HomeScreen onViewProfile={goToProfile} />
      )}
      {screen === 'profile' && (
        <CompanionProfileScreen
          companion={selectedCompanion}
          onBack={goHome}
          onBooking={goToBooking}
        />
      )}
      {screen === 'booking' && (
        <BookingScreen
          companion={selectedCompanion}
          onBack={goBackFromBooking}
        />
      )}
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
