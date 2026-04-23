import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { theme } from '../../../theme';
import { QuickFilter } from '../../../types/domain';

type QuickFiltersProps = {
  filters: QuickFilter[];
  activeFilterId: string | null;
  onFilterPress: (id: string) => void;
};

export function QuickFilters({ filters, activeFilterId, onFilterPress }: QuickFiltersProps) {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {filters.map((filter) => {
          const isActive = filter.id === activeFilterId;
          return (
            <Pressable
              key={filter.id}
              style={[styles.pill, isActive && styles.pillActive]}
              onPress={() => onFilterPress(isActive ? '' : filter.id)}
            >
              <Text style={[styles.pillText, isActive && styles.pillTextActive]}>
                {filter.label}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  scrollContent: {
    paddingHorizontal: 20,
    gap: 8,
  },
  pill: {
    backgroundColor: theme.surfaceCard,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: theme.border,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  pillActive: {
    backgroundColor: theme.primaryLight,
    borderColor: theme.primary,
  },
  pillText: {
    fontSize: 13,
    fontWeight: '500',
    color: theme.textPrimary,
    lineHeight: 18,
  },
  pillTextActive: {
    color: theme.primary,
  },
});
