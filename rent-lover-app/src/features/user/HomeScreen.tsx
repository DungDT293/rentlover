import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../../theme';
import { COMPANIONS, MOCK_USER, ONLINE_SERVICES, QUICK_FILTERS, TAB_ITEMS } from '../../data/mock';
import { HomeHeader } from './components/HomeHeader';
import { SearchBar } from './components/SearchBar';
import { QuickFilters } from './components/QuickFilters';
import { CompanionCard } from './components/CompanionCard';
import { OnlineServicesSection } from './components/OnlineServicesSection';
import { BottomTabBar } from './components/BottomTabBar';

type HomeScreenProps = {
  onViewProfile: (id: string) => void;
};

export function HomeScreen({ onViewProfile }: HomeScreenProps) {
  const [activeFilterId, setActiveFilterId] = useState<string | null>(null);

  const onlineCompanions = COMPANIONS.filter((c) => c.isOnline);
  const offlineCompanions = COMPANIONS.filter((c) => !c.isOnline);

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <HomeHeader userName={MOCK_USER.firstName} city={MOCK_USER.city} />
        <SearchBar />
        <QuickFilters
          filters={QUICK_FILTERS}
          activeFilterId={activeFilterId}
          onFilterPress={(id) => setActiveFilterId(id || null)}
        />

        {/* Section: Có thể gặp hôm nay */}
        <View style={styles.sectionHeaderRow}>
          <Ionicons name="flash-outline" size={20} color={theme.secondary} />
          <Text style={styles.sectionTitle}>Có thể gặp hôm nay</Text>
        </View>
        {onlineCompanions.map((companion) => (
          <CompanionCard
            key={companion.id}
            companion={companion}
            onViewProfile={onViewProfile}
          />
        ))}

        {/* Section: Đánh giá cao */}
        <View style={styles.sectionHeaderRow}>
          <Ionicons name="star-outline" size={20} color={theme.secondary} />
          <Text style={styles.sectionTitle}>Được đánh giá cao</Text>
        </View>
        {offlineCompanions.map((companion) => (
          <CompanionCard
            key={companion.id}
            companion={companion}
            onViewProfile={onViewProfile}
          />
        ))}

        {/* Online services */}
        <OnlineServicesSection services={ONLINE_SERVICES} />
      </ScrollView>

      <BottomTabBar tabs={TAB_ITEMS} activeTabId="home" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.surface,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginHorizontal: 20,
    marginTop: 8,
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: theme.textPrimary,
  },
});
