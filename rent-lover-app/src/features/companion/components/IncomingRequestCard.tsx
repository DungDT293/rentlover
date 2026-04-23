import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SectionCard } from '../../../components/SectionCard';
import { theme } from '../../../theme';

export function IncomingRequestCard() {
  return (
    <SectionCard title="Incoming request">
      <View style={styles.requestCard}>
        <Text style={styles.requestTitle}>Booking from user #U2048</Text>
        <Text style={styles.requestText}>Ngay: 25/04 - 19:30</Text>
        <Text style={styles.requestText}>Dia diem: Cafe cong khai tai Hai Chau</Text>
        <Text style={styles.requestText}>
          Ghi chu: Tro chuyen, di su kien nhe, khong qua gioi han dich vu.
        </Text>
      </View>

      <View style={styles.actionRow}>
        <Pressable style={[styles.actionButton, styles.acceptButton]}>
          <Text style={styles.actionButtonTextDark}>Accept booking</Text>
        </Pressable>
        <Pressable style={[styles.actionButton, styles.rejectButton]}>
          <Text style={styles.actionButtonTextLight}>Decline</Text>
        </Pressable>
      </View>
    </SectionCard>
  );
}

const styles = StyleSheet.create({
  requestCard: {
    backgroundColor: '#181415',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#3b3030',
    padding: 12,
    marginBottom: 12,
  },
  requestTitle: {
    color: theme.textMain,
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 6,
  },
  requestText: {
    color: theme.textSub,
    fontSize: 12,
    lineHeight: 17,
    marginBottom: 4,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 10,
  },
  actionButton: {
    flex: 1,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  acceptButton: {
    backgroundColor: theme.accent,
  },
  rejectButton: {
    backgroundColor: '#2b2324',
    borderWidth: 1,
    borderColor: '#594041',
  },
  actionButtonTextDark: {
    color: '#342109',
    fontWeight: '800',
  },
  actionButtonTextLight: {
    color: '#ffd9d9',
    fontWeight: '700',
  },
});
