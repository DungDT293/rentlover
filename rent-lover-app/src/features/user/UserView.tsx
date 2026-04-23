import { Text, View } from 'react-native';
import { SectionCard } from '../../components/SectionCard';
import { sharedStyles } from '../../styles/shared';
import {
  BookingState,
  BookingTimelineItem,
  CompanionProfile,
} from '../../types/domain';
import { BookingFormCard } from './components/BookingFormCard';
import { BookingTimelineCard } from './components/BookingTimelineCard';
import { CompanionListCard } from './components/CompanionListCard';

type UserViewProps = {
  companions: CompanionProfile[];
  selectedCompanionId: string;
  selectedCompanion: CompanionProfile;
  onSelectCompanion: (id: string) => void;
  meetingTime: string;
  meetingPlace: string;
  meetingNote: string;
  onMeetingTimeChange: (value: string) => void;
  onMeetingPlaceChange: (value: string) => void;
  onMeetingNoteChange: (value: string) => void;
  bookingState: BookingState;
  bookingTimeline: BookingTimelineItem[];
  onBookingStateChange: (state: BookingState) => void;
};

export function UserView(props: UserViewProps) {
  return (
    <View>
      <SectionCard
        title="Discover companions"
        right={<Text style={sharedStyles.sectionMeta}>Pilot market: Da Nang</Text>}
      >
        <CompanionListCard
          companions={props.companions}
          selectedCompanionId={props.selectedCompanionId}
          onSelectCompanion={props.onSelectCompanion}
        />
      </SectionCard>

      <BookingFormCard
        meetingNote={props.meetingNote}
        meetingPlace={props.meetingPlace}
        meetingTime={props.meetingTime}
        onMeetingNoteChange={props.onMeetingNoteChange}
        onMeetingPlaceChange={props.onMeetingPlaceChange}
        onMeetingTimeChange={props.onMeetingTimeChange}
        selectedCompanion={props.selectedCompanion}
      />

      <BookingTimelineCard
        bookingState={props.bookingState}
        bookingTimeline={props.bookingTimeline}
        onBookingStateChange={props.onBookingStateChange}
      />
    </View>
  );
}
