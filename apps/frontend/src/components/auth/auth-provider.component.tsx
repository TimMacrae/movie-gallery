import { useEffect, ComponentType } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/src/hooks/useUser.query";
import { APIROUTES } from "@/src/api/api-routes.config";
import { LoadingSpinner } from "../loading-spinner";

interface WithAuthProps {}

export const authProvider = <P extends object>(
  WrappedComponent: ComponentType<P>
) => {
  const AuthProvider: React.FC<P & WithAuthProps> = (props) => {
    const { data: user, isLoading } = useUser();
    const router = useRouter();

    useEffect(() => {
      if (!isLoading && !user) {
        router.push(APIROUTES.URL.SIGNIN);
      }
    }, [isLoading, user, router]);

    if (isLoading || !user) {
      return <LoadingSpinner />;
    }

    return <WrappedComponent {...props} />;
  };

  AuthProvider.displayName = `AuthProvider(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;

  return AuthProvider;
};
