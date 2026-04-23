import {
  BookingTimelineItem,
  CompanionProfile,
  IncidentItem,
  MockReview,
  OnlineService,
  QuickFilter,
  RoleOption,
  ServiceOption,
  TabItem,
} from '../types/domain';

export const MOCK_USER = {
  firstName: 'Hải',
  city: 'Đà Nẵng',
};

export const ROLES: RoleOption[] = [
  { id: 'user', label: 'User', subtitle: 'Đặt lịch, chat, thanh toán tạm giữ' },
  { id: 'companion', label: 'Companion', subtitle: 'Quản lý lịch, thu nhập, SOS' },
  { id: 'admin', label: 'Admin', subtitle: 'KYC, moderation, tranh chấp' },
];

export const COMPANIONS: CompanionProfile[] = [
  {
    id: 'c1',
    name: 'Minh Anh',
    age: 26,
    city: 'Đà Nẵng',
    district: 'Hải Châu',
    ratePerHour: 350000,
    tags: ['Biết lắng nghe', 'Không hút thuốc', 'Hài hước'],
    trustScore: 98,
    intro: 'Mình thích nghe bạn kể chuyện hơn là nói. Cà phê cuối tuần là lý tưởng nhất!',
    nextSlot: 'Hôm nay 14:00',
    isOnline: true,
    isVerified: true,
    distance: 2.3,
    emotionalRatings: [
      { label: 'Ấm áp', score: 92 },
      { label: 'Thoải mái', score: 88 },
    ],
    reviewCount: 127,
    averageRating: 4.8,
    avatarPlaceholder: 'MA',
  },
  {
    id: 'c2',
    name: 'Gia Hân',
    age: 24,
    city: 'Đà Nẵng',
    district: 'Sơn Trà',
    ratePerHour: 420000,
    tags: ['Thích phim kinh dị', 'Nói tiếng Anh', 'Không ăn hành ngò'],
    trustScore: 96,
    intro: 'Hợp vai trò đồng hành lịch sự, biết lắng nghe và giao tiếp nhẹ nhàng.',
    nextSlot: 'Hôm nay 18:30',
    isOnline: true,
    isVerified: true,
    distance: 5.0,
    emotionalRatings: [
      { label: 'Vui vẻ', score: 95 },
      { label: 'Ấm áp', score: 87 },
    ],
    reviewCount: 89,
    averageRating: 4.9,
    avatarPlaceholder: 'GH',
  },
  {
    id: 'c3',
    name: 'Thảo My',
    age: 23,
    city: 'Đà Nẵng',
    district: 'Ngũ Hành Sơn',
    ratePerHour: 300000,
    tags: ['Thích board game', 'Đọc sách', 'Biết lắng nghe', 'Chụp ảnh'],
    trustScore: 94,
    intro: 'Phù hợp buổi trò chuyện cuối tuần, outing văn minh và an toàn.',
    nextSlot: '24/04 - 15:00',
    isOnline: false,
    isVerified: true,
    distance: 7.2,
    emotionalRatings: [
      { label: 'Thoải mái', score: 90 },
      { label: 'Chân thành', score: 93 },
    ],
    reviewCount: 64,
    averageRating: 4.7,
    avatarPlaceholder: 'TM',
  },
  {
    id: 'c4',
    name: 'Đức Trí',
    age: 28,
    city: 'Đà Nẵng',
    district: 'Thanh Khê',
    ratePerHour: 380000,
    tags: ['Gym & thể thao', 'Nấu ăn giỏi', 'Không hút thuốc', 'Đi phượt'],
    trustScore: 95,
    intro: 'Thích các hoạt động ngoài trời và nấu ăn. Đồng hành sự kiện gia đình rất hợp.',
    nextSlot: '25/04 - 10:00',
    isOnline: false,
    isVerified: true,
    distance: 3.8,
    emotionalRatings: [
      { label: 'Đáng tin cậy', score: 96 },
      { label: 'Vui vẻ', score: 88 },
    ],
    reviewCount: 43,
    averageRating: 4.6,
    avatarPlaceholder: 'ĐT',
  },
  {
    id: 'c5',
    name: 'Thanh Hằng',
    age: 25,
    city: 'Đà Nẵng',
    district: 'Liên Chiểu',
    ratePerHour: 280000,
    tags: ['Tâm sự', 'Gọi sáng', 'Yoga', 'Không ăn hành ngò'],
    trustScore: 92,
    intro: 'Chuyên dịch vụ healing online — gọi sáng và tâm sự ẩn danh.',
    nextSlot: '24/04 - 08:00',
    isOnline: true,
    isVerified: false,
    distance: 12.1,
    emotionalRatings: [
      { label: 'Ấm áp', score: 94 },
      { label: 'Nhẹ nhàng', score: 91 },
    ],
    reviewCount: 31,
    averageRating: 4.5,
    avatarPlaceholder: 'TH',
  },
];

export const QUICK_FILTERS: QuickFilter[] = [
  { id: 'f1', label: 'Lắng nghe' },
  { id: 'f2', label: 'Cà phê' },
  { id: 'f3', label: 'Xem phim' },
  { id: 'f4', label: 'Sự kiện' },
  { id: 'f5', label: 'Gọi sáng' },
  { id: 'f6', label: 'Tâm sự' },
  { id: 'f7', label: 'Board game' },
  { id: 'f8', label: 'Đi dạo' },
];

export const ONLINE_SERVICES: OnlineService[] = [
  {
    id: 'os1',
    title: 'Gọi sáng',
    subtitle: 'Bắt đầu ngày mới cùng bạn',
    price: 50000,
    icon: 'sunny-outline',
  },
  {
    id: 'os2',
    title: 'Tâm sự ẩn danh',
    subtitle: 'Chia sẻ không lo lắng',
    price: 100000,
    icon: 'chatbubble-ellipses-outline',
  },
];

export const TAB_ITEMS: TabItem[] = [
  { id: 'home', label: 'Trang chủ', icon: 'home', iconOutline: 'home-outline' },
  { id: 'bookings', label: 'Lịch hẹn', icon: 'calendar', iconOutline: 'calendar-outline' },
  { id: 'messages', label: 'Tin nhắn', icon: 'chatbubble', iconOutline: 'chatbubble-outline' },
  { id: 'account', label: 'Tài khoản', icon: 'person', iconOutline: 'person-outline' },
];

export const BOOKING_TIMELINE: BookingTimelineItem[] = [
  { state: 'draft', label: 'Nháp', note: 'Người dùng chọn profile, thời gian, địa điểm công khai.' },
  { state: 'pending', label: 'Chờ duyệt', note: 'Companion xem yêu cầu và kiểm tra xung đột lịch.' },
  { state: 'accepted', label: 'Đã chấp nhận', note: 'Tiền được tạm giữ, push notification gửi cho hai bên.' },
  { state: 'in_progress', label: 'Đang diễn ra', note: 'Check-in tại điểm hẹn công khai, bắt đầu buổi gặp.' },
  { state: 'completed', label: 'Hoàn tất', note: 'Escrow giải ngân, hai bên đánh giá sau buổi gặp.' },
];

export const SERVICE_OPTIONS: ServiceOption[] = [
  { id: 's1', label: 'Cà phê & trò chuyện', icon: 'cafe-outline' },
  { id: 's2', label: 'Xem phim', icon: 'film-outline' },
  { id: 's3', label: 'Đi dạo', icon: 'walk-outline' },
  { id: 's4', label: 'Tham gia sự kiện', icon: 'people-outline' },
];

export const MOCK_REVIEWS: MockReview[] = [
  {
    id: 'r1',
    userName: 'Ngọc T.',
    rating: 5,
    text: 'Rất dễ chịu, mình cảm thấy thoải mái như đi chơi với bạn thân vậy.',
    date: '18/04/2026',
  },
  {
    id: 'r2',
    userName: 'Hoàng M.',
    rating: 5,
    text: 'Đúng giờ, lịch sự và biết cách lắng nghe. Sẽ đặt lịch lần nữa!',
    date: '12/04/2026',
  },
  {
    id: 'r3',
    userName: 'Phương A.',
    rating: 4,
    text: 'Buổi gặp rất vui, không khí nhẹ nhàng. Recommend cho ai muốn có người trò chuyện.',
    date: '05/04/2026',
  },
];

export const PLATFORM_FEE_RATE = 0.1;

export const INCIDENTS: IncidentItem[] = [
  { id: 'i1', title: 'Hàng đợi KYC', detail: '12 hồ sơ companion đang chờ đối soát CCCD/Passport.' },
  { id: 'i2', title: 'Kiểm duyệt rủi ro', detail: '3 đoạn chat bị gắn cờ đỏ do từ khoá nhạy cảm.' },
  { id: 'i3', title: 'Bàn tranh chấp', detail: '1 booking cần xem lại vì check-in không trùng khớp.' },
];
