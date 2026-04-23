import { View } from 'react-native';
import { ControlCenterCard } from './components/ControlCenterCard';
import { IncomingRequestCard } from './components/IncomingRequestCard';
import { SafetyCard } from './components/SafetyCard';

export function CompanionView() {
  return (
    <View>
      <ControlCenterCard />
      <IncomingRequestCard />
      <SafetyCard />
    </View>
  );
}
