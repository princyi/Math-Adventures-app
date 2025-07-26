import React, { useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { commonStyles, colors } from '../styles/commonStyles';

interface GameQuestionProps {
  question: {
    question: string;
    answer: number;
    options: number[];
    operation: string;
  };
  onAnswer: (answer: number) => void;
  gameComplete: boolean;
}

export default function GameQuestion({ question, onAnswer, gameComplete }: GameQuestionProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleOptionPress = (option: number) => {
    if (showResult || gameComplete) return;
    
    setSelectedAnswer(option);
    setShowResult(true);
    
    setTimeout(() => {
      onAnswer(option);
      setSelectedAnswer(null);
      setShowResult(false);
    }, 1500);
  };

  const getOptionStyle = (option: number) => {
    if (!showResult) {
      return {
        backgroundColor: colors.card,
        borderColor: colors.accent,
        borderWidth: 2,
      };
    }
    
    if (option === question.answer) {
      return {
        backgroundColor: colors.success,
        borderColor: colors.success,
        borderWidth: 2,
      };
    }
    
    if (option === selectedAnswer && option !== question.answer) {
      return {
        backgroundColor: colors.error,
        borderColor: colors.error,
        borderWidth: 2,
      };
    }
    
    return {
      backgroundColor: colors.card,
      borderColor: '#E5E7EB',
      borderWidth: 2,
      opacity: 0.5,
    };
  };

  return (
    <View style={commonStyles.section}>
      <View style={[commonStyles.card, { backgroundColor: colors.primary, padding: 30 }]}>
        <Text style={[commonStyles.title, { fontSize: 48, color: colors.text, marginBottom: 0 }]}>
          {question.question}
        </Text>
      </View>
      
      <Text style={[commonStyles.subtitle, { marginTop: 20 }]}>Choose the correct answer:</Text>
      
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginTop: 20 }}>
        {question.options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              {
                padding: 20,
                margin: 10,
                borderRadius: 15,
                minWidth: 80,
                alignItems: 'center',
                justifyContent: 'center',
              },
              getOptionStyle(option)
            ]}
            onPress={() => handleOptionPress(option)}
            disabled={showResult || gameComplete}
          >
            <Text style={[commonStyles.subtitle, { 
              color: showResult && option === question.answer ? 'white' : 
                     showResult && option === selectedAnswer ? 'white' : colors.text,
              fontSize: 24 
            }]}>
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      
      {showResult && (
        <View style={{ marginTop: 20 }}>
          <Text style={[commonStyles.text, { 
            fontSize: 20, 
            color: selectedAnswer === question.answer ? colors.success : colors.error,
            fontWeight: 'bold'
          }]}>
            {selectedAnswer === question.answer ? '🎉 Correct!' : `❌ Wrong! The answer is ${question.answer}`}
          </Text>
        </View>
      )}
    </View>
  );
}