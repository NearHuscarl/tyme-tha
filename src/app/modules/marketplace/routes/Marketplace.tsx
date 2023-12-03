import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { Layout } from "app/components/Layout";
import { Banner } from "../components/Banner";
import { Filters } from "../components/Filters";
import { TagFilter } from "../components/TagFilter";
import { CharacterGrid } from "../components/CharacterGrid";

export function Marketplace() {
  return (
    <Layout>
      <Banner />
      <Container maxWidth="lg" sx={{ display: "flex", gap: 4, py: 8 }}>
        <Filters />
        <Box>
          <TagFilter />
          <Box mt={4}>
            <CharacterGrid />
          </Box>
        </Box>
      </Container>
    </Layout>
  );
}
