import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "../components/ui/dialog";
import { motion } from "motion/react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentUser, loginUser, logoutUser } from "../store/slices/authSlice";
import { RootState } from "../store";
import {GlassCard} from "../components/GlassCard";
import {CyberButton} from "../components/CyberButton";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

export const LoginModal = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, status } = useSelector((s: RootState) => s.authSlice);
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

     useEffect(() => {
    dispatch(fetchCurrentUser() as any);
  }, [dispatch])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(loginUser({ email, password }) as any);
    setOpen(false);
    navigate("/dashboard/projects");
  };

  const handleLogout = () => {
    dispatch(logoutUser() as any);
    navigate('/')
  };



 

  return (
    <>
    {user == null ? ( <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <CyberButton>Login</CyberButton>
      </DialogTrigger>

      <DialogContent className="max-w-sm bg-transparent border-none shadow-none">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <GlassCard>
            <DialogTitle className="text-center mb-4 text-(--accent-cyan)">
              Login
            </DialogTitle>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Email"
                className="bg-transparent border border-(--accent-cyan)/40 rounded-md p-2 text-gray-100 focus:outline-none focus:border-(--accent-cyan)"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                className="bg-transparent border border-(--accent-cyan)/40 rounded-md p-2 text-gray-100 focus:outline-none focus:border-(--accent-cyan)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <CyberButton type="submit" disabled={status === "loading"}>
                {status === "loading" ? "Loading..." : "Login"}
              </CyberButton>
            </form>
          </GlassCard>
        </motion.div>
      </DialogContent>
    </Dialog> ) : (
      <>
       <CyberButton onClick={handleLogout} className="flex items-center justify-center gap-3.5">
        <LogOut/>
        Logout
      </CyberButton>
      <CyberButton onClick={()=>navigate('/dashboard')}>
        Dashboard
      </CyberButton>
      </>
    )}
    </>
  );
};
