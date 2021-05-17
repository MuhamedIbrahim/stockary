import Head from "next/head";
import { useAuth } from "@/utils/useAuth";
import Skeleton from "@/components/UI/Skeleton/Skeleton";
import { colors } from "@/styles/theme";
import SidebarController, {
  ProfileContainer,
} from "@/components/parts/Profile/SidebarController";
import ProfileContent from "@/components/parts/Profile/ProfileContent";

const cart = () => {
  const { user, isLoading, redirect } = useAuth();
  if (isLoading) {
    return (
      <>
        <Head>
          <title>Stockary - My Cart</title>
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
          <title>Stockary - My Cart</title>
        </Head>

        <div className="container">
          <ProfileContainer>
            <SidebarController activePage="cart" userPhoto={user.photo} />
            <ProfileContent title="Cart" pageType="cart" />
          </ProfileContainer>
        </div>
      </>
    );
  } else {
    redirect("/");
    return (
      <Head>
        <title>Stockary - My Cart</title>
      </Head>
    );
  }
};

export default cart;
