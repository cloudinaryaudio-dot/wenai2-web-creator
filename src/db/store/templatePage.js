import { useEffect } from "react";
import { useParams } from "react-router-dom";

export function useTemplatePage(store) {
  const { userId } = useParams();

  const setUser = store((s) => s.setUser);
  const data = store((s) => s.data);
  const error = store((s) => s.error);

  useEffect(() => {
    setUser(userId || "user1");
  }, [userId, setUser]);

  return { data, error };
}
