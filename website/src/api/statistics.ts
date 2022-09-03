import axios from "axios";

export interface HitsResponse {
  hits: number;
}

export interface LikesResponse {
  likes: number;
}

export interface StatisticsResponse extends HitsResponse, LikesResponse {}

const STATISTICS_API_URL = `${process.env.NEXT_PUBLIC_API}/statistics`;

export const getStatistics = async (): Promise<StatisticsResponse> => {
  const { data } = await axios.get(STATISTICS_API_URL);

  return data as StatisticsResponse;
};

export const getArticleStatistics = async (
  slug: string
): Promise<StatisticsResponse> => {
  const { data } = await axios.get(`${STATISTICS_API_URL}/${slug}`);

  return data as StatisticsResponse;
};

export const incrementArticleHitCount = async (
  slug: string
): Promise<HitsResponse> => {
  const { data } = await axios.post(`${STATISTICS_API_URL}/${slug}/hits`);

  return data as HitsResponse;
};
