import React, {
  useState,
} from 'react';

import {
  ChakraProvider,
  Center,
  Flex,
  Input,
  Image,
  Box,
  Text,
  Wrap,
  WrapItem,
  Button,
  FormControl,
  Stack,
  Code,
  FormLabel,
  useToast,
  Square,
} from '@chakra-ui/react'

import {
  EmailIcon,
} from '@chakra-ui/icons'

import events from './events';

import workingPagey from './Working-Pagey.png';
import hwp from './pumpkin.jpg';

function App() {
  const toast = useToast();
  const [selectedValues, setSelectedValues] = useState(events);
  const [routingKey, setRoutingKey] = useState('');

  const toastWithMessage = (message: string, error = false) => {
    toast({
      position: 'top',
      title: message,
      status: error ? 'error' : 'success',
      duration: 3000,
      isClosable: true,
    })
  };

  const selectedEventContents = () => {
    const selectedEvents = events;
    return selectedEvents.map((event) => event.event);
  }

  const selectedEventsCodeBlocks = () => (
    <>
      <Text mt={4}>Events:</Text>
      <Wrap>
        {selectedEventContents().map((event) => (
          <WrapItem>
            <Code colorScheme="orange" p={2} m={2} mb={2} borderRadius={10} whiteSpace="pre" shadow="md">
              {JSON.stringify(event, null, 2)}
            </Code>
          </WrapItem>
        ))}
      </Wrap>
    </>
  );

  const handleRoutingKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoutingKey(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!routingKey) {
      toastWithMessage('Please enter a routing key', true);
      return;
    }
    const events: object[] = selectedEventContents()
    const postBodies = events.map((event) => ({
      ...event,
      routing_key: routingKey,
    }));
    const results = {
      success: 0,
      failure: 0,
      failureReasons: [] as string[],
    }
    for (const postBody of postBodies) {
      const result = await fetch(
        'https://events.pagerduty.com/v2/enqueue',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(postBody),
        }
      )
      if (result.status !== 202) {
        const errorBody = await result.text();
        results.failure += 1;
        results.failureReasons.push(errorBody);
      } else {
        results.success += 1;
      }
    }
    if (results.success > 0) {
      toastWithMessage(`Sent ${results.success} events!`);
    }
    if (results.failure > 0) {
      const reasons = Array.from(new Set(results.failureReasons)).join(', ');
      toastWithMessage(`Failed to send ${results.failure} events: ${reasons}`, true);
    }
  }

  return (
    <ChakraProvider>
      <div className="App">
        <Box bg="#dd6b20" w="100%" p={4} color="black" fontWeight="bold" fontSize={36}>
          <Stack direction="row" spacing={4}>
            <Image src={workingPagey} boxSize="50px" alt="Working Pagey" />
            <Flex>
              <Center>
                <h1>Send Events</h1>
              </Center>
            </Flex>
          </Stack>
        </Box>
        <Flex>
          <Box w="30%" p={4} color="orange" bg="black">
            <form onSubmit={handleSubmit}>
              <FormControl>
                <FormLabel>Routing Key from Integration</FormLabel>
                <Input placeholder="Routing Key" onChange={handleRoutingKeyChange} />
              </FormControl>
              <Button
                mt={6}
                type="submit"
                variant="solid"
                colorScheme="orange"
                leftIcon={<EmailIcon />}
                isDisabled={!routingKey}
              >
                Send
              </Button>
            </form>
          </Box>
          <Box w="35%" color="orange" bg="black">
            {selectedValues && selectedValues.length > 0 && selectedEventsCodeBlocks()}
          </Box>
          <Box w="35%" color="orange" bg="black">
            <Square bg="black">
              <Image src={hwp} alt="Working Pagey" />
            </Square>          
          </Box>
        </Flex>
      </div>
    </ChakraProvider>
  );
}

export default App;
