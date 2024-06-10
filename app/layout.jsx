import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { poppins } from "@/assets/fonts";
import AuthProvider from "@/components/AuthProvider";
import { ToastContainer } from "react-toastify";
import { GlobalProvider } from "./context/GlobalContext";
import "@/assets/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import "photoswipe/dist/photoswipe.css";

export const metadata = {
  title: "PropertyPulse | Find the Perfect Rental",
  description: "Find your dream rental property",
  keywords: "rental, find rentals, find properties",
};

function Layout({ children }) {
  return (
    <AuthProvider>
      <html lang="en">
        <body className={`${poppins.className} antialiased`}>
          <GlobalProvider>
            <Navbar />
            <main className="min-h-[calc(100vh-146px)]">{children}</main>
            <Footer />
            <ToastContainer />
          </GlobalProvider>
        </body>
      </html>
    </AuthProvider>
  );
}

export default Layout;
