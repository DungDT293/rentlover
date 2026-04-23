import { Platform, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../../../theme';
import { TabItem } from '../../../types/domain';

type BottomTabBarProps = {
  tabs: TabItem[];
  activeTabId: string;
};

export function BottomTabBar({ tabs, activeTabId }: BottomTabBarProps) {
  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const isActive = tab.id === activeTabId;
        return (
          <View key={tab.id} style={styles.tab}>
            <Ionicons
              name={(isActive ? tab.icon : tab.iconOutline) as any}
              size={24}
              color={isActive ? theme.primary : theme.textSecondary}
            />
            <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]}>
              {tab.label}
            </Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: theme.surfaceCard,
    borderTopWidth: 1,
    borderTopColor: theme.border,
    paddingTop: 8,
    paddingBottom: Platform.OS === 'ios' ? 24 : 10,
  },
  tab: {
    alignItems: 'center',
    gap: 3,
    paddingHorizontal: 12,
  },
  tabLabel: {
    fontSize: 11,
    color: theme.textSecondary,
    lineHeight: 16,
  },
  tabLabelActive: {
    color: theme.primary,
    fontWeight: '600',
  },
});
