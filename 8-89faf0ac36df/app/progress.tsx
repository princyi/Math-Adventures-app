import React, { useState, useEffect } from 'react';
import { Text, View, SafeAreaView, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { useFonts, FredokaOne_400Regular } from '@expo-google-fonts/fredoka-one';
import { Nunito_400Regular, Nunito_500Medium, Nunito_700Bold } from '@expo-google-fonts/nunito';
import Button from '../components/Button';
import Badge from '../components/Badge';
import { commonStyles, colors } from '../styles/commonStyles';

export default function ProgressScreen() {
  const [fontsLoaded] = useFonts({
    FredokaOne_400Regular,
    Nunito_400Regular,
    Nunito_500Medium,
    Nunito_700Bold,
  });

  const [userProgress] = useState({
    totalScore: 150,
    gamesPlayed: 8,
    badges: ['first_game', 'score_100'],
    streakDays: 2,
    gameStats: {
      addition: { played: 3, bestScore: 80 },
      subtraction: { played: 2, bestScore: 70 },
      multiplication: { played: 2, bestScore: 60 },
      division: { played: 1, bestScore: 50 },
    }
  });

  useEffect(() => {
    console.log('Progress screen loaded');
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={commonStyles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const badges = [
    { id: 'first_game', name: 'First Game', icon: '🎮', earned: userProgress.gamesPlayed > 0 },
    { id: 'score_100', name: '100 Points', icon: '⭐', earned: userProgress.totalScore >= 100 },
    { id: 'streak_3', name: '3 Day Streak', icon: '🔥', earned: userProgress.streakDays >= 3 },
    { id: 'math_master', name: 'Math Master', icon: '👑', earned: userProgress.totalScore >= 500 },
    { id: 'addition_pro', name: 'Addition Pro', icon: '➕', earned: userProgress.gameStats.addition.bestScore >= 80 },
    { id: 'subtraction_pro', name: 'Subtraction Pro', icon: '➖', earned: userProgress.gameStats.subtraction.bestScore >= 80 },
    { id: 'multiplication_pro', name: 'Multiplication Pro', icon: '✖️', earned: userProgress.gameStats.multiplication.bestScore >= 80 },
    { id: 'division_pro', name: 'Division Pro', icon: '➗', earned: userProgress.gameStats.division.bestScore >= 80 },
  ];

  const earnedBadges = badges.filter(badge => badge.earned);
  const unearnedBadges = badges.filter(badge => !badge.earned);

  return (
    <SafeAreaView style={commonStyles.wrapper}>
      <ScrollView style={commonStyles.container} contentContainerStyle={{ paddingBottom: 50 }}>
        <View style={commonStyles.content}>
          <Text style={commonStyles.title}>📊 Your Progress</Text>
          
          {/* Overall Stats */}
          <View style={commonStyles.section}>
            <Text style={commonStyles.subtitle}>Overall Statistics</Text>
            <View style={commonStyles.card}>
              <Text style={commonStyles.text}>🏆 Total Score: {userProgress.totalScore}</Text>
              <Text style={commonStyles.text}>🎮 Games Played: {userProgress.gamesPlayed}</Text>
              <Text style={commonStyles.text}>🔥 Current Streak: {userProgress.streakDays} days</Text>
              <Text style={commonStyles.text}>🏅 Badges Earned: {earnedBadges.length}/{badges.length}</Text>
              
              <View style={commonStyles.progressBar}>
                <View 
                  style={[
                    commonStyles.progressFill, 
                    { width: `${Math.min((userProgress.totalScore / 500) * 100, 100)}%` }
                  ]} 
                />
              </View>
              <Text style={[commonStyles.text, { fontSize: 14 }]}>
                Progress to Math Master: {userProgress.totalScore}/500
              </Text>
            </View>
          </View>

          {/* Game Statistics */}
          <View style={commonStyles.section}>
            <Text style={commonStyles.subtitle}>Game Statistics</Text>
            {Object.entries(userProgress.gameStats).map(([gameType, stats]) => (
              <View key={gameType} style={commonStyles.card}>
                <Text style={[commonStyles.text, { fontWeight: 'bold', textTransform: 'capitalize' }]}>
                  {gameType}
                </Text>
                <Text style={commonStyles.text}>Games Played: {stats.played}</Text>
                <Text style={commonStyles.text}>Best Score: {stats.bestScore}/100</Text>
                <View style={commonStyles.progressBar}>
                  <View 
                    style={[
                      commonStyles.progressFill, 
                      { width: `${stats.bestScore}%` }
                    ]} 
                  />
                </View>
              </View>
            ))}
          </View>

          {/* Earned Badges */}
          <View style={commonStyles.section}>
            <Text style={commonStyles.subtitle}>🏅 Earned Badges ({earnedBadges.length})</Text>
            <View style={commonStyles.card}>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
                {earnedBadges.map((badge) => (
                  <Badge key={badge.id} badge={badge} />
                ))}
              </View>
              {earnedBadges.length === 0 && (
                <Text style={commonStyles.text}>No badges earned yet. Keep playing to earn your first badge!</Text>
              )}
            </View>
          </View>

          {/* Unearned Badges */}
          <View style={commonStyles.section}>
            <Text style={commonStyles.subtitle}>🎯 Badges to Earn ({unearnedBadges.length})</Text>
            <View style={commonStyles.card}>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
                {unearnedBadges.map((badge) => (
                  <Badge key={badge.id} badge={badge} />
                ))}
              </View>
              {unearnedBadges.length === 0 && (
                <Text style={commonStyles.text}>🎉 Congratulations! You&apos;ve earned all badges!</Text>
              )}
            </View>
          </View>

          <View style={commonStyles.buttonContainer}>
            <Button
              text="Back to Home"
              onPress={() => router.push('/')}
              style={{ backgroundColor: colors.secondary }}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}