import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../../theme';
import { CompanionProfile } from '../../types/domain';
import { SERVICE_OPTIONS, PLATFORM_FEE_RATE } from '../../data/mock';
import { formatVnd } from '../../utils/currency';

type BookingScreenProps = {
  companion: CompanionProfile;
  onBack: () => void;
};

const DATES = [
  { key: 'd1', day: 'T4', date: '23', month: '04', full: '23/04/2026' },
  { key: 'd2', day: 'T5', date: '24', month: '04', full: '24/04/2026' },
  { key: 'd3', day: 'T6', date: '25', month: '04', full: '25/04/2026' },
  { key: 'd4', day: 'T7', date: '26', month: '04', full: '26/04/2026' },
  { key: 'd5', day: 'CN', date: '27', month: '04', full: '27/04/2026' },
  { key: 'd6', day: 'T2', date: '28', month: '04', full: '28/04/2026' },
  { key: 'd7', day: 'T3', date: '29', month: '04', full: '29/04/2026' },
];

const TIME_SLOTS = ['09:00', '10:00', '14:00', '15:00', '18:00', '19:00', '20:00'];

const DURATION_OPTIONS = [
  { label: '1 giờ', hours: 1 },
  { label: '2 giờ', hours: 2 },
  { label: '3 giờ', hours: 3 },
  { label: '4 giờ', hours: 4 },
];

export function BookingScreen({ companion, onBack }: BookingScreenProps) {
  const [selectedDate, setSelectedDate] = useState('d2');
  const [selectedTime, setSelectedTime] = useState('14:00');
  const [selectedDuration, setSelectedDuration] = useState(2);
  const [selectedService, setSelectedService] = useState('s1');
  const [location, setLocation] = useState('');
  const [note, setNote] = useState('');
  const [confirmed, setConfirmed] = useState(false);

  const subtotal = companion.ratePerHour * selectedDuration;
  const platformFee = Math.round(subtotal * PLATFORM_FEE_RATE);
  const totalEscrow = subtotal + platformFee;

  if (confirmed) {
    return (
      <View style={styles.container}>
        <View style={styles.confirmationContainer}>
          <View style={styles.confirmIcon}>
            <Ionicons name="checkmark-circle" size={64} color={theme.success} />
          </View>
          <Text style={styles.confirmTitle}>Đã ký quỹ thành công!</Text>
          <Text style={styles.confirmSubtitle}>
            Đang chờ {companion.name} xác nhận.{'\n'}
            Bạn sẽ nhận thông báo khi Companion phản hồi.
          </Text>
          <Text style={styles.confirmAmount}>{formatVnd(totalEscrow)}</Text>
          <Text style={styles.confirmAmountLabel}>đang được tạm giữ an toàn</Text>
          <Pressable style={styles.confirmBackButton} onPress={onBack}>
            <Text style={styles.confirmBackText}>Về trang chủ</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={onBack}>
          <Ionicons name="arrow-back" size={22} color={theme.textPrimary} />
        </Pressable>
        <Text style={styles.headerTitle}>Đặt lịch hẹn</Text>
        <View style={styles.backButton} />
      </View>

      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Companion mini card */}
          <View style={styles.miniCard}>
            <View style={styles.miniAvatar}>
              <Text style={styles.miniAvatarText}>{companion.avatarPlaceholder}</Text>
            </View>
            <View style={styles.miniInfo}>
              <Text style={styles.miniName}>{companion.name}, {companion.age}</Text>
              <Text style={styles.miniRate}>{formatVnd(companion.ratePerHour)}/giờ</Text>
            </View>
            {companion.isVerified && (
              <Ionicons name="shield-checkmark" size={18} color={theme.success} />
            )}
          </View>

          {/* Date selection */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Chọn ngày</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.dateScrollContent}
            >
              {DATES.map((d) => {
                const isActive = d.key === selectedDate;
                return (
                  <Pressable
                    key={d.key}
                    style={[styles.dateCard, isActive && styles.dateCardActive]}
                    onPress={() => setSelectedDate(d.key)}
                  >
                    <Text style={[styles.dateDay, isActive && styles.dateDayActive]}>{d.day}</Text>
                    <Text style={[styles.dateNum, isActive && styles.dateNumActive]}>{d.date}</Text>
                    <Text style={[styles.dateMonth, isActive && styles.dateMonthActive]}>Th{d.month}</Text>
                  </Pressable>
                );
              })}
            </ScrollView>
          </View>

          {/* Time selection */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Chọn giờ</Text>
            <View style={styles.chipGrid}>
              {TIME_SLOTS.map((time) => {
                const isActive = time === selectedTime;
                return (
                  <Pressable
                    key={time}
                    style={[styles.chip, isActive && styles.chipActive]}
                    onPress={() => setSelectedTime(time)}
                  >
                    <Text style={[styles.chipText, isActive && styles.chipTextActive]}>{time}</Text>
                  </Pressable>
                );
              })}
            </View>
          </View>

          {/* Duration */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Thời lượng</Text>
            <View style={styles.chipGrid}>
              {DURATION_OPTIONS.map((opt) => {
                const isActive = opt.hours === selectedDuration;
                return (
                  <Pressable
                    key={opt.hours}
                    style={[styles.chip, isActive && styles.chipActive]}
                    onPress={() => setSelectedDuration(opt.hours)}
                  >
                    <Text style={[styles.chipText, isActive && styles.chipTextActive]}>{opt.label}</Text>
                  </Pressable>
                );
              })}
            </View>
          </View>

          {/* Service type */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Loại dịch vụ</Text>
            <View style={styles.chipGrid}>
              {SERVICE_OPTIONS.map((svc) => {
                const isActive = svc.id === selectedService;
                return (
                  <Pressable
                    key={svc.id}
                    style={[styles.serviceChip, isActive && styles.serviceChipActive]}
                    onPress={() => setSelectedService(svc.id)}
                  >
                    <Ionicons
                      name={svc.icon as any}
                      size={16}
                      color={isActive ? theme.primary : theme.textSecondary}
                    />
                    <Text style={[styles.serviceChipText, isActive && styles.serviceChipTextActive]}>
                      {svc.label}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>

          {/* Location & Notes */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Địa điểm gặp mặt</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="location-outline" size={18} color={theme.textSecondary} />
              <TextInput
                style={styles.textInput}
                placeholder="Nhập tên quán / địa chỉ công cộng"
                placeholderTextColor={theme.textSecondary}
                value={location}
                onChangeText={setLocation}
              />
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Ghi chú cho Companion</Text>
            <View style={[styles.inputWrapper, styles.inputWrapperTall]}>
              <TextInput
                style={[styles.textInput, styles.textArea]}
                placeholder="Ví dụ: Mình hơi hướng nội, chỉ muốn có người trò chuyện nhẹ nhàng..."
                placeholderTextColor={theme.textSecondary}
                value={note}
                onChangeText={setNote}
                multiline
                numberOfLines={3}
                textAlignVertical="top"
              />
            </View>
          </View>

          {/* Escrow summary */}
          <View style={styles.escrowCard}>
            <Text style={styles.escrowTitle}>Tóm tắt ký quỹ</Text>

            <View style={styles.escrowRow}>
              <Text style={styles.escrowLabel}>Chi phí</Text>
              <Text style={styles.escrowValue}>
                {selectedDuration} giờ × {formatVnd(companion.ratePerHour)}
              </Text>
            </View>

            <View style={styles.escrowRow}>
              <Text style={styles.escrowLabel}>Tạm tính</Text>
              <Text style={styles.escrowValue}>{formatVnd(subtotal)}</Text>
            </View>

            <View style={styles.escrowRow}>
              <Text style={styles.escrowLabel}>Phí nền tảng ({Math.round(PLATFORM_FEE_RATE * 100)}%)</Text>
              <Text style={styles.escrowValue}>{formatVnd(platformFee)}</Text>
            </View>

            <View style={styles.escrowDivider} />

            <View style={styles.escrowRow}>
              <Text style={styles.escrowTotalLabel}>Tổng ký quỹ</Text>
              <Text style={styles.escrowTotalValue}>{formatVnd(totalEscrow)}</Text>
            </View>

            <View style={styles.escrowHint}>
              <Ionicons name="shield-checkmark-outline" size={14} color={theme.success} />
              <Text style={styles.escrowHintText}>
                Tiền sẽ được tạm giữ và chỉ chuyển cho Companion sau khi buổi hẹn hoàn tất an toàn.
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Sticky CTA */}
      <View style={styles.stickyFooter}>
        <View style={styles.totalColumn}>
          <Text style={styles.totalLabel}>Tổng ký quỹ</Text>
          <Text style={styles.totalValue}>{formatVnd(totalEscrow)}</Text>
        </View>
        <Pressable style={styles.confirmButton} onPress={() => setConfirmed(true)}>
          <Ionicons name="lock-closed-outline" size={18} color={theme.onPrimary} />
          <Text style={styles.confirmButtonText}>Xác nhận & Thanh toán</Text>
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
  keyboardView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: theme.surfaceCard,
    borderBottomWidth: 1,
    borderBottomColor: theme.border,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: theme.textPrimary,
    lineHeight: 24,
  },

  // Mini card
  miniCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginHorizontal: 20,
    marginTop: 16,
    backgroundColor: theme.surfaceCard,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: theme.border,
    padding: 14,
  },
  miniAvatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: theme.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  miniAvatarText: {
    fontSize: 14,
    fontWeight: '700',
    color: theme.primary,
  },
  miniInfo: {
    flex: 1,
  },
  miniName: {
    fontSize: 15,
    fontWeight: '700',
    color: theme.textPrimary,
    lineHeight: 22,
  },
  miniRate: {
    fontSize: 13,
    color: theme.secondary,
    fontWeight: '600',
    lineHeight: 18,
  },

  // Sections
  section: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: theme.textPrimary,
    marginBottom: 12,
    lineHeight: 22,
  },

  // Date scroll
  dateScrollContent: {
    gap: 8,
  },
  dateCard: {
    width: 62,
    paddingVertical: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: theme.border,
    backgroundColor: theme.surfaceCard,
    alignItems: 'center',
    gap: 2,
  },
  dateCardActive: {
    borderColor: theme.primary,
    backgroundColor: theme.primaryLight,
  },
  dateDay: {
    fontSize: 11,
    color: theme.textSecondary,
    fontWeight: '600',
    lineHeight: 16,
  },
  dateDayActive: {
    color: theme.primary,
  },
  dateNum: {
    fontSize: 20,
    fontWeight: '700',
    color: theme.textPrimary,
    lineHeight: 26,
  },
  dateNumActive: {
    color: theme.primary,
  },
  dateMonth: {
    fontSize: 11,
    color: theme.textSecondary,
    lineHeight: 16,
  },
  dateMonthActive: {
    color: theme.primary,
  },

  // Chips (time, duration)
  chipGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: theme.border,
    backgroundColor: theme.surfaceCard,
  },
  chipActive: {
    borderColor: theme.primary,
    backgroundColor: theme.primaryLight,
  },
  chipText: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.textPrimary,
    lineHeight: 20,
  },
  chipTextActive: {
    color: theme.primary,
  },

  // Service chips
  serviceChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: theme.border,
    backgroundColor: theme.surfaceCard,
  },
  serviceChipActive: {
    borderColor: theme.primary,
    backgroundColor: theme.primaryLight,
  },
  serviceChipText: {
    fontSize: 13,
    fontWeight: '500',
    color: theme.textPrimary,
    lineHeight: 18,
  },
  serviceChipTextActive: {
    color: theme.primary,
  },

  // Inputs
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: theme.surfaceCard,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: theme.border,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  inputWrapperTall: {
    alignItems: 'flex-start',
    paddingVertical: 14,
  },
  textInput: {
    flex: 1,
    fontSize: 14,
    color: theme.textPrimary,
    lineHeight: 20,
    padding: 0,
  },
  textArea: {
    minHeight: 60,
    lineHeight: 22,
  },

  // Escrow card
  escrowCard: {
    marginHorizontal: 20,
    marginTop: 24,
    backgroundColor: theme.surfaceCard,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: theme.border,
    padding: 18,
    shadowColor: theme.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 2,
  },
  escrowTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.textPrimary,
    marginBottom: 14,
    lineHeight: 22,
  },
  escrowRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  escrowLabel: {
    fontSize: 14,
    color: theme.textSecondary,
    lineHeight: 20,
  },
  escrowValue: {
    fontSize: 14,
    color: theme.textPrimary,
    fontWeight: '500',
    lineHeight: 20,
  },
  escrowDivider: {
    height: 1,
    backgroundColor: theme.border,
    marginVertical: 8,
  },
  escrowTotalLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: theme.textPrimary,
    lineHeight: 22,
  },
  escrowTotalValue: {
    fontSize: 18,
    fontWeight: '700',
    color: theme.secondary,
    lineHeight: 24,
  },
  escrowHint: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 12,
    backgroundColor: '#E8F8EF',
    borderRadius: 10,
    padding: 12,
  },
  escrowHintText: {
    flex: 1,
    fontSize: 12,
    color: theme.success,
    lineHeight: 18,
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
  totalColumn: {
    gap: 2,
  },
  totalLabel: {
    fontSize: 12,
    color: theme.textSecondary,
    lineHeight: 16,
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '700',
    color: theme.secondary,
    lineHeight: 24,
  },
  confirmButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: theme.primary,
    borderRadius: 14,
    paddingHorizontal: 20,
    paddingVertical: 14,
    shadowColor: theme.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  confirmButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: theme.onPrimary,
    lineHeight: 20,
  },

  // Confirmation state
  confirmationContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  confirmIcon: {
    marginBottom: 20,
  },
  confirmTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: theme.textPrimary,
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 30,
  },
  confirmSubtitle: {
    fontSize: 14,
    color: theme.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
  },
  confirmAmount: {
    fontSize: 28,
    fontWeight: '700',
    color: theme.primary,
    lineHeight: 36,
  },
  confirmAmountLabel: {
    fontSize: 13,
    color: theme.textSecondary,
    marginTop: 4,
    marginBottom: 32,
    lineHeight: 18,
  },
  confirmBackButton: {
    backgroundColor: theme.primaryLight,
    borderRadius: 14,
    paddingHorizontal: 32,
    paddingVertical: 14,
  },
  confirmBackText: {
    fontSize: 15,
    fontWeight: '600',
    color: theme.primary,
    lineHeight: 22,
  },
});
