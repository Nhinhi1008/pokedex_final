// import { SearchIcon } from '@chakra-ui/icons';
import { useQuery } from '@tanstack/react-query';
import PokemonCard from '../components/PokemonCard';
import ReactPaginate from 'react-paginate';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { Button, Flex, Grid, Spinner } from '@chakra-ui/react';
import { useSearchParams } from 'react-router-dom';



type GetListPokemonResponse = {
  count: number;
  results: { name: string; url: string }[];
};



export default function Home() {
  // const [page, setPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page') || 1);
  const { data, isLoading, } = useQuery({
    queryKey: ['pokemons', page],

    queryFn: async () => 
      fetch(
        `https://pokeapi.co/api/v2/pokemon?offset=${(page - 1) * 16}&limit=16`
      ).then((res) => res.json() as Promise<GetListPokemonResponse>),
      // if (!res.ok) throw new Error('Network response was not ok');
      // return res.json();
  });

  const pageCount = Math.ceil((data?.count || 0) / 16);


  return (
    
      
      <Flex flexDirection="column">
        <Grid templateColumns="repeat(4, 1fr)" gap={6}>
          {isLoading ? (
            <Spinner />
          ) : (
            data?.results.map((pokemon) => (
              <PokemonCard key={pokemon.name} name={pokemon.name} />
            ))
          )}
        </Grid>
      
        <Flex justifyContent="center" marginTop={6} gap={4}>
          <ReactPaginate
            forcePage={page - 1}
            onPageChange={({ selected }) => {
              const params = Object.fromEntries(searchParams.entries());

              if (selected === 0) {
                delete params.page;
              } else {
                params.page = String(selected + 1);
              }

              setSearchParams(params);
            }
            }
              
          
            breakLabel= {<Button> ... </Button>}
            previousLabel={
              <Button>
                <ChevronLeft />
              </Button>
            }
          
            nextLabel={
              <Button>
                <ChevronRight />
              </Button>
            }

          
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            containerClassName="pagination"
            pageLabelBuilder={(page) => <Button>{page}</Button>}
            pageCount={pageCount}
            activeClassName='active'
            renderOnZeroPageCount={null}
          />
        </Flex>
      </Flex>  
  );
}
