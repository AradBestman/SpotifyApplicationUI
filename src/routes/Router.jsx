import { Route, Routes } from "@mui/icons-material";
import ROUTES from "./ROUTES";

const Router = () => {
  return <Route path={ROUTES.HOME} element={<LayoutComponent />} />;
};
