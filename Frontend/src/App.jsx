import "./App.css";
import Modal from "./components/Modal";
import Sidebar from "./components/Sidebar";
import StudentList from "./components/StudentList";

function App() {
  return (
    <div className="flex h-screen bg-zinc-950 text-zinc-100 font-poppins selection:bg-indigo-500 selection:text-white">
      {/* Sidebar - Fixed width */}
      <Sidebar />

      {/* Main Content - Flex Grow */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        <StudentList />
      </main>
    </div>
  );
}

export default App;
