import React from 'react';
import { Text, View } from 'react-native';
import { commonStyles } from '../styles/commonStyles';

interface BadgeProps {
  badge: {
    id: string;
    name: string;
    icon: string;
    earned: boolean;
  };
}

export default function Badge({ badge }: BadgeProps) {
  return (
    <View style={[
      commonStyles.badge,
      badge.earned ? commonStyles.badgeEarned : commonStyles.badgeUnearned
    ]}>
      <Text style={{ fontSize: 24, opacity: badge.earned ? 1 : 0.3 }}>
        {badge.icon}
      </Text>
    </View>
  );
}