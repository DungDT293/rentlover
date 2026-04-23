import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../../../theme';
import { OnlineService } from '../../../types/domain';
import { formatVnd } from '../../../utils/currency';

type OnlineServicesSectionProps = {
  services: OnlineService[];
};

export function OnlineServicesSection({ services }: OnlineServicesSectionProps) {
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Ionicons name="headset-outline" size={20} color={theme.primary} />
        <Text style={styles.headerText}>Dịch vụ trực tuyến</Text>
      </View>

      <View style={styles.cardsRow}>
        {services.map((service) => (
          <View key={service.id} style={styles.serviceCard}>
            <View style={styles.iconCircle}>
              <Ionicons
                name={service.icon as any}
                size={22}
                color={theme.primary}
              />
            </View>
            <Text style={styles.serviceTitle}>{service.title}</Text>
            <Text style={styles.serviceSubtitle}>{service.subtitle}</Text>
            <Text style={styles.servicePrice}>{formatVnd(service.price)}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginBottom: 24,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 14,
  },
  headerText: {
    fontSize: 18,
    fontWeight: '700',
    color: theme.textPrimary,
  },
  cardsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  serviceCard: {
    flex: 1,
    backgroundColor: theme.surfaceCard,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: theme.border,
    padding: 16,
    shadowColor: theme.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 2,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: theme.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  serviceTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: theme.textPrimary,
    marginBottom: 4,
    lineHeight: 22,
  },
  serviceSubtitle: {
    fontSize: 12,
    color: theme.textSecondary,
    marginBottom: 10,
    lineHeight: 18,
  },
  servicePrice: {
    fontSize: 15,
    fontWeight: '700',
    color: theme.secondary,
    lineHeight: 22,
  },
});
