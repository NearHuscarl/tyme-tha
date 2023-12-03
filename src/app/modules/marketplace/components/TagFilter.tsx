import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { useTags } from "../api/getTags";
import { useFilterStore } from "../stores/filters";
import { useTheme, alpha } from "@mui/material";

export const TagFilter = () => {
  const { data = [] } = useTags();
  const theme = useTheme();
  const selectedTags = useFilterStore((state) => state.tags);
  const toggleTag = useFilterStore((state) => state.toggleTag);

  return (
    <Stack direction="row" spacing={2}>
      {data.map((tag) => (
        <Chip
          key={tag.id}
          label={tag.name}
          clickable
          color="primary"
          onClick={() => toggleTag(tag.id)}
          sx={{
            backgroundColor: !selectedTags.includes(tag.id)
              ? alpha(theme.palette.primary.main, 0.4)
              : undefined,
          }}
        />
      ))}
    </Stack>
  );
};
