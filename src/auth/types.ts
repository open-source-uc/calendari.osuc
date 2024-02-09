interface UserIdentity {
  id: string;
  provider: string;
  identity_data: Record<string, unknown>;
}

export interface User {
  id: string;
  user_metadata: Record<string, unknown>;
  email: string;
  identities: UserIdentity[];
}
