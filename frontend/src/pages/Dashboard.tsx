
import Balance from "../components/Balance";
import NavbarDashBoard from "../components/NavbarDashBoard";
import { Users } from "../components/Users";

export default function Dashboard() {
  return (
    <div>
      <NavbarDashBoard />
      <div className="p-4">
        <Balance />
        <Users />
      </div>
    </div>
  );
}
