import { StyleSheet, ViewStyle, TextStyle } from 'react-native';

export const colors = {
  primary: '#FFD700',      // Cheerful yellow
  secondary: '#1E3A8A',    // Dark blue
  accent: '#10B981',       // Bright green
  orange: '#F97316',       // Bright orange
  background: '#F8FAFC',   // Light background
  backgroundAlt: '#FFFFFF', // White background
  text: '#1E3A8A',         // Dark blue text
  textLight: '#64748B',    // Light grey text
  success: '#10B981',      // Green
  error: '#EF4444',        // Red
  card: '#FFFFFF',         // White card background
  shadow: 'rgba(0, 0, 0, 0.1)',
};

export const buttonStyles = StyleSheet.create({
  primary: {
    backgroundColor: colors.primary,
    borderRadius: 20,
    paddingVertical: 15,
    paddingHorizontal: 30,
    minWidth: 120,
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: `0px 4px 8px ${colors.shadow}`,
    elevation: 4,
  },
  secondary: {
    backgroundColor: colors.accent,
    borderRadius: 20,
    paddingVertical: 15,
    paddingHorizontal: 30,
    minWidth: 120,
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: `0px 4px 8px ${colors.shadow}`,
    elevation: 4,
  },
  gameCard: {
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 20,
    margin: 10,
    width: 150,
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: `0px 6px 12px ${colors.shadow}`,
    elevation: 6,
  },
});

export const commonStyles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.background,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: 800,
    width: '100%',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    textAlign: 'center',
    color: colors.text,
    marginBottom: 20,
    fontFamily: 'FredokaOne_400Regular',
  },
  subtitle: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    color: colors.text,
    marginBottom: 15,
    fontFamily: 'Nunito_700Bold',
  },
  text: {
    fontSize: 18,
    fontWeight: '500',
    color: colors.text,
    marginBottom: 8,
    lineHeight: 24,
    textAlign: 'center',
    fontFamily: 'Nunito_500Medium',
  },
  section: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 15,
    padding: 20,
    marginVertical: 8,
    width: '100%',
    boxShadow: `0px 4px 8px ${colors.shadow}`,
    elevation: 4,
  },
  gameGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  progressBar: {
    width: '100%',
    height: 20,
    backgroundColor: '#E5E7EB',
    borderRadius: 10,
    overflow: 'hidden',
    marginVertical: 10,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.accent,
    borderRadius: 10,
  },
  badge: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    boxShadow: `0px 2px 4px ${colors.shadow}`,
    elevation: 3,
  },
  badgeEarned: {
    backgroundColor: colors.primary,
  },
  badgeUnearned: {
    backgroundColor: '#E5E7EB',
  },
});