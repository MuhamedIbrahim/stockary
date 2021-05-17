import Head from "next/head";
import { useAuth } from "@/utils/useAuth";
import Skeleton from "@/components/UI/Skeleton/Skeleton";
import { colors } from "@/styles/theme";
import SidebarController, {
  ProfileContainer,
} from "@/components/parts/Profile/SidebarController";
import ProfileContent from "@/components/parts/Profile/ProfileContent";

const purchases = () => {
  const { user, isLoading } = useAuth();
  if (isLoading) {
    return (
      <>
        <Head>
          <title>Stockary - My Purchases</title>
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
          <title>Stockary - My Purchases</title>
        </Head>
        <div className="container">
          <ProfileContainer>
            <SidebarController activePage="purchases" userPhoto={user.photo} />
            <ProfileContent title="Purchases" pageType="purchases" />
          </ProfileContainer>
        </div>
      </>
    );
  } else {
    redirect("/");
    return (
      <Head>
        <title>Stockary - My Purchases</title>
      </Head>
    );
  }
};

export default purchases;
