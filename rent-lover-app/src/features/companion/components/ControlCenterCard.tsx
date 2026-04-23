import { StyleSheet, Text, View } from 'react-native';
import { SectionCard } from '../../../components/SectionCard';
import { sharedStyles } from '../../../styles/shared';
import { theme } from '../../../theme';
import { formatVnd } from '../../../utils/currency';

export function ControlCenterCard() {
  return (
    <SectionCard
      title="Companion control center"
      right={<Text style={sharedStyles.sectionMeta}>Availability on</Text>}
    >
      <View style={styles.kpiRow}>
        <View style={styles.kpiCard}>
          <Text style={styles.kpiValue}>8</Text>
          <Text style={styles.kpiLabel}>booking tuan nay</Text>
        </View>
        <View style={styles.kpiCard}>
          <Text style={styles.kpiValue}>{formatVnd(12400000)}</Text>
          <Text style={styles.kpiLabel}>doanh thu cho doi giai ngan</Text>
        </View>
      </View>

      <View style={sharedStyles.featureList}>
        <Text style={sharedStyles.featureItem}>Portfolio: anh + video intro, subtitle AI</Text>
        <Text style={sharedStyles.featureItem}>Lich: chan khung gio trung booking</Text>
        <Text style={sharedStyles.featureItem}>Payout: rut tien sau khi booking hoan tat</Text>
      </View>
    </SectionCard>
  );
}

const styles = StyleSheet.create({
  kpiRow: {
    gap: 10,
    marginBottom: 12,
  },
  kpiCard: {
    borderRadius: 16,
    padding: 12,
    backgroundColor: theme.panelSoft,
    borderWidth: 1,
    borderColor: '#403434',
  },
  kpiValue: {
    color: theme.accent,
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 4,
  },
  kpiLabel: {
    color: theme.textSub,
    fontSize: 12,
    lineHeight: 17,
  },
});
