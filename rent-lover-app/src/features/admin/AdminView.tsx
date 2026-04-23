import { View } from 'react-native';
import { IncidentItem } from '../../types/domain';
import { BackendStackCard } from './components/BackendStackCard';
import { ComplianceModulesCard } from './components/ComplianceModulesCard';
import { RiskConsoleCard } from './components/RiskConsoleCard';

type AdminViewProps = {
  incidents: IncidentItem[];
};

export function AdminView({ incidents }: AdminViewProps) {
  return (
    <View>
      <RiskConsoleCard incidents={incidents} />
      <ComplianceModulesCard />
      <BackendStackCard />
    </View>
  );
}
