import { StyleSheet } from 'react-native';
import { theme } from '../theme';

export const sharedStyles = StyleSheet.create({
  sectionCard: {
    backgroundColor: theme.surfaceCard,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: theme.border,
    padding: 16,
    marginBottom: 14,
    shadowColor: theme.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },
  sectionTitle: {
    color: theme.textPrimary,
    fontSize: 18,
    fontWeight: '700',
  },
  sectionMeta: {
    color: theme.primary,
    fontSize: 12,
  },
  rowLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 8,
  },
  rowLabel: {
    color: theme.textSecondary,
    fontSize: 13,
  },
  rowValue: {
    color: theme.textPrimary,
    fontSize: 13,
    fontWeight: '600',
  },
  featureList: {
    gap: 8,
  },
  featureItem: {
    color: theme.textSecondary,
    fontSize: 13,
    lineHeight: 18,
  },
});
