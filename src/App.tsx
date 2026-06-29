import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SearchPage } from "@/pages/SearchPage";

const ProfileDetailPage = lazy(() =>
  import("@/pages/ProfileDetailPage").then((m) => ({ default: m.ProfileDetailPage }))
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route
          path="/profile/:username"
          element={
            <Suspense
              fallback={
                <div className="flex items-center justify-center min-h-screen">
                  <div className="w-8 h-8 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                </div>
              }
            >
              <ProfileDetailPage />
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
