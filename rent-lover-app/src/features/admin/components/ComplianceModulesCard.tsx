import { Text, View } from 'react-native';
import { SectionCard } from '../../../components/SectionCard';
import { sharedStyles } from '../../../styles/shared';

export function ComplianceModulesCard() {
  return (
    <SectionCard title="Trust and compliance modules">
      <View style={sharedStyles.featureList}>
        <Text style={sharedStyles.featureItem}>
          eKYC: OCR CCCD/Passport + face match + manual review
        </Text>
        <Text style={sharedStyles.featureItem}>
          AI moderation: flag groomed or illicit solicitation patterns
        </Text>
        <Text style={sharedStyles.featureItem}>
          Dispute desk: timeline, evidence, refund / partial release flow
        </Text>
        <Text style={sharedStyles.featureItem}>
          Audit log: immutable actions for policy and payout decisions
        </Text>
      </View>
    </SectionCard>
  );
}
