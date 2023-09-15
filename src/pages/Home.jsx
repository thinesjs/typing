import { Box, Button, Flex, Input, useToast, Text, useColorMode } from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from 'react'

const Home = () => {
  const { colorMode } = useColorMode();

  const [wordCount, setWordCount] = useState(20); // Default to 20 words
  const [currentParagraph, setCurrentParagraph] = useState('');
  const [userInput, setUserInput] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [completedWordCount, setCompletedWordCount] = useState(0);
  const [highlightedWords, setHighlightedWords] = useState([]);
  const wpmRef = useRef(0.00);

  const toast = useToast()

  const words = [
    "apple", "banana", "cherry", "grape", "kiwi",
    "lemon", "orange", "pear", "strawberry", "watermelon",
    // from api, type.tjs-server.com/v1
  ];
  
  // generate paragraph
  const generateRandomParagraph = (wordCount) => {
    const paragraph = [];
    for (let i = 0; i < wordCount; i++) {
      const randomIndex = Math.floor(Math.random() * words.length);
      paragraph.push(words[randomIndex]);
    }
    return paragraph.join(" ");
  };

  // start a new typing session
  const startNewSession = (newWordCount) => {
    wpmRef.current = 0;
    setCompletedWordCount(0)
    setWordCount(newWordCount);
    setUserInput('');
    setIsCompleted(false);
    setStartTime(performance.now());
    const paragraph = generateRandomParagraph(newWordCount);
    setCurrentParagraph(paragraph);
    setHighlightedWords([]);
  };

  // calculate wpm
  const calculateWPM = (input) => {
    if (input === currentParagraph.split(' ')[completedWordCount]) {
      const endTime = performance.now();
      const elapsedTimeInSeconds = (endTime - startTime) / 1000;
      const wordsPerMinute = ((completedWordCount / 5) / elapsedTimeInSeconds) * 60;
      wpmRef.current = wordsPerMinute.toFixed(0);
    }
  };

  const handleUserInput = (e) => {
    const input = e.target.value.trim();
    const currentWord = currentParagraph.split(' ')[completedWordCount];
    
    if (currentWord.startsWith(input) && !input.startsWith(" ")) {
      setUserInput(input);
      
      if (currentWord === input) {
        console.log(completedWordCount)
        console.log(currentParagraph.split(" ").length)
        // If the user has typed the entire word correctly, proceed to the next word
        setCompletedWordCount(completedWordCount + 1);
        calculateWPM(input);
        setUserInput('');
        if(completedWordCount+1 === currentParagraph.split(" ").length){
          toast({
            title: 'Hooray!',
            description: "Your last WPM was ${wpmRef.current}",
            status: 'success',
            duration: 2500,
            position: 'top-center',
            isClosable: true,
          })
          setUserInput('');
          startNewSession(wordCount);
        }
      }
    } else {
      setUserInput(input);
    }
  };
  

  // highlight typed words
  const highlightTypedWords = (paragraph, typedWordCount) => {
    const words = paragraph.split(' ');
    const highlightedWords = words.map((word, index) => {
      if (index < typedWordCount) {
        return <Text color='green' as="span">{word} </Text>;
      } else {
        return <Text as="span">{word} </Text>;
      }
    });
    return highlightedWords;
  };

  // init random paragraph
  useEffect(() => {
    startNewSession(wordCount);
  }, []);



  return (
    <>
    <Flex
      flex="1"
      p="4"
      maxW="lg"
      mx="auto"
      rounded="lg"
      overflow="hidden"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Box layerStyle={colorMode === "light" ? "lightBox" : "darkBox"}  p="4" rounded="lg">
        <Text>
          {highlightTypedWords(currentParagraph, completedWordCount)}
        </Text>
      </Box>

      <Flex mt="4" w="100%" alignItems="center">
          <Input placeholder="Start typing..." flex="1" mr="2" value={userInput} onChange={handleUserInput} disabled={isCompleted} autoFocus/>
          <Button size="md" onClick={() => startNewSession(wordCount)}>
            Randomize
          </Button>
      </Flex>
      <Text mt="2">WPM: {wpmRef.current}</Text>
      <Box mt="4" textAlign="center">
      <Button size="sm" mx="2" onClick={() => startNewSession(10)}>
        10 Words
      </Button>
      <Button size="sm" mx="2" onClick={() => startNewSession(20)}>
        20 Words
      </Button>
      <Button size="sm" mx="2" onClick={() => startNewSession(50)}>
        50 Words
      </Button>
    </Box>
    </Flex>
    </>
  )
}

export default Home