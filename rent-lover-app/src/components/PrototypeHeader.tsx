import { StyleSheet, Text, View } from 'react-native';
import { theme } from '../theme';

export function PrototypeHeader() {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.eyebrow}>Safe companionship marketplace</Text>
      <Text style={styles.heroTitle}>Rent Lover product prototype</Text>
      <Text style={styles.heroText}>
        Ban demo cho nen tang ket noi dong hanh an toan, minh bach va co kiem soat
        compliance. Dich vu nhaY cam va hanh vi trai phap luat bi cam tuyet doi.
      </Text>

      <View style={styles.banner}>
        <Text style={styles.bannerTitle}>Safety rails built-in</Text>
        <Text style={styles.bannerText}>
          Public meetup only • escrow payment • in-app chat masking • SOS • KYC + moderation
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 16,
  },
  eyebrow: {
    color: theme.accentCool,
    textTransform: 'uppercase',
    letterSpacing: 2,
    fontSize: 12,
    marginBottom: 8,
    fontFamily: 'monospace',
  },
  heroTitle: {
    color: theme.textMain,
    fontSize: 33,
    lineHeight: 38,
    fontFamily: 'serif',
    marginBottom: 10,
  },
  heroText: {
    color: theme.textSub,
    fontSize: 14,
    lineHeight: 21,
    marginBottom: 14,
  },
  banner: {
    backgroundColor: '#2a2318',
    borderWidth: 1,
    borderColor: '#5a4c27',
    borderRadius: 18,
    padding: 14,
  },
  bannerTitle: {
    color: '#ffd178',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  bannerText: {
    color: '#f4dfae',
    fontSize: 13,
    lineHeight: 18,
  },
});
