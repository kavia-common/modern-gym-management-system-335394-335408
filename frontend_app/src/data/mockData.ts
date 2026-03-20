/**
 * Mock Data Module - Central data store for the gym management UI.
 *
 * Contract:
 * - All data is static and immutable (for read operations).
 * - Functions return deep copies to prevent accidental mutations.
 * - Each entity has a unique `id` field.
 */

// ===== MEMBERS =====
export interface Member {
  id: string;
  name: string;
  email: string;
  phone: string;
  plan: string;
  status: "active" | "inactive" | "expired";
  joinDate: string;
  avatar?: string;
  age: number;
  gender: string;
}

export const MOCK_MEMBERS: Member[] = [
  { id: "m1", name: "Jordan Smith", email: "jordan@email.com", phone: "(555) 100-1001", plan: "Premium", status: "active", joinDate: "2024-01-15", age: 28, gender: "Male" },
  { id: "m2", name: "Casey Johnson", email: "casey@email.com", phone: "(555) 100-1002", plan: "Basic", status: "active", joinDate: "2024-02-20", age: 34, gender: "Female" },
  { id: "m3", name: "Riley Brown", email: "riley@email.com", phone: "(555) 100-1003", plan: "Premium", status: "inactive", joinDate: "2023-11-05", age: 22, gender: "Male" },
  { id: "m4", name: "Quinn Davis", email: "quinn@email.com", phone: "(555) 100-1004", plan: "Standard", status: "active", joinDate: "2024-03-10", age: 41, gender: "Female" },
  { id: "m5", name: "Avery Wilson", email: "avery@email.com", phone: "(555) 100-1005", plan: "Basic", status: "expired", joinDate: "2023-08-22", age: 30, gender: "Non-binary" },
  { id: "m6", name: "Harper Moore", email: "harper@email.com", phone: "(555) 100-1006", plan: "Premium", status: "active", joinDate: "2024-04-01", age: 26, gender: "Female" },
  { id: "m7", name: "Drew Taylor", email: "drew@email.com", phone: "(555) 100-1007", plan: "Standard", status: "active", joinDate: "2024-01-30", age: 35, gender: "Male" },
  { id: "m8", name: "Sage Anderson", email: "sage@email.com", phone: "(555) 100-1008", plan: "Basic", status: "active", joinDate: "2024-05-12", age: 29, gender: "Female" },
];

// ===== TRAINERS =====
export interface Trainer {
  id: string;
  name: string;
  email: string;
  phone: string;
  specialization: string;
  status: "active" | "on-leave";
  hireDate: string;
  clients: number;
  rating: number;
}

export const MOCK_TRAINERS: Trainer[] = [
  { id: "t1", name: "Alex Rivera", email: "alex@gym.com", phone: "(555) 200-2001", specialization: "Strength Training", status: "active", hireDate: "2022-06-15", clients: 18, rating: 4.8 },
  { id: "t2", name: "Sam Chen", email: "sam@gym.com", phone: "(555) 200-2002", specialization: "Yoga & Flexibility", status: "active", hireDate: "2023-01-10", clients: 24, rating: 4.9 },
  { id: "t3", name: "Jamie Park", email: "jamie@gym.com", phone: "(555) 200-2003", specialization: "HIIT & Cardio", status: "active", hireDate: "2023-03-22", clients: 15, rating: 4.7 },
  { id: "t4", name: "Morgan Lee", email: "morgan@gym.com", phone: "(555) 200-2004", specialization: "CrossFit", status: "on-leave", hireDate: "2022-09-01", clients: 12, rating: 4.6 },
];

// ===== CLASSES =====
export interface GymClass {
  id: string;
  name: string;
  trainer: string;
  trainerId: string;
  day: string;
  time: string;
  duration: number;
  capacity: number;
  enrolled: number;
  room: string;
  category: string;
}

export const MOCK_CLASSES: GymClass[] = [
  { id: "c1", name: "Morning Yoga", trainer: "Sam Chen", trainerId: "t2", day: "Monday", time: "07:00", duration: 60, capacity: 20, enrolled: 16, room: "Studio A", category: "Yoga" },
  { id: "c2", name: "Power Lifting", trainer: "Alex Rivera", trainerId: "t1", day: "Monday", time: "09:00", duration: 90, capacity: 12, enrolled: 10, room: "Weight Room", category: "Strength" },
  { id: "c3", name: "HIIT Blast", trainer: "Jamie Park", trainerId: "t3", day: "Tuesday", time: "06:30", duration: 45, capacity: 25, enrolled: 22, room: "Main Floor", category: "Cardio" },
  { id: "c4", name: "Evening Stretch", trainer: "Sam Chen", trainerId: "t2", day: "Tuesday", time: "18:00", duration: 45, capacity: 20, enrolled: 14, room: "Studio A", category: "Yoga" },
  { id: "c5", name: "CrossFit WOD", trainer: "Morgan Lee", trainerId: "t4", day: "Wednesday", time: "07:00", duration: 60, capacity: 15, enrolled: 13, room: "CrossFit Box", category: "CrossFit" },
  { id: "c6", name: "Spin Class", trainer: "Jamie Park", trainerId: "t3", day: "Wednesday", time: "12:00", duration: 45, capacity: 20, enrolled: 18, room: "Spin Room", category: "Cardio" },
  { id: "c7", name: "Strength Basics", trainer: "Alex Rivera", trainerId: "t1", day: "Thursday", time: "10:00", duration: 60, capacity: 12, enrolled: 8, room: "Weight Room", category: "Strength" },
  { id: "c8", name: "Power Yoga", trainer: "Sam Chen", trainerId: "t2", day: "Friday", time: "07:00", duration: 75, capacity: 20, enrolled: 19, room: "Studio A", category: "Yoga" },
  { id: "c9", name: "Body Pump", trainer: "Alex Rivera", trainerId: "t1", day: "Friday", time: "17:00", duration: 60, capacity: 15, enrolled: 14, room: "Main Floor", category: "Strength" },
  { id: "c10", name: "Weekend Warrior", trainer: "Jamie Park", trainerId: "t3", day: "Saturday", time: "09:00", duration: 90, capacity: 30, enrolled: 25, room: "Main Floor", category: "Cardio" },
];

// ===== ATTENDANCE =====
export interface AttendanceRecord {
  id: string;
  memberId: string;
  memberName: string;
  date: string;
  checkIn: string;
  checkOut: string | null;
  type: "gym" | "class";
  className?: string;
}

export const MOCK_ATTENDANCE: AttendanceRecord[] = [
  { id: "a1", memberId: "m1", memberName: "Jordan Smith", date: "2024-12-10", checkIn: "06:30", checkOut: "08:15", type: "gym" },
  { id: "a2", memberId: "m2", memberName: "Casey Johnson", date: "2024-12-10", checkIn: "07:00", checkOut: "08:00", type: "class", className: "Morning Yoga" },
  { id: "a3", memberId: "m4", memberName: "Quinn Davis", date: "2024-12-10", checkIn: "09:00", checkOut: "10:30", type: "gym" },
  { id: "a4", memberId: "m6", memberName: "Harper Moore", date: "2024-12-10", checkIn: "06:30", checkOut: "07:15", type: "class", className: "HIIT Blast" },
  { id: "a5", memberId: "m7", memberName: "Drew Taylor", date: "2024-12-10", checkIn: "12:00", checkOut: "13:30", type: "gym" },
  { id: "a6", memberId: "m8", memberName: "Sage Anderson", date: "2024-12-10", checkIn: "17:00", checkOut: null, type: "gym" },
  { id: "a7", memberId: "m1", memberName: "Jordan Smith", date: "2024-12-09", checkIn: "07:00", checkOut: "08:30", type: "class", className: "Power Lifting" },
  { id: "a8", memberId: "m2", memberName: "Casey Johnson", date: "2024-12-09", checkIn: "18:00", checkOut: "19:00", type: "class", className: "Evening Stretch" },
];

// ===== MEMBERSHIPS / PLANS =====
export interface MembershipPlan {
  id: string;
  name: string;
  price: number;
  duration: string;
  features: string[];
  popular: boolean;
  activeMembers: number;
}

export const MOCK_PLANS: MembershipPlan[] = [
  { id: "p1", name: "Basic", price: 29.99, duration: "Monthly", features: ["Gym access", "Locker room", "Basic equipment"], popular: false, activeMembers: 45 },
  { id: "p2", name: "Standard", price: 49.99, duration: "Monthly", features: ["Gym access", "Locker room", "All equipment", "2 classes/week"], popular: true, activeMembers: 78 },
  { id: "p3", name: "Premium", price: 79.99, duration: "Monthly", features: ["Unlimited access", "All classes", "Personal trainer", "Sauna & spa", "Guest passes"], popular: false, activeMembers: 34 },
  { id: "p4", name: "Annual Basic", price: 299.99, duration: "Yearly", features: ["Gym access", "Locker room", "Basic equipment", "2 months free"], popular: false, activeMembers: 20 },
];

// ===== PAYMENTS =====
export interface Payment {
  id: string;
  memberId: string;
  memberName: string;
  amount: number;
  date: string;
  status: "paid" | "pending" | "overdue" | "refunded";
  plan: string;
  method: string;
  invoiceNumber: string;
}

export const MOCK_PAYMENTS: Payment[] = [
  { id: "pay1", memberId: "m1", memberName: "Jordan Smith", amount: 79.99, date: "2024-12-01", status: "paid", plan: "Premium", method: "Credit Card", invoiceNumber: "INV-2024-001" },
  { id: "pay2", memberId: "m2", memberName: "Casey Johnson", amount: 29.99, date: "2024-12-01", status: "paid", plan: "Basic", method: "Bank Transfer", invoiceNumber: "INV-2024-002" },
  { id: "pay3", memberId: "m3", memberName: "Riley Brown", amount: 79.99, date: "2024-12-01", status: "overdue", plan: "Premium", method: "Credit Card", invoiceNumber: "INV-2024-003" },
  { id: "pay4", memberId: "m4", memberName: "Quinn Davis", amount: 49.99, date: "2024-12-01", status: "paid", plan: "Standard", method: "PayPal", invoiceNumber: "INV-2024-004" },
  { id: "pay5", memberId: "m5", memberName: "Avery Wilson", amount: 29.99, date: "2024-11-01", status: "overdue", plan: "Basic", method: "Credit Card", invoiceNumber: "INV-2024-005" },
  { id: "pay6", memberId: "m6", memberName: "Harper Moore", amount: 79.99, date: "2024-12-01", status: "pending", plan: "Premium", method: "Bank Transfer", invoiceNumber: "INV-2024-006" },
  { id: "pay7", memberId: "m7", memberName: "Drew Taylor", amount: 49.99, date: "2024-12-01", status: "paid", plan: "Standard", method: "Credit Card", invoiceNumber: "INV-2024-007" },
  { id: "pay8", memberId: "m8", memberName: "Sage Anderson", amount: 29.99, date: "2024-12-05", status: "refunded", plan: "Basic", method: "PayPal", invoiceNumber: "INV-2024-008" },
];

// ===== EQUIPMENT =====
export interface Equipment {
  id: string;
  name: string;
  category: string;
  status: "operational" | "maintenance" | "out-of-order";
  purchaseDate: string;
  lastMaintenance: string;
  location: string;
  quantity: number;
}

export const MOCK_EQUIPMENT: Equipment[] = [
  { id: "e1", name: "Treadmill Pro X500", category: "Cardio", status: "operational", purchaseDate: "2023-01-15", lastMaintenance: "2024-11-01", location: "Cardio Zone", quantity: 8 },
  { id: "e2", name: "Olympic Barbell Set", category: "Free Weights", status: "operational", purchaseDate: "2022-06-20", lastMaintenance: "2024-10-15", location: "Weight Room", quantity: 6 },
  { id: "e3", name: "Concept2 Rower", category: "Cardio", status: "maintenance", purchaseDate: "2023-03-10", lastMaintenance: "2024-12-01", location: "Cardio Zone", quantity: 4 },
  { id: "e4", name: "Cable Machine", category: "Machines", status: "operational", purchaseDate: "2022-09-05", lastMaintenance: "2024-09-20", location: "Main Floor", quantity: 3 },
  { id: "e5", name: "Spin Bike S7", category: "Cardio", status: "operational", purchaseDate: "2023-08-12", lastMaintenance: "2024-11-15", location: "Spin Room", quantity: 20 },
  { id: "e6", name: "Leg Press Machine", category: "Machines", status: "out-of-order", purchaseDate: "2021-12-01", lastMaintenance: "2024-08-10", location: "Weight Room", quantity: 2 },
  { id: "e7", name: "Dumbbells (Set)", category: "Free Weights", status: "operational", purchaseDate: "2022-03-15", lastMaintenance: "2024-11-20", location: "Weight Room", quantity: 15 },
  { id: "e8", name: "Yoga Mats", category: "Accessories", status: "operational", purchaseDate: "2024-01-10", lastMaintenance: "2024-06-01", location: "Studio A", quantity: 25 },
];

// ===== NOTIFICATIONS =====
export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "warning" | "success" | "error";
  read: boolean;
  date: string;
  time: string;
}

export const MOCK_NOTIFICATIONS: Notification[] = [
  { id: "n1", title: "New Member Registered", message: "Sage Anderson has registered for a Basic plan.", type: "success", read: false, date: "2024-12-10", time: "14:30" },
  { id: "n2", title: "Equipment Maintenance Due", message: "Concept2 Rower scheduled for maintenance on Dec 15.", type: "warning", read: false, date: "2024-12-10", time: "09:00" },
  { id: "n3", title: "Payment Overdue", message: "Riley Brown's payment is overdue by 10 days.", type: "error", read: false, date: "2024-12-09", time: "16:45" },
  { id: "n4", title: "Class Fully Booked", message: "Saturday Weekend Warrior class is at full capacity.", type: "info", read: true, date: "2024-12-08", time: "11:20" },
  { id: "n5", title: "Trainer Leave Approved", message: "Morgan Lee's leave request has been approved.", type: "info", read: true, date: "2024-12-07", time: "10:00" },
];

// ===== DASHBOARD ANALYTICS =====
export const DASHBOARD_STATS = {
  totalMembers: 157,
  activeMembers: 134,
  totalTrainers: 4,
  monthlyRevenue: 12450,
  todayCheckIns: 67,
  classesThisWeek: 10,
  newMembersThisMonth: 12,
  membershipGrowth: 8.5,
  revenueGrowth: 12.3,
  attendanceRate: 78,
};

export const REVENUE_CHART_DATA = [
  { month: "Jul", revenue: 9800 },
  { month: "Aug", revenue: 10200 },
  { month: "Sep", revenue: 10800 },
  { month: "Oct", revenue: 11200 },
  { month: "Nov", revenue: 11800 },
  { month: "Dec", revenue: 12450 },
];

export const MEMBERSHIP_DISTRIBUTION = [
  { name: "Basic", value: 45, color: "#6B7280" },
  { name: "Standard", value: 78, color: "#111827" },
  { name: "Premium", value: 34, color: "#16A34A" },
];

export const WEEKLY_ATTENDANCE = [
  { day: "Mon", count: 45 },
  { day: "Tue", count: 52 },
  { day: "Wed", count: 49 },
  { day: "Thu", count: 63 },
  { day: "Fri", count: 58 },
  { day: "Sat", count: 72 },
  { day: "Sun", count: 38 },
];

export const HOURLY_TRAFFIC = [
  { hour: "6AM", visitors: 12 },
  { hour: "8AM", visitors: 35 },
  { hour: "10AM", visitors: 28 },
  { hour: "12PM", visitors: 42 },
  { hour: "2PM", visitors: 25 },
  { hour: "4PM", visitors: 38 },
  { hour: "6PM", visitors: 55 },
  { hour: "8PM", visitors: 32 },
  { hour: "10PM", visitors: 15 },
];
