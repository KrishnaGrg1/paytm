import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface User {
  _id: string;
  firstName: string;
  lastName: string;
}

interface UserData {
  users: User[];
}

export const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filter, setFilter] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);


 const apiUrl = import.meta.env.VITE_API_URL;
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError("");
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("No auth token found. Please login.");
          return;
        }
        const response = await axios.get<UserData>(
         `${apiUrl}/api/v1/user/bulk`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = response.data
        setUsers(data.users)
      } catch (err: any) {
        setError(
          err.response?.data?.message || err.message || "Unexpected error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Filter users locally based on search input
  const filteredUsers = users.filter((user) =>
    `${user.firstName} ${user.lastName}`
      .toLowerCase()
      .includes(filter.toLowerCase())
  );

  return (
    <>
      <div className="font-bold mt-6 text-lg">Users</div>
      <div className="my-2">
        <input
          type="text"
          placeholder="Search users..."
          className="w-full px-2 py-1 border rounded border-slate-200"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>

      {loading && <div>Loading users...</div>}
      {error && <div className="text-red-500">{error}</div>}

      <div className="space-y-3">
        {filteredUsers.map((user) => (
          <User key={user._id} user={user} />
        ))}
        {!loading && filteredUsers.length === 0 && <div>No users found.</div>}
      </div>
    </>
  );
};

interface UserProps {
  user: User;
}

function User({ user }: UserProps) {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center p-3 border rounded shadow-sm">
      <div className="flex items-center">
        <div className="rounded-full h-12 w-12 bg-slate-200 flex items-center justify-center text-xl font-semibold mr-3">
          {user.firstName[0].toUpperCase()}
        </div>
        <div>
          <div className="font-medium">
            {user.firstName} {user.lastName}
          </div>
        </div>
      </div>

      <Button
        className="bg-blue-500 text-white cursor-pointer hover:bg-blue-600"
        onClick={() => navigate(`/send?id=${user._id}&name=${user.firstName}`)}
      >
        Send Money
      </Button>
    </div>
  );
}
