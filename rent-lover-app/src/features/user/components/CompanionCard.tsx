import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../../../theme';
import { CompanionProfile } from '../../../types/domain';
import { formatVnd } from '../../../utils/currency';

type CompanionCardProps = {
  companion: CompanionProfile;
  onViewProfile: (id: string) => void;
};

export function CompanionCard({ companion, onViewProfile }: CompanionCardProps) {
  return (
    <View style={styles.card}>
      {/* Top row: Avatar + Name + Verified */}
      <View style={styles.topRow}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{companion.avatarPlaceholder}</Text>
          </View>
          {companion.isOnline && <View style={styles.onlineDot} />}
        </View>

        <View style={styles.nameColumn}>
          <Text style={styles.nameText}>
            {companion.name}, {companion.age}
          </Text>
          {companion.isVerified && (
            <View style={styles.verifiedRow}>
              <Ionicons name="checkmark-circle" size={14} color={theme.success} />
              <Text style={styles.verifiedText}>Đã xác minh</Text>
            </View>
          )}
        </View>
      </View>

      {/* Rating row */}
      <View style={styles.ratingRow}>
        <Ionicons name="star" size={14} color={theme.secondary} />
        <Text style={styles.ratingValue}>{companion.averageRating}</Text>
        <Text style={styles.ratingCount}>({companion.reviewCount} đánh giá)</Text>
      </View>

      {/* Tags */}
      <View style={styles.tagsRow}>
        {companion.tags.map((tag) => (
          <View key={tag} style={styles.tag}>
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        ))}
      </View>

      {/* Meta info */}
      <View style={styles.metaSection}>
        <View style={styles.metaRow}>
          <Ionicons name="cash-outline" size={16} color={theme.textSecondary} />
          <Text style={styles.metaText}>{formatVnd(companion.ratePerHour)}/giờ</Text>
        </View>
        <View style={styles.metaRow}>
          <Ionicons name="location-outline" size={16} color={theme.textSecondary} />
          <Text style={styles.metaText} numberOfLines={1}>
            {companion.distance} km · {companion.district}, {companion.city}
          </Text>
        </View>
        <View style={styles.metaRow}>
          <Ionicons name="time-outline" size={16} color={theme.textSecondary} />
          <Text style={styles.metaText}>Lịch trống: {companion.nextSlot}</Text>
        </View>
      </View>

      {/* Emotional ratings */}
      <View style={styles.emotionalRow}>
        {companion.emotionalRatings.map((rating) => (
          <View key={rating.label} style={styles.emotionalPill}>
            <Text style={styles.emotionalText}>
              {rating.label} {rating.score}%
            </Text>
          </View>
        ))}
      </View>

      {/* CTA */}
      <Pressable
        style={styles.ctaButton}
        onPress={() => onViewProfile(companion.id)}
      >
        <Text style={styles.ctaText}>Xem hồ sơ</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.surfaceCard,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: theme.border,
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 16,
    shadowColor: theme.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 2,
  },

  // Top row
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: theme.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.primary,
  },
  onlineDot: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: theme.online,
    borderWidth: 2,
    borderColor: theme.surfaceCard,
  },
  nameColumn: {
    flex: 1,
  },
  nameText: {
    fontSize: 17,
    fontWeight: '700',
    color: theme.textPrimary,
    lineHeight: 24,
  },
  verifiedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  verifiedText: {
    fontSize: 12,
    color: theme.success,
    fontWeight: '500',
    lineHeight: 16,
  },

  // Rating
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 12,
  },
  ratingValue: {
    fontSize: 14,
    fontWeight: '700',
    color: theme.textPrimary,
  },
  ratingCount: {
    fontSize: 13,
    color: theme.textSecondary,
  },

  // Tags
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 12,
  },
  tag: {
    backgroundColor: theme.tagBg,
    borderRadius: 24,
    paddingHorizontal: 12,
    paddingVertical: 6,
    flexShrink: 0,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '500',
    color: theme.tagText,
    lineHeight: 16,
  },

  // Meta info
  metaSection: {
    gap: 8,
    marginBottom: 12,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  metaText: {
    fontSize: 13,
    color: theme.textSecondary,
    flexShrink: 1,
    lineHeight: 18,
  },

  // Emotional ratings
  emotionalRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 14,
  },
  emotionalPill: {
    backgroundColor: theme.primaryLight,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  emotionalText: {
    fontSize: 12,
    fontWeight: '600',
    color: theme.primary,
    lineHeight: 16,
  },

  // CTA
  ctaButton: {
    backgroundColor: theme.primaryLight,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  ctaText: {
    fontSize: 15,
    fontWeight: '600',
    color: theme.primary,
    lineHeight: 22,
  },
});
