import api from "./api";
import { CatApiResponse } from "../src/types/index";

async function getCat(): Promise<CatApiResponse | null> {
  try {
    const response = await api.get<CatApiResponse[]>("images/search");
    return response.data[0] || null;
  } catch (error) {
    console.error("Error fetching cat:", error);
    return null;
  }
}

async function getCatImg(): Promise<string | null> {
  try {
    const response = await api.get<CatApiResponse[]>("images/search");
    return response.data[0]?.url || null;
  } catch (error) {
    console.error("Error fetching cat image:", error);
    return null;
  }
}

async function getCats(count: number): Promise<CatApiResponse[]> {
  try {
    const response = await api.get<CatApiResponse[]>(`images/search?limit=${count}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching cats:", error);
    return [];
  }
}

export default {
  getCat,
  getCatImg,
  getCats
};