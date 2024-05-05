type AuthProvider = string | null;
type User = {
    id: string;
    name: string | null;
    email: string | null;
    image: string | null;
    provider: AuthProvider;
};
