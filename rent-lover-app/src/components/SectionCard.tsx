import { PropsWithChildren, ReactNode } from 'react';
import { Text, View } from 'react-native';
import { sharedStyles } from '../styles/shared';

type SectionCardProps = PropsWithChildren<{
  title?: string;
  right?: ReactNode;
}>;

export function SectionCard({ children, right, title }: SectionCardProps) {
  return (
    <View style={sharedStyles.sectionCard}>
      {(title || right) && (
        <View style={sharedStyles.sectionHeader}>
          <Text style={sharedStyles.sectionTitle}>{title}</Text>
          {right}
        </View>
      )}
      {children}
    </View>
  );
}
