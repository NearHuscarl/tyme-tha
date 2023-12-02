import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { useTags } from "../api/getTags";

export const TagFilter = () => {
  const { data = [] } = useTags();

  return (
    <Stack direction="row" spacing={2}>
      {data.map((tag) => (
        <Chip key={tag.id} label={tag.name} clickable color="primary" />
      ))}
    </Stack>
  );
};
