import { ApiResponse } from "apisauce";
import { getGeneralApiProblem } from "./apiProblem";
import type { GetCreditsResult, GetMovieResult, GetMoviesResult, GetResultGenres } from "./api.types";
import { Api } from "./api";

export class MovieApi extends Api {
  constructor() {
    super();
  }

  async getMoviesPopular(page: number = 1): Promise<GetMoviesResult> {
    try {
      const response: ApiResponse<any> = await this.apisauce.get(`/movie/popular?page=${page}`);

      if (!response.ok) {
        const problem = getGeneralApiProblem(response);
        if (problem) return problem;
      }
      const data = response.data;

      return { kind: "ok", data };
    } catch (e) {
      return { kind: "bad-data" };
    }
  }

  async getMoviesTopRated(page: number = 1): Promise<GetMoviesResult> {
    try {
      const response: ApiResponse<any> = await this.apisauce.get(`/movie/top_rated?page=${page}`);

      if (!response.ok) {
        const problem = getGeneralApiProblem(response);
        if (problem) return problem;
      }
      const data = response.data;

      return { kind: "ok", data };
    } catch (e) {
      return { kind: "bad-data" };
    }
  }

  async getNowPlayingMovies(): Promise<GetMoviesResult> {
    try {
      const response: ApiResponse<any> = await this.apisauce.get("/movie/now_playing");

      if (!response.ok) {
        const problem = getGeneralApiProblem(response);
        if (problem) return problem;
      }

      const data = response.data;
      return { kind: "ok", data };
    } catch (e) {
      return { kind: "bad-data" };
    }
  }

  async searchMovies(query: string, page: number = 1): Promise<GetMoviesResult> {
    try {
      const response: ApiResponse<any> = await this.apisauce.get(`/search/movie?query=${query}&page=${page}`);

      if (!response.ok) {
        const problem = getGeneralApiProblem(response);
        if (problem) return problem;
      }

      const data = response.data;
      return { kind: "ok", data };
    } catch (e) {
      return { kind: "bad-data" };
    }
  }

  async getDetailMovie(id: number): Promise<GetMovieResult> {
    try {
      const response: ApiResponse<any> = await this.apisauce.get(`/movie/${id}`);

      if (!response.ok) {
        const problem = getGeneralApiProblem(response);
        if (problem) return problem;
      }

      const movie = response.data;
      return { kind: "ok", movie };
    } catch (e) {
      return { kind: "bad-data" };
    }
  }

  async getCastMovie(id: number): Promise<GetCreditsResult> {
    try {
      const response: ApiResponse<any> = await this.apisauce.get(`/movie/${id}/credits`);

      if (!response.ok) {
        const problem = getGeneralApiProblem(response);
        if (problem) return problem;
      }

      const cast = response.data?.cast;
      return { kind: "ok", cast };
    } catch (e) {
      return { kind: "bad-data" };
    }
  }

  async getMoviesSimilar(id: number, page: number = 1): Promise<GetMoviesResult> {
    try {
      const response: ApiResponse<any> = await this.apisauce.get(`/movie/${id}/similar?page=${page}`);

      if (!response.ok) {
        const problem = getGeneralApiProblem(response);
        if (problem) return problem;
      }

      const data = response.data;
      return { kind: "ok", data };
    } catch (e) {
      return { kind: "bad-data" };
    }
  }

  async getGenres(): Promise<GetResultGenres> {
    try {
      const response: ApiResponse<any> = await this.apisauce.get(`/genre/movie/list`);

      if (!response.ok) {
        const problem = getGeneralApiProblem(response);
        if (problem) return problem;
      }

      const data = response.data;
      return { kind: "ok", genres: data.genres };
    } catch (e) {
      return { kind: "bad-data" };
    }
  }
}

// Singleton instance of the Movie API for convenience
export const movieApi = new MovieApi();