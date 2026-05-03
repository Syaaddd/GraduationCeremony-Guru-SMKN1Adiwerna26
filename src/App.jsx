import { useState } from "react";
import SearchScreen    from "./components/SearchScreen";
import InvitationPage  from "./components/InvitationPage";

// Flow: search → invitation
export default function App() {
  const [teacher, setTeacher] = useState(null);

  if (!teacher) return <SearchScreen onFound={setTeacher} />;
  return <InvitationPage teacher={teacher} />;
}
