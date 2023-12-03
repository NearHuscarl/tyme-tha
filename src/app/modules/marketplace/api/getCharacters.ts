import { delay } from "app/helpers/delay";
import { DEFAULT_FILTERS } from "../stores/filters";
import { PAGE_SIZE } from "../config";

export type TCharacter = {
  id: string;
  name: string;
  image: string;
  price: number;
  author: {
    name: string;
    avatar: string;
  };
  tier: string;
  theme: string;
  createdAt: string;
};

export const CHARACTERS: TCharacter[] = [
  {
    id: "1",
    name: "The DJ",
    image:
      "https://img.freepik.com/premium-photo/dog-with-jewelry-its-neck-necklace-that-says-i-m-dog_855643-55.jpg",
    price: 2.75,
    author: {
      name: "Ghozali_Ghozalu",
      avatar:
        "https://as1.ftcdn.net/v2/jpg/05/64/28/18/1000_F_564281876_b90Cpe6MxpjC8ZVSR49Dl1UvKIjPDNK6.jpg",
    },
    createdAt: "2021-08-01T00:00:00.000Z",
    tier: "Epic",
    theme: "Summer",
  },
  {
    id: "2",
    name: "Assassin",
    image:
      "https://img.freepik.com/premium-photo/dog-with-jewelry-its-neck-necklace-that-says-i-m-dog_855643-55.jpg",
    price: 2.45,
    author: {
      name: "Ghozali_Ghozalu",
      avatar:
        "https://as1.ftcdn.net/v2/jpg/05/64/28/18/1000_F_564281876_b90Cpe6MxpjC8ZVSR49Dl1UvKIjPDNK6.jpg",
    },
    createdAt: "2023-08-01T00:00:00.000Z",
    tier: "Common",
    theme: "None",
  },
  {
    id: "3",
    name: "Neon Guy",
    image:
      "https://img.freepik.com/premium-photo/dog-with-jewelry-its-neck-necklace-that-says-i-m-dog_855643-55.jpg",
    price: 2.15,
    author: {
      name: "Ghozali_Ghozalu",
      avatar:
        "https://as1.ftcdn.net/v2/jpg/05/64/28/18/1000_F_564281876_b90Cpe6MxpjC8ZVSR49Dl1UvKIjPDNK6.jpg",
    },
    createdAt: "2023-11-01T00:00:00.000Z",
    tier: "Rare",
    theme: "Christmas",
  },
  {
    id: "4",
    name: "Assassin 2",
    image:
      "https://img.freepik.com/premium-photo/dog-with-jewelry-its-neck-necklace-that-says-i-m-dog_855643-55.jpg",
    price: 1.92,
    author: {
      name: "Ghozali_Ghozalu",
      avatar:
        "https://as1.ftcdn.net/v2/jpg/05/64/28/18/1000_F_564281876_b90Cpe6MxpjC8ZVSR49Dl1UvKIjPDNK6.jpg",
    },
    createdAt: "2023-12-01T00:00:00.000Z",
    tier: "Common",
    theme: "None",
  },
  {
    id: "5",
    name: "Basketball Girl",
    image:
      "https://img.freepik.com/premium-photo/dog-with-jewelry-its-neck-necklace-that-says-i-m-dog_855643-55.jpg",
    price: 2.92,
    author: {
      name: "Ghozali_Ghozalu",
      avatar:
        "https://as1.ftcdn.net/v2/jpg/05/64/28/18/1000_F_564281876_b90Cpe6MxpjC8ZVSR49Dl1UvKIjPDNK6.jpg",
    },
    createdAt: "2023-12-03T00:00:00.000Z",
    tier: "Mythic",
    theme: "Summer",
  },
  {
    id: "6",
    name: "The DJ 2",
    image:
      "https://img.freepik.com/premium-photo/dog-with-jewelry-its-neck-necklace-that-says-i-m-dog_855643-55.jpg",
    price: 3.12,
    author: {
      name: "Ghozali_Ghozalu",
      avatar:
        "https://as1.ftcdn.net/v2/jpg/05/64/28/18/1000_F_564281876_b90Cpe6MxpjC8ZVSR49Dl1UvKIjPDNK6.jpg",
    },
    createdAt: "2023-05-01T00:00:00.000Z",
    tier: "Epic",
    theme: "Summer",
  },
  {
    id: "7",
    name: "Mafia England",
    image:
      "https://img.freepik.com/premium-photo/dog-with-jewelry-its-neck-necklace-that-says-i-m-dog_855643-55.jpg",
    price: 2.66,
    author: {
      name: "Ghozali_Ghozalu",
      avatar:
        "https://as1.ftcdn.net/v2/jpg/05/64/28/18/1000_F_564281876_b90Cpe6MxpjC8ZVSR49Dl1UvKIjPDNK6.jpg",
    },
    createdAt: "2023-09-03T00:00:00.000Z",
    tier: "Legendary",
    theme: "Halloween",
  },
];

type TCharacterFilters = {
  tags: string[];
  query: string;
  priceRange: [start: number, end: number];
  tier: string;
  theme: string;
  time: string;
  priceSorting: string;
  page: number;
  pageSize?: number;
};

export const getCharacters = async (filters?: TCharacterFilters) => {
  return delay(100)
    .then(() => {
      const allCharacters = [];

      for (let i = 0; i < 10; i++) {
        allCharacters.push(
          ...CHARACTERS.map((c) => ({ ...c, id: `${i}-${c.id}` }))
        );
      }
      return allCharacters;
    })
    .then((characters) => {
      const {
        tags,
        query,
        priceRange,
        tier,
        theme,
        time,
        priceSorting,
        page,
        pageSize = PAGE_SIZE,
      } = filters ?? {
        ...DEFAULT_FILTERS,
        page: 0,
        tags: ["All"],
      };
      const tagSet = new Set(tags);
      const start = page * pageSize;
      const end = start + pageSize;

      const filteredCharacters = characters
        .concat(CHARACTERS)
        .filter((character) => {
          if (
            tags.length > 0 &&
            !(
              tagSet.has("All") ||
              tagSet.has(character.tier) ||
              tagSet.has(character.theme)
            )
          ) {
            return false;
          }
          if (
            query &&
            !character.name.toLowerCase().includes(query.toLowerCase())
          ) {
            return false;
          }
          if (
            priceRange[0] > character.price ||
            priceRange[1] < character.price
          ) {
            return false;
          }
          if (tier !== "All" && tier !== character.tier) {
            return false;
          }
          if (theme !== "None" && theme !== character.theme) {
            return false;
          }
          return true;
        });

      const result = filteredCharacters
        .sort((a, b) => {
          if (priceSorting === "None") {
            return 0;
          }
          if (priceSorting === "Low to High") {
            return a.price - b.price;
          }
          if (priceSorting === "High to Low") {
            return b.price - a.price;
          }
          if (time === "Newest") {
            return (
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
          }
          if (time === "Oldest") {
            return (
              new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
            );
          }
          return 0;
        })
        .slice(start, end);

      return {
        success: true,
        result,
        hasMore: end < filteredCharacters.length,
      };
    });
};
