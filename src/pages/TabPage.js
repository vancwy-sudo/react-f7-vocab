import { Page, Navbar, Link, Toolbar, Tabs, Tab } from "framework7-react";

import WordOfTheDay from "../components/WordOfTheDay";
import Translate from "../components/Translate";

function TabPage() {
  return (
    <Page pageContent={false}>
      <Navbar title="Vacab" />

      <Toolbar tabbar position="bottom">
        <Link tabLink="#tab-1" tabLinkActive text="Random" />
        <Link tabLink="#tab-2" text="Translate" />
        <Link tabLink="#tab-3" text="Look up" />
      </Toolbar>
      <Tabs>
        <Tab id="tab-1" className="page-content" tabActive>
          <WordOfTheDay />
        </Tab>
        <Tab id="tab-2" className="page-content">
          <Translate />
        </Tab>
        <Tab id="tab-3" className="page-content">
          <h1>Tab-3</h1>
        </Tab>
      </Tabs>
    </Page>
  );
}

export default TabPage;
