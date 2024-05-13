import { User, SchoolDays } from '../../common';

// Mock data for the GET api/school-day/me
const schoolDaysMock: {[key: number]: SchoolDays} = {
  1:{
    school_days: {
      is_mon_available: false,
      is_tue_available: false,
      is_wed_available: false,
      is_thu_available: false,
      is_fri_available: false
    },
    exemptions: [new Date('2024-03-25'), new Date('2024-04-02'), new Date('2024-03-08')]
  },
  3:{
    school_days: {
      is_mon_available: true,
      is_tue_available: false,
      is_wed_available: false,
      is_thu_available: true,
      is_fri_available: true
    },
    exemptions: [new Date('2024-03-26'), new Date('2024-03-27')]
  },
  7:{
    school_days: {
      is_mon_available: false,
      is_tue_available: false,
      is_wed_available: true,
      is_thu_available: true,
      is_fri_available: true
    },
    exemptions: [new Date('2024-03-25'), new Date('2024-04-02')]
  }
};

// Mock data for the GET api/absence/me
const absenceArrayMock = [new Date('2024-04-04'), new Date('2024-03-28'), new Date('2024-03-22')];

// Mock data for the GET api/user
const userArrayMock: User[] = [
  { user_id: 1, email: 'silvan@gmx.ch' },
  { user_id: 2, email: 'lena@example.com' },
  { user_id: 3, email: 'lisa@example.com' },
  { user_id: 4, email: 'lana@example.com' },
  { user_id: 5, email: 'anna@example.com' },
  { user_id: 6, email: 'peter@example.com' },
  { user_id: 7, email: 'sarah@example.com' },
  { user_id: 8, email: 'alex@example.com' },
  { user_id: 9, email: 'emma@example.com' },
  { user_id: 10, email: 'david@example.com' },
  { user_id: 11, email: '1silvan@gmx.ch' },
  { user_id: 12, email: '1lena@example.com' },
  { user_id: 13, email: '1lisa@example.com' },
  { user_id: 14, email: '1lana@example.com' },
  { user_id: 15, email: '1anna@example.com' },
  { user_id: 16, email: '1peter@example.com' },
  { user_id: 17, email: '1sarah@example.com' },
  { user_id: 18, email: '1alex@example.com' },
  { user_id: 19, email: '1emma@example.com' }
];

export { schoolDaysMock, absenceArrayMock, userArrayMock };
