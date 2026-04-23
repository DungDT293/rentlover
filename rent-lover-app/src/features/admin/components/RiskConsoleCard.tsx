import { StyleSheet, Text, View } from 'react-native';
import { SectionCard } from '../../../components/SectionCard';
import { theme } from '../../../theme';
import { IncidentItem } from '../../../types/domain';

type RiskConsoleCardProps = {
  incidents: IncidentItem[];
};

export function RiskConsoleCard({ incidents }: RiskConsoleCardProps) {
  return (
    <SectionCard title="Admin risk console">
      {incidents.map((item) => (
        <View key={item.id} style={styles.incidentCard}>
          <Text style={styles.incidentTitle}>{item.title}</Text>
          <Text style={styles.incidentText}>{item.detail}</Text>
        </View>
      ))}
    </SectionCard>
  );
}

const styles = StyleSheet.create({
  incidentCard: {
    borderRadius: 14,
    backgroundColor: '#181516',
    borderWidth: 1,
    borderColor: '#332a2a',
    padding: 12,
    marginBottom: 10,
  },
  incidentTitle: {
    color: theme.textMain,
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 4,
  },
  incidentText: {
    color: theme.textSub,
    fontSize: 12,
    lineHeight: 17,
  },
});
