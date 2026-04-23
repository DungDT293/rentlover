import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SectionCard } from '../../../components/SectionCard';
import { theme } from '../../../theme';

export function SafetyCard() {
  return (
    <SectionCard title="Safety">
      <View style={styles.sosCard}>
        <Text style={styles.sosTitle}>SOS emergency action</Text>
        <Text style={styles.sosText}>
          Gui dinh vi tuc thoi den hotline, nguoi than va tao incident trong admin desk.
        </Text>
        <Pressable style={styles.sosButton}>
          <Text style={styles.sosButtonText}>Hold to trigger SOS</Text>
        </Pressable>
      </View>
    </SectionCard>
  );
}

const styles = StyleSheet.create({
  sosCard: {
    borderRadius: 16,
    backgroundColor: '#2c1717',
    borderWidth: 1,
    borderColor: '#7b4040',
    padding: 14,
  },
  sosTitle: {
    color: '#ffd0d0',
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 6,
  },
  sosText: {
    color: '#f2b8b8',
    fontSize: 12,
    lineHeight: 17,
    marginBottom: 12,
  },
  sosButton: {
    borderRadius: 12,
    backgroundColor: '#ff8f8f',
    paddingVertical: 12,
    alignItems: 'center',
  },
  sosButtonText: {
    color: '#3a1111',
    fontWeight: '900',
  },
});
