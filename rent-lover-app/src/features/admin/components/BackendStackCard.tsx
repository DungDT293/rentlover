import { StyleSheet, Text } from 'react-native';
import { SectionCard } from '../../../components/SectionCard';
import { theme } from '../../../theme';

export function BackendStackCard() {
  return (
    <SectionCard title="Suggested backend stack">
      <Text style={styles.stackText}>Mobile: Expo + React Native + TypeScript</Text>
      <Text style={styles.stackText}>API: FastAPI + PostgreSQL + Redis</Text>
      <Text style={styles.stackText}>Media: Cloudflare R2</Text>
      <Text style={styles.stackText}>Realtime: WebSocket / WebRTC</Text>
      <Text style={styles.stackText}>Payments: escrow gateway abstraction</Text>
    </SectionCard>
  );
}

const styles = StyleSheet.create({
  stackText: {
    color: theme.textSub,
    fontSize: 13,
    lineHeight: 19,
    marginBottom: 5,
  },
});
