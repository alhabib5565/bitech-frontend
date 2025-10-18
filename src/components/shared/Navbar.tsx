"use client";
import SearchField from "../products/Searchfield";
import { useAppDispatch } from "@/redux/hooks";
import { logout } from "@/redux/features/authSlice";
import { Button } from "../ui/button";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const handleLogout = () => {
    dispatch(logout());
    Swal.fire("Success!", "You have been logged out.", "success");
    router.push("/login");
  };
  return (
    <div className="sticky top-0 z-20 bg-white shadow-sm">
      <div className="container flex items-center justify-between py-4">
        <SearchField />
        <Button variant={"destructive"} onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
