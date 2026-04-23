import { Pressable, StyleSheet, Text, View } from 'react-native';
import { theme } from '../../../theme';
import { CompanionProfile } from '../../../types/domain';
import { formatVnd } from '../../../utils/currency';

type CompanionListCardProps = {
  companions: CompanionProfile[];
  selectedCompanionId: string;
  onSelectCompanion: (id: string) => void;
};

export function CompanionListCard({
  companions,
  onSelectCompanion,
  selectedCompanionId,
}: CompanionListCardProps) {
  return (
    <View>
      {companions.map((profile) => {
        const selected = profile.id === selectedCompanionId;

        return (
          <Pressable
            key={profile.id}
            style={[styles.profileCard, selected && styles.profileCardActive]}
            onPress={() => onSelectCompanion(profile.id)}
          >
            <View style={styles.profileHeader}>
              <View>
                <Text style={styles.profileName}>{profile.name}</Text>
                <Text style={styles.profileCity}>{profile.city}</Text>
              </View>
              <View style={styles.profilePriceWrap}>
                <Text style={styles.profilePrice}>{formatVnd(profile.ratePerHour)}</Text>
                <Text style={styles.profilePriceSub}>/ gio</Text>
              </View>
            </View>
            <Text style={styles.profileIntro}>{profile.intro}</Text>
            <Text style={styles.profileTags}>{profile.tags.join(' • ')}</Text>
            <View style={styles.metricsRow}>
              <Text style={styles.metricPill}>Trust {profile.trustScore}/100</Text>
              <Text style={styles.metricPill}>Next slot {profile.nextSlot}</Text>
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  profileCard: {
    backgroundColor: theme.panelSoft,
    borderRadius: 16,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  profileCardActive: {
    borderColor: theme.accent,
  },
  profileHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 10,
    marginBottom: 6,
  },
  profileName: {
    color: theme.textMain,
    fontSize: 16,
    fontWeight: '700',
  },
  profileCity: {
    color: theme.textDim,
    fontSize: 12,
    marginTop: 2,
  },
  profilePriceWrap: {
    alignItems: 'flex-end',
  },
  profilePrice: {
    color: theme.accent,
    fontSize: 13,
    fontFamily: 'monospace',
  },
  profilePriceSub: {
    color: theme.textDim,
    fontSize: 11,
  },
  profileIntro: {
    color: theme.textSub,
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 8,
  },
  profileTags: {
    color: '#f5c6a8',
    fontSize: 12,
    marginBottom: 8,
  },
  metricsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  metricPill: {
    color: theme.textMain,
    fontSize: 11,
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 999,
    backgroundColor: '#171414',
    borderWidth: 1,
    borderColor: '#3b3131',
  },
});
