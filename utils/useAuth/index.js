import { useState, useEffect, useContext, createContext } from "react";
import { auth, provider } from "@/lib/firebase";
// import nookies from "nookies";

const authContext = createContext();

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [user, setUser] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  class User {
    constructor(uid, displayName, email, photoURL) {
      this.name = displayName;
      this.email = email;
      this.uid = uid;
      this.photo = photoURL;
    }
  }

  const signin = async () => {
    return await auth
      .signInWithPopup(provider)
      .then(async (response) => {
        const userInfo = new User(
          response.user.uid,
          response.user.displayName,
          response.user.email,
          response.user.photoURL
        );
        setUser(userInfo);
        return response.user;
      })
      .catch((error) => console.error(error.message));
  };

  const assignUser = (user) => {
    setUser(user || false);
  };

  const signout = async () => {
    return await auth.signOut().then(() => {
      setUser(false);
    });
  };

  useEffect(() => {
    const unsubscribe = auth.onIdTokenChanged(async (user) => {
      if (user) {
        // const token = await user.getIdToken();
        // nookies.set(undefined, "token", token, { path: "/" });
        const userInfo = new User(
          user.uid,
          user.displayName,
          user.email,
          user.photoURL
        );
        setUser(userInfo);
      } else {
        // nookies.set(undefined, "token", "", { path: "/" });
        setUser(false);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const handle = setInterval(async () => {
      if (user) await user.getIdToken(true);
    }, 25 * 60 * 1000);

    return () => clearInterval(handle);
  }, []);

  return {
    user,
    signin,
    signout,
    assignUser,
    isLoading,
  };
}
