import {
  Box,
  Card,
  CardBody,
  Flex,
  Heading,
  Image,
  Skeleton,
  Tag,
  Text,
} from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { PokemonObject } from '../@types/pokemon';
// import { PokemonObject } from '../@types/pokemon';

const padZero = (num: number) => {
  return num.toString().padStart(4, '0');
};

const formatName = (name: string) => {
  return name.charAt(0).toUpperCase() + name.slice(1);
};

const typeColors: Record<string, string> = {
  grass: 'green',
  fire: 'red',
  water: 'blue',
  bug: 'green',
  normal: 'gray',
  poison: 'purple',
  electric: 'yellow',
  ground: 'orange',
  fairy: 'pink',
  fighting: 'orange',
  psychic: 'purple',
  rock: 'brown',
  ghost: 'purple',
  ice: 'cyan',
  dragon: 'purple',
  dark: 'gray',
  steel: 'gray',
  flying: 'skyblue',
};


type PokemonCardProps = {
  name: string;
};

export default function PokemonCard({ name }: PokemonCardProps) {
  const {
    data: pokemon,
    isLoading,
    
  } = useQuery({
    queryKey: ['pokemon', name],
    queryFn: async () => {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      const data = (await res.json()) as PokemonObject;
      return data;
    },
  });

  if (isLoading) {
    return <Skeleton />;
  }

  
  return (
    <Link to={`/pokemon/${pokemon?.name}`}>
      <Card backgroundImage="linear-gradient(135deg, #99bede, #70a9db)"
      _hover={{ transform: 'scale(1.05)', transition: 'transform 0.2s' }}>
        <CardBody>
          <Flex justifyContent='space-between' >
            <Box className="pokemon-types" style={{ overflow: 'hidden', whiteSpace: 'nowrap', maxWidth: '150px', textOverflow: 'ellipsis'}}>
              <Text as="p">
                #{pokemon && pokemon.id ? padZero(pokemon.id) : ''}
              </Text>
              <Heading as="h2">{pokemon?.name ? formatName(pokemon?.name): ''}</Heading>
              
              <Flex gap={2} marginTop={2}>
                {pokemon?.types.map((type: {type: {name: string}}) => (
                  <Tag
                    key={type.type.name}
                    bg={typeColors[type.type.name]}
                    variant='solid'
                    color="white"
                  >
                    
                    <Text fontSize="8px" fontWeight={300} color="gray">
                      {type.type.name.toUpperCase()}
                    </Text>
                  </Tag>
                ))}
              </Flex>
            </Box>

            <Box>
              <Image className='img_pkm'
                src={pokemon?.sprites.other?.['official-artwork'].front_default}
                alt={pokemon?.name}
                boxSize={'70px'}
                textAlign='center'
                style={{ alignSelf: 'flex-end' }} 
                
              />
            </Box>
          </Flex>
        </CardBody>
      </Card>
    </Link>
  );
}