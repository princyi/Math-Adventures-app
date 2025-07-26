import React from 'react';
import { Text, View } from 'react-native';
import { commonStyles, colors } from '../styles/commonStyles';
import Badge from './Badge';

interface ProgressSectionProps {
  userProgress: {
    totalScore: number;
    gamesPlayed: number;
    badges: string[];
    streakDays: number;
  };
}

export default function ProgressSection({ userProgress }: ProgressSectionProps) {
  const badges = [
    { id: 'first_game', name: 'First Game', icon: '🎮', earned: userProgress.gamesPlayed > 0 },
    { id: 'score_100', name: '100 Points', icon: '⭐', earned: userProgress.totalScore >= 100 },
    { id: 'streak_3', name: '3 Day Streak', icon: '🔥', earned: userProgress.streakDays >= 3 },
    { id: 'math_master', name: 'Math Master', icon: '👑', earned: userProgress.totalScore >= 500 },
  ];

  return (
    <View style={commonStyles.section}>
      <Text style={commonStyles.subtitle}>Your Progress</Text>
      <View style={commonStyles.card}>
        <Text style={commonStyles.text}>Total Score: {userProgress.totalScore}</Text>
        <Text style={commonStyles.text}>Games Played: {userProgress.gamesPlayed}</Text>
        <Text style={commonStyles.text}>Streak: {userProgress.streakDays} days</Text>
        
        <View style={commonStyles.progressBar}>
          <View 
            style={[
              commonStyles.progressFill, 
              { width: `${Math.min((userProgress.totalScore / 500) * 100, 100)}%` }
            ]} 
          />
        </View>
        
        <Text style={[commonStyles.text, { fontSize: 16, marginTop: 10 }]}>Badges Earned</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginTop: 10 }}>
          {badges.map((badge) => (
            <Badge key={badge.id} badge={badge} />
          ))}
        </View>
      </View>
    </View>
  );
}