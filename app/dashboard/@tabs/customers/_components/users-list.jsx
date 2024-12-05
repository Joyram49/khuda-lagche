import { getAllUserInfo } from "@/queries/users";
import UsersTable from "./users-table";

async function UsersList() {
  const { allUser, totalUserCount, monthUserCount, yearUserCount } =
    await getAllUserInfo();
  return <UsersTable users={allUser} />;
}

export default UsersList;
