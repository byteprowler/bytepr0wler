export interface GithubRepoMetadata {
  description?: string;
  stars?: number;
  forks?: number;
  language?: string;
  topics?: string[];
  updatedAt?: string;
  pushedAt?: string;
  url?: string;
}

export interface GithubRepoMetadataResponse {
  ok: boolean;
  repo?: GithubRepoMetadata;
  message?: string;
}

export interface GithubDeveloperTelemetry {
  publicRepos: number;
  starsReceived: number;
  forksReceived: number;
  followers: number;
  primaryLanguages: string[];
  recentlyUpdatedRepo?: {
    name: string;
    url: string;
    pushedAt?: string;
    updatedAt?: string;
  };
}

export interface GithubDeveloperTelemetryResponse {
  configured: boolean;
  ok: boolean;
  telemetry?: GithubDeveloperTelemetry;
  message?: "GITHUB_CONFIG_MISSING" | "GITHUB_SIGNAL_OFFLINE" | "METHOD_NOT_ALLOWED";
}

export async function fetchGithubRepoMetadata(
  owner: string,
  repo: string,
): Promise<GithubRepoMetadataResponse> {
  const params = new URLSearchParams({ owner, repo });
  const response = await fetch(`/api/github/repo?${params.toString()}`);

  if (!response.ok) {
    throw new Error("GITHUB_SIGNAL_OFFLINE");
  }

  return (await response.json()) as GithubRepoMetadataResponse;
}

export async function fetchGithubDeveloperTelemetry(): Promise<GithubDeveloperTelemetryResponse> {
  const response = await fetch("/api/github/profile");

  if (!response.ok) {
    throw new Error("GITHUB_SIGNAL_OFFLINE");
  }

  return (await response.json()) as GithubDeveloperTelemetryResponse;
}
