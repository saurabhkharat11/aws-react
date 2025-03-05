import "./TopNav.css";
import TopNavigation from "@cloudscape-design/components/top-navigation";

export default function TopNav() {
  return (
    <TopNavigation
      identity={{
        title: "Task Manager",
      }}
      utilities={[
        {
          type: "menu-dropdown",
          text: "John Doe",
          description: "email@example.com",
          iconName: "user-profile",
          items: [
            { id: "profile", text: "Profile" },
            { id: "preferences", text: "Preferences" },
            { id: "security", text: "Security" },
            {
              id: "support-group",
              text: "Support",
              items: [
                {
                  id: "documentation",
                  text: "Documentation",
                  href: "#",
                  external: true,
                  externalIconAriaLabel: " (opens in new tab)",
                },
                { id: "support", text: "Support" },
                {
                  id: "feedback",
                  text: "Feedback",
                  href: "#",
                  external: true,
                  externalIconAriaLabel: " (opens in new tab)",
                },
              ],
            },
            { id: "signout", text: "Sign out" },
          ],
        },
      ]}
    ></TopNavigation>
  );
}
