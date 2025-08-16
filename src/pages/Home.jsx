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

  // prettier-ignore (kept split for readability, < 80 chars per line)
  const words = [
    // high-frequency short words
    'a', 'an', 'and', 'are', 'as', 'at', 'be', 'by', 'for', 'from',
    'has', 'he', 'in', 'is', 'it', 'its', 'of', 'on', 'or', 'the',
    'to', 'was', 'were', 'will', 'with',

    // medium length, common
    'about', 'after', 'again', 'around', 'before', 'between', 'change',
    'circle', 'coffee', 'coding', 'dragon', 'energy', 'escape', 'hidden',
    'jungle', 'moment', 'notice', 'object', 'planet', 'quartz', 'rocket',
    'silver', 'simple', 'system', 'window',

    // longer or trickier spellings
    'accommodate', 'acknowledge', 'algorithm', 'astronaut', 'awkward',
    'borough', 'bureaucracy', 'conscience', 'dichotomy', 'exaggerate',
    'handkerchief', 'independent', 'lightning', 'maintenance',
    'miscellaneous', 'occasionally', 'parallel', 'questionnaire',
    'rhythm', 'silhouette', 'supersede', 'vacuum', 'whimsical',

    // contractions
    "aren't", "can't", "couldn't", "didn't", "doesn't", "don't", "isn't",
    "it's", "they're", "we're", "won't", "wouldn't", "you're",

    // numbers and symbols
    '24/7', '3.1415', '4th', '50%', '7-Eleven', '99', '@home', '#hashtag',
    '$value', 'C3PO', 'R2D2',

    // tech & CamelCase
    'Android', 'CSS', 'Docker', 'GitHub', 'HTML', 'JavaScript', 'NodeJS',
    'OpenAI', 'React', 'StackOverflow', 'TypeScript', 'Vue',

    // keyboard-centric words
    'backspace', 'capslock', 'command', 'control', 'cursor',
    'enter', 'function', 'keyboard', 'monitor', 'mouse', 'printer',
    'scroll', 'shortcut', 'tab', 'trackpad',

    // pangram fragments / rare letters
    'buzzing', 'cycle', 'fjord', 'gizmo', 'jazz', 'kayak', 'oxford',
    'pixel', 'quixotic', 'sphinx', 'waltz', 'yachtsman', 'zodiac'
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