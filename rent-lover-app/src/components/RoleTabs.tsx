import { Pressable, StyleSheet, Text, View } from 'react-native';
import { theme } from '../theme';
import { Role, RoleOption } from '../types/domain';

type RoleTabsProps = {
  roles: RoleOption[];
  activeRole: Role;
  onSelectRole: (role: Role) => void;
};

export function RoleTabs({ roles, activeRole, onSelectRole }: RoleTabsProps) {
  return (
    <View style={styles.segmentRow}>
      {roles.map((role) => {
        const isActive = role.id === activeRole;

        return (
          <Pressable
            key={role.id}
            style={[styles.segment, isActive && styles.segmentActive]}
            onPress={() => onSelectRole(role.id)}
          >
            <Text style={[styles.segmentLabel, isActive && styles.segmentLabelActive]}>
              {role.label}
            </Text>
            <Text style={styles.segmentHint}>{role.subtitle}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  segmentRow: {
    gap: 10,
    marginBottom: 14,
  },
  segment: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: theme.border,
    backgroundColor: theme.panelMute,
    padding: 13,
  },
  segmentActive: {
    backgroundColor: theme.panel,
    borderColor: theme.accentStrong,
  },
  segmentLabel: {
    color: theme.textMain,
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  segmentLabelActive: {
    color: '#ffe5db',
  },
  segmentHint: {
    color: theme.textDim,
    fontSize: 12,
  },
});
