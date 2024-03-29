import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { pokemonTypes } from "../pokemonTypes";

import { Flex, Text, Image, VStack } from "@chakra-ui/react";

import searchSuggestion from "../assets/searchSuggestion.png";

import { useGetPokemonsByTypeQuery } from "../api/api";

import PokemonSuggestionsCardsList from "./cardsLists/PokemonSuggestionsCardsList";

const SearchPageSuggestions = () => {
  const [type, setType] = useState("");
  const types = pokemonTypes;

  const { data: pokemons } = useGetPokemonsByTypeQuery(type || null);

  const handleChangeType = (type: string) => {
    setType(type);
  };

  return (
    <VStack>
      {pokemons && <PokemonSuggestionsCardsList pokemonsData={pokemons} />}

      {!pokemons && (
        <Flex flexDirection={"column"} alignItems={"center"}>
          <Flex flexDirection={"column"} mt={"60px"} alignItems={"center"}>
            <Image
              src={searchSuggestion}
              width={{ base: "90px", md: "110px", lg: "130px" }}
              mb={2}
            ></Image>
            <Text fontSize={{ base: 13, md: 16, lg: 19 }} textAlign={"center"}>
              Don't know which pokemon you want to catch ?
            </Text>
          </Flex>
          <Flex
            mt={4}
            textAlign={"center"}
            justifyContent={"center"}
            width={{ base: "250", md: "350px", lg: '"350px"' }}
            maxW={"350px"}
            flexWrap={"wrap"}
          >
            {types.map((type) => (
              <Text
                key={uuidv4()}
                cursor={"pointer"}
                ml={"5px"}
                mr={"5px"}
                fontSize={{ base: "13px", md: "15px", lg: "17px" }}
                _hover={{ color: "yellow.400" }}
                transition={"0.2s"}
                onClick={() => handleChangeType(type)}
              >
                {type}
              </Text>
            ))}
          </Flex>
        </Flex>
      )}
    </VStack>
  );
};

export default SearchPageSuggestions;
