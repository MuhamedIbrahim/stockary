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
      <Skeleton
        number={10}
        width="100%"
        height="600px"
        bgColor={colors.white[80]}
      />
    );
  } else if (!isLoading && user) {
    return (
      <div className="container">
        <ProfileContainer>
          <SidebarController activePage="cart" />
          <ProfileContent title="Cart" pageType="cart" />
        </ProfileContainer>
      </div>
    );
  } else {
    redirect("/");
    return <></>;
  }
};

export default cart;
