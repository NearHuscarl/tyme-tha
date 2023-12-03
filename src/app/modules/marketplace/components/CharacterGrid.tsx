import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActionArea from "@mui/material/CardActionArea";
import Typography from "@mui/material/Typography";
import { TCharacter, getCharacters } from "../api/getCharacters";
import { TFilterStore, useFilterStore } from "../stores/filters";
import { PAGE_SIZE } from "../config";

const CharacterCard = (props: { character: TCharacter }) => {
  const { character } = props;

  return (
    <Card sx={{ maxWidth: 405 }}>
      <CardActionArea>
        <Box
          sx={{
            position: "absolute",
            top: 20,
            left: 20,
            padding: 1,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            color: "white",
            fontSize: 11,
          }}
        >
          {character.tier}
        </Box>
        <CardMedia
          component="img"
          sx={{ padding: 1.5, paddingBottom: 0 }}
          height="220"
          image={character.image}
          alt={character.name}
        />
        <CardContent>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="baseline"
          >
            <Typography
              gutterBottom
              variant="body1"
              component="div"
              fontSize={12}
            >
              {character.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" fontSize={12}>
              {character.price} ETH
            </Typography>
          </Stack>
          <Stack direction="row" gap={1} alignItems="center" mt={1}>
            <Avatar
              src={character.author.avatar}
              sx={{ width: 28, height: 28 }}
            />
            <Typography variant="body2" color="text.secondary" fontSize={12}>
              {character.author.name}
            </Typography>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export const CharacterGrid = () => {
  const filters = useFilterStore();
  const [characters, setCharacters] = useState<TCharacter[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const getAllCharacters = async (filters: TFilterStore, page: number) => {
    const { result, hasMore } = await getCharacters({
      ...filters,
      page: 0,
      pageSize: PAGE_SIZE * (page + 1),
    });
    setCharacters(result);
    setHasMore(hasMore);
    console.log("Refresh data", result);
  };
  const getMoreCharacters = async () => {
    const newPage = page + 1;
    setPage(newPage);

    const { result, hasMore } = await getCharacters({
      ...filters,
      page: newPage,
    });
    setCharacters((c) => [...c, ...result]);
    setHasMore(hasMore);
  };

  useEffect(() => {
    getAllCharacters(filters, page);

    const id = setInterval(() => {
      getAllCharacters(filters, page);
    }, 60 * 1000);

    return () => clearInterval(id);
  }, [page, filters]);

  return (
    <Stack alignItems="center" gap={4}>
      <Box
        sx={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4 }}
      >
        {characters.map((character) => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </Box>
      {hasMore && (
        <Button
          variant="contained"
          sx={{ width: 300, height: 50 }}
          onClick={getMoreCharacters}
        >
          View more
        </Button>
      )}
    </Stack>
  );
};
