export function AuthText({ queryParams }: { queryParams: string | null }) {
  return (
    <h1 className="text-4xl font-bold">
      {queryParams === "login"
        ? "Login"
        : queryParams === "register"
          ? "Register"
          : queryParams === "recover"
            ? "Recover"
            : queryParams === "resetPassword"
              ? "Reset pasword"
              : queryParams === "recoverCompleted"
                ? "Recover completed"
                : "Auth completed"}
    </h1>
  )
}
