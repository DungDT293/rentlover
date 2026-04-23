import { Pressable, StyleSheet, Text } from 'react-native';
import { SectionCard } from '../../../components/SectionCard';
import { theme } from '../../../theme';
import { BookingState, BookingTimelineItem } from '../../../types/domain';

type BookingTimelineCardProps = {
  bookingState: BookingState;
  bookingTimeline: BookingTimelineItem[];
  onBookingStateChange: (state: BookingState) => void;
};

export function BookingTimelineCard({
  bookingState,
  bookingTimeline,
  onBookingStateChange,
}: BookingTimelineCardProps) {
  return (
    <SectionCard
      title="Booking state machine"
      right={<Text style={[styles.stateBadge, { color: getBookingTone(bookingState) }]}>{bookingState}</Text>}
    >
      {bookingTimeline.map((item) => {
        const active = item.state === bookingState;

        return (
          <Pressable
            key={item.state}
            style={[styles.timelineItem, active && styles.timelineItemActive]}
            onPress={() => onBookingStateChange(item.state)}
          >
            <Text style={[styles.timelineTitle, active && styles.timelineTitleActive]}>
              {item.label}
            </Text>
            <Text style={styles.timelineNote}>{item.note}</Text>
          </Pressable>
        );
      })}
    </SectionCard>
  );
}

const getBookingTone = (state: BookingState) => {
  switch (state) {
    case 'draft':
      return theme.textDim;
    case 'pending':
      return theme.accent;
    case 'accepted':
      return theme.accentCool;
    case 'in_progress':
      return '#f2c66c';
    case 'completed':
      return theme.success;
  }
};

const styles = StyleSheet.create({
  stateBadge: {
    fontSize: 12,
    textTransform: 'uppercase',
    fontFamily: 'monospace',
  },
  timelineItem: {
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: '#3a3031',
    backgroundColor: '#191617',
    marginBottom: 8,
  },
  timelineItemActive: {
    borderColor: theme.accentCool,
    backgroundColor: '#162120',
  },
  timelineTitle: {
    color: theme.textMain,
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 4,
  },
  timelineTitleActive: {
    color: '#d8fff6',
  },
  timelineNote: {
    color: theme.textSub,
    fontSize: 12,
    lineHeight: 17,
  },
});
