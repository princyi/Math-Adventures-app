import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { buttonStyles, commonStyles, colors } from '../styles/commonStyles';

interface GameCardProps {
  game: {
    id: string;
    title: string;
    icon: string;
    color: string;
    description: string;
  };
  onPress: () => void;
}

export default function GameCard({ game, onPress }: GameCardProps) {
  return (
    <TouchableOpacity
      style={[buttonStyles.gameCard, { borderColor: game.color, borderWidth: 3 }]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={{ fontSize: 40, marginBottom: 10 }}>{game.icon}</Text>
      <Text style={[commonStyles.subtitle, { fontSize: 18, marginBottom: 5 }]}>
        {game.title}
      </Text>
      <Text style={[commonStyles.text, { fontSize: 12, textAlign: 'center' }]}>
        {game.description}
      </Text>
    </TouchableOpacity>
  );
}