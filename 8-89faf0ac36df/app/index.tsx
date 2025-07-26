import { Text, View, ScrollView, SafeAreaView } from 'react-native';
import { router } from 'expo-router';
import { useState, useEffect } from 'react';
import { useFonts, FredokaOne_400Regular } from '@expo-google-fonts/fredoka-one';
import { Nunito_400Regular, Nunito_500Medium, Nunito_700Bold } from '@expo-google-fonts/nunito';
import Button from '../components/Button';
import GameCard from '../components/GameCard';
import ProgressSection from '../components/ProgressSection';
import { commonStyles, colors } from '../styles/commonStyles';

export default function HomeScreen() {
  const [fontsLoaded] = useFonts({
    FredokaOne_400Regular,
    Nunito_400Regular,
    Nunito_500Medium,
    Nunito_700Bold,
  });

  const [userProgress, setUserProgress] = useState({
    totalScore: 0,
    gamesPlayed: 0,
    badges: [],
    streakDays: 0,
  });

  useEffect(() => {
    console.log('Home screen loaded');
    // Load user progress from storage if needed
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={commonStyles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const games = [
    {
      id: 'addition',
      title: 'Addition',
      icon: '➕',
      color: colors.accent,
      description: 'Learn to add numbers!',
    },
    {
      id: 'subtraction',
      title: 'Subtraction',
      icon: '➖',
      color: colors.orange,
      description: 'Practice subtraction!',
    },
    {
      id: 'multiplication',
      title: 'Multiplication',
      icon: '✖️',
      color: '#8B5CF6',
      description: 'Master multiplication!',
    },
    {
      id: 'division',
      title: 'Division',
      icon: '➗',
      color: '#EC4899',
      description: 'Divide and conquer!',
    },
  ];

  return (
    <SafeAreaView style={commonStyles.wrapper}>
      <ScrollView style={commonStyles.container} contentContainerStyle={{ paddingBottom: 50 }}>
        <View style={commonStyles.content}>
          <Text style={commonStyles.title}>🎓 Math Adventure!</Text>
          <Text style={commonStyles.text}>Choose a game to start learning!</Text>
          
          <ProgressSection userProgress={userProgress} />
          
          <View style={commonStyles.section}>
            <Text style={commonStyles.subtitle}>Mini Games</Text>
            <View style={commonStyles.gameGrid}>
              {games.map((game) => (
                <GameCard
                  key={game.id}
                  game={game}
                  onPress={() => {
                    console.log(`Navigating to ${game.id} game`);
                    router.push(`/games/${game.id}`);
                  }}
                />
              ))}
            </View>
          </View>

          <View style={commonStyles.buttonContainer}>
            <Button
              text="View Progress"
              onPress={() => {
                console.log('Navigating to progress screen');
                router.push('/progress');
              }}
              style={{ backgroundColor: colors.secondary }}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}