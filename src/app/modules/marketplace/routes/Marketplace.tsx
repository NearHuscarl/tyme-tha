import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Layout } from "app/components/Layout";
import { Banner } from "../components/Banner";
import { Filters } from "../components/Filters";
import { TagFilter } from "../components/TagFilter";

export function Marketplace() {
  return (
    <Layout>
      <Banner />
      <Container maxWidth="lg" sx={{ display: "flex", gap: 4, mt: 8 }}>
        <Filters />
        <Box>
          <TagFilter />
        </Box>
      </Container>
    </Layout>
  );
}
