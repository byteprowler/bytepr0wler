export interface AniListAnime {
  id: number;
  title: {
    romaji: string;
    english: string | null;
  };
  coverImage: {
    large: string;
  };
  bannerImage: string | null;
  averageScore: number | null;
  episodes: number | null;
  status: string;
  genres: string[];
  siteUrl: string;
}

export const fallbackAnimeList: AniListAnime[] = [
  {
    id: 110277,
    title: { romaji: "Shingeki no Kyojin: The Final Season", english: "Attack on Titan Final Season" },
    coverImage: { large: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx110277-O7vJXDg77r7q.png" },
    bannerImage: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/110277-7O2X8uAdY0Gq.jpg",
    averageScore: 88,
    episodes: 16,
    status: "FINISHED",
    genres: ["Action", "Drama", "Fantasy", "Mystery"],
    siteUrl: "https://anilist.co/anime/110277"
  },
  {
    id: 113415,
    title: { romaji: "Jujutsu Kaisen", english: "JUJUTSU KAISEN" },
    coverImage: { large: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx113415-8t9v7Z7ZdT9j.png" },
    bannerImage: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/113415-vHqscb7v6z1x.jpg",
    averageScore: 86,
    episodes: 24,
    status: "FINISHED",
    genres: ["Action", "Fantasy", "Mystery"],
    siteUrl: "https://anilist.co/anime/113415"
  },
  {
    id: 21519,
    title: { romaji: "Gintama°", english: "Gintama Season 4" },
    coverImage: { large: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx21519-7YgVscb7Yg7Z.png" },
    bannerImage: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/21519-7O2X8uAdY0Gq.jpg",
    averageScore: 90,
    episodes: 51,
    status: "FINISHED",
    genres: ["Action", "Comedy", "Sci-Fi"],
    siteUrl: "https://anilist.co/anime/21519"
  },
  {
    id: 11061,
    title: { romaji: "Hunter x Hunter (2011)", english: "Hunter x Hunter (2011)" },
    coverImage: { large: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx11061-f9b6Maas9g9g.png" },
    bannerImage: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/11061-vHqscb7v6z1x.jpg",
    averageScore: 90,
    episodes: 148,
    status: "FINISHED",
    genres: ["Action", "Adventure", "Fantasy"],
    siteUrl: "https://anilist.co/anime/11061"
  }
];

const ANILIST_API_URL = "https://graphql.anilist.co";

const GET_USER_FAVOURITES_QUERY = `
  query ($username: String) {
    User (name: $username) {
      favourites {
        anime (page: 1, perPage: 12) {
          nodes {
            id
            title {
              romaji
              english
            }
            coverImage {
              large
            }
            bannerImage
            averageScore
            episodes
            status
            genres
            siteUrl
          }
        }
      }
    }
  }
`;

export async function fetchUserFavourites(username: string): Promise<AniListAnime[]> {
  if (!username || username.trim() === "") {
    return [];
  }

  const response = await fetch(ANILIST_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query: GET_USER_FAVOURITES_QUERY,
      variables: { username },
    }),
  });

  if (!response.ok) {
    throw new Error(`AniList server responded with HTTP status ${response.status}`);
  }

  const result = await response.json();

  if (result.errors) {
    throw new Error(result.errors[0]?.message || "Failed to query AniList endpoint");
  }

  const nodes = result?.data?.User?.favourites?.anime?.nodes;
  if (!nodes || !Array.isArray(nodes)) {
    return [];
  }

  return nodes;
}