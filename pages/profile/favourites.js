import Head from "next/head";
import { useAuth } from "@/utils/useAuth";
import Skeleton from "@/components/UI/Skeleton/Skeleton";
import { colors } from "@/styles/theme";
import SidebarController, {
  ProfileContainer,
} from "@/components/parts/Profile/SidebarController";
import ProfileContent from "@/components/parts/Profile/ProfileContent";

const favourites = () => {
  const { user, isLoading } = useAuth();
  if (isLoading) {
    return (
      <>
        <Head>
          <title>Stockary - My Favourites</title>
        </Head>

        <Skeleton
          number={10}
          width="100%"
          height="600px"
          bgColor={colors.white[80]}
        />
      </>
    );
  } else if (!isLoading && user) {
    return (
      <>
        <Head>
          <title>Stockary - My Favourites</title>
        </Head>

        <div className="container">
          <ProfileContainer>
            <SidebarController activePage="favourites" userPhoto={user.photo} />
            <ProfileContent title="Favourites" pageType="favourites" />
          </ProfileContainer>
        </div>
      </>
    );
  } else {
    redirect("/");
    return (
      <Head>
        <title>Stockary - My Favourites</title>
      </Head>
    );
  }
};

export default favourites;
