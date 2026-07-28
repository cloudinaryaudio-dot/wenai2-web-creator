import { useState } from "react";
import { Lock, Phone, User, AlertCircle, CheckCircle } from "lucide-react";

export default function LoginSignupPage() {
  const [currentForm, setCurrentForm] = useState("login");
  const [loginError, setLoginError] = useState("");
  const [signupError, setSignupError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const [loginData, setLoginData] = useState({
    mobile: "",
    password: "",
  });

  const [signupData, setSignupData] = useState({
    name: "",
    mobile: "",
    password: "",
  });

  const isValidMobile = (value) =>
    /^\+?[1-9]\d{1,14}$/.test(value.replace(/\s/g, ""));

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setLoginError("");

    if (!loginData.mobile || !loginData.password)
      return setLoginError("Please fill all fields");

    if (!isValidMobile(loginData.mobile))
      return setLoginError("Invalid mobile number");

    if (loginData.password.length < 6)
      return setLoginError("Password must be at least 6 characters");

    setSuccessMsg("Login Successful! ✅");
    setTimeout(() => {
      setLoginData({ mobile: "", password: "" });
      setSuccessMsg("");
    }, 1500);
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    setSignupError("");

    if (!signupData.name || !signupData.mobile || !signupData.password)
      return setSignupError("Please fill all fields");

    if (signupData.name.length < 3)
      return setSignupError("Name must be at least 3 characters");

    if (!isValidMobile(signupData.mobile))
      return setSignupError("Invalid mobile number");

    if (signupData.password.length < 6)
      return setSignupError("Password must be at least 6 characters");

    setSuccessMsg("Account Created Successfully! ✅");
    setTimeout(() => {
      setSignupData({ name: "", mobile: "", password: "" });
      setCurrentForm("login");
      setSuccessMsg("");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-400 via-pink-300 to-red-400 p-4">
      <div className="w-full max-w-md bg-white/95 rounded-2xl shadow-2xl overflow-hidden animate-slideUp">

        {/* Header */}
        <div className="bg-gradient-to-r from-rose-500 to-red-600 p-8 text-center text-white">
          <h1 className="text-4xl font-bold">🔐 Welcome</h1>
          <p className="text-rose-100 mt-1">Secure Authentication</p>
        </div>

        {/* Toggle */}
        <div className="flex gap-3 p-4 bg-rose-50">
          {["login", "signup"].map((type) => (
            <button
              key={type}
              onClick={() => {
                setCurrentForm(type);
                setLoginError("");
                setSignupError("");
                setSuccessMsg("");
              }}
              className={`flex-1 py-3 rounded-lg font-bold transition ${
                currentForm === type
                  ? "bg-gradient-to-r from-rose-500 to-red-600 text-white"
                  : "bg-white text-rose-600 border"
              }`}
            >
              {type === "login" ? "Sign In" : "Create Account"}
            </button>
          ))}
        </div>

        {/* Body */}
        <div className="p-6">
          {successMsg && (
            <div className="bg-green-500 text-white p-4 rounded-lg mb-4 flex items-center gap-2">
              <CheckCircle /> {successMsg}
            </div>
          )}

          {currentForm === "login" ? (
            <form onSubmit={handleLoginSubmit} className="space-y-5">
              {loginError && (
                <ErrorBox message={loginError} />
              )}

              <Input
                icon={<Phone />}
                placeholder="+91 9876543210"
                value={loginData.mobile}
                onChange={(e) =>
                  setLoginData({ ...loginData, mobile: e.target.value })
                }
              />

              <Input
                type="password"
                icon={<Lock />}
                placeholder="Password"
                value={loginData.password}
                onChange={(e) =>
                  setLoginData({ ...loginData, password: e.target.value })
                }
              />

              <SubmitBtn label="Sign In" />
            </form>
          ) : (
            <form onSubmit={handleSignupSubmit} className="space-y-5">
              {signupError && (
                <ErrorBox message={signupError} />
              )}

              <Input
                icon={<User />}
                placeholder="Full Name"
                value={signupData.name}
                onChange={(e) =>
                  setSignupData({ ...signupData, name: e.target.value })
                }
              />

              <Input
                icon={<Phone />}
                placeholder="+91 9876543210"
                value={signupData.mobile}
                onChange={(e) =>
                  setSignupData({ ...signupData, mobile: e.target.value })
                }
              />

              <Input
                type="password"
                icon={<Lock />}
                placeholder="Password"
                value={signupData.password}
                onChange={(e) =>
                  setSignupData({ ...signupData, password: e.target.value })
                }
              />

              <SubmitBtn label="Create Account" />
            </form>
          )}
        </div>

        <div className="text-center text-sm p-4 bg-rose-50 text-gray-600">
          📌 Please create an account before signing in
        </div>
      </div>
    </div>
  );
}

/* ---------- Reusable Components ---------- */

function Input({ icon, type = "text", ...props }) {
  return (
    <div className="flex items-center gap-3 bg-rose-50 border rounded-lg px-4 py-3">
      {icon}
      <input
        type={type}
        className="w-full bg-transparent outline-none"
        {...props}
      />
    </div>
  );
}

function SubmitBtn({ label }) {
  return (
    <button className="w-full py-3 bg-gradient-to-r from-rose-500 to-red-600 text-white font-bold rounded-lg hover:shadow-lg">
      {label}
    </button>
  );
}

function ErrorBox({ message }) {
  return (
    <div className="bg-red-100 text-red-700 p-3 rounded-lg flex items-center gap-2">
      <AlertCircle size={18} />
      {message}
    </div>
  );
}
