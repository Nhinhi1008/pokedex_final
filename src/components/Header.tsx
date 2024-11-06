import { SearchIcon } from '@chakra-ui/icons';
import {
  Box,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
} from '@chakra-ui/react';
import { createSearchParams, Link, useNavigate, useSearchParams} from 'react-router-dom';
import { useState } from "react";

export default function Header() {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery ] = useState(searchParams.get('q') || '');
  const navigate = useNavigate();


  //usenavigate thuong dung de handle, quan ly su kien
  return (
    <Flex gap={60} alignItems='flex-end' paddingBlock={6}>
      <Flex flexDirection='column' className="heading-info">
        <Link to='/'>
          <Heading as='h2'>Pokedéx</Heading>
        </Link>
        <Text as='p'>
          Search for Pokémon by name or using the National Pokédex number
        </Text>
      </Flex>
      <Box flex={1}>
        <InputGroup size='lg' className='searching'>
          <InputLeftElement onClick={() => {
            if (searchQuery && searchQuery.trim().length > 0) {
              navigate({
                  pathname: '/pokemon/search',
                  search: createSearchParams({
                    q: searchQuery.trim(),
                  }).toString(),
                });
            }
          }}>
            <SearchIcon />
          </InputLeftElement>

          <Input placeholder='What Pokémon are you looking for?'
            onChange={(e) => setSearchQuery(e.target.value)}
            value={searchQuery}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                if (searchQuery && searchQuery.trim().length > 0) {
                  navigate({
                    pathname: '/pokemon/search',
                    search: createSearchParams({
                      q: searchQuery.trim(),
                    }).toString(),
                  });
                }
              }
            }}
          />
        </InputGroup>
      </Box>
    </Flex>
  );
}