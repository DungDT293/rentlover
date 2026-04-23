import { StyleSheet, Text, TextInput, View } from 'react-native';
import { SectionCard } from '../../../components/SectionCard';
import { sharedStyles } from '../../../styles/shared';
import { theme } from '../../../theme';
import { CompanionProfile } from '../../../types/domain';
import { formatVnd } from '../../../utils/currency';

type BookingFormCardProps = {
  selectedCompanion: CompanionProfile;
  meetingTime: string;
  meetingPlace: string;
  meetingNote: string;
  onMeetingTimeChange: (value: string) => void;
  onMeetingPlaceChange: (value: string) => void;
  onMeetingNoteChange: (value: string) => void;
};

export function BookingFormCard({
  meetingNote,
  meetingPlace,
  meetingTime,
  onMeetingNoteChange,
  onMeetingPlaceChange,
  onMeetingTimeChange,
  selectedCompanion,
}: BookingFormCardProps) {
  const estimatedHours = 2;
  const subtotal = selectedCompanion.ratePerHour * estimatedHours;
  const escrowFee = 95000;
  const total = subtotal + escrowFee;

  return (
    <SectionCard title="Create booking">
      <Text style={styles.helperText}>
        {'Luong booking khuyen nghi: draft -> pending -> accepted -> in_progress -> completed'}
      </Text>

      <Text style={styles.inputLabel}>Thoi gian gap</Text>
      <TextInput value={meetingTime} onChangeText={onMeetingTimeChange} style={styles.input} />

      <Text style={styles.inputLabel}>Dia diem cong khai</Text>
      <TextInput value={meetingPlace} onChangeText={onMeetingPlaceChange} style={styles.input} />

      <Text style={styles.inputLabel}>Ghi chu cho companion</Text>
      <TextInput
        value={meetingNote}
        onChangeText={onMeetingNoteChange}
        style={[styles.input, styles.inputMulti]}
        multiline
      />

      <View style={styles.summaryBox}>
        <View style={sharedStyles.rowLine}>
          <Text style={sharedStyles.rowLabel}>Companion</Text>
          <Text style={sharedStyles.rowValue}>{selectedCompanion.name}</Text>
        </View>
        <View style={sharedStyles.rowLine}>
          <Text style={sharedStyles.rowLabel}>Tam tinh 2 gio</Text>
          <Text style={sharedStyles.rowValue}>{formatVnd(subtotal)}</Text>
        </View>
        <View style={sharedStyles.rowLine}>
          <Text style={sharedStyles.rowLabel}>Phi escrow</Text>
          <Text style={sharedStyles.rowValue}>{formatVnd(escrowFee)}</Text>
        </View>
        <View style={[sharedStyles.rowLine, styles.totalRow]}>
          <Text style={styles.totalLabel}>Tong tam giu</Text>
          <Text style={styles.totalValue}>{formatVnd(total)}</Text>
        </View>
      </View>
    </SectionCard>
  );
}

const styles = StyleSheet.create({
  helperText: {
    color: theme.textDim,
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 12,
  },
  inputLabel: {
    color: theme.textSub,
    fontSize: 12,
    marginBottom: 6,
    marginTop: 4,
  },
  input: {
    color: theme.textMain,
    backgroundColor: '#151213',
    borderColor: theme.border,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 11,
    marginBottom: 10,
  },
  inputMulti: {
    minHeight: 88,
    textAlignVertical: 'top',
  },
  summaryBox: {
    backgroundColor: '#171415',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#3a3132',
    padding: 12,
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: theme.border,
    paddingTop: 10,
    marginTop: 2,
  },
  totalLabel: {
    color: '#ffe2a8',
    fontSize: 15,
    fontWeight: '700',
  },
  totalValue: {
    color: theme.accent,
    fontSize: 16,
    fontWeight: '800',
  },
});
