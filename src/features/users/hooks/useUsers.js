import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../usersSlice";
import {
  selectUsers,
  selectUsersLoading,
  selectUsersError,
} from "../usersSelectors";

function useUsers() {
  const dispatch = useDispatch();

  const users = useSelector(selectUsers);
  const loading = useSelector(selectUsersLoading);
  const error = useSelector(selectUsersError);

  const fetchAllUsers = () => {
    dispatch(fetchUsers());
  };

  return {
    users,
    loading,
    error,
    fetchAllUsers,
  };
}

export default useUsers;