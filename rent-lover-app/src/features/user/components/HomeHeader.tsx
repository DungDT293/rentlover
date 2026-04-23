import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../../../theme';

type HomeHeaderProps = {
  userName: string;
  city: string;
};

export function HomeHeader({ userName, city }: HomeHeaderProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>Xin chào, {userName}</Text>
      <Text style={styles.subtitle}>Hôm nay bạn cần gì?</Text>
      <View style={styles.locationRow}>
        <Ionicons name="location-outline" size={16} color={theme.primary} />
        <Text style={styles.locationText}>{city}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
  },
  greeting: {
    fontSize: 28,
    fontWeight: '700',
    color: theme.textPrimary,
    lineHeight: 38,
  },
  subtitle: {
    fontSize: 15,
    color: theme.textSecondary,
    marginTop: 4,
    lineHeight: 22,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 10,
  },
  locationText: {
    fontSize: 14,
    color: theme.primary,
    fontWeight: '600',
  },
});
