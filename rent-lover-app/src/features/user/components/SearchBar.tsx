import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../../../theme';

type SearchBarProps = {
  onPress?: () => void;
};

export function SearchBar({ onPress }: SearchBarProps) {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <View style={styles.searchRow}>
        <Ionicons name="search-outline" size={20} color={theme.textSecondary} />
        <Text style={styles.placeholder}>Tìm kiếm companion...</Text>
        <View style={styles.filterButton}>
          <Ionicons name="options-outline" size={20} color={theme.primary} />
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 16,
    marginBottom: 12,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.surfaceCard,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: theme.border,
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 10,
    shadowColor: theme.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 1,
  },
  placeholder: {
    flex: 1,
    fontSize: 15,
    color: theme.textSecondary,
    lineHeight: 22,
  },
  filterButton: {
    padding: 4,
  },
});
