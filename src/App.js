import { App, View } from "framework7-react";

import TabPage from "./pages/TabPage";

const f7params = {
  name: "Vocab App",
  view: {
    browserHistory: true,
  },
  // specify routes for app
  routes: [
    {
      path: "/",
      component: TabPage,
    },
  ],
};

export default () => (
  // Main Framework7 App component where we pass Framework7 params
  <App theme="auto" {...f7params}>
    {/* Your main view, should have "main" prop */}
    <View main url="/" />
  </App>
);
