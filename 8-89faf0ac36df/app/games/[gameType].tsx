import React, { useState, useEffect } from 'react';
import { Text, View, SafeAreaView, Alert } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { useFonts, FredokaOne_400Regular } from '@expo-google-fonts/fredoka-one';
import { Nunito_400Regular, Nunito_500Medium, Nunito_700Bold } from '@expo-google-fonts/nunito';
import Button from '../../components/Button';
import GameQuestion from '../../components/GameQuestion';
import { commonStyles, colors } from '../../styles/commonStyles';

export default function GameScreen() {
  const { gameType } = useLocalSearchParams();
  const [fontsLoaded] = useFonts({
    FredokaOne_400Regular,
    Nunito_400Regular,
    Nunito_500Medium,
    Nunito_700Bold,
  });

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [gameComplete, setGameComplete] = useState(false);

  useEffect(() => {
    console.log(`Starting ${gameType} game`);
    generateQuestions();
  }, [gameType]);

  const generateQuestions = () => {
    const newQuestions = [];
    for (let i = 0; i < 10; i++) {
      newQuestions.push(generateQuestion(gameType as string));
    }
    setQuestions(newQuestions);
    setCurrentQuestion(0);
    setScore(0);
    setGameComplete(false);
  };

  const generateQuestion = (type: string) => {
    let num1, num2, answer, operation, question;
    
    switch (type) {
      case 'addition':
        num1 = Math.floor(Math.random() * 20) + 1;
        num2 = Math.floor(Math.random() * 20) + 1;
        answer = num1 + num2;
        operation = '+';
        question = `${num1} + ${num2}`;
        break;
      case 'subtraction':
        num1 = Math.floor(Math.random() * 20) + 10;
        num2 = Math.floor(Math.random() * 10) + 1;
        answer = num1 - num2;
        operation = '-';
        question = `${num1} - ${num2}`;
        break;
      case 'multiplication':
        num1 = Math.floor(Math.random() * 10) + 1;
        num2 = Math.floor(Math.random() * 10) + 1;
        answer = num1 * num2;
        operation = '×';
        question = `${num1} × ${num2}`;
        break;
      case 'division':
        num2 = Math.floor(Math.random() * 10) + 1;
        answer = Math.floor(Math.random() * 10) + 1;
        num1 = num2 * answer;
        operation = '÷';
        question = `${num1} ÷ ${num2}`;
        break;
      default:
        num1 = 1;
        num2 = 1;
        answer = 2;
        operation = '+';
        question = '1 + 1';
    }

    // Generate wrong answers
    const wrongAnswers = [];
    while (wrongAnswers.length < 3) {
      const wrong = answer + Math.floor(Math.random() * 10) - 5;
      if (wrong !== answer && wrong > 0 && !wrongAnswers.includes(wrong)) {
        wrongAnswers.push(wrong);
      }
    }

    const options = [answer, ...wrongAnswers].sort(() => Math.random() - 0.5);

    return {
      question,
      answer,
      options,
      operation,
    };
  };

  const handleAnswer = (selectedAnswer: number) => {
    const isCorrect = selectedAnswer === questions[currentQuestion]?.answer;
    
    if (isCorrect) {
      setScore(score + 10);
      console.log('Correct answer! Score:', score + 10);
    } else {
      console.log('Wrong answer. Correct answer was:', questions[currentQuestion]?.answer);
    }

    if (currentQuestion + 1 >= questions.length) {
      setGameComplete(true);
      const finalScore = isCorrect ? score + 10 : score;
      console.log('Game complete! Final score:', finalScore);
      
      setTimeout(() => {
        Alert.alert(
          'Game Complete!',
          `Your final score: ${finalScore}/100\n${finalScore >= 70 ? 'Excellent work! 🎉' : 'Keep practicing! 💪'}`,
          [
            { text: 'Play Again', onPress: generateQuestions },
            { text: 'Home', onPress: () => router.push('/') }
          ]
        );
      }, 1000);
    } else {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
      }, 1000);
    }
  };

  if (!fontsLoaded) {
    return (
      <View style={commonStyles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const getGameTitle = (type: string) => {
    switch (type) {
      case 'addition': return 'Addition Game ➕';
      case 'subtraction': return 'Subtraction Game ➖';
      case 'multiplication': return 'Multiplication Game ✖️';
      case 'division': return 'Division Game ➗';
      default: return 'Math Game';
    }
  };

  return (
    <SafeAreaView style={commonStyles.wrapper}>
      <View style={commonStyles.container}>
        <View style={commonStyles.content}>
          <Text style={commonStyles.title}>{getGameTitle(gameType as string)}</Text>
          
          <View style={commonStyles.card}>
            <Text style={commonStyles.text}>Score: {score}</Text>
            <Text style={commonStyles.text}>Question {currentQuestion + 1} of {questions.length}</Text>
            
            <View style={commonStyles.progressBar}>
              <View 
                style={[
                  commonStyles.progressFill, 
                  { width: `${((currentQuestion + 1) / questions.length) * 100}%` }
                ]} 
              />
            </View>
          </View>

          {questions.length > 0 && currentQuestion < questions.length && (
            <GameQuestion
              question={questions[currentQuestion]}
              onAnswer={handleAnswer}
              gameComplete={gameComplete}
            />
          )}

          <View style={commonStyles.buttonContainer}>
            <Button
              text="Back to Home"
              onPress={() => router.push('/')}
              style={{ backgroundColor: colors.textLight }}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}