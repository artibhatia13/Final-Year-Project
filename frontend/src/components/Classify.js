import React from 'react';
import { Text, Flex, Box, Button } from "@chakra-ui/react";
import { AddIcon } from '@chakra-ui/icons'

const Classify = () => {
    return (
      <Box p="5em" color="#212121" w="75em">
        <Text fontSize="xl">
          Capture the beauty of your gemstone and let our advanced machine
          learning algorithm unravel its true identity. Upload an image of your
          gemstone below, and our powerful classification system will harness
          the power of artificial intelligence to determine its precise gemstone
          class.
        </Text>
        <Flex w="25em" h="15em" border="1px" align='center' justifyContent='center' mt='2em'>
          <AddIcon mr='2'/>
          <Text>Upload Image</Text>
        </Flex>
        <Button bg="#99627A" color="white" mt="1.5em" size="lg" px='3em'>
          Classify
        </Button>
      </Box>
    );
}

export default Classify;
