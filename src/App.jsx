import { Routes, Route } from "react-router-dom";
import NotFound from "./pages/not-found";
import Home from "./pages/home";
import Login from "./pages/profile/login";
import Logout from "./pages/profile/logout";
import You from "./pages/you";
import Search from "./pages/search";
import UserPage from "./pages/search/user-page";
import useLocalStorage from "use-local-storage";
import Contacts from "./pages/contacts";

function App() {
  const [contacts, setContacts] = useLocalStorage(projectID + "contacts", { [user]: true })

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/you" element={<You />} />
      <Route path="/search/user/:id" element={<UserPage contacts={contacts} setContacts={setContacts} />} />
      <Route path="/search" element={<Search />} />
      <Route path="/contacts" element={<Contacts contacts={contacts} />} />
      <Route path="profile/login" element={<Login />} />
      <Route path="profile/logout" element={<Logout />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;