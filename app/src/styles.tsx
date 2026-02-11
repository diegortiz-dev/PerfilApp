import { Platform } from 'react-native';

const theme = {
  colors: {
    background: '#FFFFFF',
    primary: '#0A84FF',
    card: '#F2F5F9',
    text: '#111827',
    muted: '#6B7280',
    danger: '#EF4444',
  },
  spacing: { xs: 4, sm: 8, md: 16, lg: 24 },
  radius: { sm: 6, md: 10, lg: 16 },
  fontSizes: { sm: 12, md: 16, lg: 20 },
  platform: Platform.OS,
};

export default theme;