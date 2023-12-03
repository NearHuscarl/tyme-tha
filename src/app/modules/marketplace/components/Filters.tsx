import { useState } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import InputAdornment from "@mui/material/InputAdornment";
import MenuItem from "@mui/material/MenuItem";
import SearchIcon from "@mui/icons-material/Search";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { DEFAULT_FILTERS, useFilters } from "../stores/filters";
import { PRICE_RANGE } from "../config";
import { useTiers } from "../api/getTiers";
import { useThemes } from "../api/getThemes";
import { useTimes } from "../api/getTimes";

const PRICES = [
  {
    id: "None",
    name: "None",
  },
  {
    id: "Low to High",
    name: "Low to High",
  },
  {
    id: "High to Low",
    name: "High to Low",
  },
];

type TFilterInputProps = {
  value: string;
  label: string;
  options: { id: string; name: string }[];
  onChange: (value: string) => void;
};

const FilterInput = (props: TFilterInputProps) => {
  const { label, value, options, onChange } = props;

  return (
    <Box mt={3}>
      <Typography color="text.secondary">{label}</Typography>
      <TextField
        select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        fullWidth
        sx={{ mt: 1 }}
      >
        {options.map(({ id, name }) => (
          <MenuItem key={id} value={id}>
            {name}
          </MenuItem>
        ))}
      </TextField>
    </Box>
  );
};

export const Filters = () => {
  const { query, priceRange, tier, theme, time, priceSorting, setFilters } =
    useFilters();
  const { data: tiers = [] } = useTiers();
  const { data: themes = [] } = useThemes();
  const { data: times = [] } = useTimes();
  const [draftFilters, setDraftFilters] = useState({
    query,
    priceRange,
    tier,
    theme,
    time,
    priceSorting,
  });

  const resetFilters = () => {
    setDraftFilters(DEFAULT_FILTERS);
  };

  return (
    <Box
      component="form"
      flex="0 0 300px"
      onSubmit={(e) => {
        e.preventDefault();
        setFilters(draftFilters);
      }}
    >
      <TextField
        fullWidth
        value={draftFilters.query}
        onChange={(e) =>
          setDraftFilters({ ...draftFilters, query: e.target.value })
        }
        placeholder="Quick search"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />

      <Typography id="input-slider" mt={8} gutterBottom>
        PRICE
      </Typography>
      <Slider
        value={draftFilters.priceRange}
        onChange={(_, newValues) =>
          setDraftFilters({
            ...draftFilters,
            priceRange: newValues as [number, number],
          })
        }
        min={PRICE_RANGE[0]}
        max={PRICE_RANGE[1]}
        valueLabelDisplay="auto"
      />
      <Stack direction="row" justifyContent="space-between">
        <Typography color="text.secondary">
          {PRICE_RANGE[0] + " ETH"}
        </Typography>
        <Typography color="text.secondary">
          {PRICE_RANGE[1] + " ETH"}
        </Typography>
      </Stack>

      <FilterInput
        label="Tier"
        value={draftFilters.tier}
        options={tiers}
        onChange={(tier) => setDraftFilters((state) => ({ ...state, tier }))}
      />
      <FilterInput
        label="Theme"
        value={draftFilters.theme}
        options={themes}
        onChange={(theme) => setDraftFilters((state) => ({ ...state, theme }))}
      />
      <FilterInput
        label="Time"
        value={draftFilters.time}
        options={times}
        onChange={(time) => setDraftFilters((state) => ({ ...state, time }))}
      />
      <FilterInput
        label="Price"
        value={draftFilters.priceSorting}
        options={PRICES}
        onChange={(priceSorting) =>
          setDraftFilters((state) => ({ ...state, priceSorting }))
        }
      />
      <Stack direction="row" gap={1} mt={3}>
        <Button
          variant="text"
          startIcon={<HighlightOffIcon />}
          onClick={resetFilters}
        >
          Reset filter
        </Button>
        <Button variant="contained" type="submit">
          Search
        </Button>
      </Stack>
    </Box>
  );
};
