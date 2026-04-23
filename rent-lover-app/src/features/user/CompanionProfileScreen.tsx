import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../../theme';
import { CompanionProfile } from '../../types/domain';
import { MOCK_REVIEWS } from '../../data/mock';
import { formatVnd } from '../../utils/currency';

type CompanionProfileScreenProps = {
  companion: CompanionProfile;
  onBack: () => void;
  onBooking: () => void;
};

export function CompanionProfileScreen({ companion, onBack, onBooking }: CompanionProfileScreenProps) {
  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Back button */}
        <View style={styles.backRow}>
          <Pressable style={styles.backButton} onPress={onBack}>
            <Ionicons name="arrow-back" size={22} color={theme.textPrimary} />
          </Pressable>
        </View>

        {/* Video intro placeholder */}
        <View style={styles.mediaHeader}>
          <View style={styles.avatarLarge}>
            <Text style={styles.avatarLargeText}>{companion.avatarPlaceholder}</Text>
          </View>
          <View style={styles.playOverlay}>
            <Ionicons name="play-circle" size={48} color={theme.onPrimary} />
          </View>
          <Text style={styles.mediaHint}>Video giới thiệu 15 giây</Text>
        </View>

        {/* Basic info */}
        <View style={styles.infoSection}>
          <View style={styles.nameRow}>
            <Text style={styles.profileName}>{companion.name}, {companion.age}</Text>
            {companion.isOnline && (
              <View style={styles.onlineBadge}>
                <View style={styles.onlineDotSmall} />
                <Text style={styles.onlineText}>Đang trực tuyến</Text>
              </View>
            )}
          </View>

          {companion.isVerified && (
            <View style={styles.verifiedRow}>
              <Ionicons name="shield-checkmark" size={16} color={theme.success} />
              <Text style={styles.verifiedText}>Đã xác minh danh tính</Text>
            </View>
          )}

          <View style={styles.ratingRow}>
            <Ionicons name="star" size={16} color={theme.secondary} />
            <Text style={styles.ratingValue}>{companion.averageRating}</Text>
            <Text style={styles.ratingCount}>({companion.reviewCount} đánh giá)</Text>
          </View>

          <View style={styles.quoteBox}>
            <Ionicons name="chatbubble-outline" size={16} color={theme.primary} />
            <Text style={styles.quoteText}>"{companion.intro}"</Text>
          </View>
        </View>

        {/* Location & availability */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Thông tin</Text>
          <View style={styles.infoRow}>
            <Ionicons name="location-outline" size={18} color={theme.textSecondary} />
            <Text style={styles.infoText}>{companion.district}, {companion.city} · {companion.distance} km</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="time-outline" size={18} color={theme.textSecondary} />
            <Text style={styles.infoText}>Lịch trống: {companion.nextSlot}</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="cash-outline" size={18} color={theme.textSecondary} />
            <Text style={styles.infoText}>{formatVnd(companion.ratePerHour)}/giờ</Text>
          </View>
        </View>

        {/* Emotional ratings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cảm xúc từ khách</Text>
          <View style={styles.emotionalGrid}>
            {companion.emotionalRatings.map((rating) => (
              <View key={rating.label} style={styles.emotionalCard}>
                <Text style={styles.emotionalScore}>{rating.score}%</Text>
                <Text style={styles.emotionalLabel}>{rating.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Tags */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tính cách & sở thích</Text>
          <View style={styles.tagsRow}>
            {companion.tags.map((tag) => (
              <View key={tag} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Reviews */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Đánh giá gần đây</Text>
          {MOCK_REVIEWS.map((review) => (
            <View key={review.id} style={styles.reviewCard}>
              <View style={styles.reviewHeader}>
                <Text style={styles.reviewUser}>{review.userName}</Text>
                <View style={styles.reviewStars}>
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Ionicons key={i} name="star" size={12} color={theme.secondary} />
                  ))}
                </View>
                <Text style={styles.reviewDate}>{review.date}</Text>
              </View>
              <Text style={styles.reviewText}>"{review.text}"</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Sticky bottom footer */}
      <View style={styles.stickyFooter}>
        <View style={styles.priceColumn}>
          <Text style={styles.priceLabel}>Giá/giờ</Text>
          <Text style={styles.priceValue}>{formatVnd(companion.ratePerHour)}</Text>
        </View>
        <Pressable style={styles.bookButton} onPress={onBooking}>
          <Ionicons name="calendar-outline" size={18} color={theme.onPrimary} />
          <Text style={styles.bookButtonText}>Đặt lịch hẹn</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.surface,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
  },

  // Back button
  backRow: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 4,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.surfaceCard,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: theme.border,
  },

  // Media header
  mediaHeader: {
    marginHorizontal: 20,
    height: 220,
    borderRadius: 20,
    backgroundColor: theme.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    overflow: 'hidden',
  },
  avatarLarge: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: theme.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  avatarLargeText: {
    fontSize: 28,
    fontWeight: '700',
    color: theme.onPrimary,
  },
  playOverlay: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    opacity: 0.9,
  },
  mediaHint: {
    fontSize: 12,
    color: theme.primary,
    fontWeight: '500',
    lineHeight: 18,
  },

  // Info section
  infoSection: {
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  profileName: {
    fontSize: 24,
    fontWeight: '700',
    color: theme.textPrimary,
    lineHeight: 32,
  },
  onlineBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#E8F8EF',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  onlineDotSmall: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.online,
  },
  onlineText: {
    fontSize: 12,
    fontWeight: '600',
    color: theme.success,
    lineHeight: 16,
  },
  verifiedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  verifiedText: {
    fontSize: 13,
    color: theme.success,
    fontWeight: '500',
    lineHeight: 18,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 14,
  },
  ratingValue: {
    fontSize: 15,
    fontWeight: '700',
    color: theme.textPrimary,
  },
  ratingCount: {
    fontSize: 13,
    color: theme.textSecondary,
  },
  quoteBox: {
    flexDirection: 'row',
    gap: 10,
    backgroundColor: theme.primaryLight,
    borderRadius: 14,
    padding: 14,
    marginBottom: 8,
  },
  quoteText: {
    flex: 1,
    fontSize: 14,
    color: theme.textPrimary,
    fontStyle: 'italic',
    lineHeight: 22,
  },

  // Generic section
  section: {
    paddingHorizontal: 20,
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: theme.textPrimary,
    marginBottom: 12,
    lineHeight: 24,
  },

  // Info rows
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    color: theme.textSecondary,
    flexShrink: 1,
    lineHeight: 20,
  },

  // Emotional grid
  emotionalGrid: {
    flexDirection: 'row',
    gap: 10,
  },
  emotionalCard: {
    flex: 1,
    backgroundColor: theme.surfaceCard,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: theme.border,
    paddingVertical: 14,
    alignItems: 'center',
    shadowColor: theme.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 1,
  },
  emotionalScore: {
    fontSize: 22,
    fontWeight: '700',
    color: theme.primary,
    lineHeight: 28,
  },
  emotionalLabel: {
    fontSize: 12,
    color: theme.textSecondary,
    marginTop: 2,
    lineHeight: 18,
  },

  // Tags
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    backgroundColor: theme.tagBg,
    borderRadius: 24,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  tagText: {
    fontSize: 13,
    fontWeight: '500',
    color: theme.tagText,
    lineHeight: 18,
  },

  // Reviews
  reviewCard: {
    backgroundColor: theme.surfaceCard,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: theme.border,
    padding: 14,
    marginBottom: 10,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  reviewUser: {
    fontSize: 13,
    fontWeight: '700',
    color: theme.textPrimary,
  },
  reviewStars: {
    flexDirection: 'row',
    gap: 2,
  },
  reviewDate: {
    fontSize: 11,
    color: theme.textSecondary,
    marginLeft: 'auto',
  },
  reviewText: {
    fontSize: 13,
    color: theme.textSecondary,
    fontStyle: 'italic',
    lineHeight: 20,
  },

  // Sticky footer
  stickyFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: theme.surfaceCard,
    borderTopWidth: 1,
    borderTopColor: theme.border,
    shadowColor: theme.shadow,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 4,
  },
  priceColumn: {
    gap: 2,
  },
  priceLabel: {
    fontSize: 12,
    color: theme.textSecondary,
    lineHeight: 16,
  },
  priceValue: {
    fontSize: 20,
    fontWeight: '700',
    color: theme.secondary,
    lineHeight: 26,
  },
  bookButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: theme.primary,
    borderRadius: 14,
    paddingHorizontal: 24,
    paddingVertical: 14,
    shadowColor: theme.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  bookButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: theme.onPrimary,
    lineHeight: 22,
  },
});
