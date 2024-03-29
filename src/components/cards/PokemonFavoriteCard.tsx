import PropTypes from "prop-types";
import { GridItem, Image, Heading, Button, Box } from "@chakra-ui/react";
import { IoMdCloseCircle } from "react-icons/io";

import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks";
import { deleteFromFavorites } from "../../store/slices/favoritesSlice";
import { SinglePokemonData } from "../../types/pokemonData";

interface PokemonFavoriteCardProps {
  pokemon: SinglePokemonData;
}

const PokemonFavoriteCard = ({ pokemon }: PokemonFavoriteCardProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <GridItem
      flexDirection={"column"}
      boxShadow={"0px 0px 3px grey"}
      m={2}
      p={1}
      borderRadius={10}
      position={"relative"}
    >
      <Box
        position={"absolute"}
        top={"8px"}
        right={"8px"}
        cursor={"pointer"}
        onClick={() => dispatch(deleteFromFavorites(pokemon.id))}
      >
        <IoMdCloseCircle color="red" size={"18px"} />
      </Box>
      <Image
        src={pokemon.mainImage ? pokemon.mainImage : pokemon.backupImage}
        boxSize="150px"
        alt={pokemon.name}
        backgroundImage={
          "linear-gradient(to bottom, #ffffff, #ffecff, #ffd3da, #ffd27d, #f8ef09)"
        }
        mb={4}
        borderRadius={8}
      ></Image>
      <Heading
        fontSize={15}
        textAlign={"center"}
        textTransform={"capitalize"}
        color={"#F6C52E"}
        ml={2}
      >
        {pokemon.name}
      </Heading>
      <Button
        onClick={() =>
          navigate(`/SingleCard/${pokemon.id}`, { state: "Favorites" })
        }
        w={"100%"}
        mt={3}
        size={"sm"}
      >
        Show more
      </Button>
    </GridItem>
  );
};

PokemonFavoriteCard.propTypes = {
  pokemon: PropTypes.shape({
    id: PropTypes.number.isRequired,
    attacks: PropTypes.arrayOf(PropTypes.string).isRequired,
    experience: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.oneOf([null]).isRequired,
    ]),
    height: PropTypes.number.isRequired,
    weight: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.arrayOf(PropTypes.string).isRequired,
    // Images
    mainImage: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.oneOf([null]).isRequired,
    ]),
    backupImage: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.oneOf([null]).isRequired,
    ]),
    animatedImage: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.oneOf([null]).isRequired,
    ]),
  }),
};

export default PokemonFavoriteCard;
